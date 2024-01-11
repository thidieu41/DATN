import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, doctorSchema } from './schema';
import { Box, Grid, Stack, Typography, styled } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IDoctor, IDoctorFormValue } from 'src/interface/doctor';
import { useEffect, useState } from 'react';
import { fileImageToBase64 } from 'src/utils/constanst';
import { ClientAPI } from 'src/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const LableInput = styled(Typography)(() => `margin-bottom: 10px`);

interface IUrlImageProps {
  id: number;
  url: string;
}
interface IProps {
  details: IDoctor;
  handleSetIsLoading: (newValue: boolean) => void;
}

const DoctorFormComp = ({ details, handleSetIsLoading }: IProps) => {
  const [listUrlImage, setListUrlImage] = useState<IUrlImageProps[]>([]);
  const [errorsImg, setErrorsImg] = useState(false);

  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IDoctorFormValue, IDoctorFormValue>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(doctorSchema) as any
  });

  const handleSetImage = async (e: any) => {
    setErrorsImg(false);
    const file = e.target.files[0];
    const base64Url: any = await fileImageToBase64(file);
    const urlImage = [
      ...listUrlImage,
      {
        id: listUrlImage.length,
        url: base64Url
      }
    ];
    setListUrlImage(urlImage);
  };

  const handleRemoveImage = (id: number) => {
    const data = listUrlImage.filter((item) => item.id !== id);
    setListUrlImage(data);
  };

  const handleSubmission = async (data: IDoctorFormValue) => {
    if (listUrlImage.length === 0) {
      setErrorsImg(true);
    } else {
      handleSetIsLoading(true);
      const images = listUrlImage.map((item) => item.url);
      const { DoB } = data;
      const date = new Date(DoB).getTime().toString();

      try {
        const params = {
          ...data,
          images,
          DoB: Number(date.slice(0, date.length - 3))
        };
        if (details) {
          await ClientAPI.update(`/core/doctors/${details.id}/`, params);
        } else {
          await ClientAPI.add(`/core/doctors/`, params);
        }

        navigate('/admin/bac-si');
      } catch (res) {
        toast.error(details ? 'Lỗi cập nhật bác sĩ' : 'Lỗi thêm bác sĩ mới!');
      } finally {
        handleSetIsLoading(false);
      }
    }
  };

  const handleSetDetails = () => {
    const { DoB, degree_infor, email, name, phone, position } = details;
    reset({ DoB, degree_infor, email, name, phone, position });
    const urlImgs = (details.doctor_detail || []).map((item, index) => {
      return {
        id: item.id,
        url: item.image
      };
    });
    setListUrlImage(urlImgs);
  };

  useEffect(() => {
    if (details) {
      handleSetDetails();
    }
  }, [details]);

  console.log(listUrlImage);

  return (
    <>
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
            <LableInput>Bằng cấp</LableInput>
            <Controller
              control={control}
              name="degree_infor"
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={10}
                  placeholder="Nhập thông tin bằng cấp"
                  error={!!errors.degree_infor}
                  helperText={errors.degree_infor?.message || ''}
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
                  name="position"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      placeholder="Nhập chức vụ"
                      error={!!errors.position}
                      helperText={errors.position?.message || ''}
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
                    sx={{
                      height: 130,
                      minWidth: 130
                    }}
                  >
                    Chọn ảnh
                    <input type="file" hidden onChange={handleSetImage} />
                  </Button>
                  <Stack
                    direction={'row'}
                    spacing={1}
                    sx={{
                      overflow: 'scroll'
                    }}
                  >
                    {listUrlImage.map((url, index) => (
                      <Box
                        sx={{
                          position: 'relative',
                          border: '1px solid #318A79',
                          borderRadius: 1
                        }}
                        key={index}
                      >
                        <img
                          src={url.url}
                          className="information-img"
                          style={{
                            padding: 4,
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
                            onClick={() => handleRemoveImage(url.id)}
                          />
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Stack>
                {errorsImg && (
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: 'red',
                      mt: 1
                    }}
                  >
                    <b> Không được để trống hình ảnh</b>
                  </Typography>
                )}
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
    </>
  );
};

export default DoctorFormComp;
