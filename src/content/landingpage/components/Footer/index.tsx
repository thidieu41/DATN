import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 6
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item sm={12} md={6}>
            <Typography variant="h5" color="text.primary" gutterBottom>
              Về chúng tôi
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                lineHeight: 1.6
              }}
            >
              Nha khoa Thanh Sơn sử dụng 100% các thuốc và trang thiết bị nha
              khoa nhập từ các hãng nổi tiếng và uy tín ở nước ngoài, bảo quản
              cẩn thận theo hướng dẫn nhà sản xuất. Luôn chủ động tích cực cập
              nhật và áp dụng những kĩ thuật mới, hiện đại và luôn tuân thủ các
              khâu xử lý vệ sinh vô trùng tuyệt đối. Bác sĩ cùng với ekip hỗ trợ
              kinh nghiệm, chu đáo và nhiệt tình Khách hàng đến với nha khoa
              Thanh Sơn sẽ được chúng tôi tư vấn hoàn toàn miễn phí về tình
              trạng sức khỏe răng miệng, phân tích quy trình và hiệu quả của
              từng giải pháp để quý khách hàng có thể lên dự tính về chi phí
              điều trị hợp lý nhất.
            </Typography>
          </Grid>
          <Grid item sm={12} md={4}>
            <Stack spacing={2}>
              <Typography variant="h5" color="text.primary" gutterBottom>
                Liên hệ
              </Typography>
              <Stack
                direction={'row'}
                spacing={1}
                sx={{
                  alignItems: 'center'
                }}
              >
                <BusinessOutlinedIcon
                  sx={{
                    color: '#308a79',
                    height: 20
                  }}
                />
                <Typography>
                  390 Đống Đa, Thanh Bình, Hải Châu Đà Nẵng.
                </Typography>
              </Stack>
              <Stack
                direction={'row'}
                spacing={1}
                sx={{
                  alignItems: 'center'
                }}
              >
                <AttachEmailOutlinedIcon
                  sx={{
                    color: '#308a79',
                    height: 20
                  }}
                />
                <Typography> nkhoathanhson@gmail.com</Typography>
              </Stack>
              <Stack
                direction={'row'}
                spacing={1}
                sx={{
                  alignItems: 'center'
                }}
              >
                <PhoneInTalkOutlinedIcon
                  sx={{
                    color: '#308a79',
                    height: 20
                  }}
                />
                <Typography>0236 3886 181 - 0849.074.627</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item sm={12} md={2}>
            <Typography variant="h5" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}></Box>
      </Container>
    </Box>
  );
}
