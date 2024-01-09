import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import ArticleIcon from '@mui/icons-material/Article';
import { IPostProps } from 'src/interface/posts';

interface IProps {
  data: IPostProps;
  categoryName: string;
}
export default function RecipeReviewCard({ data, categoryName }: IProps) {
  return (
    <Card sx={{ width: 370 }}>
      <CardHeader
        avatar={<ArticleIcon />}
        title={categoryName}
        subheader={'Ngày đăng: ' + dayjs(data.created_at).format('DD/MM/YYYY')}
      />
      <CardMedia
        component="img"
        height="250"
        src={data.image}
        alt="Paella dish"
      />
      <CardContent
        sx={{
          height: 300
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginBottom: 1
          }}
        >
          {data.title.toLocaleUpperCase()}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            maxHeight: 200,
            overflow: 'scroll'
          }}
        >
          {data.content}
        </Typography>
      </CardContent>
    </Card>
  );
}
