import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import ArticleIcon from '@mui/icons-material/Article';
import { setClientToken } from 'src/utils/axios';
import {
  MenuUserBox,
  UserBoxButton,
  UserBoxDescription,
  UserBoxLabel,
  UserBoxText
} from '../style';
import { IProfileProps } from 'src/interface/profile';
import { handleImage } from 'src/utils/constanst';

interface IProps {
  profile: IProfileProps;
}
function HeaderUserbox({ profile }: IProps) {
  const avatar =
    profile?.role?.id === 1
      ? 'https://www.thewmch.com/wp-content/uploads/2023/02/female-doctor-using-her-digital-tablet-free-vector.jpg'
      : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png';

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
        <Avatar
          variant="rounded"
          alt={profile?.name || '___'}
          src={handleImage(profile?.image)}
        />
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
          <Avatar
            variant="rounded"
            alt={profile?.name || '___'}
            src={handleImage(profile?.image)}
          />
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
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton
            onClick={() => handleNavigateProfile(profile?.role?.id)}
          >
            <ListItemIcon>
              <AccountBoxTwoToneIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Thông tin cá nhân" />
          </ListItemButton>

          <ListItemButton onClick={() => navigation('/danh-sach-lich-kham')}>
            <ListItemIcon>
              <ArticleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Danh sách lịch khám" />
          </ListItemButton>
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
