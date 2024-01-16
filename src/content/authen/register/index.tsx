import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  IRegisterFormValue,
  defaultValues,
  registerSchema
} from './registerSchema';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  styled
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import { User } from 'src/api/auth';
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
  handleChange: (event: any, newValue: number) => void;
}

const RegisterForm = ({ handleSetIsLoading, handleChange }: IProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IRegisterFormValue, IRegisterFormValue>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(registerSchema) as any
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const Register = async (params: IRegisterFormValue) => {
    handleSetIsLoading(true);
    try {
      await User.Register(params);
      toast.success(
        'Đăng ký thành công. Hãy đăng nhập bằng tài khoản đã đăng ký'
      );
      handleChange(null, 0);
    } catch (error) {
      toast.error('Đăng ký không thành công. Vui lòng đăng ký lại!');
    } finally {
      handleSetIsLoading(false);
    }
  };
  const handleSubmission = (data: IRegisterFormValue) => {
    const { confirm_password, ...rest } = data;
    Register(rest);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmission)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <LableInput>Tên</LableInput>
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

        <Grid item xs={12} sm={6}>
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
        </Grid>

        <Grid item xs={12} sm={6}>
          <LableInput>Mật Khẩu </LableInput>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                {...field}
                type={showPassword ? 'text' : 'password'}
                fullWidth
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
        </Grid>

        <Grid item xs={12} sm={6}>
          <LableInput>Nhập lại mật Khẩu </LableInput>
          <Controller
            control={control}
            name="confirm_password"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập lại mật khẩu"
                error={!!errors.confirm_password}
                helperText={errors.confirm_password?.message || ''}
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
        </Grid>
      </Grid>
      <Stack sx={{ maxWidth: '50%', margin: 'auto', marginTop: 2 }}>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            padding: '10px',
            marginTop: '5px'
          }}
        >
          Đăng Ký
        </Button>
      </Stack>

      <Box
        sx={{
          marginTop: '40px'
        }}
      >
        <Divider>Hoặc</Divider>
        <Stack direction="row" spacing={2} marginTop={3}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<FacebookOutlinedIcon />}
            sx={{
              backgroundColor: '#314D69'
            }}
          >
            Đăng ký bằng Facebook
          </Button>
          <Button
            variant="contained"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{
              backgroundColor: '#D75144'
            }}
          >
            Đăng ký bằng Google
          </Button>
        </Stack>
      </Box>
    </form>
  );
};

export default RegisterForm;
