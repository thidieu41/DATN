import { ChangeEvent, useState, useEffect } from 'react';
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
  styled,
  Stack,
  TextField
} from '@mui/material';
import ScheduleAppoinmentRow from './ScheduleAppoinmentRow';
import { toast } from 'react-toastify';
import BackDropComponent from 'src/components/BackDrop';
import { statusTableOptions } from './constants';
import { IPanigationProps } from 'src/utils/interface';
import { ClientAPI } from 'src/api';
import CustomEmptyOverlayTable from 'src/components/TableEmptyRow';
import { IScheduleProps } from 'src/interface/booking';
import ScheduleAppoinmentInvoice from './Invoice';

const LableInput = styled(Typography)(() => `font-weight: 600`);

const headerTableTitle = [
  { title: 'ID' },
  { title: 'Họ tên' },
  { title: 'Trạng thái' },
  { title: 'Ngày đặt' },
  { title: 'Phòng' },
  { title: 'Chi tiết' },
  { title: 'Lý do khám' },
  { title: 'Số người' },
  { title: 'Tổng (VND)' },
  { title: 'Thao tác' }
];
const ScheduleAppoinmentTable = () => {
  const [page, setPage] = useState<number>(0);
  const [status, setStatus] = useState(null);
  const [search, setSearch] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [scheduleList, setScheduleList] = useState<IScheduleProps[]>([]);
  const [pagination, setPagination] = useState<IPanigationProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [detailsInvoice, setDetailsInvoice] = useState<IScheduleProps>();

  const handleOpen = async (dataId: string) => {
    setIsLoading(true);
    try {
      const { data } = await ClientAPI.getDetails(`/app/bookings/${dataId}/`);
      setDetailsInvoice(data);
      setOpen(true);
    } catch (error) {
      toast.error('Không thể xuất hoá đơn. Vui lòng thử lại sau');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    if (newPage > page) {
      handleGetBookingList(pagination.next);
    } else {
      handleGetBookingList(pagination.previous);
    }
    setPage(newPage);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (status === value) {
      return;
    }
    handleGetBookingList(
      value === 'tất cả' ? '/app/bookings/' : `/app/bookings/?status=${value}`
    );
    setStatus(value);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
  };

  useEffect(() => {
    handleGetBookingList(`/app/bookings/?search=${search}`);
  }, [search])

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
          <Stack spacing={2} direction={'row'}>
            <TextField
              name="search"
              value={search}
              onChange={handleSearch}
              placeholder="Nhập tên người dùng"
              fullWidth
              sx={{
                minWidth: 250
              }}
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={status || 'tất cả'}
                onChange={handleStatusChange}
                label="Status"
                fullWidth
                sx={{
                  width: 250
                }}
              >
                {(statusTableOptions || []).map((statusOption) => (
                  <MenuItem key={statusOption.id} value={statusOption.id}>
                    {statusOption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
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
              handleSetPagination={handleGetBookingList}
              handleSetBackdropRemove={handleSetBackdropRemove}
              handleOpen={handleOpen}
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
      <ScheduleAppoinmentInvoice
        open={open}
        handleClose={handleClose}
        detailsInvoice={detailsInvoice}
      />
      <BackDropComponent open={isLoading} />
    </Card>
  );
};

export default ScheduleAppoinmentTable;
