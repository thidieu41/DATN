import {
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { format } from 'date-fns';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { IScheduleAppoinment } from './interface';

interface Props {
  data: IScheduleAppoinment[];
  selectedCryptoOrders: string[];
  handleSelect: (event, id) => void;
}

const ScheduleAppoinmentRow = ({
  data = [],
  selectedCryptoOrders = [],
  handleSelect
}: Props) => {
  const theme = useTheme();

  const onNavigationToDetails = (event, id: string) => {
    event.stopPropagation();
    console.log(id);
  };
  return (
    <TableBody>
      {data.map((item) => {
        const isCryptoOrderSelected = selectedCryptoOrders.includes(item.id);
        return (
          <TableRow
            hover
            key={item.id}
            selected={isCryptoOrderSelected}
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
                  {format(item.date, 'MMMM dd yyyy')}
                </Typography>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography gutterBottom noWrap>
                {item.phone_number}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography gutterBottom noWrap>
                {item.role}
              </Typography>
            </TableCell>
            <TableCell align="right">{item.degree}</TableCell>
            <TableCell align="right">
              <Tooltip title="Edit Order" arrow>
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
              <Tooltip title="Delete Order" arrow>
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

export default ScheduleAppoinmentRow;
