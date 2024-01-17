import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
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
  const [scheduleList, setSchedulelist] = useState<{
    [key: string]: IScheduleProps;
  }>();
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<IPanigationProps>();

  const handleGetSchedule = async () => {
    setIsLoading(true);
    try {
      const { data } = await ClientAPI.getAll('/app/customers/bookings');
      setPagination(data);
      const results = handleObjectKeyData(data.results);
      setSchedulelist(results);
    } catch (error) {
      toast.error('');
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
    handleGetSchedule();
  }, []);
  return (
    <>
      <Typography variant="h3">Danh sách lịch khám</Typography>
      {Object.values(scheduleList || {}).map((item, key) => (
        <ScheduleCardComponent
          data={item}
          key={key}
          handleCancelSchedule={handleCancelSchedule}
        />
      ))}

      <BackDropComponent open={isLoading} />
    </>
  );
};
export default UserScheduleAppoinment;
