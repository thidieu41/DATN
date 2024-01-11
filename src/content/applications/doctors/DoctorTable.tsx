import { useState, useEffect } from 'react';
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
import DoctorTableRow from './DoctorTableRow';
import { IPanigationProps } from 'src/utils/interface';
import { IDoctor } from 'src/interface/doctor';
import BackDropComponent from 'src/components/BackDrop';
import { toast } from 'react-toastify';
import { ClientAPI } from 'src/api';
import CustomEmptyOverlayTable from 'src/components/TableEmptyRow';

const DoctorTable = () => {
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<IPanigationProps>();
  const [doctorList, setDoctorList] = useState<IDoctor[]>([]);

  const handlePageChange = (event: any, newPage: number): void => {
    if (newPage > page) {
      handleGetAllDoctor(pagination.next);
    } else {
      handleGetAllDoctor(pagination.previous);
    }
    setPage(newPage);
  };

  const handleSetPagination = async (id: string) => {
    setIsLoading(true);
    try {
      await ClientAPI.delete(`/core/doctors/${id}/`);
      const data = doctorList.filter((item) => item.id !== id);
      setDoctorList(data);
      setPagination({
        ...pagination,
        count: pagination.count - 1
      });
      toast.success('Xoá bác sĩ thành công!');
    } catch (error) {
      toast.error('Xoá bác sĩ không thành công');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetAllDoctor = async (url: string) => {
    setIsLoading(true);
    try {
      const res = await ClientAPI.getAll(url);
      setDoctorList(res.data.results);
      setPagination(res.data);
    } catch (error) {
      toast.error('Lỗi lấy danh sách bác sĩ');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleGetAllDoctor('/core/doctors/');
  }, []);

  return (
    <Card>
      <CardHeader title="Danh sách Bác sĩ" />
      <Divider />
      <TableContainer sx={{ height: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Họ Và Tên</TableCell>
              <TableCell>Ngày Sinh</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Lượt khám</TableCell>
              <TableCell>Chức vụ</TableCell>
              <TableCell>Bằng Cấp</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          {doctorList.length === 0 ? (
            <CustomEmptyOverlayTable />
          ) : (
            <DoctorTableRow
              data={doctorList || []}
              handleSetPagination={handleSetPagination}
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

export default DoctorTable;
