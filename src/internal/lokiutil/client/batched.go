package client

import (
	"context"
	"sort"
	"time"

	"github.com/pachyderm/pachyderm/v2/src/internal/errors"
	"github.com/pachyderm/pachyderm/v2/src/internal/log"
	"github.com/prometheus/common/model"
	"go.uber.org/zap"
)

const (
	defaultRange     = 720 * time.Hour // If Loki can't return its configured max query range, use this one instead.
	defaultBatchSize = 1000            // If Loki can't return its configured batch size, use this one instead.
)

// FetchLimitsConfig returns the maximum query length and the maximum query batch size.
func (c *Client) FetchLimitsConfig(ctx context.Context) (time.Duration, int, error) {
	// query server to get the maximum batch size it supports
	config, err := c.QueryConfig(ctx)
	if err != nil {
		return defaultRange, defaultBatchSize, errors.Wrap(err, "querying config")
	}
	limits, ok := config["limits_config"].(map[any]any)
	if !ok {
		return defaultRange, defaultBatchSize, errors.Wrapf(err, "unknown limits config %#v", config["limits_config"])
	}
	batchSize, ok := limits["max_entries_limit_per_query"].(int)
	if !ok {
		return defaultRange, defaultBatchSize, errors.Wrapf(err, "unknown max_entries_limit_per_query %#v", limits["max_entries_limit_per_query"])
	}
	maxRange := defaultRange
	if maxRangeStr, ok := limits["max_query_length"].(string); ok {
		r, err := model.ParseDuration(maxRangeStr) // Loki uses Prometheus durations here, not Go durations.
		if err != nil {
			return defaultRange, batchSize, errors.Wrapf(err, "unparseable duration %q for max_query_length", maxRangeStr)
		}
		// Loki appears to add a millisecond to the time range that you provide it.  I have
		// no idea why.  This works around this; loki defaults to 721 hours and we have
		// always used 720 hours, so replicate that when possible.
		//
		// Example: start=2024-04-01T23:00:00.000000001Z, end=2024-05-02T00:00:00.000000001Z:
		// > the query time range exceeds the limit (query length: 721h0m0.001s, limit: 721h0m0s)
		if r := time.Duration(r); r > time.Hour {
			maxRange = r - time.Hour
		} else if r > time.Millisecond {
			maxRange = r - time.Millisecond
		} else {
			maxRange = r
		}
	} else {
		return defaultRange, batchSize, errors.Wrapf(err, "unknown max_query_length %#v", limits["max_query_length"])
	}
	return maxRange, batchSize, nil
}

var (
	BatchSizeForTesting int           = 0
	MaxRangeForTesting  time.Duration = 0
)

// RecvFunc is a function that receives a log entry.  If it doesn't count towards the limit (i.e. is
// discarded by further filtering), the function should return false.
type RecvFunc func(ctx context.Context, labels LabelSet, e *Entry) (count bool, retErr error)

type labeledEntry struct {
	labels *LabelSet
	entry  *Entry
}

// BatchedQueryRange executes multiple QueryRange calls to return logs from the entire time
// interval, ending when the range is exhausted or the limit is reached.
func (c *Client) BatchedQueryRange(ctx context.Context, query string, start, end time.Time, offset uint, limit int, recv RecvFunc) (retOffset uint, retErr error) {
	ctx, done := log.SpanContext(ctx, "BatchedQueryRange", zap.String("query", query))
	defer done(log.Errorp(&retErr))

	// We fetch the limits every time rather than caching them because Loki can be reconfigured
	// without restarting pachd.
	maxRange, batchSize, err := c.FetchLimitsConfig(ctx)
	if BatchSizeForTesting > 0 {
		batchSize = BatchSizeForTesting
	}
	if MaxRangeForTesting > 0 {
		maxRange = MaxRangeForTesting
	}
	if err != nil {
		log.Info(ctx, "failed to determine loki's maximum request size; assuming reasonable defaults", zap.Error(err), zap.Duration("range", maxRange), zap.Int("batch_size", batchSize))
	}

	iter := TimeIterator{Start: start, End: end, Step: maxRange}
	dir := iter.Direction()
	for i := 0; iter.Next() && limit > 0 && i < 100; i++ {
		s, e := iter.Interval()
		lctx, done := log.SpanContext(ctx, "QueryRange", zap.Time("start", s), zap.Time("end", e), zap.String("direction", dir), zap.Int("i", i))
		resp, err := c.QueryRange(lctx, query, batchSize, s, e, dir, 0, 0, true)
		done(zap.Object("response", resp), zap.Error(err))
		if err != nil {
			msg := "<nil>"
			if resp != nil {
				msg = resp.Status
			}
			return 0, errors.Wrapf(err, "QueryRange(i=%v, start=%s, end=%s, limit=%v, dir=%v): (status=%v)", i, s.Format(time.RFC3339Nano), e.Format(time.RFC3339Nano), batchSize, dir, msg)
		}

		streams, ok := resp.Data.Result.(Streams)
		if !ok {
			return 0, errors.Errorf(`unexpected response type from loki; got %q want "streams"`, resp.Data.ResultType)
		}
		var entries []labeledEntry
		for _, stream := range streams {
			for _, entry := range stream.Entries {
				entries = append(entries, labeledEntry{labels: &stream.Labels, entry: &entry})
			}
		}
		sort.Slice(entries, func(i, j int) bool {
			if !iter.forward() {
				i, j = j, i
			}
			return entries[i].entry.Timestamp.Before(entries[j].entry.Timestamp)
		})
		var lastTime time.Time
		var duplicates int
		for _, entry := range entries {
			if t := entry.entry.Timestamp; t.Equal(lastTime) {
				duplicates++
			} else {
				lastTime = t
				duplicates = 0
			}
			count, err := recv(ctx, *entry.labels, entry.entry)
			if err != nil {
				return 0, errors.Wrap(err, "handle rentry")
			}
			if count {
				limit--
				if limit <= 0 {
					return retOffset, nil
				}
			}
		}
		if duplicates > 0 {
			log.Error(ctx, "log entries with duplicate timestamps potentially being discarded", zap.Time("time", lastTime), zap.Int("duplicates", duplicates))
		}
	}
	return retOffset, nil
}
