import React from 'react';
import {showErrorMessage} from '@jupyterlab/apputils';

import {Repo, Repos, MountedRepo, Branch} from '../../types';
import {DropdownCombobox} from '../../../../utils/components/DropdownCombobox/DropdownCombobox';

type ExploreProps = {
  repos: Repos;
  mountedRepo: MountedRepo | null;
  updateMountedRepo: (
    repo: Repo | null,
    mountedBranch: Branch | null,
    mountDefaultBranch?: boolean,
  ) => void;
};

const Explore: React.FC<ExploreProps> = ({
  repos,
  mountedRepo,
  updateMountedRepo,
}) => {
  // Avoids rendering the dropdowns until mount information is loaded.
  if (!mountedRepo && Object.keys(repos).length === 0) {
    return <></>;
  }

  return (
    <div className="pachyderm-explore-view">
      <DropdownCombobox
        testIdPrefix="ProjectRepo-"
        initialSelectedItem={mountedRepo?.repo.uri}
        items={Object.keys(repos)}
        placeholder="project/repo"
        onSelectedItemChange={(repoUri, selectItem) => {
          (async () => {
            if (!repoUri) {
              updateMountedRepo(null, null);
              return;
            }

            const repo = repos[repoUri];
            if (repo.branches.length === 0) {
              updateMountedRepo(null, null);
              showErrorMessage(
                'No Branches',
                `${repo.name} has no branches to mount`,
              );
              selectItem(null);
              return;
            }

            updateMountedRepo(repo, null, true);
          })();
        }}
      />
      {!mountedRepo ? (
        <></>
      ) : (
        <DropdownCombobox
          testIdPrefix="Branch-"
          initialSelectedItem={mountedRepo.mountedBranch.name}
          items={mountedRepo.repo.branches.map((branch) => branch.name)}
          placeholder="branch"
          onSelectedItemChange={(mountedBranchName) => {
            (async () => {
              // Should never happen...
              if (!mountedBranchName) {
                return;
              }

              let mountedBranch: Branch | null = null;
              for (const branch of mountedRepo.repo.branches) {
                if (branch.name === mountedBranchName) {
                  mountedBranch = branch;
                  break;
                }
              }
              if (!mountedBranch) {
                // TODO: throw  error here maybe??
                return;
              }

              updateMountedRepo(mountedRepo.repo, mountedBranch);
            })();
          }}
        />
      )}
    </div>
  );
};

export default Explore;
