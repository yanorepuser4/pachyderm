import React from 'react';
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
    return <></>;
  }

  // In the event of some how multiple repos being mounted we should unmount all to reset to the default state.
  if (mounted.length > 1) {
    (async () => {
      updateData(await unmountAll());
    })();
    showErrorMessage(
      'Unexpected Error',
      'Multiple repos have been mounted somehow so all repos have been unmounted.',
    );
    return <></>;
  }

  const {
    projectRepos,
    selectedProjectRepo,
    branches,
    selectedBranch,
  } = getMountedStatus(mounted, unmounted);

  return (
    <div className="pachyderm-explore-view">
      <DropdownCombobox
        testIdPrefix="ProjectRepo-"
        initialSelectedItem={selectedProjectRepo}
        items={projectRepos}
        placeholder="project/repo"
        onSelectedItemChange={(projectRepo) => {
          if (!projectRepo) {
            (async () => {
              updateData(await unmountAll());
            })();
            return;
          }

          (async () => {
            updateData(await mount(projectRepo));
          })();
        }}
      />
      {!branches || !selectedProjectRepo ? (
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

            // if (!selectedProjectRepo) {
            //   (async () => {
            //     updateData(await unmountAll());
            //   })();
            //   showErrorMessage(
            //     'Unexpected Error',
            //     'An unknown branch was selected so all repos have been unmounted.',
            //   );
            //   return;
            // }

            (async () => {
              updateData(await mount(selectedProjectRepo, selectedBranch));
            })();
          }}
        />
      )}
    </div>
  );
};

const unmountAll = async (): Promise<ListMountsResponse> => {
  return requestAPI<ListMountsResponse>('_unmount_all', 'PUT');
};

const mount = async (
  projectRepo: string,
  branch = 'master',
): Promise<ListMountsResponse> => {
  const [project, repo] = projectRepo.split('/');

  await unmountAll();
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
  selectedProjectRepo: string | null;
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

  let selectedProjectRepo: string | null = null;
  let selectedBranch: string | null = null;
  let branches: string[] | null = null;
  if (mounted.length === 1) {
    const mountedBranch = mounted[0];
    selectedProjectRepo = `${mountedBranch.project}/${mountedBranch.repo}`;
    selectedBranch = mountedBranch.branch;
    if (!projectRepos.includes(selectedProjectRepo)) {
      projectRepos.push(selectedProjectRepo);
      projectRepoToBranches[selectedProjectRepo] = [];
    }
    if (!projectRepoToBranches[selectedProjectRepo].includes(mountedBranch.branch)) {
      projectRepoToBranches[selectedProjectRepo].push(mountedBranch.branch);
    }
    branches = projectRepoToBranches[selectedProjectRepo];
    branches?.sort();
  }
  projectRepos.sort();

  return {projectRepos, selectedProjectRepo, branches, selectedBranch};
};

export default Explore;
