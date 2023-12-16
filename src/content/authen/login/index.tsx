import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormValue, defaultValues, loginSchema } from './LoginSchema';
import { Stack, Typography } from '@mui/material';

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormValue, IFormValue>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(loginSchema) as any
  });

  const handleSubmission = (data: IFormValue) => {
    console.log(data);
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
              <TextField {...field} fullWidth placeholder="Nhập email" />
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
              <TextField {...field} fullWidth placeholder="Nhập mật khẩu" />
            )}
          />
        </Stack>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            padding: '10px',
            backgroundColor: '#D4EEFF',
            color: 'black',
            marginTop: '5px',
            fontWeight: 600,
            '&:hover': {
              color: 'white'
            }
          }}
        >
          Đăng Nhập
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
