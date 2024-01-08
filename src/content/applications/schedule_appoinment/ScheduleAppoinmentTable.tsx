import { FC, ChangeEvent, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  CardHeader
} from '@mui/material';
import ScheduleAppoinmentRow from './ScheduleAppoinmentRow';
import { Schedule } from 'src/api/schedule';
import { toast } from 'react-toastify';
import BackDropComponent from 'src/components/BackDrop';
import { statusTableOptions } from './constants';
import { IPanigationProps } from 'src/utils/interface';

const statusOptions = [
  {
    id: 'tất cả',
    name: 'Tất cả'
  },
  {
    id: 'chưa-khám',
    name: 'Chưa Khám'
  },
  {
    id: 'đang-khám',
    name: 'Đang Khám'
  },
  {
    id: 'đã-khám',
    name: 'Đã Khám'
  }
];

const ScheduleAppoinmentTable = () => {
  const [page, setPage] = useState<number>(0);
  const [status, setStatus] = useState(null);
  const [scheduleList, setScheduleList] = useState([]);
  const [paigation, setPagination] = useState<IPanigationProps>();
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = (event: any, newPage: number): void => {
    if (newPage > page) {
      handleGetBookingList(paigation.next);
    } else {
      handleGetBookingList(paigation.previous);
    }
    setPage(newPage);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (status === e.target.value) {
      return;
    }
    // handleGetBookingList(`/app/bookings?status=${e.target.value}`);
    setStatus(e.target.value);
  };

  const handleGetBookingList = async (url: string) => {
    setIsLoading(true);
    try {
      const res = await Schedule.getAll(url);
      console.log(res.data.results);
      setScheduleList(res.data.results);
      setPagination(res.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Lỗi lấy tất cả lịch khám!');
    }
  };

  const handleSetPagination = (id: string) => {
    setIsLoading(false);
    setPagination({
      ...paigation,
      count: paigation.count - 1
    });
    const list = scheduleList.filter((item) => item.id !== id);
    setScheduleList(list);
  };

  const handleSetBackdropRemove = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    handleGetBookingList('/app/bookings/');
  }, []);

  return (
    <Card>
      <CardHeader
        action={
          <Box width={250}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={status || 'tất cả'}
                onChange={handleStatusChange}
                label="Status"
                fullWidth
              >
                {(statusTableOptions || []).map((statusOption) => (
                  <MenuItem key={statusOption.id} value={statusOption.id}>
                    {statusOption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        }
        title="Danh sách đặt lịch khám"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Họ tên</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Ngày đặt</TableCell>
              <TableCell>Giờ đặt</TableCell>
              <TableCell>Lý do khám</TableCell>
              <TableCell>Số người</TableCell>
              <TableCell>Tổng tiền (VND)</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <ScheduleAppoinmentRow
            data={scheduleList || []}
            handleSetPagination={handleSetPagination}
            handleSetBackdropRemove={handleSetBackdropRemove}
          />
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={paigation?.count || 0}
          onPageChange={handlePageChange}
          page={page}
          rowsPerPage={10}
          rowsPerPageOptions={[10]}
        />
      </Box>
      <BackDropComponent open={isLoading} />
    </Card>
  );
};

export default ScheduleAppoinmentTable;
