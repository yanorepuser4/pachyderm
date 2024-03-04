import React, {useState} from 'react';
import {showErrorMessage} from '@jupyterlab/apputils';

import {Repo, Mount, ListMountsResponse} from '../../types';
import {DropdownCombobox} from '../../../../components/DropdownCombobox/DropdownCombobox';
import {requestAPI} from '../../../../handler';

type ExploreProps = {
  mounted: Mount[];
  unmounted: Repo[];
  updateData: (data: ListMountsResponse) => void;
};

const Explore: React.FC<ExploreProps> = ({mounted, unmounted, updateData}) => {
  // TODO: initial loading...... Maybe show some text? Also this probably fixes the login issue
  if (mounted.length === 0 && unmounted.length === 0) {
    return (<></>);
  }


  // In the event of some how multiple repos being mounted we should unmount all to reset to the default state.
  if (mounted.length > 1) {
    umountAll();
    showErrorMessage(
      'Unexpected Error',
      'Multiple repos have been mounted somehow so all repos have been unmounted.',
    );
    return <></>;
  }

  const {projectRepos, selectedRepo: selectedProjectRepo, branches, selectedBranch} =
    getMountedStatus(mounted, unmounted);

  const [projectRepo, setProjectRepo] = useState(selectedProjectRepo);
  return (
    <div className="pachyderm-explore-view">
      <DropdownCombobox
        testIdPrefix="ProjectRepo-"
        initialSelectedItem={selectedProjectRepo}
        items={projectRepos}
        placeholder="project/repo"
        onSelectedItemChange={(projectRepo) => {
          console.log(projectRepo)
          setProjectRepo(projectRepo || '');
          if (!projectRepo) {
            return;
          }

          (async () => {
            updateData(await mount(projectRepo));
          })();
        }}
      />
      {!branches || !projectRepo ? (
        <></>
      ) : (
        <DropdownCombobox
          testIdPrefix="Branch-"
          initialSelectedItem={selectedBranch}
          items={branches}
          placeholder="branch"
          onSelectedItemChange={(selectedBranch) => {
            if (!selectedBranch) {
              return;
            }

            if (!selectedProjectRepo) {
              umountAll();
              showErrorMessage(
                'Unexpected Error',
                'An unknown branch was selected so all repos have been unmounted.',
              );
              return;
            }

            (async () => {
              updateData(await mount(selectedProjectRepo, selectedBranch));
            })();
          }}
        />
      )}
    </div>
  );
};

const umountAll = async (): Promise<ListMountsResponse> => {
  return requestAPI<ListMountsResponse>('_unmount_all', 'PUT');
};

const mount = async (
  projectRepo: string,
  branch = 'master',
): Promise<ListMountsResponse> => {
  const [project, repo] = projectRepo.split('/');

  await umountAll();
  return await requestAPI<ListMountsResponse>('_mount', 'PUT', {
    mounts: [
      {
        name:
          branch === 'master'
            ? `${project}_${repo}`
            : `${project}_${repo}_${branch}`,
        repo: repo,
        branch: branch,
        project: project,
        mode: 'ro',
      },
    ],
  });
};

type MountedStatus = {
  projectRepos: string[];
  selectedRepo: string | null;
  branches: string[] | null;
  selectedBranch: string | null;
};

// TODO: unit test this
const getMountedStatus = (
  mounted: Mount[],
  unmounted: Repo[],
): MountedStatus => {
  const projectRepos: string[] = [];
  const projectRepoToBranches: {[projectRepo: string]: string[]} = {};
  for (const repo of unmounted) {
    const projectRepoKey = `${repo.project}/${repo.repo}`;
    projectRepoToBranches[projectRepoKey] = repo.branches;
    projectRepos.push(projectRepoKey);
  }

  let selectedRepo: string | null = null;
  let selectedBranch: string | null = null;
  let branches: string[] | null = null;
  if (mounted.length === 1) {
    const mountedBranch = mounted[0];
    selectedRepo = `${mountedBranch.project}/${mountedBranch.repo}`;
    selectedBranch = mountedBranch.branch;
    if (!projectRepos.includes(selectedRepo)) {
      projectRepos.push(selectedRepo);
      projectRepoToBranches[selectedRepo] = [];
    }
    if (!projectRepoToBranches[selectedRepo].includes(mountedBranch.branch)) {
      projectRepoToBranches[selectedRepo].push(mountedBranch.branch);
    }
    branches = projectRepoToBranches[selectedRepo];
    branches?.sort();
  }
  projectRepos.sort();

  return {projectRepos, selectedRepo, branches, selectedBranch};
};

export default Explore;
