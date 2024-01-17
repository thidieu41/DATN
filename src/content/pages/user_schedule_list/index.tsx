import { Helmet } from 'react-helmet-async';
import { Grid, Container, Card, Stack } from '@mui/material';
import ResponsiveAppBar from 'src/content/landingpage/Nav';
import Footer from 'src/content/landingpage/components/Footer';
import { handleSetToken } from 'src/utils/token';
import UserScheduleAppoinment from 'src/content/landingpage/user_schedule_appoinment';

function ListUserScheduleAppoimentPage() {
  handleSetToken();
  return (
    <>
      <Helmet>
        <title>Trang đặt lịch khám cho khách hàng</title>
      </Helmet>
      <ResponsiveAppBar />
      <Container
        maxWidth="lg"
        sx={{
          marginTop: 15,
          marginBottom: 10
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card
              sx={{
                minHeight: 300
              }}
            >
              <Stack
                sx={{
                  padding: 3
                }}
              >
                <UserScheduleAppoinment />
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ListUserScheduleAppoimentPage;
