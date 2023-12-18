import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card, Stack } from '@mui/material';
import PageHeader from 'src/components/PageHeader';
import CreateNewCategory from 'src/content/applications/add_new_category';

function AddNewCategoryPage() {
  return (
    <>
      <Helmet>
        <title>Trang tạo danh mục</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader title={'Tạo danh mục'} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid
            item
            xs={12}
          >
            <Card>
              <Stack
                sx={{
                  padding: 3
                }}
              >
                <CreateNewCategory />
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AddNewCategoryPage;
