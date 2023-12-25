import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormValue, defaultValues, registerSchema } from './schema';
import { Grid, Typography, styled } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

const LableInput = styled(Typography)(
  () => `
  margin-bottom: 10px;
`
);

const NewUserScheduleAppoinment = () => {
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
    console.log('data', data);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmission)}>
      <Grid container spacing={2}>
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  {...field}
                  inputFormat="DD-MM-YYYY HH:MM"
                  minDate={dayjs(new Date())}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      placeholder="Nhập thời gian khám"
                      error={!!errors.date}
                      helperText={errors.date?.message || ''}
                    />
                  )}
                />
              </LocalizationProvider>
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
                {...field}
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
            marginTop: 3
          }}
        >
          Đặt lịch
        </Button>
      </Grid>
    </form>
  );
};

export default NewUserScheduleAppoinment;
