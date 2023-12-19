import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

const servicesList = [
  {
    icon: <CurrencyExchangeIcon fontSize="large" />,
    title: 'Chi Phí Hợp Lý',
    subtitle:
      'Nha Khoa Thanh Sơn có chi phí dịch vụ hợp lý, rõ ràng với nhiều phương thức thanh toán linh hoạt'
  },
  {
    icon: <VerifiedUserOutlinedIcon fontSize="large" />,
    title: 'Dịch Vụ Chuyên Sâu',
    subtitle:
      'Nha Khoa Thanh Sơn có đầy đủ kỹ thuật nha khoa từ đơn giản đến phức tạp cùng với tính thẩm mỹ cao, đẹp tự nhiên'
  },
  {
    icon: <SupervisedUserCircleOutlinedIcon fontSize="large" />,
    title: 'Đội Ngũ Bác Sĩ',
    subtitle:
      'Đội ngũ Bác Sĩ Nha Khoa Thanh Sơn có chuyên môn giỏi, thái độ thân thiện và chăm sóc tận tình chu đáo'
  },
  {
    icon: <MapsHomeWorkOutlinedIcon fontSize="large" />,
    title: 'Phòng Khám Hiện Đại',
    subtitle:
      'Hệ thống Nha Khoa Thanh Sơn có chi phí dịch vụ hợp lý, rõ ràng với nhiều phương thức thanh toán linh hoạt'
  }
];
export default function ServicesInformation() {
  return (
    <Box id="services">
      <Grid
        container
        direction={'row'}
        spacing={2}
        sx={{
          padding: '60px 30px',
          backgroundColor: '#f5f5f5'
        }}
      >
        {servicesList.map((service, index) => (
          <Grid item key={index} md={3} xs={6}>
            <Stack
              sx={{
                justifyContent: 'center'
              }}
              direction="column"
            >
              <Stack
                sx={{
                  color: '#01BBF0',
                  justifyContent: 'center',
                  marginBottom: 2
                }}
                direction="row"
              >
                {service.icon}
              </Stack>

              <Typography
                sx={{
                  mb: 3,
                  fontSize: 20,
                  fontWeight: 600,
                  textAlign: 'center'
                }}
              >
                {service.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: 17,
                  textAlign: 'center'
                }}
              >
                {service.subtitle}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        sx={{
          my: 2,
          padding: '0px 60px'
        }}
        id="dat-lich"
      >
        <Grid item md={6} xs={12}>
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              flexDirection: 'column',
              maxWidth: '70%'
            }}
            spacing={2}
          >
            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 600,
                mb: 3
              }}
            >
              Nha khoa Thanh Sơn
              <br /> giúp bạn dễ dàng quản lý thời gian
            </Typography>
            <Typography
              sx={{
                fontSize: 15,
                lineHeight: 2
              }}
            >
              Với công nghệ hiện đại thời gian, ngoài những việc làm đẹp ra thì
              chúng tôi cũng hướng đến sự phát triển của thời đại. Nên vì thế
              chũng tôi muốn giúp bạn có thể tiết kiệm được thời gian của bản
              thân. Thay vì đi đến và chờ đợi làm thủ tục thì bạn có thể ấn vào
              nút đặt lịch. Chỉ cần thế thôi thì bạn đã có 1 cuộc hẹn rõ ràng
              với nha khoa Thanh Sơn
            </Typography>
            <Button
              variant="contained"
              sx={{
                maxWidth: 250,
                padding: 1.5
              }}
              fullWidth
            >
              Đặt Lịch
            </Button>
          </Stack>
        </Grid>
        <Grid item md={6} xs={12}>
          <Stack
            direction={'row'}
            sx={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
            spacing={3}
          >
            <img
              src="/static/images/infor_dentis/slide-4.png"
              style={{
                width: 350,
                height: 400,
                borderRadius: 16,
                marginRight: -100,
                zIndex: 10,
                border: '1px solid #318A79'
              }}
            />
            <Box
              sx={{
                paddingTop: 15
              }}
            >
              <img
                src="/static/images/infor_dentis/form-link.avif"
                style={{
                  width: 350,
                  height: 400,
                  borderRadius: 16,
                  border: '1px solid #318A79'
                }}
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
