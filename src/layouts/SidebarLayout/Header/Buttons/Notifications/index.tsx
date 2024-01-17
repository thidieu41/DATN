import {
  alpha,
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  Popover,
  Tooltip,
  Typography
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import { ClientAPI } from 'src/api';

const NotificationsBadge = styled(Badge)(
  ({ theme }) => `
    
    .MuiBadge-badge {
        background-color: ${alpha(theme.palette.error.main, 0.1)};
        color: ${theme.palette.error.main};
        min-width: 16px; 
        height: 16px;
        padding: 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
            content: "";
        }
    }
`
);

interface INotitficationProps {
  booking: string;
  created_at: string;
  id: string;
  status: string;
  updated_at: string;
  name: string;
}

function HeaderNotifications() {
  const navigate = useNavigate();
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [numberNew, setNumberNew] = useState(0)
  const [notificationList, setNotificationList] = useState<
    INotitficationProps[]
  >([]);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleReadNotitfication = async (data: INotitficationProps) => {
    window.location.href = `/admin/lich-kham/cap-nhat/${data.booking}`;
    handleClose();
    if (data.status === 'new') {
      await ClientAPI.update(`/app/notifications/${data.id}`, null);
      await handleGetAllNotitfication()
    }
  };

  const handleGetAllNotitfication = async () => {
    const res = await ClientAPI.getAll('/app/notifications');
    setNotificationList(res.data);
  };
  useEffect(() => {
    handleGetAllNotitfication();
  }, []);

  useEffect(() => {
    setNumberNew(0)
    notificationList.map((item) => {
      if (item.status === 'new'){
        setNumberNew(numberNew + 1)
      }
    })
  }, [notificationList])

  return (
    <>
      <Tooltip arrow title="Notifications">
        <IconButton color="primary" ref={ref} onClick={handleOpen}>
          <NotificationsBadge
            badgeContent={numberNew || 0}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <NotificationsActiveTwoToneIcon />
          </NotificationsBadge>
        </IconButton>
      </Tooltip>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Box
          sx={{ p: 2 }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">Thông báo</Typography>
        </Box>
        <Divider />
        <List sx={{ p: 0, maxHeight: 400, overflow: 'scroll' }}>
          {(notificationList || []).map((item: INotitficationProps, key) => (
            <ListItem
              key={key}
              sx={{
                p: 1,
                minWidth: 350,
                opacity: item.status == 'new' ? 1 : 0.4,
                display: { xs: 'block', sm: 'flex' },
                cursor: 'pointer',
                ':hover': {
                  backgroundColor: '#f3f6f6'
                }
              }}
              onClick={() => handleReadNotitfication(item)}
            >
              <Box flex="1">
                <Box display="flex" justifyContent="space-between">
                  <Typography sx={{ fontWeight: 'bold' }}>
                    Thông báo đặt lịch
                  </Typography>
                  <Typography variant="caption" sx={{ textTransform: 'none' }}>
                    {dayjs(item.created_at).format('DD/MM/YYYY')}
                  </Typography>
                </Box>
                <Typography>
                  <b>{item.name}</b> đã đặt lịch khám
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
}

export default HeaderNotifications;
