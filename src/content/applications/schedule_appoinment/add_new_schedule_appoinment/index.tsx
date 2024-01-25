import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Grid,
  InputAdornment,
  MenuItem,
  Typography,
  styled
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
  scheduleEditSchema,
  scheduleSchema,
  scheduledefaultValues,
  statusOptions,
  userScheduleSchema
} from '../constants';
import { toast } from 'react-toastify';
import { ClientAPI } from 'src/api';
import { IBrachProps } from 'src/interface/branchs';
import {
  IPostCategoriesProps,
  IDetailsCategoriesProps
} from 'src/interface/categories';
import { handleObjectKeyData } from 'src/utils/constanst';
import { IFormValueScheduleProps, IScheduleProps } from 'src/interface/booking';
import { IProfileProps } from 'src/interface/profile';
import BackDropComponent from 'src/components/BackDrop';
import { set } from 'date-fns';

const LableInput = styled(Typography)(() => `margin-bottom: 10px`);
const GridItem = styled(Grid)(() => ``);

interface IProps {
  is_user: boolean;
}

const CreateNewSchedule = ({ is_user }: IProps) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
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

  const navigate = useNavigate();
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
    resolver: yupResolver(
      isEdit
        ? scheduleEditSchema
        : is_user
        ? userScheduleSchema
        : scheduleSchema
    ) as any
  });

  const status = watch('status');
  const category = watch('category');
  const branch = watch('branch');
  const service = watch('item');

  const handleSubmission = async (data: IFormValueScheduleProps) => {
    setIsLoading(true);
    try {
      let res: any;
      const { category, branch, service_money, date, ...rest } = data;
      const dateTime = new Date(date).getTime().toString();
      const params = {
        ...rest,
        is_user,
        date: Number(dateTime.slice(0, dateTime.length - 3))
      };
      if (isEdit) {
        res = await ClientAPI.update(`/app/bookings/${scheduleId}/`, params);
      } else {
        let currentTime = new Date()
        let unit = currentTime.getTime()
        if (Number(params.date) <= Math.floor(unit/1000)){
          toast.error("Ngày đặt không được bé hơn ngày hiện tại")
        }else{
          res = await ClientAPI.add('/app/bookings/', {
            ...params,
            status: 'chưa khám'
          });
          navigate(is_user ? '/' : '/admin/lich-kham');
          toast.success(
            isEdit ? 'Cập nhật lịch khám thành công' : 'Tạo lịch khám thành công'
          );
        }
      }
    } catch (error) {
      toast.error(isEdit ? 'Lỗi cập nhật lịch khám' : 'Lỗi đặt lịch khám');
    } finally {
      setIsLoading(false);
    }
  };

  const onGetScheduleDetails = async () => {
    setIsLoading(true);
    try {
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
          incurred,
          status,
          reason,
          user,
          booking_name,
          phone,
          is_user,
          room,
          item
        } = data as IScheduleProps;
        setIsUserInfor(is_user);
        const defaultValues = {
          date,
          quantity,
          reason,
          booking_name: is_user ? user?.name : booking_name,
          phone: is_user ? user?.phone : phone,
          status,
          total_money,
          incurred,
          room: room?.id.toString(),
          branch: room?.branch?.id.toString(),
          category: item.menu.id.toString(),
          item: item?.id?.toString()
        };
        reset(defaultValues);
      }
    } catch (error) {
      toast.error(
        'Không thể lấy thông tin chi tiết lịch khám. Vui lòng tải lại trang!'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetBranchs = async () => {
    const res = await ClientAPI.getAll('/dental/branches/?all=true');
    const data = handleObjectKeyData(res.data);
    setBranchList(data);
    if (Object.values(data).length > 0) {
      setValue('branch', res.data[0]?.id);
      if ((res.data[0]?.branch_room || []).length > 0) {
        setValue('room', res.data[0]?.branch_room[0]?.id);
      } else {
        toast.error('Hãy thêm phòng cho chi nhánh này');
      }
    } else {
      toast.error('Hãy tạo chi nhánh trước khi chọn lịch');
    }
  };

  const handleGetAllCategories = async () => {
    const res = await ClientAPI.getAll('/app/menus/');
    setCategories(res.data);
    if (res.data.length > 0) {
      setValue('category', res.data[0]?.id);
    } else {
      toast.error('Hãy thêm danh mục trước khi chọn lịch');
    }
  };

  const handleGetAllDetailsCategories = async () => {
    const res = await ClientAPI.getAll(`/app/menu-items/?menu=${category}`);
    setDetailsCategories(res.data);
    if (res.data.length > 0) {
      setValue('service_money', res.data[0]?.price || 0);
      setValue('item', res.data[0]?.id);
    } else {
      toast.error('Hãy thêm chi tiết danh mục trước khi chọn lịch');
    }
  };

  useEffect(() => {
    onGetScheduleDetails();
    handleGetBranchs();
    handleGetAllCategories();
  }, []);

  useEffect(() => {
    handleGetAllDetailsCategories();
  }, [category]);

  const handleGetProfileData = () => {
    const profileData = JSON.parse(
      localStorage.getItem('profile') || '{}'
    ) as IProfileProps;
    setValue('booking_name', profileData.name || '');
    setValue('phone', profileData.phone || '');
  };

  useEffect(() => {
    if (is_user) {
      handleGetProfileData();
    }
  }, [is_user]);

  useEffect(() => {
    const service_price = detailsCategories.find((item) => item.id === service);
    setValue('service_money', service_price?.price || 0);
  }, [service]);
  return (
    <>
      <form onSubmit={handleSubmit(handleSubmission)}>
        <Grid container spacing={2}>
          {!is_user && (
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
          )}

          {!is_user && (
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
          )}

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

          <GridItem item xs={12} sm={isEdit ? 6 : 12}>
            <LableInput>Tiền dịch vụ</LableInput>
            <Controller
              control={control}
              name="service_money"
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  disabled
                  placeholder="Nhập số người"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">(VND)</InputAdornment>
                    )
                  }}
                />
              )}
            />
          </GridItem>

          {isEdit && (
            <GridItem item xs={12} sm={6}>
              <LableInput>Thụ phí khác</LableInput>
              <Controller
                control={control}
                name="incurred"
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="Nhập thụ phí khác"
                    error={!!errors.incurred}
                    helperText={errors.incurred?.message || ''}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">(VND)</InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </GridItem>
          )}

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
            <GridItem item xs={12} sm={6}>
              <LableInput>Tổng tiền</LableInput>
              <Controller
                control={control}
                name="total_money"
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="Nhập số người"
                    error={!!errors.total_money}
                    helperText={errors.total_money?.message || ''}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">(VND)</InputAdornment>
                      )
                    }}
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
      <BackDropComponent open={isLoading} />
    </>
  );
};

export default CreateNewSchedule;
