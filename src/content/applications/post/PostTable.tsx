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
  Stack,
  TextField
} from '@mui/material';
import PostTableRow from './PostTableRow';
import { ICategoryProps } from 'src/utils/schema';
import { toast } from 'react-toastify';
import BackDropComponent from 'src/components/BackDrop';
import { IPostProps } from 'src/interface/posts';
import { IPanigationProps } from 'src/utils/interface';
import { ClientAPI } from 'src/api';
import CustomEmptyOverlayTable from 'src/components/TableEmptyRow';

const PostTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [postList, setPostList] = useState<IPostProps[]>([]);
  const [categoryList, setCategory] = useState<{
    [key: number]: ICategoryProps;
  }>({});
  const [filter, setFilter] = useState('');
  const [pagination, setPagination] = useState<IPanigationProps>();

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setFilter(value);
    if (value === filter) {
      return;
    }
    handleGetAllPosts(`/post/posts/?danh-muc=${value}`);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    if (newPage > page) {
      handleGetAllPosts(pagination.next);
    } else {
      handleGetAllPosts(pagination.previous);
    }
    setPage(newPage);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    let typing = null;
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    typing = setTimeout(async () => {
      handleGetAllPosts(`/post/posts/?search=${search}`);
    }, 2000);

    setTypingTimeout(typing);
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

  const handleGetAllPosts = async (url: string) => {
    setIsLoading(true);
    try {
      const res = await ClientAPI.getAll(url);
      setPostList(res.data.results);
      setPagination(res.data);
    } catch (error) {
      toast.error('Lỗi lấy danh sách bài viết ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetAllCategories = async (url: string) => {
    const res = await ClientAPI.getAll(url);
    handleCategoryList(res.data);
  };
  useEffect(() => {
    handleGetAllPosts('/post/posts/');
    handleGetAllCategories('/post/categories/');
  }, []);

  return (
    <Card>
      <CardHeader
        action={
          <Stack direction={'row'} spacing={2}>
            <TextField
              name="search"
              value={search}
              onChange={handleSearch}
              placeholder="Nhập tiều đề bài viết"
              fullWidth
              sx={{
                minWidth: 250
              }}
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel>Danh mục</InputLabel>
              <Select
                value={filter || 'all'}
                onChange={handleStatusChange}
                label="Danh mục"
                fullWidth
                sx={{
                  width: 250
                }}
              >
                {(Object.values(categoryList) || []).map((statusOption) => (
                  <MenuItem key={statusOption.id} value={statusOption.id}>
                    {statusOption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        }
        title="Danh sách bài viết"
      />
      <Divider />
      <TableContainer sx={{ height: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Nội dung</TableCell>
              <TableCell>Thời gian xuất bản</TableCell>

              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          {postList.length === 0 ? (
            <CustomEmptyOverlayTable />
          ) : (
            <PostTableRow
              data={postList || []}
              dataCategory={categoryList || {}}
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

export default PostTable;
