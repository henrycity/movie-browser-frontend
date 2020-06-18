import React, { useState } from 'react';
import { AppBar, Button, TextField, Toolbar } from '@material-ui/core';
import { css } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import MovieList from './MovieList';
import CreateListDialog from './CreateListDialog';
import { useAuth } from '../../../utils/auth';
import { Movie } from '../../../types';

export default () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMovies([]);
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
          <Button color="inherit" onClick={logout}>
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
      <MovieList query={query} movies={movies} setMovies={setMovies} />
    </>
  );
};
