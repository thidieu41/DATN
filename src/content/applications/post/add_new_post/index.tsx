import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormValue, defaultValues, registerSchema } from './schema';
import { Grid, MenuItem, Stack, Typography, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { ICategoryProps } from 'src/utils/schema';
import { createClient } from 'src/utils/axios';
import { useNavigate } from 'react-router-dom';
import { getBase64 } from 'src/utils/constanst';
import { LoadingButton } from '@mui/lab';

const LableInput = styled(Typography)(
  () => `
  margin-bottom: 10px;
`
);

const CreateNewPost = () => {
  const [categoryList, setCategory] = useState<ICategoryProps[]>([]);
  const [title, setTitle] = useState('');
  const [fileImg, setFileImg] = useState<File>();
  const [previewImg, setPreviewImg] = useState();
  const [errorsMess, setErrorsMess] = useState<{
    titlecontent: string;
    urlImgerr: string;
  }>({
    titlecontent: '',
    urlImgerr: ''
  });
  const [loading, setLoading] = useState('');

  const axios = createClient();
  const navigation = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<IFormValue, IFormValue>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(registerSchema) as any
  });

  const handleGetCategory = async () => {
    await axios
      .get('post/categories/')
      .then((res) => {
        setCategory(res.data.results);
        setValue('category', res.data.results[0]?.id);
      })
      .catch((error) => {
        console.log(error?.message);
      });
  };

  const handleGetContent = async () => {
    if (!title) {
      setErrorsMess({
        ...errorsMess,
        titlecontent: 'Vui lòng nhập tiêu đề nội dung'
      });
    } else {
      setLoading('chatGPTbtn');
      await axios
        .post('/openAI/GPT/get-response-by-text', {
          user_input: title
        })
        .then((res) => {
          setLoading('');
          setValue('content', res.data.data);
        })
        .catch((error) => {
          setLoading('');
          console.log(error?.message);
        });
    }
  };

  const handleSetImage = async (e: any) => {
    const file = e.target.files[0];
    setFileImg(file);
    const base64Url: any = await getBase64(file);
    setPreviewImg(base64Url);
    setErrorsMess({
      titlecontent: errorsMess.urlImgerr,
      urlImgerr: ''
    });
  };

  const handleSubmission = (data: IFormValue) => {
    if (!fileImg) {
      setErrorsMess({
        titlecontent: errorsMess.titlecontent,
        urlImgerr: 'Không được để trống hình ảnh'
      });
    } else {
      setLoading('submitBtn');
      const { category, content, title } = data;

      const formData = new FormData();
      formData.append('category', category);
      formData.append('content', content);
      formData.append('title', title);
      formData.append('image', fileImg, fileImg.name);

      axios
        .post('post/posts/', formData, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then((res) => {
          setLoading('');
          navigation('/admin/bai-viet');
        })
        .catch((error) => {
          setLoading('');
          console.log(error?.message);
        });
    }
  };

  useEffect(() => {
    handleGetCategory();
  }, []);

  return (
    <form onSubmit={handleSubmit(handleSubmission)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Stack>
            <LableInput>Tiêu đề</LableInput>
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Nhập tiêu đề"
                  error={!!errors.title}
                  helperText={errors.title?.message || ''}
                />
              )}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <LableInput>Thể loại</LableInput>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                placeholder="Nhập thể loại"
                error={!!errors.category}
                helperText={errors.category?.message || ''}
              >
                {(categoryList || []).map((option, key) => (
                  <MenuItem key={key} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            spacing={4}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column-reverse', md: 'row' }
            }}
          >
            <Grid item xs={12} md={7}>
              <LableInput>Nội dung</LableInput>
              <Controller
                control={control}
                name="content"
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={12}
                    maxRows={15}
                    placeholder="Nhập nội dung hoặc sử dụng chatGPT"
                    error={!!errors.content}
                    helperText={errors.content?.message || ''}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
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
                  <TextField
                    fullWidth
                    placeholder="Nhập tiêu đề nội dung"
                    value={title}
                    onChange={(e) => {
                      setErrorsMess({
                        titlecontent: '',
                        urlImgerr: errorsMess.urlImgerr
                      });
                      setTitle(e.target.value);
                    }}
                  />
                  {errorsMess.titlecontent && (
                    <Typography
                      sx={{
                        color: 'red',
                        fontWeight: 600,
                        mt: 1
                      }}
                    >
                      {errorsMess.titlecontent}
                    </Typography>
                  )}
                </Stack>
                <LoadingButton
                  type="button"
                  loading={loading === 'chatGPTbtn'}
                  onClick={handleGetContent}
                  sx={{
                    border: '1px solid #308a79'
                  }}
                >
                  Tìm kiếm nội dung
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Chọn hình ảnh
          </Typography>
          <Stack
            spacing={2}
            direction={'row'}
            sx={{
              maxWidth: 130,
              maxHeight: 130
            }}
          >
            {previewImg && (
              <img
                src={previewImg}
                className="information-img"
                style={{
                  width: '100%',
                  opacity: 1,
                  display: 'block',
                  transition: '0.5s ease',
                  backfaceVisibility: 'hidden',
                  border: '1px solid #308a79',
                  borderRadius: 8
                }}
              />
            )}

            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{
                whiteSpace: 'nowrap',
                minWidth: 130
              }}
            >
              Chọn File
              <input type="file" hidden onChange={handleSetImage} />
            </Button>
          </Stack>
          {errorsMess.urlImgerr && (
            <Typography
              sx={{
                color: 'red',
                fontWeight: 600,
                mt: 1
              }}
            >
              {errorsMess.urlImgerr}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Stack
        sx={{
          maxWidth: '60%',
          margin: 'auto',

          marginTop: 3
        }}
      >
        <LoadingButton
          type="submit"
          variant="contained"
          fullWidth
          loading={loading === 'submitBtn'}
          sx={{
            padding: '10px'
          }}
        >
          Đăng bài
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default CreateNewPost;
