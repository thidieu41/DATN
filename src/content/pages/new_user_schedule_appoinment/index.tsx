import { Helmet } from 'react-helmet-async';
import { Grid, Container, Card, Stack } from '@mui/material';
import ResponsiveAppBar from 'src/content/landingpage/Nav';
import Footer from 'src/content/landingpage/components/Footer';
import { handleSetToken } from 'src/utils/token';
import CreateNewSchedule from 'src/content/applications/schedule_appoinment/add_new_schedule_appoinment';

function NewUserScheduleAppoimentPage() {
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
            <Card>
              <Stack
                sx={{
                  padding: 3
                }}
              >
                <CreateNewSchedule is_user={true} />
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default NewUserScheduleAppoimentPage;
