import { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Popover
} from '@mui/material';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { setClientToken } from 'src/utils/axios';
import {
  MenuUserBox,
  UserBoxButton,
  UserBoxDescription,
  UserBoxLabel,
  UserBoxText
} from '../style';
import { IProfileProps } from 'src/interface/profile';

interface IProps {
  profile: IProfileProps;
}
function HeaderUserbox({ profile }: IProps) {
  const avatar =
    'https://www.thewmch.com/wp-content/uploads/2023/02/female-doctor-using-her-digital-tablet-free-vector.jpg';

  const navigation = useNavigate();

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogOut = () => {
    localStorage.clear();
    setClientToken(null);
    navigation('/authen');
  };

  const handleNavigateProfile = (role: number) => {
    switch (Number(role)) {
      case 2:
        navigation('/thong-tin-ca-nhan');
        break;
      case 1:
        navigation('/admin/thong-tin-ca-nhan');
        break;
    }
    handleClose();
  };

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar variant="rounded" alt={profile?.name || '___'} src={avatar} />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">
              {profile?.name || '___'}
            </UserBoxLabel>
            <UserBoxDescription variant="body2">
              {profile?.email}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
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
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar variant="rounded" alt={profile?.name || '___'} src={avatar} />
          <UserBoxText>
            <UserBoxLabel variant="body1">
              {profile?.name || '___'}
            </UserBoxLabel>
            <UserBoxDescription variant="body2">
              {profile?.email}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <ListItem
            onClick={() => handleNavigateProfile(profile?.role?.id)}
            sx={{
              cursor: 'pointer'
            }}
          >
            <AccountBoxTwoToneIcon fontSize="small" sx={{ mr: 1 }} />
            <ListItemText primary="Thông tin cá nhân" />
          </ListItem>
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button color="primary" fullWidth onClick={handleLogOut}>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Đăng xuất
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
