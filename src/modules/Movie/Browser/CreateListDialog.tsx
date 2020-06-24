import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from '@material-ui/core';

import { useCreateListMutation } from './MovieBrowser.graphql.generated';

interface CreateListDialogProps {
  open: boolean;
  handleClose: () => void;
}

const CreateListDialog: React.FunctionComponent<CreateListDialogProps> = ({ open, handleClose }) => {
  const [listName, setListName] = useState('');
  const [createList] = useCreateListMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListName(event.target.value);
  };

  const handleCreate = async () => {
    handleClose();
    setListName('');
    createList({ variables: { input: { name: listName } } });
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">New List</DialogTitle>
      <DialogContent>
        <DialogContentText>To create a new watchlist, please enter the title here.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Title"
          type="text"
          fullWidth
          value={listName}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateListDialog;
