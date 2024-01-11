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
  CardHeader,
  Typography,
  styled
} from '@mui/material';
import ScheduleAppoinmentRow from './ScheduleAppoinmentRow';
import { toast } from 'react-toastify';
import BackDropComponent from 'src/components/BackDrop';
import { statusTableOptions } from './constants';
import { IPanigationProps } from 'src/utils/interface';
import { ClientAPI } from 'src/api';
import CustomEmptyOverlayTable from 'src/components/TableEmptyRow';
import { IScheduleProps } from 'src/interface/booking';

const LableInput = styled(Typography)(() => `font-weight: 600`);

const headerTableTitle = [
  { title: 'ID' },
  { title: 'Họ tên' },
  { title: 'Số điện thoại' },
  { title: 'Ngày đặt' },
  { title: 'Giờ đặt' },
  { title: 'Chi Nhánh' },
  { title: 'Phòng' },
  { title: 'Danh mục' },
  { title: 'Chi tiết' },
  { title: '	Lý do khám' },
  { title: 'Số người' },
  { title: 'Tổng (VND)' },
  { title: 'Trạng thái' },
  { title: 'Thao tác' }
];
const ScheduleAppoinmentTable = () => {
  const [page, setPage] = useState<number>(0);
  const [status, setStatus] = useState(null);
  const [scheduleList, setScheduleList] = useState<IScheduleProps[]>([]);
  const [pagination, setPagination] = useState<IPanigationProps>();
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = (event: any, newPage: number): void => {
    if (newPage > page) {
      handleGetBookingList(pagination.next);
    } else {
      handleGetBookingList(pagination.previous);
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
      const res = await ClientAPI.getAll(url);
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
      ...pagination,
      count: pagination.count - 1
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
      <TableContainer sx={{ height: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {headerTableTitle.map((item, index) => (
                <TableCell key={index}>
                  <LableInput noWrap>{item.title}</LableInput>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {scheduleList.length === 0 ? (
            <CustomEmptyOverlayTable />
          ) : (
            <ScheduleAppoinmentRow
              data={scheduleList || []}
              handleSetPagination={handleSetPagination}
              handleSetBackdropRemove={handleSetBackdropRemove}
            />
          )}
        </Table>
      </TableContainer>
      <Divider />
      <Box p={2}>
        <TablePagination
          component="div"
          count={pagination?.count || 0}
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
