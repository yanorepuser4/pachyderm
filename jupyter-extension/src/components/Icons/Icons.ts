import {LabIcon} from '@jupyterlab/ui-components';

import fileSvg from './file.svg';
import mountLogoSvg from './mount-logo.svg';
import repoSvg from './repo.svg';
import infoSvg from './info.svg';

export const fileIcon = new LabIcon({
  name: 'jupyterlab-pachyderm:file',
  svgstr: fileSvg,
});

export const mountLogoIcon = new LabIcon({
  name: 'jupyterlab-pachyderm:mount-logo',
  svgstr: mountLogoSvg,
});

export const repoIcon = new LabIcon({
  name: 'jupyterlab-pachyderm:repo',
  svgstr: repoSvg,
});

export const infoIcon = new LabIcon({
  name: 'jupyterlab-pachyderm:info',
  svgstr: infoSvg,
});
