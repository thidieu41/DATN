import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, branchSchema } from './schema';
import { Box, Grid, Stack, Typography, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { IBranchsParamsProps } from 'src/interface/branchs';
import { toast } from 'react-toastify';
import BackDropComponent from 'src/components/BackDrop';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ClientAPI } from 'src/api';
import Label from 'src/components/Label';

const LableInput = styled(Typography)(() => `margin-bottom: 10px;`);
const GridItem = styled(Grid)(() => `gap: 10px`);

interface IProps {
  branchId: string;
}

const CreateNewBranch = ({ branchId }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState<IBranchsParamsProps>();
  const [listRoom, setListRoom] = useState<string[]>([]);
  const [room, setRoom] = useState('');
  const [errorsText, setErrorsText] = useState('');

  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<IBranchsParamsProps, IBranchsParamsProps>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(branchSchema) as any
  });

  const handleAddNewRoom = () => {
    if (!room) {
      setErrorsText('Không được để trống tên phòng');
      return;
    } else {
      setRoom('');
      setErrorsText('');
      const data = [...listRoom, room];
      setListRoom(data);
    }
  };

  const handleSubmission = async (data: IBranchsParamsProps) => {
    if (listRoom.length === 0) {
      setErrorsText('Không được để trống danh sách phòng');
    } else {
      setIsLoading(true);
      try {
        if (branchId) {
          await ClientAPI.update(`/dental/branches/${branchId}/`, data);
        } else {
          await ClientAPI.add(`/dental/branches/`, data);
        }
        toast.success(
          branchId
            ? 'Cập nhật chi nhánh thành công!'
            : 'Thêm chi nhánh thành công!'
        );
        navigate('/admin/chi-nhanh/');
      } catch (error) {
        toast.error(
          branchId ? 'Lỗi cập nhật chi nhánh!' : 'Lỗi thêm chi nhánh!'
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGetDetails = async () => {
    try {
      const res = await ClientAPI.getDetails(`/dental/branches/${branchId}/`);
      const { name, phone, address } = res.data;
      setValue('address', address);
      setValue('name', name);
      setValue('phone', phone);
    } catch (error) {
      toast.error('Lỗi lấy thông tin chi nhánh chi tiết!');
    }
  };

  useEffect(() => {
    if (branchId) {
      handleGetDetails();
    }
  }, [branchId]);

  console.log(listRoom);
  return (
    <>
      <form onSubmit={handleSubmit(handleSubmission)}>
        <Grid container spacing={2}>
          <GridItem item xs={12} sm={6}>
            <LableInput>Tên chi nhánh</LableInput>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Nhập tên chi nhánh"
                  error={!!errors.name}
                  helperText={errors.name?.message || ''}
                />
              )}
            />
          </GridItem>

          <GridItem
            item
            xs={12}
            sm={6}
            sx={{
              gap: '10px'
            }}
          >
            <LableInput>Số điện thoại</LableInput>
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Nhập số điện thoại"
                  error={!!errors.phone}
                  helperText={errors.phone?.message || ''}
                />
              )}
            />
          </GridItem>

          <GridItem item xs={12}>
            <LableInput>Địa chỉ</LableInput>
            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Nhập địa chỉ"
                  error={!!errors.address}
                  helperText={errors.address?.message || ''}
                />
              )}
            />
          </GridItem>

          <GridItem item xs={12}>
            <LableInput>Danh sách phòng</LableInput>
            <Stack
              direction={'row'}
              sx={{
                flexWrap: 'wrap',
                mb: 1
              }}
            >
              {listRoom.map((item, key) => (
                <Box
                  key={key}
                  sx={{
                    maxWidth: 200,
                    my: 1,
                    mx: 0.5
                  }}
                >
                  <Label color={'primary'}>{item}</Label>
                </Box>
              ))}
            </Stack>
            <Stack
              direction={'row'}
              sx={{
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              spacing={2}
            >
              <TextField
                fullWidth
                placeholder="Nhập tên phòng"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              />
              <Button
                sx={{
                  width: 200
                }}
                type="button"
                variant="outlined"
                fullWidth
                size="large"
                startIcon={<AddIcon />}
                onClick={() => handleAddNewRoom()}
              >
                Thêm phòng
              </Button>
            </Stack>
            {errorsText && (
              <Typography
                sx={{
                  color: 'red',
                  fontSize: 13,
                  mt: 1
                }}
              >
                <b>{errorsText}</b>
              </Typography>
            )}
          </GridItem>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              maxWidth: '60%',
              margin: 'auto',
              padding: '10px',
              marginTop: 3
            }}
          >
            Lưu thông tin
          </Button>
        </Grid>
      </form>
      <BackDropComponent open={isLoading} />
    </>
  );
};

export default CreateNewBranch;
