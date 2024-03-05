import React from 'react';

// TODO: Move this to src/components and svgs
const LoadingDots: React.FC = () => {
  return (
    <div className={'jp-dots-container'}>
      <div className={'jp-dots-base'} role="status" aria-label="loading" />
    </div>
  );
};

export default LoadingDots;
