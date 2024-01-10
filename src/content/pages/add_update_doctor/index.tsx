import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card, Stack } from '@mui/material';
import PageHeader from 'src/components/PageHeader';
import DoctorFormComp from 'src/content/applications/doctors/add_new_doctor';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { IDoctor } from 'src/interface/doctor';
import { handleSetToken } from 'src/utils/token';
import { ClientAPI } from 'src/api';
import BackDropComponent from 'src/components/BackDrop';

function DoctorFormPage() {
  const [details, setDetails] = useState<IDoctor>();
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const handleGetDetails = async () => {
    const pathList = location.pathname.split('/');
    const doctorId = pathList[pathList.length - 1];

    if (!isNaN(Number(doctorId))) {
      try {
        handleSetIsLoading(true);
        const res = await ClientAPI.getDetails(`/core/doctors/${doctorId}/`);
        setDetails(res.data);
      } catch (error) {
      } finally {
        handleSetIsLoading(false);
      }
    }
  };

  const handleSetIsLoading = (newValue: boolean) => {
    setIsLoading(newValue);
  };
  useEffect(() => {
    handleGetDetails();
  }, []);
  handleSetToken();
  return (
    <>
      <Helmet>
        <title>Thông tin nha sĩ</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader title={details ? 'Sửa nha sĩ ' : 'Thêm nha sĩ'} />
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
                <DoctorFormComp
                  details={details}
                  handleSetIsLoading={handleSetIsLoading}
                />
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <BackDropComponent open={isLoading} />
    </>
  );
}

export default DoctorFormPage;
