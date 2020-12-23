import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function EmbedContentDialog({ open, onClose, defaultValue, onSubmit }) {
  const refInput = useRef();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Embed Content</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Share image or video (youtube or vimeo) 
        </DialogContentText>
        <TextField
          inputProps={{maxLength: 1000}}
          defaultValue={defaultValue}
          autoFocus
          margin="dense"
          label="Paste link here"
          type="text"
          fullWidth
          onKeyPress={(e) => { if (e.charCode === 13) onSubmit(refInput.current.value) }}
          inputRef={refInput}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onSubmit(refInput.current.value)} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}