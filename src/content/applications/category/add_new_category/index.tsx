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

const LableInput = styled(Typography)(
  () => `
  margin-bottom: 10px;
`
);

const CreateNewCategory = () => {
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
                select
              >
                {Object.keys(CategoryData).map((option, key) => (
                  <MenuItem
                    key={key}
                    value={option}
                    onClick={() => {
                      setValue('type', CategoryData[option]?.listType[0].name);
                    }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </TextField>
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
