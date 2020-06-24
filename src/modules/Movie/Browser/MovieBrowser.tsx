import React, { useState } from 'react';
import { AppBar, Button, TextField, Toolbar } from '@material-ui/core';
import { css } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import MovieList from './MovieList';
import CreateListDialog from './CreateListDialog';
import { useAuth } from '../../../utils/auth';

export default () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { setToken } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    setToken('');
  };

  const handleCreate = () => {
    setOpen(true);
  };

  const handleBrowse = () => {
    history.push('/list');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
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
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
          <CreateListDialog open={open} handleClose={handleClose} />
        </Toolbar>
      </AppBar>
      <form
        css={css`
          display: flex;
          justify-content: center;
          margin: 1%;
        `}
        noValidate
        autoComplete="off"
      >
        <TextField
          css={css`
            width: 20%;
          `}
          label="Movie Title"
          onChange={handleChange}
          value={query}
        />
      </form>
      <MovieList query={query} />
    </>
  );
};
