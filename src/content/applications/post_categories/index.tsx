import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { IPostCategoriesProps } from 'src/content/pages/post_categories';
import { useNavigate } from 'react-router';

interface IProps {
  handleSetisEdit: (id: string) => void;
  handleRemove: (id: string) => void;
  data: IPostCategoriesProps[];
  isCategoryBooking: boolean;
  isDetailsCategory?: boolean;
}

const CategoriesComponent = ({
  handleSetisEdit,
  handleRemove,
  data = [],
  isCategoryBooking,
  isDetailsCategory = false
}: IProps) => {
  const navigate = useNavigate();
  const handleNavigateToCategoryDetails = (id: string, name: string) => {
    if (!isCategoryBooking && !isDetailsCategory) {
      return;
    }
    navigate(`/admin/danh-muc/chi-tiet-danh-muc/${name}/${id}`);
  };
  return (
    <Box
      sx={{
        padding: 2
      }}
    >
      <Grid container spacing={4}>
        {data.map((item: IPostCategoriesProps, key) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={key}>
            <Card
              sx={{
                maxHeight: 130,
                cursor: isCategoryBooking ? 'pointer' : 'default'
              }}
              onClick={() =>
                handleNavigateToCategoryDetails(item.id, item.name)
              }
            >
              <CardContent>
                <Stack spacing={0.5}>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  {isDetailsCategory && (
                    <Typography variant="body2">
                      {item.price || 0} (VND)
                    </Typography>
                  )}
                </Stack>
              </CardContent>
              <CardActions
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                <Button
                  size="small"
                  startIcon={<ModeEditOutlineOutlinedIcon />}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleSetisEdit(item.id);
                  }}
                >
                  Sửa
                </Button>
                <Button
                  size="small"
                  startIcon={<DeleteOutlineOutlinedIcon />}
                  sx={{
                    color: 'red'
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleRemove(item.id);
                  }}
                >
                  Xoá
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoriesComponent;
