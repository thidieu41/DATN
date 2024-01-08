import { FC, ChangeEvent, useState } from 'react';
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

import DoctorTableRow from './DoctorTableRow';
import { IPanigationProps } from 'src/utils/interface';
import { IDoctor } from 'src/interface/doctor';

interface Filters {
  status?: any;
}

const DoctorTable = () => {
  const [page, setPage] = useState<number>(0);

  const [filters, setFilters] = useState<Filters>({
    status: null
  });
  const [paigation, setPagination] = useState<IPanigationProps>();
  const [doctorList, setDoctorList] = useState<IDoctor[]>([]);

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'completed',
      name: 'Completed'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'failed',
      name: 'Failed'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  return (
    <Card>
      <CardHeader
        // action={
        //   <Box width={150}>
        //     <FormControl fullWidth variant="outlined">
        //       <InputLabel>Status</InputLabel>
        //       <Select
        //         value={filters.status || 'all'}
        //         onChange={handleStatusChange}
        //         label="Status"
        //         autoWidth
        //       >
        //         {statusOptions.map((statusOption) => (
        //           <MenuItem key={statusOption.id} value={statusOption.id}>
        //             {statusOption.name}
        //           </MenuItem>
        //         ))}
        //       </Select>
        //     </FormControl>
        //   </Box>
        // }
        title="Danh sách Bác sĩ"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Họ Và Tên</TableCell>
              <TableCell>Ngày Sinh</TableCell>
              <TableCell>Số điện thoại</TableCell>
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
    </Card>
  );
};

DoctorTable.propTypes = {
  doctorList: PropTypes.array.isRequired
};

DoctorTable.defaultProps = {
  doctorList: []
};

export default DoctorTable;
