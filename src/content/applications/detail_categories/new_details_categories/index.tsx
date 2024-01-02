import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  IFormValue,
  defaultValues,
  categorySchema,
  CategoryData
} from './schema';
import { Grid, MenuItem, Typography, styled } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const LableInput = styled(Typography)(
  () => `
  margin-bottom: 10px;
`
);

const CreateNewDetailsCategories = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<IFormValue, IFormValue>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(categorySchema) as any
  });

  const categoryName = watch('name');

  const handleSubmission = (data: IFormValue) => {
    console.log('data', data);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmission)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <LableInput>Tên danh mục</LableInput>
          <Controller
            control={control}
            name="name_category"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Nhập tên danh mục"
                error={!!errors.name_category}
                helperText={errors.name_category?.message || ''}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LableInput>Thể loại</LableInput>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                error={!!errors.category}
                helperText={errors.category?.message || ''}
                select
              >
                {(CategoryData[categoryName]?.listType || []).map(
                  (option, key) => (
                    <MenuItem key={key} value={option.name}>
                      {option.name}
                    </MenuItem>
                  )
                )}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LableInput>Chi Nhánh</LableInput>
          <Controller
            control={control}
            name="branch"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Nhập tên danh mục"
                error={!!errors.branch}
                helperText={errors.branch?.message || ''}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LableInput>Tên danh sách</LableInput>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Nhập tên danh mục"
                error={!!errors.name}
                helperText={errors.name?.message || ''}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LableInput>Áp dụng từ ngày</LableInput>
          <Controller
            control={control}
            name="fromdate"
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...field}
                  inputFormat="DD-MM-YYYY"
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LableInput>Áp dụng đến ngày</LableInput>
          <Controller
            control={control}
            name="todate"
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...field}
                  inputFormat="DD-MM-YYYY"
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LableInput>Giá</LableInput>
          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Nhập tên danh mục"
                error={!!errors.price}
                helperText={errors.price?.message || ''}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LableInput>Giá khuyến mãi</LableInput>
          <Controller
            control={control}
            name="sale_price"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Nhập tên danh mục"
                error={!!errors.sale_price}
                helperText={errors.sale_price?.message || ''}
              />
            )}
          />
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

export default CreateNewDetailsCategories;
