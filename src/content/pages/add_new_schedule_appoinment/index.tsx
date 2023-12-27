import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card, Stack } from '@mui/material';
import PageHeader from 'src/components/PageHeader';
import CreateNewSchedule from 'src/content/applications/schedule_appoinment/add_new_schedule_appoinment';

function AddNewScheduleAppoimentPage() {
  return (
    <>
      <Helmet>
        <title>Trang bác sĩ</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader title={'Đặt lịch khám'} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
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
                <CreateNewSchedule />
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AddNewScheduleAppoimentPage;
