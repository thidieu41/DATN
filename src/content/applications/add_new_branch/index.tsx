import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormValue, defaultValues, branchSchema } from './schema';
import { Grid, Typography, styled } from '@mui/material';

const LableInput = styled(Typography)(
  () => `
  margin-bottom: 10px;
`
);

const CreateNewBranch = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormValue, IFormValue>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(branchSchema) as any
  });

  const handleSubmission = (data: IFormValue) => {
    console.log('test', errors);
  };

  console.log(errors);
  return (
    <form onSubmit={handleSubmit(handleSubmission)}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
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
        <Grid item xs={6}>
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
          xs={6}
          sx={{
            gap: '10px'
          }}
        >
          <LableInput>Số điện thoại</LableInput>
          <Controller
            control={control}
            name="phone_number"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Nhập số điện thoại"
                error={!!errors.phone_number}
                helperText={errors.phone_number?.message || ''}
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
  );
};

export default CreateNewBranch;
