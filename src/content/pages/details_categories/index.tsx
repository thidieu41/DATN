import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import PageHeader from 'src/components/PageHeader';
import { useNavigate } from 'react-router-dom';
import DetailsCategoriesTable from 'src/content/applications/detail_categories/DetailsCategoryTable';

function DetailsCategoriesPage() {
  const navigate = useNavigate();
  const onNavigateToCreateBranch = () => {
    navigate('/admin/danh-muc/tao-danh-muc');
  };

  return (
    <>
      <Helmet>
        <title>Trang chi tiết danh mục</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title={'Chi tiết danh mục'}
          textButton={'Thêm danh sách'}
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
              <DetailsCategoriesTable categoryList={[]} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default DetailsCategoriesPage;
