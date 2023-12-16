import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormValue, defaultValues, registerSchema } from './registerSchema';
import { Box, Divider, Stack, Typography } from '@mui/material';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormValue, IFormValue>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(registerSchema) as any
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

        <Stack
          sx={{
            gap: '10px'
          }}
        >
          <Typography>Nhập lại mật Khẩu </Typography>
          <Controller
            control={control}
            name="confirm_password"
            render={({ field }) => (
              <TextField {...field} fullWidth placeholder="Nhập lại mật khẩu" />
            )}
          />
        </Stack>

        <Stack
          sx={{
            gap: '10px'
          }}
        >
          <Typography>Số điện thoại</Typography>
          <Controller
            control={control}
            name="phone_number"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Nhập số điện thoại"
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
            backgroundColor: '#D4EEFF',
            color: 'black',
            marginTop: '5px',
            fontWeight: 600,
            '&:hover': {
              color: 'white'
            }
          }}
        >
          Đăng Ký
        </Button>
      </Stack>
      <Box
        sx={{
          margin: '20px 0px'
        }}
      >
        <Divider>Hoặc</Divider>
        <Stack direction="row" spacing={2} marginTop={3}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<FacebookOutlinedIcon />}
            sx={{
              backgroundColor: '#314D69',
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
