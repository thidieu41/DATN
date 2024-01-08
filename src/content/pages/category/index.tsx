import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card, Stack, Button } from '@mui/material';
import PageHeader from 'src/components/PageHeader';
import CategoryTable from 'src/content/applications/category/CategoryTable';
import { useNavigate } from 'react-router-dom';
import { handleSetToken } from 'src/utils/token';

function CategoryPage() {
  const navigate = useNavigate();
  const onNavigateToCreateBranch = () => {
    navigate('/admin/danh-muc/tao-danh-muc');
  };
  handleSetToken();
  return (
    <>
      <Helmet>
        <title>Trang danh sách danh mục</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title={'Danh mục'}
          textButton={'Thêm danh mục'}
          handleClick={onNavigateToCreateBranch}
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
              <CategoryTable categoryList={[]} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default CategoryPage;
