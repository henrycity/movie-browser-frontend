import React, { useState } from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { css } from '@emotion/core';

import MovieList from './MovieList';
import CreateListDialog from './CreateListDialog';

export default () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar
          css={css`
            flex-direction: row-reverse;
          `}
        >
          <Button color="inherit" onClick={handleClickOpen}>
            Create A List
          </Button>
          <CreateListDialog open={open} handleClose={handleClose} />
        </Toolbar>
      </AppBar>
      <MovieList />
    </>
  );
};
