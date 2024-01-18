import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TablePagination,
  Typography
} from '@mui/material';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { ScheduleCardComponent } from './components/ScheduleCard';
import { useEffect, useState } from 'react';
import { IScheduleProps } from 'src/interface/booking';
import BackDropComponent from 'src/components/BackDrop';
import { toast } from 'react-toastify';
import { ClientAPI } from 'src/api';
import { IPanigationProps } from 'src/utils/interface';
import { handleObjectKeyData } from 'src/utils/constanst';

const UserScheduleAppoinment = () => {
  const [page, setPage] = useState<number>(0);
  const [scheduleList, setSchedulelist] = useState<{
    [key: string]: IScheduleProps;
  }>();
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<IPanigationProps>();

  const handlePageChange = (event: any, newPage: number): void => {
    if (newPage > page) {
      handleGetSchedule(pagination.next);
    } else {
      handleGetSchedule(pagination.previous);
    }
    setPage(newPage);
  };

  const handleGetSchedule = async (url: string) => {
    setIsLoading(true);
    try {
      const { data } = await ClientAPI.getAll(url);
      setPagination(data);
      const results = handleObjectKeyData(data.results);
      setSchedulelist(results);
    } catch (error) {
      toast.error('Lỗi lấy toàn bộ danh sách lịch khám');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSchedule = async (id: string) => {
    setIsLoading(true);
    try {
      await ClientAPI.update(`/app/customers/bookings/${id}`, null);
      const data = {
        ...scheduleList,
        [id]: {
          ...scheduleList[id],
          status: 'đã huỷ'
        }
      };
      setSchedulelist(data);
      toast.success('Huỷ lịch thành công');
    } catch (error) {
      toast.error('Huỷ lịch không thành công');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleGetSchedule('/app/customers/bookings');
  }, []);
  return (
    <>
      <Typography variant="h3">Danh sách lịch khám</Typography>
      {Object.values(scheduleList || {}).length === 0 && (
        <Box
          sx={{
            minHeight: 200,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography>Không có dữ liệu</Typography>
        </Box>
      )}
      {Object.values(scheduleList || {}).map((item, key) => (
        <ScheduleCardComponent
          data={item}
          key={key}
          handleCancelSchedule={handleCancelSchedule}
        />
      ))}
      {Object.values(scheduleList || {}).length > 0 && (
        <TablePagination
          component="div"
          count={pagination?.count || 0}
          onPageChange={handlePageChange}
          page={page}
          rowsPerPage={10}
          rowsPerPageOptions={[10]}
        />
      )}

      <BackDropComponent open={isLoading} />
    </>
  );
};
export default UserScheduleAppoinment;
