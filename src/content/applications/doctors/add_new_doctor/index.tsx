import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormValue, defaultValues, categorySchema } from './schema';
import { Box, Grid, Stack, Typography, styled } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IDoctor } from 'src/interface/doctor';

const LableInput = styled(Typography)(
  () => `
  margin-bottom: 10px;
`
);

interface IProps {
  details: IDoctor;
}

const DoctorFormComp = ({ details }: IProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormValue, IFormValue>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(categorySchema) as any
  });

  const handleSubmission = (data: IFormValue) => {
    console.log('data', data);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmission)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <LableInput>Họ và tên</LableInput>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Nhập tên bác sĩ"
                error={!!errors.name}
                helperText={errors.name?.message || ''}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LableInput>Ngày sinh</LableInput>
          <Controller
            control={control}
            name="date"
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
                      error={!!errors.date}
                      helperText={errors.date?.message || ''}
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <LableInput>Số điện thoại</LableInput>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Nhập số điện thoại"
                error={!!errors.name}
                helperText={errors.name?.message || ''}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <LableInput>Email</LableInput>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Nhập email"
                error={!!errors.name}
                helperText={errors.name?.message || ''}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <LableInput>Bằng cấp</LableInput>
          <Controller
            control={control}
            name="degree"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={10}
                placeholder="Nhập thông tin bằng cấp"
                error={!!errors.degree}
                helperText={errors.degree?.message || ''}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <LableInput>Chức vụ</LableInput>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="Nhập chức vụ"
                    error={!!errors.name}
                    helperText={errors.name?.message || ''}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <LableInput>Hình ảnh bằng cấp</LableInput>
              <Stack spacing={1} direction={'row'}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{
                    maxWidth: 130
                  }}
                  size="small"
                >
                  Chọn ảnh
                  <input type="file" hidden />
                </Button>
                <Stack
                  direction={'row'}
                  spacing={1}
                  sx={{
                    overflow: 'scroll'
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative'
                    }}
                  >
                    <img
                      src="https://bocity.vn/thumbs/540x540x1/upload/product/anh-chup-man-hinh-2022-08-18-luc-004214-8790.png"
                      className="information-img"
                      style={{
                        opacity: 1,
                        height: 130,
                        width: 130,
                        display: 'block',
                        transition: '0.5s ease',
                        backfaceVisibility: 'hidden'
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -10,
                        right: -10,
                        backgroundColor: 'white',
                        height: 35,
                        borderRadius: 8,
                        cursor: 'pointer'
                      }}
                    >
                      <RemoveCircleIcon
                        fontSize="large"
                        sx={{
                          color: 'red'
                        }}
                        onClick={() => {
                          console.log('test remove');
                        }}
                      />
                    </Box>
                  </Box>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
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

export default DoctorFormComp;
