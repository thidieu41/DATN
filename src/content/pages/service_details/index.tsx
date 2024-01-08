import { Helmet } from 'react-helmet-async';
import { Grid, Container, Card, Stack } from '@mui/material';
import ResponsiveAppBar from 'src/content/landingpage/Nav';
import Footer from 'src/content/landingpage/components/Footer';
import ServicesDetailsCom from 'src/content/landingpage/components/Services/ServicesDetails';
import { handleSetToken } from 'src/utils/token';

function ServiceDetailsPage() {
  handleSetToken();
  return (
    <>
      <Helmet>
        <title>Trang chi tiết dịch vụ</title>
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
                <ServicesDetailsCom />
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ServiceDetailsPage;
