import * as React from 'react';
import './subscribe-dialog.scss';

import { useFormik } from 'formik';
import * as yup from 'yup';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const SubscribeDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required')
  });

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      setOpen(false);
      formik.setTouched({... formik.touched, ['email']: false });
      formik.setValues({... formik.values, email: ''});
    },
  });
  
  return (
    <div>
      <Button 
        variant="outlined" size="medium" 
        onClick={handleClickOpen}>
        Subscribe
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to daily update notification, please enter your email address here. 
              As soon as latest data has been processed, you will be notified through email.
            </DialogContentText>
            <br></br>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Subscribe</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>);
}

export default SubscribeDialog;