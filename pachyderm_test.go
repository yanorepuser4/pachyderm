package pachyderm

import (
	"bytes"
	"fmt"
	"os"
	"path"
	"strings"
	"testing"

	"golang.org/x/net/context"

	"github.com/pachyderm/pachyderm/src/pfs"
	"github.com/pachyderm/pachyderm/src/pfs/pfsutil"
	"github.com/pachyderm/pachyderm/src/pkg/require"
	"github.com/pachyderm/pachyderm/src/pkg/uuid"
	"github.com/pachyderm/pachyderm/src/pps"
	"github.com/pachyderm/pachyderm/src/pps/ppsutil"
	"google.golang.org/grpc"
)

func TestSimple(t *testing.T) {
	dataRepo := newRepo("pachderm.TestSimple.data")
	outRepo := newRepo("pachderm.TestSimple.output")
	pfsClient := getPfsClient(t)
	require.NoError(t, pfsutil.CreateRepo(pfsClient, dataRepo))
	require.NoError(t, pfsutil.CreateRepo(pfsClient, outRepo))
	commit, err := pfsutil.StartCommit(pfsClient, dataRepo, "")
	require.NoError(t, err)
	_, err = pfsutil.PutFile(pfsClient, dataRepo, commit.Id, "file", 0, strings.NewReader("foo"))
	require.NoError(t, err)
	require.NoError(t, pfsutil.FinishCommit(pfsClient, dataRepo, commit.Id))
	ppsClient := getPpsClient(t)
	_, err = ppsutil.CreateJob(
		ppsClient,
		"",
		[]string{"cp", path.Join("/pfs", dataRepo, "file"), path.Join("/pfs", outRepo, "file")},
		1,
		[]*pfs.Commit{commit},
		&pfs.Commit{Repo: &pfs.Repo{Name: outRepo}},
	)
	require.NoError(t, err)
	listCommitRequest := &pfs.ListCommitRequest{
		Repo:       &pfs.Repo{Name: outRepo},
		CommitType: pfs.CommitType_COMMIT_TYPE_READ,
		Block:      true,
	}
	listCommitResponse, err := pfsClient.ListCommit(
		context.Background(),
		listCommitRequest,
	)
	require.NoError(t, err)
	outCommits := listCommitResponse.CommitInfo
	require.Equal(t, 1, len(outCommits))
	var buffer bytes.Buffer
	require.NoError(t, pfsutil.GetFile(pfsClient, outRepo, outCommits[0].Commit.Id, "file", 0, 0, nil, &buffer))
	require.Equal(t, "foo", buffer.String())
}

func TestGrep(t *testing.T) {
	t.Skip()
	dataRepo := newRepo("pachyderm.TestWordCount.data")
	outRepo := newRepo("pachyderm.TestWordCount.output")
	pfsClient := getPfsClient(t)
	require.NoError(t, pfsutil.CreateRepo(pfsClient, dataRepo))
	require.NoError(t, pfsutil.CreateRepo(pfsClient, outRepo))
	commit, err := pfsutil.StartCommit(pfsClient, dataRepo, "")
	require.NoError(t, err)
	for i := 0; i < 100; i++ {
		_, err = pfsutil.PutFile(pfsClient, dataRepo, commit.Id, fmt.Sprintf("file%d", i), 0, strings.NewReader("foo\nbar\nfizz\nbuzz\n"))
		require.NoError(t, err)
	}
	require.NoError(t, pfsutil.FinishCommit(pfsClient, dataRepo, commit.Id))
	ppsClient := getPpsClient(t)
	_, err = ppsutil.CreateJob(
		ppsClient,
		"",
		[]string{"bash", "-c", fmt.Sprintf("\"grep foo /pfs/%s/* >/pfs/%s/foo\"", dataRepo, outRepo)},
		1,
		[]*pfs.Commit{commit},
		&pfs.Commit{Repo: &pfs.Repo{Name: outRepo}},
	)
	require.NoError(t, err)
}

func getPfsClient(t *testing.T) pfs.APIClient {
	pfsdAddr := os.Getenv("PFSD_PORT_650_TCP_ADDR")
	if pfsdAddr == "" {
		t.Error("PFSD_PORT_650_TCP_ADDR not set")
	}
	clientConn, err := grpc.Dial(fmt.Sprintf("%s:650", pfsdAddr), grpc.WithInsecure())
	require.NoError(t, err)
	return pfs.NewAPIClient(clientConn)
}

func getPpsClient(t *testing.T) pps.APIClient {
	ppsdAddr := os.Getenv("PPSD_PORT_651_TCP_ADDR")
	if ppsdAddr == "" {
		t.Error("PPSD_PORT_651_TCP_ADDR not set")
	}
	clientConn, err := grpc.Dial(fmt.Sprintf("%s:651", ppsdAddr), grpc.WithInsecure())
	require.NoError(t, err)
	return pps.NewAPIClient(clientConn)
}

func newRepo(prefix string) string {
	return prefix + "." + uuid.NewWithoutDashes()
}
