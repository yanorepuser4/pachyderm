package fuse

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"sync"

	"github.com/gorilla/mux"
	"github.com/pachyderm/pachyderm/v2/src/client"
)

/*

A long-running server which dynamically manages FUSE mounts in the given
directory, exposing a gRPC API on a UNIX socket.

API
===

List()
------

Returns a complete set of repos in the system, their branches and commits, and
for each repo any branch or commit that is currently mounted, the status of that
mount on the system.


Get(repo)
---------
Return the subset of the output of List that is specific to the given repo.


MountBranch(repo, branch, name, mode)
-------------------------------------
Mount the given branch of the repo into the configured mount directory.

E.g. will result in `/pfs/{name}` being mounted.


MountCommit(repo, branch, commit, name)
---------------------------------------
TODO: implement this.

Mount the specified commit or global commit of the given branch of the given
repo into the configured directories.

Will result in `/pfs/{name}` being mounted.

If the commit is open, the mount may be writeable until it's closed.
(TODO: Maybe commits should only be mounted read-only to simplify?)

If the commit is closed, the reader can assume the data is immutable.

Note that repo-branch-commit mounts are disjoint from repo-branch mounts.


UnmountBranch(repo, branch)
---------------------------
Unmount the given repo-branch pair. If the repo-branch is not currently mounted,
returns an error.


UnmountCommit(repo, branch, commit)
-----------------------------------
Unmount the given repo-branch-commit pair. If the repo-branch-commit is not
currently mounted, returns an error.

Note that repo-branch-commit mounts are disjoint from repo-branch mounts.


UnmountByName(name)
-------------------
Unmount whatever is mounted at e.g. `/pfs/{name}`


CommitBranch(repo, branch, message)
-----------------------------------
TODO: implement this

Persist the current state of the given mount to a new commit in Pachyderm.

CommitBranch is not supported on repo-branch-commit mounts (as they are not
writeable?)


Plan
====

1. Implement List(), Get(), MountBranch(), UnmountBranch(), UnmountByName()
   Commits are implicit when filesystems are unmounted (matches current fuse mount behavior)

2. Implement CommitBranch() and stop implicitly committing data on unmounts

3. Implement MountCommit() to support looking at a specific previous state, read-only

*/

type ServerOptions struct {
	Daemonize bool
	MountDir  string
	Socket    string
	LogFile   string
}

type MountBranchRequest struct {
	Repo   string
	Branch string
	Name   string
	Mode   string // "ro", "rw"
}

type MountBranchResponse struct {
	Repo       string
	Branch     string
	Name       string
	MountState MountState
	Error      error
}

type MountManager struct {
	Client *client.APIClient
	// only put a value into the States map when we have a goroutine running for
	// it. i.e. when we try to mount it for the first time.
	States map[MountKey]*MountStateMachine
	mu     sync.Mutex
}

func (mm *MountManager) List() (ListResponse, error) {

	mm.mu.Lock()
	defer mm.mu.Unlock()
	// fetch list of available repos & branches from pachyderm, and overlay that
	// with their mount states

	lr := ListResponse{Repos: map[string]RepoResponse{}}
	repos, err := mm.Client.ListRepo()
	if err != nil {
		return lr, err
	}
	fmt.Printf("repos: %+v", repos)
	for _, repo := range repos {
		rr := RepoResponse{Name: repo.Repo.Name, Branches: map[string]BranchResponse{}}
		bs, err := mm.Client.ListBranch(repo.Repo.Name)
		if err != nil {
			return lr, err
		}
		for _, branch := range bs {
			br := BranchResponse{Name: branch.Branch.Name}
			k := MountKey{
				Repo:   repo.Repo.Name,
				Branch: branch.Branch.Name,
				Commit: "",
			}
			s, ok := mm.States[k]
			if ok {
				br.State = s.MountState
			} else {
				br.State = MountState{State: "unmounted"}
			}
			rr.Branches[branch.Branch.Name] = br
		}
		lr.Repos[repo.Repo.Name] = rr
	}

	// TODO: also add any repos/branches that have been deleted from pachyderm
	// but are still mounted here :-O we should send them a special signal to
	// tell them they're "stranded" or "missing" probably?

	return lr, nil
}

func (mm *MountManager) MaybeStartFsm(key MountKey) {
	mm.mu.Lock()
	defer mm.mu.Unlock()
	_, ok := mm.States[key]
	if !ok {
		// set minimal state and kick it off!
		m := &MountStateMachine{MountState: MountState{MountKey: key}}
		mm.States[key] = m
		go func() {
			m.Run()
			// when execution completes, remove ourselves from the map so that
			// we can infer from the key in the map that the state machine is
			// running
			mm.mu.Lock()
			defer mm.mu.Unlock()
			delete(mm.States, key)
		}()
	} // else: fsm was already running
}

func (mm *MountManager) MountBranch(repo, branch, name, mode string) (MountBranchResponse, error) {
	// name: an optional name for the mount, corresponds to where on the
	// filesystem the repo actually gets mounted. e.g. /pfs/{name}
	k := MountKey{repo, branch, ""}
	mm.MaybeStartFsm(k)
	mm.States[k].requests <- MountBranchRequest{
		Repo:   repo,
		Branch: branch,
		Name:   name,
		Mode:   mode,
	}
	response := <-mm.States[k].responses
	return response, response.Error
}

func Server(c *client.APIClient, opts *ServerOptions) error {
	// TODO: respect opts.Daemonize
	mm := MountManager{Client: c}

	router := mux.NewRouter()
	router.Methods("GET").Path("/repos").HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		l, err := mm.List()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		marshalled, err := json.Marshal(l)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		w.Write(marshalled)
	})
	router.Methods("PUT").Path("/repos/{key:.+}/_mount").HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		vs := mux.Vars(req)
		mode, ok := vs["mode"]
		if !ok {
			http.Error(w, "no mode", http.StatusBadRequest)
			return
		}
		name, ok := vs["name"]
		if !ok {
			http.Error(w, "no name", http.StatusBadRequest)
			return
		}
		k, ok := vs["key"]
		if !ok {
			http.Error(w, "no key", http.StatusBadRequest)
			return
		}
		key, err := mountKeyFromString(k)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		// TODO: use response (serialize it to the client, it's polite to hand
		// back the object you just modified in the API response)
		_, err = mm.MountBranch(key.Repo, key.Branch, name, mode)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	})
	router.Methods("PUT").Path("/repos/{key:.+}/_unmount").HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
	})
	// TODO: implement _commit

	// TODO: switch http server for gRPC server and bind to a unix socket not a
	// TCP port (just for convenient manual testing with curl for now...)
	http.Handle("/", router)
	// TODO: make port and bind ip parameterizable
	return http.ListenAndServe(":9002", nil)
}

type MountState struct {
	Name       string
	MountKey   MountKey
	State      string // "unmounted", "mounting", "mounted", "pushing", "unmounted", "error"
	Status     string // human readable string with additional info wrt State, e.g. an error message for the error state
	Mode       string // "ro", "rw", or "" if unknown/unspecified
	Mountpoint string // where on the filesystem it's mounted
}

type MountStateMachine struct {
	MountState
	mu        sync.Mutex
	requests  chan MountBranchRequest
	responses chan MountBranchResponse
}

// TODO: switch to pach internal types if appropriate?
type ListResponse struct {
	Repos map[string]RepoResponse
}

type BranchResponse struct {
	Name  string
	State MountState
}

type RepoResponse struct {
	Name     string
	Branches map[string]BranchResponse
	// TODO: Commits map[string]CommitResponse
}

type GetResponse RepoResponse

type MountKey struct {
	Repo   string
	Branch string
	Commit string
}

func (m *MountKey) String() string {
	// m.Commit is optional
	if m.Commit == "" {
		return fmt.Sprintf("%s/%s", m.Repo, m.Branch)
	} else {
		return fmt.Sprintf("%s/%s/%s", m.Repo, m.Branch, m.Commit)
	}
}

func mountKeyFromString(key string) (MountKey, error) {
	shrapnel := strings.Split(key, "/")
	if len(shrapnel) == 3 {
		return MountKey{
			Repo:   shrapnel[0],
			Branch: shrapnel[1],
			Commit: shrapnel[2],
		}, nil
	} else if len(shrapnel) == 2 {
		return MountKey{
			Repo:   shrapnel[0],
			Branch: shrapnel[1],
		}, nil
	} else {
		return MountKey{}, fmt.Errorf(
			"wrong number of '/'s in key %+v, got %d expected 2 or 3", key, len(shrapnel),
		)
	}
}

// state machines in the style of Rob Pike's Lexical Scanning
// http://www.timschmelmer.com/2013/08/state-machines-with-state-functions-in.html

// setup

type StateFn func(*MountStateMachine) StateFn

func (m *MountStateMachine) transitionedTo(state, status string) {
	m.mu.Lock()
	defer m.mu.Unlock()
	fmt.Printf("[%s] %s -> %s", m.MountKey, m.State, m.State)
	m.State = state
	m.Status = status
}

func (m *MountStateMachine) Run() {
	for state := discoveringState; state != nil; {
		state = state(m)
	}
	m.transitionedTo("gone", "")
}

// state functions

func discoveringState(m *MountStateMachine) StateFn {
	m.transitionedTo("discovering", "")
	// TODO: inspect the state of the system, and if we're half-unmounted, maybe
	// do cleanup before declaring us _truly_ unmounted
	return unmountedState
}

func unmountedState(m *MountStateMachine) StateFn {
	m.transitionedTo("unmounted", "")
	// TODO: listen on our request chan, mount filesystems, and respond
	return nil
}
