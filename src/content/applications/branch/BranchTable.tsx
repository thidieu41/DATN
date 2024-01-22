import { useState, useEffect, ChangeEvent } from 'react';
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
  Stack,
  TextField
} from '@mui/material';
import CategoryTableRow from './BranchTableRow';
import { IPanigationProps } from 'src/utils/interface';
import { toast } from 'react-toastify';
import { IBrachProps } from 'src/interface/branchs';
import BackDropComponent from 'src/components/BackDrop';
import { ClientAPI } from 'src/api';
import CustomEmptyOverlayTable from 'src/components/TableEmptyRow';

const BranchTable = () => {
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [pagination, setPagination] = useState<IPanigationProps>();
  const [branchList, setBranchlist] = useState<IBrachProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = (event: any, newPage: number): void => {
    if (newPage > page) {
      onGetAllBranchs(pagination.next);
    } else {
      onGetAllBranchs(pagination.previous);
    }
    setPage(newPage);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
  };
  useEffect(() => {
    onGetAllBranchs(`/dental/branches/?search=${search}`);
  }, [search])

  const handleRemoveBranch = async (id: string) => {
    setIsLoading(true);
    try {
      await ClientAPI.delete(`/dental/branches/${id}/`);
      const list = branchList.filter((item) => item.id !== id);
      setBranchlist(list);
      toast.success('Xoá chi nhánh thành công');
    } catch (error) {
      toast.error('Lỗi xoá chi nhánh');
    } finally {
      setIsLoading(false);
    }
  };

  const onGetAllBranchs = async (url: string) => {
    setIsLoading(true);
    try {
      const res = await ClientAPI.getAll(url);
      setBranchlist(res.data.results);
      setPagination(res.data);
    } catch (error) {
      toast.error('Lỗi lấy danh sách chi nhánh!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onGetAllBranchs('/dental/branches/');
  }, []);

  return (
    <Card>
      <CardHeader
        title="Danh sách chi nhánh nha khoa"
        action={
          <Stack>
            <TextField
              name="search"
              value={search}
              onChange={handleSearch}
              placeholder="Nhập tên chi nhánh"
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
              <TableCell>Tên chi nhánh</TableCell>
              <TableCell>Bác sĩ</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Danh sách phòng</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          {branchList.length === 0 ? (
            <CustomEmptyOverlayTable />
          ) : (
            <CategoryTableRow
              data={branchList || []}
              handleRemoveBranch={handleRemoveBranch}
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

export default BranchTable;
