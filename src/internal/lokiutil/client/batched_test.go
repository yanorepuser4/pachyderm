package client_test

import (
	"context"
	"math"
	"os"
	"testing"
	"time"

	"github.com/google/go-cmp/cmp"
	"github.com/pachyderm/pachyderm/v2/src/internal/cmputil"
	"github.com/pachyderm/pachyderm/v2/src/internal/lokiutil/client"
	"github.com/pachyderm/pachyderm/v2/src/internal/lokiutil/testloki"
	"github.com/pachyderm/pachyderm/v2/src/internal/pctx"
	"github.com/pachyderm/pachyderm/v2/src/internal/require"
)

func TestFetchLimitsConfig(t *testing.T) {
	ctx := pctx.TestContext(t)
	l, err := testloki.New(ctx, t.TempDir())
	if err != nil {
		t.Fatalf("testloki.New: %v", err)
	}
	t.Cleanup(func() {
		if err := l.Close(); err != nil {
			t.Fatalf("testloki.Close: %v", err)
		}
	})
	gotRange, gotBatch, err := l.Client.FetchLimitsConfig(ctx)
	if err != nil {
		t.Fatal(err)
	}
	if got, want := gotBatch, 5000; got != want {
		t.Errorf("batch size from testloki:\n  got: %v\n want: %v", got, want)
		t.Log("note: batch size is configured in ../testloki/config.yaml")
	}
	if got, want := gotRange, 720*time.Hour; got != want {
		t.Errorf("max range from testloki:\n  got: %v\n want: %v", got, want)
	}
}

func TestBatchedQueryRange(t *testing.T) {
	testData := []struct {
		name       string
		start, end time.Time
		limit      int
		offset     uint
		maxRange   time.Duration
		batchSize  int
		pick       func(e *client.Entry) bool
		want       []string
	}{
		{
			name: "end time before logs start",
			end:  time.Date(2024, 4, 30, 23, 59, 59, 999999999, time.UTC),
		},
		{
			name:  "start time after logs end",
			start: time.Date(2024, 5, 2, 0, 0, 0, 0, time.UTC),
		},
		{
			name:  "start of logs, forward",
			start: time.Date(2024, 5, 1, 0, 0, 0, 0, time.UTC),
			end:   time.Date(2024, 5, 1, 0, 0, 0, 4, time.UTC),
			want: []string{
				`/"message":"0"/`,
				`/"message":"1"/`,
				`/"message":"2"/`,
				`/"message":"3"/`,
				`/"message":"4"/`,
			},
		},
		{
			name:  "start of logs, limited",
			start: time.Date(2024, 5, 1, 0, 0, 0, 0, time.UTC),
			limit: 5,
			want: []string{
				`/"message":"0"/`,
				`/"message":"1"/`,
				`/"message":"2"/`,
				`/"message":"3"/`,
				`/"message":"4"/`,
			},
		},
		{
			name:  "start of logs, backward",
			end:   time.Date(2024, 5, 1, 0, 0, 0, 0, time.UTC),
			start: time.Date(2024, 5, 1, 0, 0, 0, 4, time.UTC),
			want: []string{
				`/"message":"4"/`,
				`/"message":"3"/`,
				`/"message":"2"/`,
				`/"message":"1"/`,
				`/"message":"0"/`,
			},
		},
		{
			name:  "end of logs, backwards",
			end:   time.Date(2024, 5, 2, 0, 0, 0, 0, time.UTC),
			limit: 5,
			want: []string{
				`/"message":"999"/`,
				`/"message":"998"/`,
				`/"message":"997"/`,
				`/"message":"996"/`,
				`/"message":"995"/`,
			},
		},
	}

	ctx := pctx.TestContext(t)
	l, err := testloki.New(ctx, t.TempDir())
	if err != nil {
		t.Fatalf("testloki.New: %v", err)
	}
	t.Cleanup(func() {
		if err := l.Close(); err != nil {
			t.Fatalf("testloki.Close: %v", err)
		}
	})
	fh, err := os.Open("testdata/simple.txt")
	if err != nil {
		t.Fatalf("open testdata: %v", err)
	}
	defer fh.Close()
	if err := testloki.AddLogFile(ctx, fh, l); err != nil {
		t.Fatalf("add testdata: %v", err)
	}
	for _, test := range testData {
		t.Run(test.name, func(t *testing.T) {
			ctx := pctx.TestContext(t)
			if test.limit == 0 {
				test.limit = math.MaxInt
			}
			if x := test.batchSize; x > 0 {
				t.Log("overriding batch size")
				client.BatchSizeForTesting = x
				t.Cleanup(func() {
					t.Log("restoring batch size")
					client.BatchSizeForTesting = 0
				})
			}
			if x := test.maxRange; x > 0 {
				t.Log("overriding max range")
				client.MaxRangeForTesting = x
				t.Cleanup(func() {
					t.Log("restoring max range")
					client.MaxRangeForTesting = 0
				})
			}
			var got []string
			l.Client.BatchedQueryRange(ctx, `{app="simple"}`, test.start, test.end, test.offset, test.limit,
				func(ctx context.Context, labels client.LabelSet, e *client.Entry) (count bool, retErr error) {
					if pick := test.pick; pick != nil {
						if keep := pick(e); keep {
							got = append(got, e.Line)
							return true, nil
						}
						return false, nil
					}
					got = append(got, e.Line)
					return true, nil
				})
			require.NoDiff(t, test.want, got, []cmp.Option{cmputil.RegexpStrings()})
		})
	}
}
