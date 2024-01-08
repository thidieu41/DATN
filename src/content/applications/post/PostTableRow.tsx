import { Label } from '@mui/icons-material';
import {
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { ICategoryProps } from 'src/utils/schema';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import { IPostProps } from 'src/interface/posts';

interface Props {
  data: IPostProps[];
  dataCategory: {
    [key: number]: ICategoryProps;
  };
}

const PostTableRow = ({ data = [], dataCategory = {} }: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const onNavigationToDetails = (event, id: number) => {
    event.stopPropagation();
    navigate(`/admin/bai-viet/cap-nhat-bai-viet/${id}`);
  };

  const handleRemovePost = (event, id: number) => {
    event.stopPropagation();
    navigate(`/admin/bai-viet/cap-nhat-bai-viet/${id}`);
  };

  return (
    <TableBody>
      {data.map((item) => {
        return (
          <TableRow hover key={item.id}>
            <TableCell>
              <Typography gutterBottom noWrap>
                {item.id}
              </Typography>
            </TableCell>
            <TableCell>
              <img
                src={item.image}
                style={{
                  height: 50,
                  width: 50
                }}
              />
            </TableCell>
            <TableCell>
              <Typography
                noWrap
                sx={{
                  textOverflow: 'ellipsis',
                  maxWidth: '150px'
                }}
              >
                {item.title}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography noWrap>
                {dataCategory[item.category]?.name || ''}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                noWrap
                sx={{
                  textOverflow: 'ellipsis',
                  maxWidth: '300px'
                }}
              >
                {item.content}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography noWrap>
                {dayjs(item.created_at).format('DD/MM/YYYY')}
              </Typography>
            </TableCell>

            <TableCell align="right">
              <Tooltip title="Sửa" arrow>
                <IconButton
                  onClick={(e) => onNavigationToDetails(e, item.id)}
                  sx={{
                    '&:hover': {
                      background: theme.colors.primary.lighter
                    },
                    color: theme.palette.primary.main
                  }}
                  color="inherit"
                  size="small"
                >
                  <EditTwoToneIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Xoá" arrow>
                <IconButton
                  onClick={(e) => handleRemovePost(e, item.id)}
                  sx={{
                    '&:hover': { background: theme.colors.error.lighter },
                    color: theme.palette.error.main
                  }}
                  color="inherit"
                  size="small"
                >
                  <DeleteTwoToneIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default PostTableRow;
