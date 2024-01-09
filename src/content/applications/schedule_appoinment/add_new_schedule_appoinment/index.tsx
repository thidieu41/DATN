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
import { ClientAPI } from 'src/api';
import { IBrachProps } from 'src/interface/branchs';

const LableInput = styled(Typography)(
  () => `
  margin-bottom: 10px;
`
);
const GridItem = styled(Grid)(
  () => `
  gap: 10px
`
);

const CreateNewSchedule = () => {
  const location = useLocation();

  const [isEdit, setIsEdit] = useState(false);
  const [isUser, setIsUserInfor] = useState(false);
  const [scheduleId, setScheduleId] = useState('');
  const [branchList, setBranchList] = useState<IBrachProps[]>([]);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors }
  } = useForm<IFormValueScheduleProps, IFormValueScheduleProps>({
    mode: 'onChange',
    defaultValues: scheduledefaultValues,
    resolver: yupResolver(isEdit ? scheduleEditSchema : scheduleSchema) as any
  });

  const handleSubmission = async (data: IFormValueScheduleProps) => {
    try {
      let res: any;
      if (isEdit) {
        res = await ClientAPI.update(`/app/bookings/${scheduleId}`, data);
      } else {
        res = await ClientAPI.add('/app/bookings/', {
          ...data,
          status: 'chưa khám'
        });
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
    const dataId = listPath[listPath.length - 1];
    if (!isNaN(Number(dataId))) {
      setIsEdit(true);
      setScheduleId(dataId);
      const { data } = await ClientAPI.getDetails(`/app/bookings/${dataId}/`);
      const {
        date,
        quantity,
        total_money,
        status,
        reason,
        user,
        name,
        phone,
        is_user,
        room
      } = data;
      setIsUserInfor(is_user);
      const defaultValues = {
        date,
        quantity,
        reason,
        name: is_user ? user?.name : name,
        phone: is_user ? user?.phone : phone,
        status,
        total_money
      };
      reset(defaultValues);
    }
  };

  const handleGetBranchs = async () => {
    const res = await ClientAPI.getAll('/dental/branches/');
    setBranchList(res.data.results);
    setValue('branch', res.data?.results[0]?.id);
  };

  useEffect(() => {
    onGetScheduleDetails();
    handleGetBranchs();
  }, []);

  const status = watch('status');

  return (
    <form onSubmit={handleSubmit(handleSubmission)}>
      <Grid container spacing={2}>
        <GridItem item xs={12} sm={6}>
          <LableInput>Họ Và Tên</LableInput>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextField
                {...field}
                disabled={isUser}
                fullWidth
                placeholder="Nhập tên"
                error={!!errors.name}
                helperText={errors.name?.message || ''}
              />
            )}
          />
        </GridItem>

        <GridItem item xs={12} sm={6}>
          <LableInput>Số điện thoại</LableInput>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <TextField
                {...field}
                disabled={isUser}
                fullWidth
                placeholder="Nhập số điện thoại"
                error={!!errors.phone}
                helperText={errors.phone?.message || ''}
              />
            )}
          />
        </GridItem>

        <GridItem item xs={12} sm={6}>
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
        </GridItem>

        <GridItem item xs={12} sm={6}>
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
        </GridItem>
        <GridItem item xs={12} sm={6}>
          <LableInput>Chi nhánh</LableInput>
          <Controller
            control={control}
            name="branch"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Nhập số người"
                error={!!errors.branch}
                helperText={errors.branch?.message || ''}
                select
              >
                {branchList.map((branch) => (
                  <MenuItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </GridItem>

        <GridItem item xs={12} sm={6}>
          <LableInput>Chọn phòng</LableInput>
          <Controller
            control={control}
            name="room"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Nhập số phòng"
                error={!!errors.room}
                helperText={errors.room?.message || ''}
              />
            )}
          />
        </GridItem>

        {/* IsEdit */}
        {isEdit && (
          <GridItem
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
          </GridItem>
        )}

        {isEdit && status === 'đã khám' && (
          <GridItem
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
          </GridItem>
        )}

        <GridItem item xs={12}>
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
          {isEdit ? 'Lưu Thông Tin' : 'Đặt lịch'}
        </Button>
      </Grid>
    </form>
  );
};

export default CreateNewSchedule;
