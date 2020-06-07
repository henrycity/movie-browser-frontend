import React, { useState } from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { css } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import MovieList from './MovieList';
import CreateListDialog from './CreateListDialog';
import { useAuth } from '../../utils/auth';

export default () => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const history = useHistory();

  const handleCreate = () => {
    setOpen(true);
  };

  const handleBrowse = () => {
    history.push('/list');
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar
          css={css`
            justify-content: flex-end;
          `}
        >
          <Button color="inherit" onClick={handleCreate}>
            Create A List
          </Button>
          <Button color="inherit" onClick={handleBrowse}>
            Browse List
          </Button>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
          <CreateListDialog open={open} handleClose={handleClose} />
        </Toolbar>
      </AppBar>
      <MovieList />
    </>
  );
};
