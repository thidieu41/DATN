import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card, Stack } from '@mui/material';
import PageHeader from 'src/components/PageHeader';
import CreateNewPost from 'src/content/applications/post/add_new_post';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { PostAPI } from 'src/api/posts';
import { IPostProps } from 'src/interface/posts';

function AddNewPostPage() {
  const [details, setDetails] = useState<IPostProps>();

  const location = useLocation();

  const handleGetDetailsData = async () => {
    const pathnameList = location.pathname.split('/');
    const postId = pathnameList[pathnameList.length - 1];
    if (!isNaN(Number(postId))) {
      const res = await PostAPI.getDetails(postId);
      setDetails(res.data);
    }
  };
  useEffect(() => {
    handleGetDetailsData();
  }, []);
  return (
    <>
      <Helmet>
        <title>Trang tạo bài viết</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader title={details ? 'Sửa bài viết' : 'Tạo bài viết'} />
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
                <CreateNewPost details={details} />
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AddNewPostPage;
