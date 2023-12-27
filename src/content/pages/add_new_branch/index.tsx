import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card, Stack } from '@mui/material';
import PageHeader from 'src/components/PageHeader';
import CreateNewBranch from 'src/content/applications/branch/add_new_branch';

function AddNewBranchPage() {
  return (
    <>
      <Helmet>
        <title>Trang tạo chi nhánh</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader title={'Tạo chi nhánh'} />
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
                <CreateNewBranch />
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AddNewBranchPage;
