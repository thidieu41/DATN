import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ILoginFormValue, defaultValues, loginSchema } from './LoginSchema';
import {
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  styled
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useNavigate } from 'react-router-dom';
import { User } from 'src/api/auth';
import { setClientToken } from 'src/utils/axios';
import { toast } from 'react-toastify';
import { useState } from 'react';

const LableInput = styled(Typography)(
  () => `
  margin-bottom: 10px;
  font-weight:600
  `
);
interface IProps {
  handleSetIsLoading: (newValue: boolean) => void;
}
const LoginForm = ({ handleSetIsLoading }: IProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ILoginFormValue, ILoginFormValue>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(loginSchema) as any
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const routerPrefetch = (role) => {
    switch (role) {
      case 2:
        navigation('/');
        break;
      case 1:
        navigation('/admin/bac-si');
        break;
    }
  };
  const setProfile = async () => {
    const response = await User.Profile();
    if (response.status === 200) {
      localStorage.setItem('profile', JSON.stringify(response.data));
      const dataRole = response.data.role?.name
        ? response.data.role.name
        : null;
      routerPrefetch(dataRole);
    }
  };
  const Login = async (data: ILoginFormValue) => {
    handleSetIsLoading(true);
    try {
      const response = await User.Login(data);
      setClientToken(response.data.access);
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      setProfile();
    } catch (error) {
      toast.error('Đăng nhập thất bại. Vui lòng thử lại lần nữa!');
    } finally {
      handleSetIsLoading(false);
    }
  };
  const handleSubmission = (data: ILoginFormValue) => {
    Login(data);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmission)}>
      <Stack sx={{ gap: '20px', maxWidth: '400px', margin: 'auto' }}>
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
        <Stack>
          <LableInput>Mật Khẩu </LableInput>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu"
                error={!!errors.password}
                helperText={errors.password?.message || ''}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffOutlinedIcon fontSize="small" />
                        ) : (
                          <VisibilityOutlinedIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
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
