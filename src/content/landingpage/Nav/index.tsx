import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-scroll';
import { Stack } from '@mui/material';

const pages = [
  { title: 'Giới thiệu', to: 'trang-chu' },
  { title: 'Đặt Lịch', to: 'dat-lich' },
  { title: 'Dịch Vụ', to: 'dich-vu' },
  { title: 'Bài Viết', to: 'bai-viet' }
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
              href="#trang-chu"
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
                    style={{ padding: '10px 15px' }}
                    to={page.to}
                    spy={true}
                    smooth={true}
                    offset={-80}
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
            href="#trang-chu"
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
                  '&:hover': { color: '#308a79' }
                }}
                variant="h6"
              >
                <Link
                  activeClass="active"
                  style={{ padding: '10px 15px' }}
                  to={page.to}
                  spy={true}
                  smooth={true}
                  offset={-80}
                >
                  {page.title}
                </Link>
              </Typography>
            ))}
          </Box>

          <Stack sx={{ flexGrow: 0 }} direction={'row'} spacing={2}>
            <Button variant="outlined" href="/authen">
              Login
            </Button>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
