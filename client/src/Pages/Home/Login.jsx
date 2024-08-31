import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Typography } from '@mui/material';

const Login = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle className='pb-3 font-serif font-black text-center text-8xl'>Login</DialogTitle>
      <DialogContent className='justify-between p-4 pt-7'>
        <Typography className='pt-8 pb-4 text-5xl font-medium' variant="body1" gutterBottom>
          Please enter your credentials.
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          variant="outlined"
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleClose}>
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Login;
