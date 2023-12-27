import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import PageHeader from 'src/components/PageHeader';
import PostCategoriesComponent from 'src/content/applications/post_categories';
import CreateNewPostCategory from 'src/content/applications/post_categories/components/CreateNewPostCategory';
import { useState } from 'react';

function PostCategoriesPage() {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [details, setDetails] = useState<{ name: string }>({ name: 'DM' });

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
    setIsEdit(false);
  };

  const handleSetisEdit = (id: string) => {
    setIsEdit(true);
    setDetails({ name: 'DM' });
    onOpenModal();
  };

  const handleRemove = (id: string) => {
    console.log(id);
  };

  return (
    <>
      <Helmet>
        <title>Trang danh mục bài viết</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title={'Danh mục bài viết'}
          textButton={'Thêm danh mục bài viết'}
          handleClick={onOpenModal}
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
            <Card
              sx={{
                height: 560,
                overflow: 'scroll'
              }}
            >
              <PostCategoriesComponent
                handleSetisEdit={handleSetisEdit}
                handleRemove={handleRemove}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <CreateNewPostCategory
        open={open}
        onOpenModal={onOpenModal}
        onCloseModal={onCloseModal}
        isEdit={isEdit}
        detailsData={details}
      />
    </>
  );
}

export default PostCategoriesPage;
