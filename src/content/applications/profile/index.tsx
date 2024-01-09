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
import { useState } from 'react';

import dayjs from 'dayjs';

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
  const [value, setValue] = useState(dayjs('2022-04-17T15:30'));
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormValue, IFormValue>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(profileSchema) as any
  });

  const handleSubmission = (data: IFormValue) => {
    console.log('test', errors);
  };

  return (
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
                src="/static/images/avatars/4.jpg"
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
                <input type="file" hidden />
              </Button>
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
                name="dateofbirth"
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={value}
                      inputFormat="DD-MM-YYYY"
                      onChange={(newValue) => setValue(newValue)}
                      renderInput={(params) => <TextField {...params} />}
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
                name="address"
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={3}
                    maxRows={4}
                    placeholder="Nhập địa chỉ"
                    error={!!errors.address}
                    helperText={errors.address?.message || ''}
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
  );
};

export default EditProfile;
