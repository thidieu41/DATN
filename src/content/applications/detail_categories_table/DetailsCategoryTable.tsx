import { FC, ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
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

import { ICategoryProps } from '../category/interface';
import DetailsCategoriesTableRow from './DetailsCategoriesTableRow';

interface RecentOrdersTableProps {
  className?: string;
  categoryList: ICategoryProps[];
}

interface Filters {
  status?: any;
}

const applyFilters = (
  categoryList: ICategoryProps[],
  filters: Filters
): ICategoryProps[] => {
  return categoryList.filter((cryptoOrder) => {
    let matches = true;

    // if (filters.status && cryptoOrder.status !== filters.status) {
    //   matches = false;
    // }

    return matches;
  });
};

const applyPagination = (
  categoryList: ICategoryProps[],
  page: number,
  limit: number
): ICategoryProps[] => {
  return categoryList.slice(page * limit, page * limit + limit);
};

const DetailsCategoriesTable: FC<RecentOrdersTableProps> = ({
  categoryList
}) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

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

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(categoryList, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );

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
        title="Danh sách chi tiết danh mục"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên danh mục</TableCell>
              <TableCell>Thể loại</TableCell>
              <TableCell>Chi nhánh</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <DetailsCategoriesTableRow data={paginatedCryptoOrders} />
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCryptoOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

DetailsCategoriesTable.propTypes = {
  categoryList: PropTypes.array.isRequired
};

DetailsCategoriesTable.defaultProps = {
  categoryList: []
};

export default DetailsCategoriesTable;
