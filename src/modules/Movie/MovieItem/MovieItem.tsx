import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { AppBar, Button, Toolbar } from '@material-ui/core';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import AddMovieToListDialog from './AddMovieToListDialog';
import MovieInformation from './MovieInformation';

export default () => {
  const { movieId } = useParams();
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={handleGoBack}>
            <ArrowBackIos />
          </Button>
          {/*TODO: Find out why cannot use @emotion below. Might be due to lazy load*/}
          <Button style={{ marginLeft: 'auto' }} color="inherit" onClick={handleClickOpen}>
            Add To List
          </Button>
          <AddMovieToListDialog open={open} handleClose={handleClose} movieId={parseInt(movieId)} />
        </Toolbar>
      </AppBar>
      <MovieInformation />
    </>
  );
};
