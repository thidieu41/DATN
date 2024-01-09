import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, MenuItem, Typography, styled } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import {
  IFormValueScheduleProps,
  scheduleEditSchema,
  scheduleSchema,
  scheduledefaultValues,
  statusOptions
} from '../constants';
import { toast } from 'react-toastify';
import { IScheduleProps } from 'src/interface/booking';
import { ClientAPI } from 'src/api';

const LableInput = styled(Typography)(
  () => `
  margin-bottom: 10px;
`
);

const CreateNewSchedule = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [details, setDetails] = useState<IScheduleProps>();
  const [isUserInfor, setIsUserInfor] = useState(false);

  const location = useLocation();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<IFormValueScheduleProps, IFormValueScheduleProps>({
    mode: 'onChange',
    defaultValues: scheduledefaultValues,
    resolver: yupResolver(isEdit ? scheduleEditSchema : scheduleSchema) as any
  });

  const handleSubmission = async (data: IFormValueScheduleProps) => {
    const { date, quantity, reason } = data;
    try {
      if (isEdit) {
      } else {
        await ClientAPI.add('/app/bookings/', { date, quantity, reason });
      }
      toast.success(
        isEdit ? 'Cập nhật lịch khám thành công' : 'Tạo lịch khám thành công'
      );
    } catch (error) {
      toast.error(isEdit ? 'Lỗi cập nhật lịch khám' : 'Lỗi đặt lịch khám');
    }
  };

  const onGetScheduleDetails = async () => {
    const listPath = location.pathname.split('/');
    const scheduleId = listPath[listPath.length - 1];
    console.log(!isNaN(Number(scheduleId)));
    if (!isNaN(Number(scheduleId))) {
      setIsEdit(true);
      const { data } = await ClientAPI.getDetails(
        `/app/bookings/${scheduleId}/`
      );
      const {
        date,
        quantity,
        total_money,
        status,
        reason,
        user,
        name,
        phone,
        isUser
      } = data;
      setIsUserInfor(isUser);
      setValue('date', date);
      setValue('quantity', quantity);
      setValue('reason', reason);
      setValue('name', name);
      setValue('phone_number', phone);
      setValue('status', status);
      setValue('total_money', total_money);
      console.log(data);
    }
  };

  useEffect(() => {
    onGetScheduleDetails();
  }, []);

  const status = watch('status');
  return (
    <form onSubmit={handleSubmit(handleSubmission)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <LableInput>Họ Và Tên</LableInput>
          <Controller
            disabled={isUserInfor}
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
          item
          xs={12}
          sm={6}
          sx={{
            gap: '10px'
          }}
        >
          <LableInput>Số điện thoại</LableInput>
          <Controller
            disabled={isUserInfor}
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
          sx={{
            gap: '10px'
          }}
          item
          xs={12}
          sm={6}
        >
          <LableInput>Chọn thời gian khám </LableInput>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  {...field}
                  inputFormat="DD/MM/YYYY hh:mm"
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
          xs={12}
          sm={6}
          sx={{
            gap: '10px'
          }}
        >
          <LableInput>Số người</LableInput>
          <Controller
            control={control}
            name="quantity"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Nhập số người"
                type="number"
                error={!!errors.quantity}
                helperText={errors.quantity?.message || ''}
              />
            )}
          />
        </Grid>

        {/* IsEdit */}
        {isEdit && (
          <Grid
            item
            xs={12}
            sm={status === 'đã khám' ? 6 : 12}
            sx={{
              gap: '10px'
            }}
          >
            <LableInput>Trạng thái</LableInput>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  select
                  error={!!errors.status}
                  helperText={errors.status?.message || ''}
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        )}

        {isEdit && status === 'đã khám' && (
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              gap: '10px'
            }}
          >
            <LableInput>Tổng tiền</LableInput>
            <Controller
              control={control}
              name="total_money"
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Nhập số người"
                  type="number"
                  error={!!errors.total_money}
                  helperText={errors.total_money?.message || ''}
                />
              )}
            />
          </Grid>
        )}

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
          {isEdit ? 'Lưu Thông Tin' : 'Đặt lịch'}
        </Button>
      </Grid>
    </form>
  );
};

export default CreateNewSchedule;
