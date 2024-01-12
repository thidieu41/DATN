import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormValue, defaultValues, profileSchema } from './schema';
import {
  Avatar,
  Grid,
  MenuItem,
  Stack,
  Typography,
  styled
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import { fileImageToBase64 } from 'src/utils/constanst';
import BackDropComponent from 'src/components/BackDrop';
import { toast } from 'react-toastify';
import { ClientAPI } from 'src/api';
import { IProfileProps } from 'src/interface/profile';

const LableInput = styled(Typography)(
  () => `
  margin-bottom: 10px;
`
);
const genderList = [
  { name: 'Nam', value: 'male' },
  { name: 'Nữ', value: 'female' }
];

const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState('');
  const [errorsMess, setErrorsMess] = useState(false);
  const [profileInfor, setProfileInfor] = useState<IProfileProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IFormValue, IFormValue>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(profileSchema) as any
  });

  const handleSetImage = async (e: any) => {
    const file = e.target.files[0];
    const base64Url: any = await fileImageToBase64(file);
    setPreviewImg(base64Url);
    setErrorsMess(false);
  };

  const handleSubmission = async (data: IFormValue) => {
    if (!previewImg) {
      setErrorsMess(true);
    } else {
      setIsLoading(true);
      try {
        const { DoB, gender, ...rest } = data;
        const date = new Date(DoB).getTime().toString();

        const params = {
          ...rest,
          id: profileInfor.id,
          role: profileInfor.role.id,
          avatar: previewImg,
          is_male: gender === 'male' ? true : false,
          DoB: Number(date)
        };

        await ClientAPI.update(`users/me`, params);
        toast.success('Lưu thông tin cá nhân thành công');
      } catch (error) {
        toast.error('Lỗi lưu thông tin cá nhân');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResetDataProfile = () => {
    const data = JSON.parse(
      localStorage.getItem('profile') || '{}'
    ) as IProfileProps;
    setProfileInfor(data);
    const { email, name, phone, is_male, addr, DoB, avatar } = data;
    reset({
      name,
      email,
      phone,
      gender: is_male ? 'male' : 'female',
      addr,
      DoB
    });
    setPreviewImg(avatar);
  };
  useEffect(() => {
    handleResetDataProfile();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmission)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <Stack
                spacing={2}
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <LableInput>Ảnh đại diện</LableInput>
                <Avatar
                  alt="Remy Sharp"
                  src={previewImg}
                  sx={{ width: 120, height: 120 }}
                />
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{
                    maxWidth: 160
                  }}
                  size="small"
                >
                  Chọn File
                  <input type="file" hidden onChange={handleSetImage} />
                </Button>
                {errorsMess && (
                  <Typography
                    sx={{ color: 'red', fontWeight: 600 }}
                    variant="body2"
                  >
                    Vui lòng thêm hình ảnh
                  </Typography>
                )}
              </Stack>

              <Stack>
                <LableInput>Họ và tên</LableInput>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      placeholder="Nhập họ và tên"
                      error={!!errors.name}
                      helperText={errors.name?.message || ''}
                    />
                  )}
                />
              </Stack>
              <Stack>
                <LableInput>Email</LableInput>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      placeholder="Nhập email"
                      error={!!errors.email}
                      helperText={errors.email?.message || ''}
                    />
                  )}
                />
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={6} direction={'column'} spacing={2} gap={2}>
            <Stack spacing={2}>
              <Stack>
                <LableInput>Giới tính</LableInput>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      select
                      error={!!errors.gender}
                      helperText={errors.gender?.message || ''}
                    >
                      {genderList.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Stack>
              <Stack>
                <LableInput>Ngày sinh</LableInput>
                <Controller
                  control={control}
                  name="DoB"
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        {...field}
                        inputFormat="DD-MM-YYYY"
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            {...params}
                            placeholder="Nhập thời gian khám"
                            error={!!errors.DoB}
                            helperText={errors.DoB?.message || ''}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Stack>
              <Stack>
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
              </Stack>
              <Stack>
                <LableInput>Địa chỉ</LableInput>
                <Controller
                  control={control}
                  name="addr"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={3}
                      maxRows={4}
                      placeholder="Nhập địa chỉ"
                      error={!!errors.addr}
                      helperText={errors.addr?.message || ''}
                    />
                  )}
                />
              </Stack>
            </Stack>
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

export default EditProfile;
