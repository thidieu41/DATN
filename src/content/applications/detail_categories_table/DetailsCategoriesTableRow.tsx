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
import { ICategoryProps } from '../category/interface';

interface Props {
  data: ICategoryProps[];
}

const DetailsCategoriesTableRow = ({ data = [] }: Props) => {
  const theme = useTheme();

  const onNavigationToDetails = (event, id: string) => {
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
                {item.name}
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
                  {item.type}
                </Typography>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography gutterBottom noWrap>
                {item.time}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography gutterBottom noWrap>
                {item.branch}
              </Typography>
            </TableCell>
            <TableCell align="right">{item.name_list}</TableCell>
            <TableCell align="right">{item.price}</TableCell>
            <TableCell align="right">{item.promotional_price}</TableCell>

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

export default DetailsCategoriesTableRow;
