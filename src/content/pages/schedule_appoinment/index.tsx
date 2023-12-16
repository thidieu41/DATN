import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import PageHeader from 'src/components/PageHeader';
import ScheduleAppoinmentTable from 'src/content/applications/schedule_appoinment/ScheduleAppoinmentTable';
import { DoctorList } from 'src/content/applications/doctors/data';
import { useNavigate } from "react-router-dom";

function ScheduleAppoinmentPage() {
  const navigate = useNavigate();

  const onNavigateToAddNewAppoinment = () =>{
    console.log('hhhh')
    navigate("/dashboards/lich-kham/tao-lich");
  }

  return (
    <>
      <Helmet>
        <title>Danh sách lịch khám</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader title={'Lịch Khám'} textButton={'Đặt lịch khám'} handleClick={onNavigateToAddNewAppoinment} />
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
              <ScheduleAppoinmentTable doctorList={DoctorList} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ScheduleAppoinmentPage;
