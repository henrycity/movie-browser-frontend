import React, { useEffect, useState } from 'react';
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

import axios from '../../utils/axios';

interface AddMovieToListDialogProps {
  open: boolean;
  handleClose: () => void;
  movieId: number;
}

const AddMovieToListDialog: React.FunctionComponent<AddMovieToListDialogProps> = ({ open, handleClose, movieId }) => {
  const [listName, setListName] = useState('');
  const [lists, setLists] = useState([]);

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setListName(event.target.value as string);
  };

  const handleAdd = async () => {
    await axios.post(`api/list/${listName}`, { movieId });
    handleClose();
  };

  useEffect(() => {
    if (open) {
      axios.get('api/user').then(({ data }) => {
        setLists(data.lists);
      });
    }
  }, [open]);

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
              value={listName}
              onChange={handleChange}
            >
              {lists.map((list) => (
                <MenuItem id={list} value={list}>
                  {list}
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
