import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormValue, defaultValues, categorySchema } from './schema';
import { Grid, MenuItem, Typography, styled } from '@mui/material';

const LableInput = styled(Typography)(
  () => `
  margin-bottom: 10px;
`
);

const currencies = [
  {
    value: 'USD',
    label: '$'
  },
  {
    value: 'EUR',
    label: '€'
  },
  {
    value: 'BTC',
    label: '฿'
  },
  {
    value: 'JPY',
    label: '¥'
  }
];

const CreateNewCategory = () => {
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
        <Grid item xs={6}>
          <LableInput>Tên danh mục</LableInput>
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
        <Grid item xs={6}>
          <LableInput>Thể loại</LableInput>
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                placeholder="Nhập thể loại"
                error={!!errors.type}
                helperText={errors.type?.message || ''}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            gap: '10px'
          }}
        >
          <LableInput>Chi nhánh</LableInput>
          <Controller
            control={control}
            name="branch"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Nhập chi nhánh"
                error={!!errors.branch}
                helperText={errors.branch?.message || ''}
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

export default CreateNewCategory;
