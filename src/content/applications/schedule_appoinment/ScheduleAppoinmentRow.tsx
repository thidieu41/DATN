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
import dayjs from 'dayjs';
import Label from 'src/components/Label';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { IScheduleProps } from 'src/interface/booking';
import { ClientAPI } from 'src/api';

interface Props {
  data: IScheduleProps[];
  handleSetPagination: (id: string) => void;
  handleSetBackdropRemove: () => void;
}

const ScheduleAppoinmentRow = ({
  data,
  handleSetPagination,
  handleSetBackdropRemove
}: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const onNavigationToDetails = (event, id: string) => {
    event.stopPropagation();
    navigate(`/admin/lich-kham/cap-nhat/${id}`);
  };

  const onRemoveSchedule = async (event, id: string) => {
    event.stopPropagation();
    handleSetBackdropRemove();
    try {
      await ClientAPI.delete(`/app/bookings/${id}/`);
      handleSetPagination(id);
      toast.success('Xoá lịch thành công');
    } catch (error) {
      toast.error('Xoá lịch không thành công');
    }
  };

  return (
    <TableBody>
      {(data || []).map((item) => {
        return (
          <TableRow hover key={item.id}>
            <TableCell>
              <Typography noWrap>{item.id}</Typography>
            </TableCell>
            <TableCell>
              <Typography
                noWrap
                sx={{
                  textOverflow: 'ellipsis',
                  maxWidth: 100
                }}
              >
                {item.is_user
                  ? item?.user?.name || '___'
                  : item.booking_name || '___'}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography noWrap>
                {item.is_user ? item.user?.phone : item.phone}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Label
                color={
                  item.status === 'chưa khám'
                    ? 'warning'
                    : item.status === 'đang khám'
                    ? 'primary'
                    : 'success'
                }
              >
                <Typography noWrap fontSize={12}>
                  {item.status}
                </Typography>
              </Label>
            </TableCell>
            <TableCell>
              <Typography noWrap>
                {dayjs(item.date).format('DD/MM/YYYY')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography noWrap>{dayjs(item.date).format('HH:mm')}</Typography>
            </TableCell>

            <TableCell>
              <Typography noWrap>
                {item?.room?.branch?.name || '___'}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography noWrap>{item?.room?.name || '___'}</Typography>
            </TableCell>
            <TableCell>
              <Typography noWrap>{item?.item?.menu?.name || '___'}</Typography>
            </TableCell>
            <TableCell>
              <Typography noWrap>{item?.item?.name || '___'}</Typography>
            </TableCell>
            <TableCell>
              <Typography
                noWrap
                sx={{
                  textOverflow: 'ellipsis',
                  maxWidth: 150
                }}
              >
                {item.reason}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography noWrap align="right">
                {item.quantity}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography noWrap align="right">
                {item.total_money}
              </Typography>
            </TableCell>

            <TableCell
              sx={{
                display: 'flex',
                flexWrap: 'nowrap'
              }}
            >
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
                  onClick={(e) => onRemoveSchedule(e, item.id)}
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
