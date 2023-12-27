import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Stack, TextField, Typography } from '@mui/material';
import { createClient } from 'src/utils/axios';

interface Iprops {
  open: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  isEdit: boolean;
  detailsData: {
    name: string;
  };
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateNewPostCategory({
  open,
  onOpenModal,
  onCloseModal,
  isEdit,
  detailsData
}: Iprops) {
  const [name, setName] = React.useState('');
  const [err, setErrors] = React.useState(false);

  const axios = createClient();

  const handleSubmit = async () => {
    if (!name) {
      setErrors(true);
    } else {
      await (isEdit ? axios.put : axios.post)('/post/category', {
        name
      })
        .then((res) => {})
        .catch((error) => {});
    }
  };

  const handleCloseModal = () => {
    setErrors(false);
    setName('');
    onCloseModal();
  };

  React.useEffect(() => {
    if (isEdit) {
      setName(detailsData.name);
    }
  }, [detailsData, isEdit]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseModal}
      sx={{
        '& .MuiPaper-root': {
          width: '100%'
        }
      }}
    >
      <DialogTitle>
        <Typography variant="h4">Thêm danh mục bài đăng</Typography>
      </DialogTitle>

      <DialogContent sx={{ width: '100%' }}>
        <Stack spacing={1}>
          <Typography
            sx={{
              fontWeight: 500
            }}
          >
            Tên danh mục
          </Typography>
          <TextField
            id="name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên danh mục"
          />
          {err && (
            <Typography
              sx={{
                color: 'red'
              }}
            >
              Không được để trống tên danh mục
            </Typography>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCloseModal}>
          Đóng
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}
