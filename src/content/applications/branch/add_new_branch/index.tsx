import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, branchSchema } from './schema';
import { Grid, Typography, styled } from '@mui/material';
import { IBranchsParamsProps } from 'src/interface/branchs';
import { toast } from 'react-toastify';
import BackDropComponent from 'src/components/BackDrop';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ClientAPI } from 'src/api';

const LableInput = styled(Typography)(
  () => `
  margin-bottom: 10px;
`
);

interface IProps {
  branchId: string;
}

const CreateNewBranch = ({ branchId }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState<IBranchsParamsProps>();

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

  const handleSubmission = async (data: IBranchsParamsProps) => {
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
      toast.error(branchId ? 'Lỗi cập nhật chi nhánh!' : 'Lỗi thêm chi nhánh!');
    } finally {
      setIsLoading(false);
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
  return (
    <>
      <form onSubmit={handleSubmit(handleSubmission)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
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
          </Grid>
          <Grid item xs={12} sm={6}>
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
          </Grid>
          <Grid
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
          </Grid>
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
