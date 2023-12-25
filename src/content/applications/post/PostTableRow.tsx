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
import { ICategoryProps, IPostProps } from 'src/utils/schema';
import dayjs from 'dayjs';

interface Props {
  data: IPostProps[];
  dataCategory: {
    [key: number]: ICategoryProps;
  };
}

const PostTableRow = ({ data = [], dataCategory = {} }: Props) => {
  const theme = useTheme();
  const onNavigationToDetails = (event, id: number) => {
    event.stopPropagation();
    console.log(id);
  };

  return (
    <TableBody>
      {data.map((item) => {
        return (
          <TableRow
            hover
            key={item.id}
            onClick={(e) => onNavigationToDetails(e, item.id)}
            sx={{
              cursor: 'pointer'
            }}
          >
            <TableCell>
              <Typography gutterBottom noWrap>
                {item.id}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography gutterBottom noWrap>
                {item.title}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body1"
                fontWeight="bold"
                color="text.primary"
                gutterBottom
                noWrap
              >
                <Typography variant="body2" noWrap>
                  {dataCategory[item.category]?.name || ''}
                </Typography>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body1"
                fontWeight="bold"
                color="text.primary"
                gutterBottom
                noWrap
              >
                <Typography variant="body2" noWrap>
                  {item.content}
                </Typography>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body1"
                fontWeight="bold"
                color="text.primary"
                gutterBottom
                noWrap
              >
                <Typography variant="body2" noWrap>
                  {dayjs(item.created_at).format('DD/MM/YYYY')}
                </Typography>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography gutterBottom noWrap>
                <img
                  src={item.image}
                  style={{
                    height: 50,
                    width: 50
                  }}
                />
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Tooltip title="Sửa" arrow>
                <IconButton
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
