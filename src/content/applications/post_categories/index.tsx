import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography
} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

interface IProps {
  handleSetisEdit: (id: string) => void;
  handleRemove: (id: string) => void;
}
const PostCategoriesComponent = ({ handleSetisEdit, handleRemove }: IProps) => {
  return (
    <Box
      sx={{
        padding: 2
      }}
    >
      <Grid container spacing={4}>
        {new Array(100).fill(0).map((item, key) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={key}>
            <Card
              sx={{
                maxHeight: 130
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Khuyến mãi niềng răng
                </Typography>
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
                  onClick={() => handleSetisEdit(item)}
                >
                  Sửa
                </Button>
                <Button
                  size="small"
                  startIcon={<DeleteOutlineOutlinedIcon />}
                  sx={{
                    color: 'red'
                  }}
                  onClick={() => handleRemove(item)}
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

export default PostCategoriesComponent;
