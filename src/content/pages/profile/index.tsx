import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card, Stack } from '@mui/material';
import PageHeader from 'src/components/PageHeader';
import EditProfile from 'src/content/applications/profile';

function ProfilePage() {
  return (
    <>
      <Helmet>
        <title>Trang thông tin cá nhân</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader title={'Thông tin cá nhân'} />
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
                <EditProfile />
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ProfilePage;
