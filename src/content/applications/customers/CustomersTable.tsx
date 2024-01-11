import { useEffect, useState } from 'react';
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
  CardHeader
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
    handleGetAllCustomer('');
  }, []);

  return (
    <Card>
      <CardHeader title="Danh sách khách hàng" />

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Họ tên</TableCell>
              <TableCell>Ngày sinh</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Giới tính</TableCell>
              <TableCell>Địa chỉ</TableCell>
            </TableRow>
          </TableHead>
          {customerList.length === 0 ? (
            <CustomEmptyOverlayTable />
          ) : (
            <CustomerTableRow data={customerList || []} />
          )}
        </Table>
      </TableContainer>
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
