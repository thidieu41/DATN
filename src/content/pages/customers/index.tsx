import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import PageHeader from 'src/components/PageHeader';
import CustomerTable from 'src/content/applications/customers/CustomersTable';
import { handleSetToken } from 'src/utils/token';

function CustomerPage() {
  handleSetToken();
  return (
    <>
      <Helmet>
        <title>Trang khách hàng</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader title={'Khách hàng'} />
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
              <CustomerTable customerList={[]} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default CustomerPage;
