package index

import "time"

// Option configures an index reader.
type Option func(r *Reader)

// PathRange is a range of paths.
// The range is inclusive: [Lower, Upper].
type PathRange struct {
	Lower, Upper string
}

// WithRange sets a range filter for the read.
func WithRange(pathRange *PathRange) Option {
	return func(r *Reader) {
		r.filter = &pathFilter{pathRange: pathRange}
	}
}

// WithPrefix sets a prefix filter for the read.
func WithPrefix(prefix string) Option {
	return func(r *Reader) {
		r.filter = &pathFilter{prefix: prefix}
	}
}

// WithExact adds a path filter that matches a single path
func WithExact(key string) Option {
	return WithRange(&PathRange{Upper: key, Lower: key})
}

// WriterOption configures a writer
type WriterOption func(w *Writer)

// WithRootTTL sets the time to live for the root index, and transitively
// the whole fileset.
func WithRootTTL(ttl time.Duration) WriterOption {
	return func(w *Writer) {
		w.rootTTL = ttl
	}
}
