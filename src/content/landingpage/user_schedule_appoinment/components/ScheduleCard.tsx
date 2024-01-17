import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { IScheduleProps } from 'src/interface/booking';
import dayjs from 'dayjs';
import Label from 'src/components/Label';

interface IProps {
  data?: IScheduleProps;
  handleCancelSchedule: (id: string) => void;
}
export const ScheduleCardComponent = ({
  data,
  handleCancelSchedule
}: IProps) => {
  return (
    <Box
      sx={{
        mt: 2,
        border: '0.2px solid black',
        padding: 2,
        borderRadius: 1
      }}
    >
      <Stack
        direction={'row'}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Stack direction={'row'} spacing={2}>
          <GpsFixedIcon />
          <Typography>
            Tên chi nhánh : {data?.room?.branch?.name || ''}
          </Typography>
        </Stack>
        <Label
          color={
            data?.status === 'chưa khám'
              ? 'warning'
              : data?.status === 'đang khám'
              ? 'primary'
              : data?.status === 'đã huỷ'
              ? 'error'
              : 'success'
          }
        >
          <Typography noWrap fontSize={12}>
            {data?.status || ''}
          </Typography>
        </Label>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Stack spacing={2}>
            <Typography>
              Ngày đặt :{dayjs(data?.date).format('DD/MM/YYYY')}
            </Typography>
            <Typography>
              Giờ đặt : {dayjs(data?.date).format('HH:MM')}
            </Typography>
            <Typography>Tổng người : {data?.quantity || 0}</Typography>
            <Typography>
              Phí dịch vụ khác : {data?.incurred || 0} (VND)
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={2}>
            <Typography>
              Chi nhánh : {data?.room?.branch?.address || ''}
            </Typography>
            <Typography>
              Số điện thoại : {data?.room?.branch?.phone || ''}
            </Typography>
            <Typography>Phòng : {data?.room?.name || ''}</Typography>
            <Typography>Tên dịch vụ :{data?.item?.menu?.name || ''}</Typography>
            <Typography>
              Tiền dịch vụ : {data?.item?.price || 0} (VND)
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Stack sx={{ my: 2 }}>
        <Typography>Lí do khám : {data?.reason || ''}</Typography>
      </Stack>

      <Divider sx={{ my: 2 }} />
      <Stack
        direction={'row'}
        sx={{
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h5">
          Tổng tiền : {data?.total_money || 0} (VND)
        </Typography>
        {data.status === 'chưa khám' && (
          <Button
            variant="outlined"
            color="error"
            sx={{
              borderRadius: 0,
              width: 200
            }}
            onClick={() => handleCancelSchedule(data.id)}
          >
            Huỷ lịch
          </Button>
        )}
      </Stack>
    </Box>
  );
};
