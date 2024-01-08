import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import PageHeader from 'src/components/PageHeader';
import PostTable from 'src/content/applications/post/PostTable';
import { useNavigate } from 'react-router-dom';
import { handleSetToken } from 'src/utils/token';

function PostPage() {
  const navigate = useNavigate();

  const onNavigateToCreateBranch = () => {
    navigate('/admin/bai-viet/tao-bai-viet');
  };
  handleSetToken();
  return (
    <>
      <Helmet>
        <title>Trang danh sách bài viết</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title={'Bài viết'}
          textButton={'Thêm bài viết'}
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
              <PostTable />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default PostPage;
