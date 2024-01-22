import { ChangeEvent, useEffect, useState } from 'react';
import {
  Divider,
  Box,
  Card,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  CardHeader,
  TextField,
  Stack
} from '@mui/material';
import { ICustomerProps } from './constant';
import CustomerTableRow from './CustomerTableRow';
import { IPanigationProps } from 'src/utils/interface';
import { ClientAPI } from 'src/api';
import { toast } from 'react-toastify';
import BackDropComponent from 'src/components/BackDrop';
import CustomEmptyOverlayTable from 'src/components/TableEmptyRow';

const CustomerTable = () => {
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [pagination, setPagination] = useState<IPanigationProps>();
  const [customerList, setCustomerList] = useState<ICustomerProps[]>([]);

  const handlePageChange = (event: any, newPage: number): void => {
    if (newPage > page) {
      handleGetAllCustomer(pagination.next);
    } else {
      handleGetAllCustomer(pagination.previous);
    }
    setPage(newPage);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
  };

  useEffect(() => {
    handleGetAllCustomer(`/app/customers?search=${search}`);
  }, [search])

  const handleGetAllCustomer = async (url: string) => {
    setIsLoading(true);
    try {
      const res = await ClientAPI.getAll(url);
      setCustomerList(res.data.results || []);
      setPagination(res.data);
    } catch (error) {
      toast.error('Lỗi lấy danh sách khách hàng');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllCustomer('/app/customers');
  }, []);

  return (
    <Card>
      <CardHeader
        title="Danh sách khách hàng"
        action={
          <Stack>
            <TextField
              name="search"
              value={search}
              onChange={handleSearch}
              placeholder="Nhập tên hoặc email"
              fullWidth
              sx={{
                minWidth: 250
              }}
            />
          </Stack>
        }
      />

      <Divider />
      <TableContainer sx={{ height: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Họ tên</TableCell>
              <TableCell>Ngày sinh</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          {customerList.length === 0 ? (
            <CustomEmptyOverlayTable />
          ) : (
            <CustomerTableRow data={customerList || []} />
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

export default CustomerTable;
