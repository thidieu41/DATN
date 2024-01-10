import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormValue, defaultValues, registerSchema } from './schema';
import { Grid, MenuItem, Stack, Typography, styled } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { ICategoryProps } from 'src/utils/schema';
import { createClient } from 'src/utils/axios';
import { useNavigate } from 'react-router-dom';
import { fileImageToBase64, urlImageToBase64 } from 'src/utils/constanst';
import { LoadingButton } from '@mui/lab';
import BackDropComponent from 'src/components/BackDrop';
import { IPostProps } from 'src/interface/posts';
import { createOpenAIClient } from 'src/utils/openai';
import { toast } from 'react-toastify';

const LableInput = styled(Typography)(
  () => `
  margin-bottom: 10px;
`
);

interface IProps {
  details: IPostProps;
}
const CreateNewPost = ({ details }: IProps) => {
  const [categoryList, setCategory] = useState<ICategoryProps[]>([]);
  const [title, setTitle] = useState('');
  const [previewImg, setPreviewImg] = useState('');
  const messagesEndRef = useRef(null);
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
  const textarea = useRef(null);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
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
        setCategory(res.data);
        setValue('category', res.data[0]?.id);
      })
      .catch((error) => {
        console.log(error?.message);
      });
  };

  const openAIHandle = async () => {
    try {
      const openai = createOpenAIClient();
      const stream = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: title }],
        stream: true
      });
      for await (const chunk of stream) {
        if (chunk.choices[0]?.delta?.content) {
          setValue(
            'content',
            getValues('content') + chunk.choices[0]?.delta?.content
          );
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } catch (error) {
      toast.error('Lỗi lấy nội dung từ chatGPT');
    } finally {
      setLoading('');
    }
  };

  const handleGetContent = async () => {
    if (!title) {
      setErrorsMess({
        ...errorsMess,
        titlecontent: 'Vui lòng nhập tiêu đề nội dung'
      });
    } else {
      setLoading('chatGPTbtn');
      setValue('content', '');
      openAIHandle();
    }
  };

  const handleSetImage = async (e: any) => {
    const file = e.target.files[0];
    const base64Url: any = await fileImageToBase64(file);
    setPreviewImg(base64Url);
    setErrorsMess({
      titlecontent: errorsMess.titlecontent,
      urlImgerr: ''
    });
  };

  const handleSubmission = (data: IFormValue) => {
    if (!previewImg) {
      setErrorsMess({
        titlecontent: errorsMess.titlecontent,
        urlImgerr: 'Không được để trống hình ảnh'
      });
    } else {
      setLoading('submitBtn');
      const { category, content, title } = data;

      const params = {
        category,
        content,
        title,
        image: previewImg
      };

      // const formData = new FormData();
      // formData.append('category', category);
      // formData.append('content', content);
      // formData.append('title', title);
      // formData.append('image', fileImg, fileImg.name);

      (details
        ? axios.put(`post/posts/${details.id}`, params, {
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
        : axios.post('post/posts/', params, {
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
      )
        .then((res) => {
          setLoading('');
          navigation('/admin/bai-viet');
          reset();
        })
        .catch((error) => {
          setLoading('');
          console.log(error?.message);
        });
    }
  };

  const handleSetDetails = async () => {
    reset({
      category: details.category.toString(),
      content: details.content,
      title: details.title
    });
    const urlImage = (await urlImageToBase64(
      details?.image
    )) as unknown as string;
    console.log(urlImage);
    setPreviewImg(urlImage);
  };

  useEffect(() => {
    if (details) {
      handleSetDetails();
    }
  }, [details]);

  useEffect(() => {
    handleGetCategory();
  }, []);

  return (
    <>
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
                      disabled={loading === 'chatGPTbtn'}
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
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              padding: '10px'
            }}
          >
            Đăng bài
          </Button>
        </Stack>
      </form>
      <BackDropComponent open={loading === 'submitBtn'} />
    </>
  );
};

export default CreateNewPost;
