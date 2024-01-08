import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card, Stack } from '@mui/material';
import PageHeader from 'src/components/PageHeader';
import CreateNewDetailsCategories from 'src/content/applications/detail_categories/new_details_categories';
import { handleSetToken } from 'src/utils/token';

function AddNewDetailsCategoryPage() {
  handleSetToken();
  return (
    <>
      <Helmet>
        <title>Trang tạo danh mục</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader title={'Tạo chi tiết danh mục'} />
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
                <CreateNewDetailsCategories />
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AddNewDetailsCategoryPage;
