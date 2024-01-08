import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import PageHeader from 'src/components/PageHeader';
import ScheduleAppoinmentTable from 'src/content/applications/schedule_appoinment/ScheduleAppoinmentTable';
import { useNavigate } from 'react-router-dom';
import { handleSetToken } from 'src/utils/token';

function ScheduleAppoinmentPage() {
  const navigate = useNavigate();

  const onNavigateToAddNewAppoinment = () => {
    navigate('/admin/lich-kham/tao-lich');
  };
  handleSetToken();
  return (
    <>
      <Helmet>
        <title>Danh sách lịch khám</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title={'Lịch Khám'}
          textButton={'Đặt lịch khám'}
          handleClick={onNavigateToAddNewAppoinment}
        />
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
              <ScheduleAppoinmentTable />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ScheduleAppoinmentPage;
