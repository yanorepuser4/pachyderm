package pfsdb

import (
	"context"
	"database/sql"
	"fmt"
	"github.com/pachyderm/pachyderm/v2/src/internal/dbutil"
	"google.golang.org/protobuf/types/known/durationpb"
	"google.golang.org/protobuf/types/known/timestamppb"
	"strings"
	"time"

	"github.com/pachyderm/pachyderm/v2/src/internal/errors"
	"github.com/pachyderm/pachyderm/v2/src/internal/pachsql"
	"github.com/pachyderm/pachyderm/v2/src/internal/stream"
	"github.com/pachyderm/pachyderm/v2/src/pfs"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

const (
	// CommitsChannelName is used to watch events for the commits table.
	CommitsChannelName = "pfs_commits"

	getCommit = `
		SELECT 
    		commit.int_id, commit.commit_id, commit.repo_id, commit.branch_id_str, commit.origin, commit.description, commit.start_time, 
    		commit.finishing_time, commit.finished_time, commit.compacting_time, commit.validating_time,
    		commit.error, commit.size, repo.name AS repo_name, repo.type AS repo_type, project.name AS proj_name
		FROM pfs.commits commit
		JOIN pfs.repos repo ON commit.repo_id = repo.id
		JOIN core.projects project ON repo.project_id = project.id`
	getCommitWithAncestry = `
		SELECT 
    		commit.int_id, commit.commit_id, commit.repo_id, commit.branch_id_str, commit.origin, commit.description, commit.start_time, 
    		commit.finishing_time, commit.finished_time, commit.compacting_time, commit.validating_time,
    		commit.error, commit.size, repo.name AS repo_name, repo.type AS repo_type, project.name AS proj_name
		FROM pfs.commits commit
		JOIN pfs.repos repo ON commit.repo_id = repo.id
		JOIN core.projects project ON repo.project_id = project.id`
	getRelativeCommit = `
		SELECT
			commit.int_id, commit.commit_id, commit.repo_id, commit.branch_id_str,
			repo.name AS repo_name, repo.type AS repo_type, project.name AS proj_name
		FROM pfs.commits commit
		JOIN pfs.repos repo ON commit.repo_id = repo.id
		JOIN core.projects project ON repo.project_id = project.id
	`
	getParentCommit = getRelativeCommit + `
		JOIN pfs.commit_ancestry ancestry ON ancestry.from_id = commit.int_id`
	getChildCommit = getRelativeCommit + `
		JOIN pfs.commit_ancestry ancestry ON ancestry.to_id = commit.int_id`
)

// CommitID is the row id for a commit entry in postgres.
// A separate type is defined for safety so row ids must be explicitly cast for use in another table.
type CommitID uint64

// ErrCommitNotFound is returned by GetCommit() when a commit is not found in postgres.
type ErrCommitNotFound struct {
	Repo     string
	ID       CommitID
	CommitID string
}

// Error satisfies the error interface.
func (err ErrCommitNotFound) Error() string {
	if id := err.ID; id != 0 {
		return fmt.Sprintf("commit id=%d not found", id)
	}
	return fmt.Sprintf("commit %s/%s not found", err.Repo, err.CommitID)
}

func (err ErrCommitNotFound) GRPCStatus() *status.Status {
	return status.New(codes.NotFound, err.Error())
}

// ErrParentCommitNotFound is returned when a commit's parent is not found in postgres.
type ErrParentCommitNotFound struct {
	Repo          string
	ChildID       CommitID
	ChildCommitID string
}

func IsParentCommitNotFound(err error) bool {
	return dbutil.IsNotNullViolation(err, "from_id")
}

// Error satisfies the error interface.
func (err ErrParentCommitNotFound) Error() string {
	if id := err.ChildID; id != 0 {
		return fmt.Sprintf("parent commit of commit id=%d not found", id)
	}
	return fmt.Sprintf("parent commit of commit %s/%s not found", err.Repo, err.ChildCommitID)
}

func (err ErrParentCommitNotFound) GRPCStatus() *status.Status {
	return status.New(codes.NotFound, err.Error())
}

// ErrChildCommitNotFound is returned when a commit's child is not found in postgres.
type ErrChildCommitNotFound struct {
	Repo           string
	ParentID       CommitID
	ParentCommitID string
}

func IsChildCommitNotFound(err error) bool {
	return dbutil.IsNotNullViolation(err, "to_id")
}

// Error satisfies the error interface.
func (err ErrChildCommitNotFound) Error() string {
	if id := err.ParentID; id != 0 {
		return fmt.Sprintf("parent commit of commit id=%d not found", id)
	}
	return fmt.Sprintf("parent commit of commit %s/%s not found", err.Repo, err.ParentCommitID)
}

func (err ErrChildCommitNotFound) GRPCStatus() *status.Status {
	return status.New(codes.NotFound, err.Error())
}

func IsErrCommitNotFound(err error) bool {
	return errors.As(err, &ErrCommitNotFound{})
}

// ErrCommitMissingInfo is returned by CreateCommit() when a commitInfo is missing a field.
type ErrCommitMissingInfo struct {
	Field string
}

func (err ErrCommitMissingInfo) Error() string {
	return fmt.Sprintf("commitInfo.%s is missing/nil", err.Field)
}

func (err ErrCommitMissingInfo) GRPCStatus() *status.Status {
	return status.New(codes.FailedPrecondition, err.Error())
}

// ErrCommitAlreadyExists is returned by CreateCommit() when a commit with the same name already exists in postgres.
type ErrCommitAlreadyExists struct {
	Repo     string
	CommitID string
}

// Error satisfies the error interface.
func (err ErrCommitAlreadyExists) Error() string {
	if n, t := err.CommitID, err.Repo; n != "" && t != "" {
		return fmt.Sprintf("commit %s.%s already exists", n, t)
	}
	return "commit already exists"
}

func (err ErrCommitAlreadyExists) GRPCStatus() *status.Status {
	return status.New(codes.AlreadyExists, err.Error())
}

type commitRow struct {
	ID             CommitID      `db:"int_id"`
	CommitSetID    string        `db:"commit_set_id"`
	CommitID       string        `db:"commit_id"`
	RepoID         RepoID        `db:"repo_id"`
	BranchID       string        `db:"branch_id_str"`
	Origin         string        `db:"origin"`
	Description    string        `db:"description"`
	StartTime      time.Time     `db:"start_time"`
	FinishingTime  time.Time     `db:"finishing_time"`
	FinishedTime   time.Time     `db:"finished_time"`
	CompactingTime int64         `db:"compacting_time"`
	ValidatingTime int64         `db:"validating_time"`
	Error          string        `db:"error"`
	Size           int64         `db:"size"`
	RepoName       string        `db:"repo_name"`
	RepoType       string        `db:"repo_type"`
	ProjectName    string        `db:"proj_name"`
	ParentCommit   *pfs.Commit   `db:"parent_commit"`
	ChildCommits   []*pfs.Commit `db:"child_commits"`
}

type AncestryOpt struct {
	SkipChildren bool
	SkipParent   bool
}

// CreateCommit creates an entry in the pfs.commits table.
func CreateCommit(ctx context.Context, tx *pachsql.Tx, commitInfo *pfs.CommitInfo, opts ...AncestryOpt) error {
	if commitInfo.Commit == nil {
		return ErrCommitMissingInfo{Field: "Commit"}
	}
	if commitInfo.Commit.Repo == nil {
		return ErrCommitMissingInfo{Field: "Repo"}
	}
	if commitInfo.Origin == nil {
		return ErrCommitMissingInfo{Field: "Origin"}
	}
	if commitInfo.Details == nil { // stub in an empty details struct to avoid panics.
		commitInfo.Details = &pfs.CommitInfo_Details{}
	}
	opt := AncestryOpt{}
	if len(opts) > 0 {
		opt = opts[0]
	}
	switch commitInfo.Origin.Kind {
	case pfs.OriginKind_ORIGIN_KIND_UNKNOWN, pfs.OriginKind_USER, pfs.OriginKind_AUTO, pfs.OriginKind_FSCK:
		break
	default:
		return errors.New(fmt.Sprintf("invalid origin: %v", commitInfo.Origin.Kind))
	}
	insert := commitRow{
		CommitID:       CommitKey(commitInfo.Commit), //this might have to be pfsdb.CommitKey(commit)
		CommitSetID:    commitInfo.Commit.Id,
		RepoName:       commitInfo.Commit.Repo.Name,
		RepoType:       commitInfo.Commit.Repo.Type,
		ProjectName:    commitInfo.Commit.Repo.Project.Name,
		BranchID:       commitInfo.Commit.Branch.Name,
		Origin:         commitInfo.Origin.Kind.String(),
		StartTime:      sanitizeTimestamppb(commitInfo.Started),
		FinishingTime:  sanitizeTimestamppb(commitInfo.Finishing),
		FinishedTime:   sanitizeTimestamppb(commitInfo.Finished),
		Description:    commitInfo.Description,
		CompactingTime: durationpbToBigInt(commitInfo.Details.CompactingTime),
		ValidatingTime: durationpbToBigInt(commitInfo.Details.ValidatingTime),
		Size:           commitInfo.Details.SizeBytes,
		Error:          commitInfo.Error,
		ChildCommits:   commitInfo.ChildCommits,
		ParentCommit:   commitInfo.ParentCommit,
	}
	query := `
		INSERT INTO pfs.commits 
    	(commit_id, commit_set_id, repo_id, branch_id_str, description, origin, start_time, finishing_time, finished_time, compacting_time, 
    	 validating_time, size, error) 
		VALUES (:commit_id, :commit_set_id, (SELECT id from pfs.repos WHERE name=:repo_name AND type=:repo_type AND project_id=(SELECT id from core.projects WHERE name=:proj_name)), 
		       :branch_id_str, :description, :origin, :start_time, :finishing_time, :finished_time, :compacting_time, :validating_time, :size, :error)
		RETURNING int_id;
	`
	namedStmt, err := tx.PrepareNamedContext(ctx, query)
	if err != nil {
		return errors.Wrap(err, "prepare create commitInfo")
	}
	row := namedStmt.QueryRowxContext(ctx, insert)
	if row.Err() != nil {
		if IsDuplicateKeyErr(row.Err()) { // a duplicate key implies that an entry for the repo already exists.
			return ErrCommitAlreadyExists{CommitID: commitInfo.Commit.Id, Repo: RepoKey(commitInfo.Commit.Repo)}
		}
		return errors.Wrap(row.Err(), "exec create commitInfo")
	}
	lastInsertId := 0
	if err := row.Scan(&lastInsertId); err != nil {
		return errors.Wrap(err, "scanning id from create commitInfo")
	}
	if commitInfo.ParentCommit != nil && !opt.SkipParent {
		if err := PutCommitParent(ctx, tx, commitInfo.ParentCommit, CommitID(lastInsertId)); err != nil {
			return errors.Wrap(err, "linking parent")
		}
	}
	if len(commitInfo.ChildCommits) != 0 && !opt.SkipChildren {
		if err := PutCommitChildren(ctx, tx, CommitID(lastInsertId), commitInfo.ChildCommits); err != nil {
			return errors.Wrap(err, "linking children")
		}
	}
	return nil
}

// PutCommitParent inserts a single ancestry relationship where the child is known and parent must be derived.
func PutCommitParent(ctx context.Context, tx *pachsql.Tx, parentCommit *pfs.Commit, childCommit CommitID) error {
	ancestryQuery := `
		INSERT INTO pfs.commit_ancestry
		(from_id, to_id)
		VALUES ((SELECT int_id FROM pfs.commits WHERE commit_id=$1), $2)
		ON CONFLICT DO NOTHING;
	`
	_, err := tx.ExecContext(ctx, ancestryQuery, CommitKey(parentCommit), childCommit)
	if err != nil {
		if IsParentCommitNotFound(err) {
			return ErrParentCommitNotFound{ChildID: childCommit}
		}
		return errors.Wrap(err, "putting commit parent")
	}
	return nil
}

// PutCommitChild inserts a single ancestry relationship where the parent is known and child must be derived.
func PutCommitChild(ctx context.Context, tx *pachsql.Tx, parentCommit CommitID, childCommit *pfs.Commit) error {
	ancestryQuery := `
		INSERT INTO pfs.commit_ancestry
		(from_id, to_id)
		VALUES ($1, (SELECT int_id FROM pfs.commits WHERE commit_id=$2))
		ON CONFLICT DO NOTHING;
	`
	_, err := tx.ExecContext(ctx, ancestryQuery, parentCommit, CommitKey(childCommit))
	if err != nil {
		if IsChildCommitNotFound(err) {
			return ErrChildCommitNotFound{ParentID: parentCommit}
		}
		return errors.Wrap(err, "putting commit child")
	}
	return nil
}

// PutCommitAncestry inserts a single ancestry relationship where the ids of both parent and child are known.
func PutCommitAncestry(ctx context.Context, tx *pachsql.Tx, parentCommit, childCommit CommitID) error {
	ancestryQuery := `
		INSERT INTO pfs.commit_ancestry
		(from_id, to_id)
		VALUES ($1, $2)
		ON CONFLICT DO NOTHING;
	`
	_, err := tx.ExecContext(ctx, ancestryQuery, parentCommit, childCommit)
	if err != nil {
		if IsChildCommitNotFound(err) {
			return ErrChildCommitNotFound{ParentID: parentCommit}
		} else if IsParentCommitNotFound(err) {
			return ErrParentCommitNotFound{ChildID: childCommit}
		}
		return errors.Wrap(err, "putting commit")
	}
	return nil
}

// PutCommitAncestryByCommitKeys inserts a single ancestry relationship where the ids of both parent and child need to be derived.
func PutCommitAncestryByCommitKeys(ctx context.Context, tx *pachsql.Tx, parentCommit, childCommit *pfs.Commit) error {
	ancestryQuery := `
		INSERT INTO pfs.commit_ancestry
		(from_id, to_id)
		VALUES ((SELECT int_id FROM pfs.commits WHERE commit_id=$1), 
		        (SELECT int_id FROM pfs.commits WHERE commit_id=$2))
		ON CONFLICT DO NOTHING;
	`
	_, err := tx.ExecContext(ctx, ancestryQuery, CommitKey(parentCommit), CommitKey(childCommit))
	if err != nil {
		if IsChildCommitNotFound(err) {
			return ErrChildCommitNotFound{ParentCommitID: parentCommit.Id, Repo: RepoKey(parentCommit.Repo)}
		}
		if IsParentCommitNotFound(err) {
			return ErrParentCommitNotFound{ChildCommitID: childCommit.Id, Repo: RepoKey(childCommit.Repo)}
		}
		return errors.Wrap(err, "putting commit")
	}
	return nil
}

// PutCommitChildren builds a single query to insert all children.
func PutCommitChildren(ctx context.Context, tx *pachsql.Tx, parentCommit CommitID, childCommits []*pfs.Commit) error {
	ancestryQueryTemplate := `
		INSERT INTO pfs.commit_ancestry
		(from_id, to_id)
		VALUES %s
		ON CONFLICT DO NOTHING;
	`
	childValuesTemplate := `($1, (SELECT int_id FROM pfs.commits WHERE commit_id=$%d))`
	params := []any{parentCommit}
	queryVarNum := 2
	values := make([]string, 0)
	for _, child := range childCommits {
		values = append(values, fmt.Sprintf(childValuesTemplate, queryVarNum))
		params = append(params, CommitKey(child))
		queryVarNum++
	}
	_, err := tx.ExecContext(ctx, fmt.Sprintf(ancestryQueryTemplate, strings.Join(values, ",")),
		params...)
	if err != nil {
		if IsChildCommitNotFound(err) {
			return ErrChildCommitNotFound{ParentID: parentCommit}
		}
		return errors.Wrap(err, "putting commit children")
	}
	return nil
}

// DeleteCommit deletes an entry in the pfs.commits table. It also deletes references in the commit_ancestry table.
func DeleteCommit(ctx context.Context, tx *pachsql.Tx, commit *pfs.Commit) error {
	if commit == nil {
		return ErrCommitMissingInfo{Field: "Commit"}
	}
	id := CommitKey(commit)
	result, err := tx.ExecContext(ctx, "DELETE FROM pfs.commits WHERE commit_id=$1;", id)
	if err != nil {
		return errors.Wrap(err, "delete commit")
	}
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return errors.Wrap(err, "could not get affected rows")
	}
	if rowsAffected == 0 {
		return ErrCommitNotFound{CommitID: id}
	}
	return nil
}

func GetCommitID(ctx context.Context, tx *pachsql.Tx, commit *pfs.Commit) (CommitID, error) {
	row, err := getCommitRowByCommitKey(ctx, tx, commit)
	if err != nil {
		return 0, errors.Wrap(err, "get commit by commit key")
	}
	return row.ID, nil
}

func GetCommit(ctx context.Context, tx *pachsql.Tx, id CommitID) (*pfs.CommitInfo, error) {
	if id == 0 {
		return nil, errors.New("invalid id: 0")
	}
	row := &commitRow{}
	err := tx.QueryRowxContext(ctx, fmt.Sprintf("%s WHERE int_id=$1", getCommit), id).StructScan(row)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrCommitNotFound{ID: id}
		}
		return nil, errors.Wrap(err, "scanning commit row")
	}
	commitInfo, err := getCommitInfoFromCommitRow(ctx, tx, row)
	if err != nil {
		return nil, errors.Wrap(err, "get commit info from row")
	}
	return commitInfo, err
}

func GetCommitByCommitKey(ctx context.Context, tx *pachsql.Tx, commit *pfs.Commit) (*pfs.CommitInfo, error) {
	row, err := getCommitRowByCommitKey(ctx, tx, commit)
	if err != nil {
		return nil, errors.Wrap(err, "get commit by commit key")
	}
	commitInfo, err := getCommitInfoFromCommitRow(ctx, tx, row)
	if err != nil {
		return nil, errors.Wrap(err, "get commit info from row")
	}
	return commitInfo, err
}

func getCommitInfoFromCommitRow(ctx context.Context, tx *pachsql.Tx, row *commitRow) (*pfs.CommitInfo, error) {
	commitInfo, err := getCommitFromCommitRow(row)
	if err != nil {
		return nil, errors.Wrap(err, "get commit from row")
	}
	commitInfo.ParentCommit, commitInfo.ChildCommits, err = getCommitRelatives(ctx, tx, row.ID)
	if err != nil {
		return nil, errors.Wrap(err, "get commit relatives")
	}
	return commitInfo, err
}

func getCommitRelatives(ctx context.Context, tx *pachsql.Tx, commitID CommitID) (*pfs.Commit, []*pfs.Commit, error) {
	parentCommit, err := GetCommitParent(ctx, tx, commitID)
	if err != nil && !errors.Is(ErrParentCommitNotFound{ChildID: commitID}, errors.Cause(err)) {
		return nil, nil, errors.Wrap(err, "getting parent commit")
		// if parent is missing, assume commit is root of a repo.
	}
	childCommits, err := GetCommitChildren(ctx, tx, commitID)
	if err != nil && !errors.Is(ErrChildCommitNotFound{ParentID: commitID}, errors.Cause(err)) {
		return nil, nil, errors.Wrap(err, "getting children commits")
		// if children is missing, assume commit is HEAD of some branch.
	}
	return parentCommit, childCommits, nil
}

func GetCommitParent(ctx context.Context, tx *pachsql.Tx, childCommit CommitID) (*pfs.Commit, error) {
	row := &commitRow{}
	err := tx.QueryRowxContext(ctx, fmt.Sprintf("%s WHERE ancestry.to_id=$1", getParentCommit), childCommit).StructScan(row)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrParentCommitNotFound{ChildID: childCommit}
		}
		return nil, errors.Wrap(err, "scanning commit row for parent")
	}
	parentCommitInfo, err := getCommitFromCommitRow(row)
	if err != nil {
		return nil, errors.Wrap(err, "get parent commit from row")
	}
	return parentCommitInfo.Commit, nil
}

func GetCommitChildren(ctx context.Context, tx *pachsql.Tx, parentCommit CommitID) ([]*pfs.Commit, error) {
	children := make([]*pfs.Commit, 0)
	rows, err := tx.QueryxContext(ctx, fmt.Sprintf("%s WHERE ancestry.from_id=$1", getChildCommit), parentCommit)
	if err != nil && err == sql.ErrNoRows {
		return nil, ErrChildCommitNotFound{ParentID: parentCommit}
	}
	for rows.Next() {
		row := &commitRow{}
		if err := rows.StructScan(row); err != nil {
			return nil, errors.Wrap(err, "scanning commit row for child")
		}
		childCommitInfo, err := getCommitFromCommitRow(row)
		if err != nil {
			return nil, errors.Wrap(err, "getting child commit from row")
		}
		children = append(children, childCommitInfo.Commit)
	}
	return children, err
}

func getCommitRowByCommitKey(ctx context.Context, tx *pachsql.Tx, commit *pfs.Commit) (*commitRow, error) {
	row := &commitRow{}
	if commit == nil {
		return nil, ErrCommitMissingInfo{Field: "Commit"}
	}
	id := CommitKey(commit)
	err := tx.QueryRowxContext(ctx, fmt.Sprintf("%s WHERE commit_id=$1", getCommit), id).StructScan(row)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrCommitNotFound{CommitID: id}
		}
		return nil, errors.Wrap(err, "scanning commit row")
	}
	return row, nil
}

func getCommitFromCommitRow(row *commitRow) (*pfs.CommitInfo, error) {
	repo := &pfs.Repo{
		Name: row.RepoName,
		Type: row.RepoType,
		Project: &pfs.Project{
			Name: row.ProjectName,
		},
	}
	parsedId := strings.Split(row.CommitID, "@")
	if len(parsedId) != 2 {
		return nil, fmt.Errorf("got invalid commit id from postgres: %s", row.CommitID)
	}
	commitInfo := &pfs.CommitInfo{
		Commit: &pfs.Commit{
			Repo: repo,
			Id:   parsedId[1],
			Branch: &pfs.Branch{
				Repo: repo,
				Name: row.BranchID,
			},
		},
		Origin:      &pfs.CommitOrigin{Kind: pfs.OriginKind(pfs.OriginKind_value[strings.ToUpper(row.Origin)])},
		Started:     timeToTimestamppb(row.StartTime),
		Finishing:   timeToTimestamppb(row.FinishingTime),
		Finished:    timeToTimestamppb(row.FinishedTime),
		Description: row.Description,
		Details: &pfs.CommitInfo_Details{
			CompactingTime: bigIntToDurationpb(row.CompactingTime),
			ValidatingTime: bigIntToDurationpb(row.ValidatingTime),
			SizeBytes:      row.Size,
		},
	}
	return commitInfo, nil
}

// UpsertCommit will attempt to insert a commit. If the commit already exists, it will update its description.
func UpsertCommit(ctx context.Context, tx *pachsql.Tx, commit *pfs.CommitInfo) error {
	return nil
}

// UpdateCommit overwrites an existing commit entry by CommitID.
func UpdateCommit(ctx context.Context, tx *pachsql.Tx, id CommitID, commit *pfs.CommitInfo) error {
	return nil
}

// CommitPair is an (id, commitInfo) tuple returned by the commit iterator.
type CommitPair struct {
	ID         CommitID
	CommitInfo *pfs.CommitInfo
}

// these dropped global variable instantiations forces the compiler to check whether CommitIterator and CommitIteratorTx implements stream.Iterator.
var _ stream.Iterator[CommitPair] = &CommitIterator{}
var _ stream.Iterator[CommitPair] = &CommitIteratorTx{}

// CommitIterator batches a page of commitRow entries. (id, entry) tuples can be retrieved using iter.Next().
type CommitIterator struct {
	*commitIterator
	db *pachsql.DB
}

// CommitIteratorTx is like CommitIterator but retrieves all pages within a single transaction.
type CommitIteratorTx struct {
	*commitIterator
	tx *pachsql.Tx
}

type commitIterator struct {
	limit   int
	offset  int
	commits []commitRow
	index   int
	filter  CommitListFilter
}

// Next advances the iterator by one row. It returns a stream.EOS when there are no more entries.
func (iter *CommitIterator) Next(ctx context.Context, dst *CommitPair) error {
	return errors.Wrap(dbutil.WithTx(ctx, iter.db, func(ctx context.Context, tx *pachsql.Tx) error {
		return iter.next(ctx, tx, dst)
	}, dbutil.WithReadOnly()), "next commit")
}

func (iter *CommitIteratorTx) Next(ctx context.Context, dst *CommitPair) error {
	return errors.Wrap(iter.next(ctx, iter.tx, dst), "next commit in transaction")
}

func (iter *commitIterator) next(ctx context.Context, tx *pachsql.Tx, dst *CommitPair) error {
	if dst == nil {
		return errors.Wrap(fmt.Errorf("commit is nil"), "get next commit")
	}
	var err error
	if iter.index >= len(iter.commits) {
		iter.index = 0
		iter.offset += iter.limit
		iter.commits, err = listCommitPage(ctx, tx, iter.limit, iter.offset, iter.filter)
		if err != nil {
			return errors.Wrap(err, "list commit page")
		}
		if len(iter.commits) == 0 {
			return stream.EOS()
		}
	}
	row := iter.commits[iter.index]
	commit, err := getCommitInfoFromCommitRow(ctx, tx, &row)
	if err != nil {
		return errors.Wrap(err, "getting commitInfo from commit row")
	}

	*dst = CommitPair{
		CommitInfo: commit,
		ID:         row.ID,
	}
	iter.index++
	return nil
}

// CommitFields is used in the ListCommitFilter and defines specific field names for type safety.
// This should hopefully prevent a library user from misconfiguring the filter.
type CommitFields string

var (
	CommitSetIDs   = CommitFields("commit_set_id")
	CommitOrigins  = CommitFields("origin")
	CommitRepos    = CommitFields("repo_id")
	CommitBranches = CommitFields("branch_id_str")
	CommitProjects = CommitFields("project_id")
	CommitParents  = CommitFields("from_id")
	CommitChildren = CommitFields("to_id")
)

// CommitListFilter is a filter for listing commits. It ANDs together separate keys, but ORs together the key values:
// where commit.<key_1> IN (<key_1:value_1>, <key_2:value_2>, ...) AND commit.<key_2> IN (<key_2:value_1>,<key_2:value_2>,...)
type CommitListFilter map[CommitFields][]string

// ListCommit returns a CommitIterator that exposes a Next() function for retrieving *pfs.CommitInfo references.
func ListCommit(ctx context.Context, db *pachsql.DB, filter CommitListFilter) (*CommitIterator, error) {
	var iter *commitIterator
	var err error
	if err := dbutil.WithTx(ctx, db, func(cbCtx context.Context, tx *pachsql.Tx) error {
		iter, err = newIterator(ctx, tx, filter)
		return err
	}, dbutil.WithReadOnly()); err != nil {
		return nil, errors.Wrap(err, "list commits")
	}
	return &CommitIterator{iter, db}, nil
}

// ListCommitTx returns a CommitIterator that exposes a Next() function for retrieving *pfs.CommitInfo references.
func ListCommitTx(ctx context.Context, tx *pachsql.Tx, filter CommitListFilter) (*CommitIteratorTx, error) {
	iter, err := newIterator(ctx, tx, filter)
	if err != nil {
		return nil, errors.Wrap(err, "list commits in transaction")
	}
	return &CommitIteratorTx{iter, tx}, nil
}

func newIterator(ctx context.Context, tx *pachsql.Tx, filter CommitListFilter) (*commitIterator, error) {
	limit := 100
	page, err := listCommitPage(ctx, tx, limit, 0, filter)
	if err != nil {
		return nil, errors.Wrap(err, "new commits iterator")
	}
	iter := &commitIterator{
		commits: page,
		limit:   limit,
		filter:  filter,
	}
	return iter, nil
}

func listCommitPage(ctx context.Context, tx *pachsql.Tx, limit, offset int, filter CommitListFilter) ([]commitRow, error) {
	var page []commitRow
	where := ""
	conditions := make([]string, 0)
	query := getCommit
	for key, vals := range filter {
		if len(vals) == 0 {
			continue
		}
		quotedVals := make([]string, 0)
		for _, val := range vals {
			quotedVals = append(quotedVals, fmt.Sprintf("'%s'", val))
		}
		switch key {
		case CommitRepos:
			conditions = append(conditions, fmt.Sprintf("commit.%s IN (SELECT id FROM pfs.repos WHERE name IN (%s))", string(key), strings.Join(quotedVals, ",")))
		case CommitProjects:
			conditions = append(conditions, fmt.Sprintf("repo.%s IN (SELECT id FROM core.projects WHERE name IN (%s))", string(key), strings.Join(quotedVals, ",")))
		case CommitParents:
			query += fmt.Sprintf("JOIN pfs.commit_ancestry parent ON parent.%s = commit.int_id", string(key))
			conditions = append(conditions, fmt.Sprintf("parent.%s IN (%s)", string(key), strings.Join(quotedVals, ",")))
		case CommitChildren:
			query += fmt.Sprintf("JOIN pfs.commit_ancestry child ON child.%s = commit.int_id", string(key))
			conditions = append(conditions, fmt.Sprintf("child.%s IN (%s)", string(key), strings.Join(quotedVals, ",")))
		default:
			conditions = append(conditions, fmt.Sprintf("commit.%s IN (%s)", string(key), strings.Join(quotedVals, ",")))
		}
	}
	if len(conditions) > 0 {
		where = "WHERE " + strings.Join(conditions, " AND ")
	}
	if err := tx.SelectContext(ctx, &page, fmt.Sprintf("%s %s GROUP BY commit.int_id, repo.name, repo.type, project.name ORDER BY commit.int_id ASC LIMIT $1 OFFSET $2;",
		query, where), limit, offset); err != nil {
		return nil, errors.Wrap(err, "could not get commit page")
	}
	return page, nil
}

func sanitizeTimestamppb(timestamp *timestamppb.Timestamp) time.Time {
	if timestamp != nil {
		return timestamp.AsTime()
	}
	return time.Time{}
}

func durationpbToBigInt(duration *durationpb.Duration) int64 {
	if duration != nil {
		return duration.Seconds
	}
	return 0
}

func timeToTimestamppb(t time.Time) *timestamppb.Timestamp {
	if t.IsZero() {
		return nil
	}
	return timestamppb.New(t)
}

func bigIntToDurationpb(s int64) *durationpb.Duration {
	if s == 0 {
		return nil
	}
	return durationpb.New(time.Duration(s))
}