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
		// no idea why.  This works around that; loki defaults to 721 hours and we have
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
	// BatchSizeForTesting configures a different batch size, intended for testing.  It's public
	// to avoid a circular dependency between Client and TestLoki.
	BatchSizeForTesting int = 0
	// MaxRangeForTesting configures a different max range, intended for testing.
	MaxRangeForTesting time.Duration = 0
)

// RecvFunc is a function that receives a log entry.  If it doesn't count towards the limit (i.e. is
// discarded by further filtering), the function should return false.
type RecvFunc func(ctx context.Context, labels LabelSet, e *Entry) (count bool, retErr error)

type labeledEntry struct {
	labels *LabelSet
	entry  *Entry
}

// BatchedQueryRange executes multiple QueryRange calls to return logs from the entire time
// interval, ending when the range is exhausted or the limit is reached.  retOffset is how deep into
// a stream of identical timestamps the querying is at the time this function returns; a value > 0
// implies that logs may be being dropped.  Note that if we are only 1 entry into the stream of
// duplicates at return time, the case is undetectable.  Passing retOffset as offset to a query that
// starts where this one ends (new start = old end) should extract the remaining logs.
func (c *Client) BatchedQueryRange(ctx context.Context, query string, start, end time.Time, offset uint, limit int, recv RecvFunc) (retOffset uint, retErr error) {
	ctx, done := log.SpanContext(ctx, "BatchedQueryRange", zap.String("query", query))
	defer done(log.Errorp(&retErr))

	// We fetch the limits every time rather than caching them because Loki can be reconfigured
	// without restarting pachd.
	tctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	maxRange, batchSize, err := c.FetchLimitsConfig(tctx)
	cancel()
	if BatchSizeForTesting > 0 {
		batchSize = BatchSizeForTesting
	}
	if MaxRangeForTesting > 0 {
		maxRange = MaxRangeForTesting
	}
	if err != nil {
		log.Info(ctx, "failed to determine loki's maximum request size; assuming reasonable defaults", zap.Error(err), zap.Duration("range", maxRange), zap.Int("batch_size", batchSize))
	}

	iter := &TimeIterator{Start: start, End: end, Step: maxRange}
	dir := iter.Direction()
	for i := 0; iter.Next() && i < 10; i++ { // XXX
		s, e := iter.Interval()
		if i == 0 && offset > 0 {
			// If the query has an offset, resolve that first.
			retOffset, limit, err = c.queryOneNanosecond(ctx, query, batchSize, s, dir, offset, limit, iter, recv)
			if err != nil {
				return 0, errors.Wrapf(err, "initial queryOneNanosecond(i=0, time=%v, offset=%v, limit=%v)", s.Format(time.RFC3339Nano), offset, limit)
			}
			if limit <= 0 {
				break
			}
			// queryOneNanosecond calls handleBatch calls iter.ObserveLast, which will
			// cause iter.Next() to advance 1 nanosecond in the correct direction.
			continue
		}

		resp, err := c.QueryRange(ctx, query, batchSize, s, e, dir, 0, 0, true)
		if err != nil {
			msg := "<nil>"
			if resp != nil {
				msg = resp.Status
			}
			return 0, errors.Wrapf(err, "QueryRange(i=%v, start=%s, end=%s, limit=%v, dir=%v): (status=%v)", i, s.Format(time.RFC3339Nano), e.Format(time.RFC3339Nano), batchSize, dir, msg)
		}
		var last time.Time
		retOffset, limit, last, err = handleBatch(ctx, resp, iter, limit, recv)
		if err != nil {
			return 0, errors.Wrapf(err, "handleBatch(%v)", i)
		}
		if limit <= 0 {
			break
		}
		if retOffset > 0 {
			// If there's an offset remaining, we need to re-query the last millisecond.
			retOffset, limit, err = c.queryOneNanosecond(ctx, query, batchSize, last, dir, retOffset, limit, iter, recv)
			if err != nil {
				return 0, errors.Wrapf(err, "queryOneNanosecond(i=0, time=%v, offset=%v, limit=%v)", s.Format(time.RFC3339Nano), offset, limit)
			}
			if limit <= 0 {
				break
			}
		}
	}
	return retOffset, nil
}

func handleBatch(ctx context.Context, resp *QueryResponse, iter *TimeIterator, limit int, recv RecvFunc) (retOffset uint, retLimit int, last time.Time, err error) {
	streams, ok := resp.Data.Result.(Streams)
	if !ok {
		return 0, limit, time.Time{}, errors.Errorf(`unexpected response type from loki; got %q want "streams"`, resp.Data.ResultType)
	}
	var entries []labeledEntry
	for _, stream := range streams {
		for _, entry := range stream.Entries {
			entries = append(entries, labeledEntry{labels: &stream.Labels, entry: &entry})
		}
	}
	if len(entries) == 0 {
		return 0, limit, time.Time{}, nil
	}
	sort.Slice(entries, func(i, j int) bool {
		if !iter.forward() {
			i, j = j, i
		}
		return entries[i].entry.Timestamp.Before(entries[j].entry.Timestamp)
	})
	for _, entry := range entries {
		if t := entry.entry.Timestamp; t.Equal(last) {
			retOffset++
		} else {
			last = t
			retOffset = 0
		}
		iter.ObserveLast(last)
		count, err := recv(ctx, *entry.labels, entry.entry)
		if err != nil {
			return 0, limit, time.Time{}, errors.Wrap(err, "handle rentry")
		}
		if count {
			limit--
			if limit <= 0 {
				return retOffset, limit, last, nil
			}
		}
	}
	return 0, limit, time.Time{}, nil
}

func (c *Client) queryOneNanosecond(ctx context.Context, query string, batchSize int, t time.Time, dir string, offset uint, limit int, iter *TimeIterator, recv RecvFunc) (retOffset uint, retLimit int, retErr error) {
	resp, err := c.QueryRange(ctx, query, batchSize, t, t.Add(time.Nanosecond), dir, 0, 0, true)
	if err != nil {
		msg := "<nil>"
		if resp != nil {
			msg = resp.Status
		}
		return 0, 0, errors.Wrapf(err, "QueryRange(start=%s, time=%s, limit=%v, dir=%v): (status=%v)", t.Format(time.RFC3339Nano), batchSize, dir, msg)
	}
	retOffset, retLimit, _, err = handleBatch(ctx, resp, iter, limit, recv)
	if err != nil {
		return 0, 0, errors.Wrapf(err, "handleBatch")
	}
	if retOffset == uint(batchSize) {
		log.Error(ctx, "skipping logs, because Loki's batch size is too small to retrieve all logs at a duplicate timestamp; this likely indicates a configuration issue with log ingestion", zap.Time("time", t), zap.Int("batchSize", batchSize))
	}
	return retOffset, retLimit, nil
}
