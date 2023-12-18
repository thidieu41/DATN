import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card, Stack } from '@mui/material';
import PageHeader from 'src/components/PageHeader';
import CreateNewCategory from 'src/content/applications/add_new_category';
import UpdateDoctorComponent from 'src/content/applications/update_doctor';

function UpdateDoctorPage() {
  return (
    <>
      <Helmet>
        <title>Thông tin nha sĩ</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader title={'Thông tin nha sĩ'} />
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
                <UpdateDoctorComponent />
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default UpdateDoctorPage;
