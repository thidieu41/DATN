import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormValue, defaultValues, registerSchema } from './schema';
import { Divider, Grid, Stack, Typography, styled } from '@mui/material';

const LableInput = styled(Typography)(
  () => `
  margin-bottom: 10px;
`
);

const CreateNewPost = () => {
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
    console.log('test', errors);
  };

  console.log(errors);
  return (
    <form onSubmit={handleSubmit(handleSubmission)}>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Stack spacing={2}>
            <Stack>
              <LableInput>Tiêu đề</LableInput>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="Nhập tiêu đề"
                    error={!!errors.name}
                    helperText={errors.name?.message || ''}
                  />
                )}
              />
            </Stack>
            <Stack>
              <LableInput>Thể loại</LableInput>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="Nhập thể loại"
                    error={!!errors.type}
                    helperText={errors.type?.message || ''}
                  />
                )}
              />
            </Stack>
            <Stack>
              <LableInput>Nội dung</LableInput>
              <Controller
                control={control}
                name="content"
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={3}
                    maxRows={6}
                    placeholder="Nhập nội dung"
                    error={!!errors.content}
                    helperText={errors.content?.message || ''}
                  />
                )}
              />
            </Stack>
            <Stack spacing={2}>
              <Typography variant="h4"> Chọn hình ảnh</Typography>
              <Button
                variant="outlined"
                component="label"
                sx={{
                  maxWidth: 200
                }}
              >
                Chọn File
                <input type="file" hidden />
              </Button>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={4} direction={'column'} spacing={2} gap={2}>
          <Stack spacing={2}>
            <Stack spacing={2}>
              <Typography variant="h4">HỖ TRỢ BÀI ĐĂNG</Typography>
              <img
                src="https://blog.logomyway.com/wp-content/uploads/2023/08/chatgpt-logo.png"
                style={{
                  maxHeight: 100
                }}
              />
            </Stack>
            <Stack>
              <LableInput>Tiêu đề nội dung</LableInput>
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="Nhập tiêu đề nội dung"
                    error={!!errors.title}
                    helperText={errors.title?.message || ''}
                  />
                )}
              />
            </Stack>
            <Button variant="outlined">Tìm kiếm nội dung</Button>
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
          Đăng bài
        </Button>
      </Grid>
    </form>
  );
};

export default CreateNewPost;
