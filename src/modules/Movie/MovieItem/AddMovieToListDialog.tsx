import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  Select,
  MenuItem,
  DialogActions,
} from '@material-ui/core';
import { css } from '@emotion/core';

import { useAddMovieToListMutation, useGetListsQuery } from './MovieItem.graphql.generated';

interface AddMovieToListDialogProps {
  open: boolean;
  handleClose: () => void;
  movieId: number;
}

const AddMovieToListDialog: React.FunctionComponent<AddMovieToListDialogProps> = ({ open, handleClose, movieId }) => {
  const { data } = useGetListsQuery();
  const [addMovieToList] = useAddMovieToListMutation();
  const [selectedListId, setSelectedListId] = useState<number>();

  const handleAdd = async () => {
    if (selectedListId) {
      addMovieToList({ variables: { input: { listId: selectedListId, movieId } } });
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={true}>
      <DialogTitle id="form-dialog-title">Add To List</DialogTitle>
      <DialogContent>
        <form
          css={css`
            display: flex;
            justify-content: center;
          `}
          noValidate
        >
          <FormControl>
            <Select
              autoFocus
              inputProps={{
                name: 'max-width',
                id: 'max-width',
              }}
            >
              {data &&
                data.lists.map((list) => (
                  <MenuItem
                    key={list.id.toString()}
                    id={list.id.toString()}
                    value={list.name}
                    onClick={() => setSelectedListId(list.id)}
                  >
                    {list.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMovieToListDialog;
