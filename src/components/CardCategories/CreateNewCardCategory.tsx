import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Stack, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { ClientAPI } from 'src/api';
import { IDetailsCategoriesProps } from 'src/interface/categories';

interface Iprops {
  open: boolean;
  onCloseModal: () => void;
  handleNewValue: (data: IDetailsCategoriesProps) => void;
  isEdit: boolean;
  detailsData: IDetailsCategoriesProps;
  handleSetIsLoading: (value: boolean) => void;
  isCategoryBooking: boolean;
  isDetailsCategory?: boolean;
  categoryId?: string;
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
  detailsData,
  isCategoryBooking,
  isDetailsCategory,
  categoryId = null
}: Iprops) {
  const [err, setErrors] = React.useState(false);
  const [priceErrors, setPriceErrors] = React.useState(false);
  const [details, setDetails] = React.useState<IDetailsCategoriesProps>();

  const handleCloseModal = () => {
    if (isDetailsCategory) {
      setPriceErrors(false);
    }
    setErrors(false);
    setDetails({ ...details, name: '', price: '' });
    onCloseModal();
  };

  const handleSubmitDataAPI = async () => {
    handleSetIsLoading(true);
    handleCloseModal();
    try {
      const params = {
        name: details.name,
        ...(isDetailsCategory && {
          price: details.price,
          menu: categoryId
        })
      };
      const id = (Math.random() + 1).toString(36).substring(7);
      let res: any;
      if (isEdit) {
        res = await ClientAPI.update(
          isCategoryBooking
            ? `/app/menus/${details.id}/`
            : isDetailsCategory
            ? `/app/menu-items/${details.id}/`
            : `/post/categories/${details.id}/`,
          params
        );
        toast.success('Cập nhật danh mục thành công!');
      } else {
        res = await ClientAPI.add(
          isCategoryBooking
            ? '/app/menus/'
            : isDetailsCategory
            ? 'app/menu-items/'
            : '/post/categories/',
          params
        );
        toast.success(
          isDetailsCategory
            ? 'Thêm chi tiết danh mục thành công!'
            : 'Thêm danh mục thành công!'
        );
      }
      handleNewValue(res.data);
    } catch (error) {
      if (isEdit) {
        toast.error(
          isDetailsCategory
            ? 'Lỗi cập nhật chi tiết danh mục!'
            : 'Lỗi cập nhật danh mục!'
        );
      } else {
        toast.error(
          isDetailsCategory
            ? 'Lỗi thêm chi tiết danh mục!'
            : 'Lỗi thêm danh mục mới!'
        );
      }
    }
    handleSetIsLoading(false);
  };
  const handleSubmit = async () => {
    if (!details.name) {
      setErrors(true);
    } else {
      if (isDetailsCategory) {
        if (!details.price) {
          setPriceErrors(true);
        } else {
          handleSubmitDataAPI();
        }
      } else {
        handleSubmitDataAPI();
      }
    }
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
          {isEdit ? 'Sửa' : 'Thêm'}
          {isDetailsCategory
            ? ' chi tiết danh mục'
            : isCategoryBooking
            ? ' danh mục lịch khám'
            : ' danh mục bài đăng'}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ width: '100%' }}>
        <Stack spacing={2}>
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
          {isDetailsCategory && (
            <Stack spacing={1}>
              <Typography
                sx={{
                  fontWeight: 500
                }}
              >
                Giá
              </Typography>
              <TextField
                id="price"
                variant="outlined"
                value={details?.price || ''}
                onChange={(e) =>
                  setDetails({ ...details, price: e.target.value })
                }
                placeholder="Nhập giá"
                type="number"
              />
              {priceErrors && (
                <Typography
                  sx={{
                    color: 'red'
                  }}
                >
                  Không được để trống giá
                </Typography>
              )}
            </Stack>
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
