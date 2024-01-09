import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Stack, TextField, Typography } from '@mui/material';
import { IPostCategoriesProps } from 'src/content/pages/post_categories';
import { toast } from 'react-toastify';
import { ClientAPI } from 'src/api';

interface Iprops {
  open: boolean;
  onCloseModal: () => void;
  handleNewValue: (name: string, id: string) => void;
  isEdit: boolean;
  detailsData: IPostCategoriesProps;
  handleSetIsLoading: (value: boolean) => void;
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
  onCloseModal,
  handleNewValue,
  handleSetIsLoading,
  isEdit,
  detailsData
}: Iprops) {
  const [err, setErrors] = React.useState(false);
  const [details, setDetails] = React.useState<IPostCategoriesProps>();

  const handleSubmit = async () => {
    if (!details.name) {
      setErrors(true);
    } else {
      handleSetIsLoading(true);
      handleCloseModal();
      try {
        const id = (Math.random() + 1).toString(36).substring(7);
        let res;
        if (isEdit) {
          res = await ClientAPI.update(`/post/categories/${details.id}`, {
            name: details.name
          });
          toast.success('Cập nhật danh mục thành công!');
        } else {
          res = await ClientAPI.add('/post/categories/', {
            name: details.name
          });
          toast.success('Thêm danh mục thành công!');
        }
        handleNewValue(details.name, isEdit ? details.id : id);
      } catch (error) {
        if (isEdit) {
          toast.error('Lỗi cập nhật danh mục!');
        } else {
          toast.error('Lỗi thêm danh mục mới!');
        }
      }
      handleSetIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setErrors(false);
    setDetails({ ...details, name: '' });
    onCloseModal();
  };

  React.useEffect(() => {
    if (isEdit) {
      setDetails(detailsData);
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
        <Typography variant="h4">
          {isEdit ? 'Sửa' : 'Thêm'} danh mục bài đăng
        </Typography>
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
            value={details?.name || ''}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
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
