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
  scheduleEditSchema,
  scheduleSchema,
  scheduledefaultValues,
  statusOptions
} from '../constants';
import { toast } from 'react-toastify';
import { ClientAPI } from 'src/api';
import { IBrachProps } from 'src/interface/branchs';
import {
  IPostCategoriesProps,
  IDetailsCategoriesProps
} from 'src/interface/categories';
import { handleObjectKeyData } from 'src/utils/constanst';
import { IFormValueScheduleProps } from 'src/interface/booking';

const LableInput = styled(Typography)(() => `margin-bottom: 10px`);
const GridItem = styled(Grid)(() => ``);

const CreateNewSchedule = () => {
  const location = useLocation();

  const [isEdit, setIsEdit] = useState(false);
  const [isUser, setIsUserInfor] = useState(false);
  const [scheduleId, setScheduleId] = useState('');
  const [branchList, setBranchList] = useState<{
    [key: string]: IBrachProps;
  }>({});
  const [categories, setCategories] = useState<IPostCategoriesProps[]>([]);
  const [detailsCategories, setDetailsCategories] = useState<
    IDetailsCategoriesProps[]
  >([]);

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

  const status = watch('status');
  const category = watch('category');
  const branch = watch('branch');

  const handleSubmission = async (data: IFormValueScheduleProps) => {
    try {
      let res: any;
      const { category, branch, date, ...rest } = data;
      const dateTime = new Date(date).getTime().toString();
      const params = {
        ...rest,
        is_user: false,
        date: Number(dateTime.slice(0, dateTime.length - 3))
      };
      if (isEdit) {
        res = await ClientAPI.update(`/app/bookings/${scheduleId}`, params);
      } else {
        res = await ClientAPI.add('/app/bookings/', {
          ...params,
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
        branch,
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
        total_money,
        room,
        branch
      };
      reset(defaultValues);
    }
  };

  const handleGetBranchs = async () => {
    const res = await ClientAPI.getAll('/dental/branches/');
    const data = handleObjectKeyData(res.data.results);
    setBranchList(data);
    setValue('branch', res.data?.results[0]?.id);
  };

  const handleGetAllCategories = async () => {
    const res = await ClientAPI.getAll('/app/menus/');
    setCategories(res.data);
    setValue('category', res.data[0]?.id);
  };

  const handleGetAllDetailsCategories = async () => {
    const res = await ClientAPI.getAll(`/app/menu-items/?menu=${category}`);
    setDetailsCategories(res.data);
  };

  useEffect(() => {
    onGetScheduleDetails();
    handleGetBranchs();
    handleGetAllCategories();
  }, []);

  useEffect(() => {
    handleGetAllDetailsCategories();
  }, [category]);

  console.log();
  return (
    <form onSubmit={handleSubmit(handleSubmission)}>
      <Grid container spacing={2}>
        <GridItem item xs={12} sm={6}>
          <LableInput>Họ Và Tên</LableInput>
          <Controller
            control={control}
            name="booking_name"
            render={({ field }) => (
              <TextField
                {...field}
                disabled={isUser}
                fullWidth
                placeholder="Nhập tên"
                error={!!errors.booking_name}
                helperText={errors.booking_name?.message || ''}
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

        <GridItem item xs={12} sm={category ? 6 : 12}>
          <LableInput>Danh mục</LableInput>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Nhập số người"
                select
                error={!!errors.category}
                helperText={errors.category?.message || ''}
              >
                {(categories || []).map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </GridItem>

        {category && (
          <GridItem item xs={12} sm={6}>
            <LableInput>Chi tiết danh mục</LableInput>
            <Controller
              control={control}
              name="item"
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  select
                  placeholder="Nhập số người"
                  error={!!errors.item}
                  helperText={errors.item?.message || ''}
                >
                  {(detailsCategories || []).map((details) => (
                    <MenuItem key={details.id} value={details.id}>
                      {details.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </GridItem>
        )}

        <GridItem item xs={12} sm={branch ? 6 : 12}>
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
                {Object.values(branchList).map((branch) => (
                  <MenuItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </GridItem>
        {branch && (
          <GridItem item xs={12} sm={6}>
            <LableInput>Chọn phòng</LableInput>
            <Controller
              control={control}
              name="room"
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  select
                  placeholder="Nhập số phòng"
                  error={!!errors.room}
                  helperText={errors.room?.message || ''}
                >
                  {(branchList[branch]?.branch_room || []).map((branch) => (
                    <MenuItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </GridItem>
        )}

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
