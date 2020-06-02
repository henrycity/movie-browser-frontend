import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { AppBar, Button, Toolbar } from '@material-ui/core';
import { css } from '@emotion/core';
import AddMovieToListDialog from './AddMovieToListDialog';
import MovieInformation from './MovieInformation';

export default () => {
  const { movieId } = useParams();
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
            ADD TO LIST
          </Button>
          <AddMovieToListDialog open={open} handleClose={handleClose} movieId={movieId} />
        </Toolbar>
      </AppBar>
      <MovieInformation />
    </>
  );
};
