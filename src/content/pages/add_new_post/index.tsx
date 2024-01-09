import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card, Stack } from '@mui/material';
import PageHeader from 'src/components/PageHeader';
import CreateNewPost from 'src/content/applications/post/add_new_post';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { IPostProps } from 'src/interface/posts';
import { handleSetToken } from 'src/utils/token';
import { ClientAPI } from 'src/api';

function AddNewPostPage() {
  handleSetToken();

  const [details, setDetails] = useState<IPostProps>();

  const location = useLocation();

  const handleGetDetailsData = async () => {
    const pathnameList = location.pathname.split('/');
    const postId = pathnameList[pathnameList.length - 1];
    if (!isNaN(Number(postId))) {
      const res = await ClientAPI.getDetails(`/post/posts/${postId}/`);
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
