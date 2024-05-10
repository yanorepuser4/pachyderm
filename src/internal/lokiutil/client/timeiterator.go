package client

import (
	"time"
)

func startOfTime() time.Time {
	// This saves searching 600 months from 1970-1-1, and people probably don't want logs from
	// before this anyway.  If they want them, they can specify an explicit start date.
	return time.Date(2020, 1, 1, 0, 0, 0, 0, time.UTC)
}

var testingEndOfTime time.Time

func endOfTime() time.Time {
	if !testingEndOfTime.IsZero() {
		return testingEndOfTime
	}
	return time.Now()
}

// TimeIterator iterates between the start time and end time by a step interval.  start and end are
// both inclusive, and can be zero.  Times are interpreted as:
//
// * (0, 0)     -> forwards from start of time to end of time
// * (0, x)     -> forwards from start of time to x
// * (x, x + d) -> forwards from x to x + d
// * (x, 0)     -> forwards from x to end of time
// * (x, x - d) -> backwards from x to x - d
// * (x, x)     -> exactly 1 nanosecond
type TimeIterator struct {
	Start, End time.Time     // Initial start and end times
	Step       time.Duration // Max duration of each step

	stepStart, stepEnd time.Time // calculated next interval, stepEnd is exclusive.
}

// forward returns true if the iterator is going forward through time.
func (ti *TimeIterator) forward() bool {
	switch {
	case ti.Start.IsZero() || ti.End.IsZero():
		return true
	case !ti.Start.After(ti.End): // !(x > y) == (x <= y)
		return true
	}
	return false
}

// moveForward moves one step forwards, returning true if the calculated interval is valid.
func (ti *TimeIterator) moveForward() bool {
	effectiveEnd := ti.End
	if effectiveEnd.IsZero() {
		effectiveEnd = endOfTime().Add(-time.Nanosecond)
	}

	// figure out the start
	if ti.stepStart.IsZero() {
		// this is the first iteration.
		if ti.Start.IsZero() {
			ti.stepStart = startOfTime()
		} else {
			ti.stepStart = ti.Start
		}
	} else {
		ti.stepStart = ti.stepEnd
	}

	// figure out the end
	ti.stepEnd = ti.stepStart.Add(ti.Step)
	if ti.stepEnd.After(effectiveEnd) {
		ti.stepEnd = effectiveEnd.Add(time.Nanosecond)
	}
	return !ti.stepStart.After(effectiveEnd) // stepStart == End is ok.
}

// moveBackward moves one step backwards, returning true if the calculated interval is valid.
func (ti *TimeIterator) moveBackward() bool {
	if ti.stepStart.IsZero() {
		// this is the first iteration
		ti.stepEnd = ti.Start.Add(time.Nanosecond)
	} else {
		ti.stepEnd = ti.stepStart
	}
	ti.stepStart = ti.stepEnd.Add(-ti.Step)
	if ti.stepStart.Before(ti.End) {
		ti.stepStart = ti.End
	}
	return ti.stepEnd.After(ti.End)
}

// Next advances the iterator, returning false if the iterator is complete.
func (ti *TimeIterator) Next() bool {
	if ti.Step == 0 {
		ti.Step = time.Nanosecond
	}
	if ti.forward() {
		return ti.moveForward()
	} else {
		return ti.moveBackward()
	}
}

// interval returns the current time interval to query.  It is aware of the quirk that our times are
// inclusive but Loki's end time is exclusive.
func (ti *TimeIterator) Interval() (start time.Time, end time.Time) {
	return ti.stepStart, ti.stepEnd
}
