import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormValue, defaultValues, registerSchema } from './schema';
import { Grid, Typography, styled } from '@mui/material';

const LableInput = styled(Typography)(
  () => `
  margin-bottom: 10px;
`
);

const CreateNewSchedule = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormValue, IFormValue>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(registerSchema) as any
  });

  const handleSubmission = (data: IFormValue) => {
    console.log('test', errors);
  };

  console.log(errors)
  return (
    <form onSubmit={handleSubmit(handleSubmission)}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <LableInput>Họ Và Tên</LableInput>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Nhập tên"
                error={!!errors.name}
                helperText={errors.name?.message || ''}
              />
            )}
          />
        </Grid>
        <Grid
          sx={{
            gap: '10px'
          }}
          item
          xs={6}
        >
          <LableInput>Chọn thời gian khám </LableInput>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Nhập thời gian khám"
                error={!!errors.date}
                helperText={errors.date?.message || ''}
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
          <LableInput>Số người</LableInput>
          <Controller
            control={control}
            name="number"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Nhập số người"
                type="number"
                error={!!errors.number}
                helperText={errors.number?.message || ''}
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

        <Grid
          item
          xs={12}
          sx={{
            gap: '10px'
          }}
        >
          <LableInput>Lý do đến khám</LableInput>
          <Controller
            control={control}
            name="reason"
            render={({ field }) => (
              <TextField
                fullWidth
                placeholder="Nhập lý do đến khám"
                multiline
                rows={4}
                error={!!errors.reason}
                helperText={errors.reason?.message || ''}
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
            backgroundColor: '#D4EEFF',
            color: 'black',
            marginTop: 3,
            fontWeight: 600,
            '&:hover': {
              color: 'white'
            }
          }}
        >
          Đặt lịch
        </Button>
      </Grid>
    </form>
  );
};

export default CreateNewSchedule;
