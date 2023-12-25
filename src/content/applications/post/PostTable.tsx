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
import PostTableRow from './PostTableRow';
import { ICategoryProps, IPostProps } from 'src/utils/schema';
import { createClient } from 'src/utils/axios';

interface RecentOrdersTableProps {
  className?: string;
}

interface Filters {
  status?: any;
}

const applyFilters = (
  postList: IPostProps[],
  filters: Filters
): IPostProps[] => {
  return (postList || []).filter((cryptoOrder) => {
    let matches = true;

    // if (filters.status && cryptoOrder.status !== filters.status) {
    //   matches = false;
    // }

    return matches;
  });
};

const applyPagination = (
  postList: IPostProps[],
  page: number,
  limit: number
): IPostProps[] => {
  return postList.slice(page * limit, page * limit + limit);
};

const PostTable: FC<RecentOrdersTableProps> = () => {
  const axios = createClient();

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });
  const [postList, setPostList] = useState<IPostProps[]>([]);
  const [categoryList, setCategory] = useState<{
    [key: number]: ICategoryProps;
  }>({});

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

  const handleCategoryList = (data: ICategoryProps[]) => {
    const list = data.reduce((obj, item: ICategoryProps) => {
      obj = {
        ...obj,
        [item.id]: item
      };
      return obj;
    }, {});
    setCategory(list);
  };

  const handleGetPostListData = async (isPost) => {
    await axios
      .get(isPost ? `post/posts/` : 'post/categories/')
      .then((res: any) => {
        if (isPost) {
          console.log(res);
          setPostList(res.data.results);
        } else {
          handleCategoryList(res.data.results);
        }
      })
      .catch((error) => {
        console.log(error?.message);
      });
  };

  useEffect(() => {
    handleGetPostListData(true);
    handleGetPostListData(false);
  }, []);

  const filterPostList = applyFilters(postList, filters);
  const panigatedPostList = applyPagination(filterPostList, page, limit);

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
        title="Danh sách bài viết"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Nội dung</TableCell>
              <TableCell>Thời gian xuất bản</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <PostTableRow
            data={panigatedPostList}
            dataCategory={categoryList || {}}
          />
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={panigatedPostList.length}
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

export default PostTable;
