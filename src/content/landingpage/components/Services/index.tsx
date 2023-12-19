import { Box, Container, Grid, Stack, Typography } from '@mui/material';

const servicesList = [
  {
    urlImg: '/static/images/services/cay-ghep-implant-1.jpg',
    title: 'Cấy ghép Implant'
  },
  {
    urlImg: '/static/images/services/boc-rang-su-tham-my-1.jpg',
    title: 'Bọc răng sứ thẩm mỹ'
  },
  {
    urlImg: '/static/images/services/danh-bong-rang.jpg',
    title: 'Đánh bóng, cạp vôi răng'
  },
  {
    urlImg: '/static/images/services/taytrang.webp',
    title: 'Tẩy trắng răng nhanh'
  },
  {
    urlImg: '/static/images/services/nieng-rang.webp',
    title: 'Niềng răng chỉnh nha'
  },
  {
    urlImg: '/static/images/services/dan-su.jpeg',
    title: 'Mặt dán Venner'
  },

  {
    urlImg: '/static/images/services/nho-rang-khon-nieng-rang-1-1.jpg',
    title: 'Nhổ răng khôn công nghệ'
  },
  {
    urlImg: '/static/images/services/tram-rang.jpeg',
    title: 'Trám răng thẩm mỹ'
  },
  {
    urlImg: '/static/images/services/dieu-tri-tuy.jpg',
    title: 'Điều trị nội nha, chữa tuỷ răng'
  }
];

export const ServicesComponent = () => {
  return (
    <Box
      sx={{
        marginTop: 10,
        padding: '30px',
        backgroundColor: '#f5f5f5'
      }}
      id="dich-vu"
    >
      <Stack>
        <Typography
          sx={{
            fontSize: 30,
            fontWeight: 600,
            mb: 3
          }}
        >
          Dịch Vụ Nha Khoa
        </Typography>
      </Stack>
      <Grid
        container
        spacing={5}
        sx={{
          paddingLeft: 10,
          paddingRight: 10
        }}
      >
        {servicesList.map((item, index) => (
          <Grid item lg={4} md={6} xs={12} key={index}>
            <Stack
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Stack
                sx={{
                  width: 350,
                  height: 300,
                  borderRadius: 2,
                  border: '1px solid #318A79',
                  padding: 1,
                  backgroundColor: 'white'
                }}
              >
                <img
                  src={item.urlImg}
                  alt="project"
                  style={{
                    borderRadius: 8
                  }}
                />
              </Stack>
              <Stack
                sx={{
                  maxWidth: '100%',
                  textAlign: 'center',
                  mt: 2
                }}
                spacing={2}
              >
                <Typography variant="h4">{item.title}</Typography>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
