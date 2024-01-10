import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormValue, defaultValues, loginSchema } from './LoginSchema';
import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { User } from 'src/api/auth';
import { setClientToken } from 'src/utils/axios';

const LoginForm = () => {
  const navigation = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormValue, IFormValue>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(loginSchema) as any
  });
  const routerPrefetch = (role) => {
    switch (role) {
      case 2:
        navigation('/');
        break;
      case 1:
        navigation('/admin');
        break;
    }
  };
  const setProfile = async () => {
    const response = await User.Profile();
    if (response.status === 200) {
      localStorage.setItem('profile', JSON.stringify(response.data));
      const dataRole = response.data.role?.name ? response.data.role.name : null
      routerPrefetch(dataRole);
    }
  };
  const Login = async (email, password) => {
    const response = await User.Login(email, password);
    if (response.status === 200) {
      setClientToken(response.data.access);
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      setProfile();
    }
  };
  const handleSubmission = (data: IFormValue) => {
    Login(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmission)}>
      <Stack sx={{ gap: '20px', maxWidth: '400px', margin: 'auto' }}>
        <Stack
          sx={{
            gap: '10px'
          }}
        >
          <Typography>Email</Typography>
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
        <Stack
          sx={{
            gap: '10px'
          }}
        >
          <Typography>Mật Khẩu </Typography>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Nhập mật khẩu"
                error={!!errors.password}
                helperText={errors.password?.message || ''}
              />
            )}
          />
        </Stack>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            padding: '10px',
            marginTop: '5px'
          }}
        >
          Đăng Nhập
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
