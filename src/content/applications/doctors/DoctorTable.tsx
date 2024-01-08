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
import { DoctorAPI } from 'src/api/doctors';
import { toast } from 'react-toastify';

const DoctorTable = () => {
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [paigation, setPagination] = useState<IPanigationProps>();
  const [doctorList, setDoctorList] = useState<IDoctor[]>([]);

  const handlePageChange = (event: any, newPage: number): void => {
    if (newPage > page) {
      handleGetAllDoctor(paigation.next);
    } else {
      handleGetAllDoctor(paigation.previous);
    }
    setPage(newPage);
  };

  const handleGetAllDoctor = async (url: string) => {
    setIsLoading(true);
    try {
      const res = await DoctorAPI.getAll(url);
      setDoctorList(res.data.results);
      setPagination(res.data);
    } catch (error) {
      toast.error('Lỗi lấy danh sách bác sĩ');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleGetAllDoctor('/dental/doctors/');
  }, []);

  return (
    <Card>
      <CardHeader title="Danh sách Bác sĩ" />
      <Divider />
      <TableContainer>
        <Table>
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
          <DoctorTableRow data={doctorList || []} />
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

export default DoctorTable;
