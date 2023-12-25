import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, AlertColor, Box } from '@mui/material';

interface IProps {
  message: string;
  severity: AlertColor;
  openSnackbar: boolean;
}

export default function SimpleSnackbar({
  message,
  severity,
  openSnackbar
}: IProps) {
  const [open, setOpen] = React.useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  React.useEffect(() => {
    setOpen(openSnackbar);
  }, [openSnackbar]);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        action={action}
        style={{
          marginTop: 60,
          zIndex: 10000
        }}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </>
  );
}
