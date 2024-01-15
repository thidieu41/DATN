import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-scroll';
import { Stack } from '@mui/material';
import HeaderUserbox from 'src/layouts/SidebarLayout/Header/Userbox';
import { useEffect, useState } from 'react';
import { IProfileProps } from 'src/interface/profile';

const pages = [
  { title: 'Giới thiệu', to: 'trang-chu' },
  { title: 'Đặt Lịch', to: 'dat-lich' },
  { title: 'Dịch Vụ', to: 'dich-vu' },
  { title: 'Bài Viết', to: 'bai-viet' }
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [navActive, setNavActive] = useState('');
  const [profile, setProfile] = useState<IProfileProps>();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSetActive = (to: string) => {
    setNavActive(to);
  };

  const handleNavigation = (to: string) => {
    const [_, url] = window.location.pathname.split('/');
    if (url.length > 0) {
      window.open(window.location.origin, '_self');
    }
    setNavActive(to);
  };

  const handleSetProfile = () => {
    const data = JSON.parse(localStorage.getItem('profile') || '{}');
    setProfile(data);
  };

  useEffect(() => {
    handleSetProfile();
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'white',
        color: 'black',
        padding: '20px 0px'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center'
            }}
            direction={'row'}
          >
            <img
              src="/static/images/logo/logo_ldp.svg"
              style={{
                height: 30
              }}
            />
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 3,
                ml: 1,
                color: 'inherit',
                textDecoration: 'none',
                '&:hover': { color: '#308a79' }
              }}
            >
              Nha Khoa Thanh Sơn
            </Typography>
          </Stack>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.to}>
                  <Link
                    activeClass="active"
                    style={{
                      padding: '10px 15px'
                    }}
                    to={page.to}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    onSetActive={handleSetActive}
                    onClick={handleNavigation}
                  >
                    <Typography>{page.title}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              display: { xs: 'flex', md: 'none' }
            }}
          >
            <img
              src="/static/images/logo/logo_ldp.svg"
              style={{
                height: 40
              }}
            />
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              ml: 1,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': { color: '#308a79' }
            }}
          >
            Nha Khoa Thanh Sơn
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' }
            }}
          >
            {pages.map((page) => (
              <Typography
                key={page.to}
                sx={{
                  cursor: 'pointer',
                  fontWeight: 600,
                  '&:hover': { color: '#308a79' },
                  color: navActive == page.to ? '#308a79' : 'black'
                }}
                variant="h6"
              >
                <Link
                  activeClass="active"
                  style={{
                    padding: '10px 15px'
                  }}
                  to={page.to}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  onSetActive={handleSetActive}
                  onClick={handleNavigation}
                >
                  {page.title}
                </Link>
              </Typography>
            ))}
          </Box>

          {Object.keys(profile || {}).length > 0 ? (
            <Stack sx={{ flexGrow: 0 }} direction={'row'} spacing={2}>
              <HeaderUserbox profile={profile} />
              {profile?.role?.id === 1 && (
                <Button href="/admin"> Trang Admin</Button>
              )}
            </Stack>
          ) : (
            <Button variant="outlined" href="/authen">
              Đăng Nhập
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
function setAnchorElNav(currentTarget: any) {
  throw new Error('Function not implemented.');
}
