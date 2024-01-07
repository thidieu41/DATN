import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

interface IProps {
  open: boolean;
}
export default function BackDropComponent({ open }: IProps) {
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
        open={open}
      >
        <CircularProgress size={64} disableShrink thickness={3} />
      </Backdrop>
    </div>
  );
}
