import {
  IconButton,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  styled,
  useTheme
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DescriptionIcon from '@mui/icons-material/Description';
import dayjs from 'dayjs';
import Label from 'src/components/Label';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { IScheduleProps } from 'src/interface/booking';
import { ClientAPI } from 'src/api';

const RowContent = styled(Typography)(
  () => `     
  text-overflow: 'ellipsis';
  max-width: 120px
  `
);

interface Props {
  data: IScheduleProps[];
  handleSetPagination: (id: string) => void;
  handleSetBackdropRemove: () => void;
  handleOpen: (id: string) => void;
}

const ScheduleAppoinmentRow = ({
  data,
  handleSetPagination,
  handleSetBackdropRemove,
  handleOpen
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
      await ClientAPI.update(`/app/customers/bookings/${id}`, {});
      handleSetPagination('/app/bookings/');
      toast.success('Huỷ lịch thành công');
    } catch (error) {
      toast.error('Huỷ lịch không thành công');
    }
  };

  const onOpenScheduleInvoice = async (event, id: string) => {
    event.stopPropagation();
    handleOpen(id);
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
              <RowContent noWrap>
                {item.is_user
                  ? item?.user?.name || '___'
                  : item.booking_name || '___'}
              </RowContent>
              <Typography noWrap variant="body1">
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
                    : item.status === 'đã huỷ'
                    ? 'error'
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
              <Typography noWrap>{dayjs(item.date).format('HH:mm')}</Typography>
            </TableCell>
            <TableCell>
              <RowContent noWrap>{item?.room?.name || '___'}</RowContent>
              <RowContent noWrap>
                {item?.room?.branch?.name || '___'}
              </RowContent>
            </TableCell>
            <TableCell>
              <RowContent noWrap>{item?.item?.name || '___'}</RowContent>
              <RowContent noWrap>{item?.item?.menu?.name || '___'}</RowContent>
            </TableCell>
            <TableCell>
              <RowContent noWrap>{item.reason}</RowContent>
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
            <TableCell>
              <Stack direction={'row'}>
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
                <Tooltip title="Hoá đơn" arrow>
                  <IconButton
                    onClick={(e) => onOpenScheduleInvoice(e, item.id)}
                    sx={{
                      '&:hover': { background: theme.colors.secondary.lighter },
                      color: theme.palette.secondary.main
                    }}
                    color="inherit"
                    size="small"
                  >
                    <DescriptionIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                {}
                <Tooltip title="Huỷ" arrow>
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
              </Stack>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default ScheduleAppoinmentRow;
