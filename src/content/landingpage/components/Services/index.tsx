import { Box, Grid, Stack, Typography } from '@mui/material';
import { servicesList } from './data';
import { useNavigate } from 'react-router-dom';

export const ServicesComponent = () => {
  const navitaion = useNavigate();

  const handleMavigatoDetails = (id: string | number) => {
    navitaion(`/dich-vu/${id}`);
  };

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
                alignItems: 'center',
                cursor: 'pointer'
              }}
              onClick={() => handleMavigatoDetails(item.id)}
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
                    borderRadius: 8,
                    height: 240
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
