import React from 'react';
import { css } from '@emotion/core';
import { CircularProgress } from '@material-ui/core';

const LoadingIndicator = () => (
  <div
    css={css`
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
    `}
  >
    <CircularProgress />
  </div>
);

export default LoadingIndicator;
