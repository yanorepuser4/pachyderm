package pfsdb_test

import (
	"context"
	"github.com/pachyderm/pachyderm/v2/src/internal/clusterstate"
	"github.com/pachyderm/pachyderm/v2/src/internal/collection"
	"github.com/pachyderm/pachyderm/v2/src/internal/dbutil"
	"github.com/pachyderm/pachyderm/v2/src/internal/dockertestenv"
	"github.com/pachyderm/pachyderm/v2/src/internal/errors"
	"github.com/pachyderm/pachyderm/v2/src/internal/migrations"
	"github.com/pachyderm/pachyderm/v2/src/internal/pachsql"
	"github.com/pachyderm/pachyderm/v2/src/internal/pctx"
	"github.com/pachyderm/pachyderm/v2/src/internal/pfsdb"
	"github.com/pachyderm/pachyderm/v2/src/internal/require"
	"github.com/pachyderm/pachyderm/v2/src/internal/stream"
	"github.com/pachyderm/pachyderm/v2/src/internal/testetcd"
	"github.com/pachyderm/pachyderm/v2/src/internal/testutil/random"
	"github.com/pachyderm/pachyderm/v2/src/pfs"
	"google.golang.org/protobuf/types/known/timestamppb"
	"testing"
	"time"
)

func TestCreateCommitWithParent(t *testing.T) {
	testCommitDataModelAPI(t, func(ctx context.Context, t *testing.T, db *pachsql.DB, branchesCol collection.PostgresCollection) {
		require.NoError(t, dbutil.WithTx(ctx, db, func(ctx context.Context, tx *pachsql.Tx) error {
			commitInfo := testCommit(ctx, t, branchesCol, tx, testRepoName)
			parentInfo := testCommit(ctx, t, branchesCol, tx, testRepoName)
			commitInfo.ParentCommit = parentInfo.Commit
			require.NoError(t, pfsdb.CreateCommit(ctx, tx, parentInfo), "should be able to create parent commit")
			require.NoError(t, pfsdb.CreateCommit(ctx, tx, commitInfo), "should be able to create parent commit")
			getInfo, err := pfsdb.GetCommitByCommitKey(ctx, tx, commitInfo.Commit)
			require.NoError(t, err, "should be able to get child commit")
			require.Equal(t, getInfo.ParentCommit.Id, parentInfo.Commit.Id)
			return nil
		}))
	})
}

func TestCreateCommitWithMissingParent(t *testing.T) {
	testCommitDataModelAPI(t, func(ctx context.Context, t *testing.T, db *pachsql.DB, branchesCol collection.PostgresCollection) {
		require.YesError(t, dbutil.WithTx(ctx, db, func(ctx context.Context, tx *pachsql.Tx) error {
			commitInfo := testCommit(ctx, t, branchesCol, tx, testRepoName)
			parentInfo := testCommit(ctx, t, branchesCol, tx, testRepoName)
			commitInfo.ParentCommit = parentInfo.Commit
			err := pfsdb.CreateCommit(ctx, tx, commitInfo)
			require.YesError(t, err, "create commit should fail when creating parent")
			require.True(t, errors.Is(pfsdb.ErrParentCommitNotFound{ChildID: 1}, errors.Cause(err)))
			return nil
		}))
		require.NoError(t, dbutil.WithTx(ctx, db, func(ctx context.Context, tx *pachsql.Tx) error {
			commitInfo := testCommit(ctx, t, branchesCol, tx, testRepoName)
			parentInfo := testCommit(ctx, t, branchesCol, tx, testRepoName)
			commitInfo.ParentCommit = parentInfo.Commit
			err := pfsdb.CreateCommit(ctx, tx, commitInfo, pfsdb.AncestryOpt{SkipParent: true})
			require.NoError(t, err, "should be able to create commit before creating parent")
			return nil
		}))
	})
}

func TestCreateCommitWithMissingChild(t *testing.T) {
	testCommitDataModelAPI(t, func(ctx context.Context, t *testing.T, db *pachsql.DB, branchesCol collection.PostgresCollection) {
		require.YesError(t, dbutil.WithTx(ctx, db, func(ctx context.Context, tx *pachsql.Tx) error {
			parentInfo := testCommit(ctx, t, branchesCol, tx, testRepoName)
			commitInfo := testCommit(ctx, t, branchesCol, tx, testRepoName)
			parentInfo.ChildCommits = append(parentInfo.ChildCommits, commitInfo.Commit)
			err := pfsdb.CreateCommit(ctx, tx, parentInfo)
			require.YesError(t, err, "create commit should fail when creating children")
			require.True(t, errors.Is(pfsdb.ErrChildCommitNotFound{ParentID: 1}, errors.Cause(err)))
			return nil
		}))
		require.NoError(t, dbutil.WithTx(ctx, db, func(ctx context.Context, tx *pachsql.Tx) error {
			parentInfo := testCommit(ctx, t, branchesCol, tx, testRepoName)
			commitInfo := testCommit(ctx, t, branchesCol, tx, testRepoName)
			parentInfo.ChildCommits = append(parentInfo.ChildCommits, commitInfo.Commit)
			err := pfsdb.CreateCommit(ctx, tx, parentInfo, pfsdb.AncestryOpt{SkipChildren: true})
			require.NoError(t, err, "should be able to create commit before creating parent")
			return nil
		}))
	})
}

func TestCreateCommitWithRelatives(t *testing.T) {
	testCommitDataModelAPI(t, func(ctx context.Context, t *testing.T, db *pachsql.DB, branchesCol collection.PostgresCollection) {
		require.NoError(t, dbutil.WithTx(ctx, db, func(ctx context.Context, tx *pachsql.Tx) error {
			commitInfo := testCommit(ctx, t, branchesCol, tx, testRepoName)
			parentInfo := testCommit(ctx, t, branchesCol, tx, testRepoName)
			childInfo := testCommit(ctx, t, branchesCol, tx, testRepoName)
			childInfo2 := testCommit(ctx, t, branchesCol, tx, testRepoName)
			commitInfo.ParentCommit = parentInfo.Commit
			commitInfo.ChildCommits = append(commitInfo.ChildCommits, childInfo.Commit, childInfo2.Commit)
			require.NoError(t, pfsdb.CreateCommit(ctx, tx, parentInfo), "should be able to create parent commit")
			require.NoError(t, pfsdb.CreateCommit(ctx, tx, childInfo), "should be able to create child commit")
			require.NoError(t, pfsdb.CreateCommit(ctx, tx, childInfo2), "should be able to create child commit 2")
			require.NoError(t, pfsdb.CreateCommit(ctx, tx, commitInfo), "should be able to create commit")
			getInfo, err := pfsdb.GetCommitByCommitKey(ctx, tx, commitInfo.Commit)
			require.NoError(t, err, "should be able to get child commit")
			require.Equal(t, getInfo.ParentCommit.Id, parentInfo.Commit.Id)
			require.Equal(t, getInfo.ChildCommits[0].Id, childInfo.Commit.Id)
			require.Equal(t, getInfo.ChildCommits[1].Id, childInfo2.Commit.Id)
			return nil
		}))
	})
}

func TestCreateCommit(t *testing.T) {
	testCommitDataModelAPI(t, func(ctx context.Context, t *testing.T, db *pachsql.DB, branchesCol collection.PostgresCollection) {
		require.NoError(t, dbutil.WithTx(ctx, db, func(ctx context.Context, tx *pachsql.Tx) error {
			commitInfo := testCommit(ctx, t, branchesCol, tx, testRepoName)
			require.NoError(t, pfsdb.CreateCommit(ctx, tx, commitInfo), "should be able to create commit")
			getInfo, err := pfsdb.GetCommit(ctx, tx, 1)
			require.NoError(t, err)
			commitsMatch(t, commitInfo, getInfo)
			commitInfo = testCommit(ctx, t, branchesCol, tx, testRepoName)
			commitInfo.Commit.Repo = nil
			err = pfsdb.CreateCommit(ctx, tx, commitInfo)
			require.YesError(t, err, "should not be able to create commit when repo is nil")
			require.True(t, errors.Is(pfsdb.ErrCommitMissingInfo{Field: "Repo"}, err))
			commitInfo = testCommit(ctx, t, branchesCol, tx, testRepoName)
			commitInfo.Origin = nil
			err = pfsdb.CreateCommit(ctx, tx, commitInfo)
			require.YesError(t, err, "should not be able to create commit when origin is nil")
			require.True(t, errors.Is(pfsdb.ErrCommitMissingInfo{Field: "Origin"}, err))
			commitInfo = testCommit(ctx, t, branchesCol, tx, testRepoName)
			commitInfo.Commit = nil
			err = pfsdb.CreateCommit(ctx, tx, commitInfo)
			require.YesError(t, err, "should not be able to create commit when commit is nil")
			require.True(t, errors.Is(pfsdb.ErrCommitMissingInfo{Field: "Commit"}, err))
			return nil
		}), "transaction should succeed because test is failing before calling db")
		require.YesError(t, dbutil.WithTx(ctx, db, func(ctx context.Context, tx *pachsql.Tx) error {
			commitInfo := testCommit(ctx, t, branchesCol, tx, testRepoName)
			err := pfsdb.CreateCommit(ctx, tx, commitInfo)
			require.NoError(t, err, "should be able to create a commit")
			err = pfsdb.CreateCommit(ctx, tx, commitInfo)
			require.YesError(t, err, "should not be able to create commit again with same commit set ID")
			require.True(t, errors.Is(pfsdb.ErrCommitAlreadyExists{CommitID: commitInfo.Commit.Id, Repo: pfsdb.RepoKey(commitInfo.Commit.Repo)}, err))
			return nil
		}), "double create should fail and result in rollback")
	})
}

func TestGetCommit(t *testing.T) {
	testCommitDataModelAPI(t, func(ctx context.Context, t *testing.T, db *pachsql.DB, branchesCol collection.PostgresCollection) {
		require.NoError(t, dbutil.WithTx(ctx, db, func(ctx context.Context, tx *pachsql.Tx) error {
			commitInfo := testCommit(ctx, t, branchesCol, tx, testRepoName)
			require.NoError(t, pfsdb.CreateCommit(ctx, tx, commitInfo), "should be able to create commit")
			getInfo, err := pfsdb.GetCommit(ctx, tx, 1)
			require.NoError(t, err, "should be able to get commit with id=1")
			commitsMatch(t, commitInfo, getInfo)
			getInfo, err = pfsdb.GetCommit(ctx, tx, 0)
			require.YesError(t, err, "should not be able to get commit with id=0")
			_, err = pfsdb.GetCommit(ctx, tx, 3)
			require.YesError(t, err, "should not be able to get non-existent commit")
			require.True(t, errors.Is(pfsdb.ErrCommitNotFound{ID: 3}, err))
			getInfo, err = pfsdb.GetCommitByCommitKey(ctx, tx, commitInfo.Commit)
			require.NoError(t, err, "should be able to get a commit by key")
			commitsMatch(t, commitInfo, getInfo)
			commitInfo.Commit = nil
			_, err = pfsdb.GetCommitByCommitKey(ctx, tx, commitInfo.Commit)
			require.YesError(t, err, "should not be able to get commit when commit is nil.")
			require.True(t, errors.Is(pfsdb.ErrCommitMissingInfo{Field: "Commit"}, errors.Cause(err)))
			// todo(fahad): attempt to create a parent and child, then verify that the relationship is correct via get.
			return nil
		}))
	})
}

func TestDeleteCommit(t *testing.T) {
	testCommitDataModelAPI(t, func(ctx context.Context, t *testing.T, db *pachsql.DB, branchesCol collection.PostgresCollection) {
		require.NoError(t, dbutil.WithTx(ctx, db, func(ctx context.Context, tx *pachsql.Tx) error {
			commitInfo := testCommit(ctx, t, branchesCol, tx, testRepoName)
			require.NoError(t, pfsdb.CreateCommit(ctx, tx, commitInfo), "should be able to create commit")
			err := pfsdb.DeleteCommit(ctx, tx, commitInfo.Commit)
			require.NoError(t, err, "should be able to delete commit with commit_id=commit.Id")
			_, err = pfsdb.GetCommitByCommitKey(ctx, tx, commitInfo.Commit)
			require.YesError(t, err, "should not be able to get a commit")
			require.True(t, errors.Is(pfsdb.ErrCommitNotFound{CommitID: pfsdb.CommitKey(commitInfo.Commit)}, errors.Cause(err)))
			err = pfsdb.DeleteCommit(ctx, tx, commitInfo.Commit)
			require.YesError(t, err, "should not be able to double delete commit")
			require.True(t, errors.Is(pfsdb.ErrCommitNotFound{CommitID: pfsdb.CommitKey(commitInfo.Commit)}, err))
			commitInfo.Commit = nil
			err = pfsdb.DeleteCommit(ctx, tx, commitInfo.Commit)
			require.YesError(t, err, "should not be able to double delete commit")
			require.True(t, errors.Is(pfsdb.ErrCommitMissingInfo{Field: "Commit"}, err))
			return nil
		}))
	})
}

func checkOutput(ctx context.Context, t *testing.T, iter stream.Iterator[pfsdb.CommitPair], expectedInfos []*pfs.CommitInfo) {
	i := 0
	require.NoError(t, stream.ForEach[pfsdb.CommitPair](ctx, iter, func(commitPair pfsdb.CommitPair) error {
		commitsMatch(t, expectedInfos[i], commitPair.CommitInfo)
		i++
		return nil
	}))
	require.Equal(t, len(expectedInfos), i)
}

func TestListCommit(t *testing.T) {
	size := 210
	expectedInfos := make([]*pfs.CommitInfo, size)
	testCommitDataModelAPI(t, func(ctx context.Context, t *testing.T, db *pachsql.DB, branchesCol collection.PostgresCollection) {
		require.NoError(t, dbutil.WithTx(ctx, db, func(ctx context.Context, tx *pachsql.Tx) error {
			for i := 0; i < size; i++ {
				commitInfo := testCommit(ctx, t, branchesCol, tx, testRepoName)
				expectedInfos[i] = commitInfo
				require.NoError(t, pfsdb.CreateCommit(ctx, tx, commitInfo))
			}
			iter, err := pfsdb.ListCommitTx(ctx, tx, nil)
			require.NoError(t, err, "should be able to list repos")
			checkOutput(ctx, t, iter, expectedInfos)
			return nil
		}))
		iter, err := pfsdb.ListCommit(ctx, db, nil)
		require.NoError(t, err, "should be able to list repos")
		checkOutput(ctx, t, iter, expectedInfos)
	})
}

func TestListCommitsFilter(t *testing.T) {
	repos := []string{"a", "b", "c"}
	size := 330
	expectedInfos := make([]*pfs.CommitInfo, 0)
	commitSetIds := make([]string, 0)
	commits := make([]*pfs.CommitInfo, 0)
	filter := pfsdb.CommitListFilter{
		pfsdb.CommitRepos:    []string{"b"},
		pfsdb.CommitOrigins:  []string{pfs.OriginKind_ORIGIN_KIND_UNKNOWN.String(), pfs.OriginKind_USER.String()},
		pfsdb.CommitBranches: []string{"master"},
		pfsdb.CommitProjects: []string{"default"},
	}
	testCommitDataModelAPI(t, func(ctx context.Context, t *testing.T, db *pachsql.DB, branchesCol collection.PostgresCollection) {
		require.NoError(t, dbutil.WithTx(ctx, db, func(ctx context.Context, tx *pachsql.Tx) error {
			for i := 0; i < size; i++ {
				commitInfo := testCommit(ctx, t, branchesCol, tx, repos[i%len(repos)])
				if commitInfo.Commit.Repo.Name == "b" && i%10 == 0 {
					expectedInfos = append(expectedInfos, commitInfo)
					commitSetIds = append(commitSetIds, commitInfo.Commit.Id)
				}
				commits = append(commits, commitInfo)
			}
			filter[pfsdb.CommitSetIDs] = commitSetIds
			for _, commitInfo := range commits {
				require.NoError(t, pfsdb.CreateCommit(ctx, tx, commitInfo))
			}
			iter, err := pfsdb.ListCommitTx(ctx, tx, filter)
			require.NoError(t, err, "should be able to list repos")
			checkOutput(ctx, t, iter, expectedInfos)
			return nil
		}))
		iter, err := pfsdb.ListCommit(ctx, db, filter)
		require.NoError(t, err, "should be able to list repos")
		checkOutput(ctx, t, iter, expectedInfos)
	})
}

type commitTestCase func(context.Context, *testing.T, *pachsql.DB, collection.PostgresCollection)

func testCommitDataModelAPI(t *testing.T, testCase commitTestCase) {
	ctx := pctx.TestContext(t)
	options := dockertestenv.NewTestDBOptions(t)
	dsn := dbutil.GetDSN(options...)
	listener := collection.NewPostgresListener(dsn)
	db, err := dbutil.NewDB(options...)
	require.NoError(t, err)
	branchesCol := pfsdb.Branches(db, listener)
	t.Cleanup(func() {
		require.NoError(t, db.Close())
	})
	migrationEnv := migrations.Env{EtcdClient: testetcd.NewEnv(ctx, t).EtcdClient}
	require.NoError(t, migrations.ApplyMigrations(ctx, db, migrationEnv, clusterstate.DesiredClusterState), "should be able to set up tables")
	testCase(ctx, t, db, branchesCol)
}

func commitsMatch(t *testing.T, a, b *pfs.CommitInfo) {
	require.Equal(t, a.Commit.Repo.Name, b.Commit.Repo.Name)
	require.Equal(t, a.Commit.Id, b.Commit.Id)
	require.Equal(t, a.Origin.Kind, b.Origin.Kind)
	require.Equal(t, a.Description, b.Description)
	require.Equal(t, a.Started.Seconds, b.Started.Seconds)
}

func testCommit(ctx context.Context, t *testing.T, branchesCol collection.PostgresCollection, tx *pachsql.Tx, repoName string) *pfs.CommitInfo {
	repoInfo := testRepo(repoName, testRepoType)
	repoInfo.Branches = []*pfs.Branch{
		{Repo: repoInfo.Repo, Name: "master"},
	}
	var commitInfo *pfs.CommitInfo
	id := random.String(32)
	commit := &pfs.Commit{Repo: repoInfo.Repo, Branch: repoInfo.Branches[0], Id: id}
	branchInfo := &pfs.BranchInfo{Branch: repoInfo.Branches[0], Head: commit}
	commitInfo = &pfs.CommitInfo{
		Commit:      commit,
		Description: "fake commit",
		Origin: &pfs.CommitOrigin{
			Kind: pfs.OriginKind_USER,
		},
		Started: timestamppb.New(time.Now()),
	}
	require.NoError(t, branchesCol.ReadWrite(tx).Put(repoInfo.Branches[0], branchInfo), "should be able to create branches")
	require.NoError(t, pfsdb.UpsertRepo(ctx, tx, repoInfo), "should be able to create repo")
	return commitInfo
}
