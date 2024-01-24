import {
  Box,
  Card,
  Typography,
  Container,
  Divider,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const MainContent = styled(Box)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
`
);

const ButtonSearch = styled(Button)(
  ({ theme }) => `
    margin-right: -${theme.spacing(1)};
`
);

function Status404() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/admin${search}`);
  };
  return (
    <>
      <Helmet>
        <title>Status - 404</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <img alt="404" height={180} src="/static/images/status/404.svg" />
            <Typography variant="h2" sx={{ my: 2 }}>
              Trang bạn đang tìm kiếm hiện không tồn tại!
            </Typography>
            <Typography
              variant="h4"
              color="text.secondary"
              fontWeight="normal"
              sx={{ mb: 4 }}
            >
              Đó là trách nhiệm của chúng tôi vì vậy vui lòng nhập địa chỉ trang
              mà bạn muốn đến dưới đây.
            </Typography>
          </Box>
          <Container maxWidth="sm">
            <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
              <FormControl variant="outlined" fullWidth>
                <OutlinedInputWrapper
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Nhập địa chỉ trang ví dụ /bac-si..."
                  endAdornment={
                    <InputAdornment position="end">
                      <ButtonSearch
                        variant="contained"
                        size="small"
                        onClick={handleSearch}
                      >
                        Tìm kiếm
                      </ButtonSearch>
                    </InputAdornment>
                  }
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchTwoToneIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Divider sx={{ my: 4 }}>Hoặc</Divider>
              <Button href="/admin/bac-si" variant="outlined">
                Về trang chủ
              </Button>
            </Card>
          </Container>
        </Container>
      </MainContent>
    </>
  );
}

export default Status404;
