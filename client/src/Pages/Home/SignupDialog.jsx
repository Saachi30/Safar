import React from 'react';
import Grid from '@mui/material/Grid';
import { Dialog, DialogContent,  Typography, Button, TextField } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

const SignupDialog = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogContent>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {/* Left side with image and text */}
          <Grid item xs={12} sm={5} style={{ backgroundColor: '#F0D8C3', padding: '20px' }}>
            <Typography variant="h4" fontWeight="bold">
              Hello Peeps
            </Typography>
            <img
              src="https://path-to-your-image.jpg" // Replace with the actual image path
              alt="Artistic Background"
              style={{ width: '100%', borderRadius: '10px', marginTop: '20px' }}
            />
          </Grid>

          {/* Right side with form */}
          <Grid item xs={12} sm={7} style={{ padding: '20px' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Create Account
            </Typography>
            <TextField
              margin="dense"
              label="First Name"
              fullWidth
              variant="outlined"
              style={{ marginBottom: '10px' }}
            />
            <TextField
              margin="dense"
              label="Last Name"
              fullWidth
              variant="outlined"
              style={{ marginBottom: '10px' }}
            />
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              variant="outlined"
              style={{ marginBottom: '10px' }}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              style={{ marginBottom: '20px' }}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<FacebookIcon />}
                >
                  Sign up with Facebook
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<GoogleIcon />}
                >
                  Sign up with Google
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;
