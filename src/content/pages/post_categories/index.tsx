import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import PageHeader from 'src/components/PageHeader';
import CategoriesComponent from 'src/components/CardCategories';
import CreateNewPostCategory from 'src/components/CardCategories/CreateNewCardCategory';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BackDropComponent from 'src/components/BackDrop';
import { handleSetToken } from 'src/utils/token';
import { ClientAPI } from 'src/api';
import { IPostCategoriesProps } from 'src/interface/categories';
import CustomEmptyOverlayTable from 'src/components/TableEmptyRow';
import CustomEmptyData from 'src/components/TableEmptyRow/CardEmptyData';

function PostCategoriesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [details, setDetails] = useState<IPostCategoriesProps>();
  const [postCategories, setPostCategories] = useState<{
    [key: string]: IPostCategoriesProps;
  }>({});

  handleSetToken();

  const handleObjectKeyData = (data: IPostCategoriesProps[]) => {
    const list = (data || []).reduce((obj, item) => {
      obj = {
        ...obj,
        [item.id]: item
      };
      return obj;
    }, {});
    return list;
  };

  const handleSetIsLoading = (value: boolean) => {
    setIsLoading(value);
  };
  const onGetPostCategories = async (url: string) => {
    handleSetIsLoading(true);
    try {
      const res = await ClientAPI.getAll(url);
      const data = handleObjectKeyData(res.data);
      setPostCategories(data);
    } catch (error) {
      toast.error('Lỗi lấy tất cả danh mục bài đăng!');
    } finally {
      handleSetIsLoading(false);
    }
  };

  useEffect(() => {
    onGetPostCategories('/post/categories/');
  }, []);

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
    setIsEdit(false);
  };

  const handleSetisEdit = (id: string) => {
    setIsEdit(true);
    setDetails(postCategories[id]);
    onOpenModal();
  };

  const handleRemove = async (id: string) => {
    handleSetIsLoading(true);
    try {
      await ClientAPI.delete(`/post/categories/${id}/`);
      const data = Object.values(postCategories).filter(
        (item) => item.id !== id
      );
      const list = handleObjectKeyData(data);
      setPostCategories(list);
      toast.success('Xoá danh mục thành công!');
    } catch (error) {
      toast.error('Xoá danh mục không thành công!');
    } finally {
      handleSetIsLoading(false);
    }
  };

  const handleNewValue = (newValue: IPostCategoriesProps) => {
    const data = {
      ...postCategories,
      [newValue.id]: newValue
    };
    setPostCategories(data);
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
                height: 520,
                overflow: 'scroll'
              }}
            >
              {Object.values(postCategories).length === 0 ? (
                <CustomEmptyData />
              ) : (
                <CategoriesComponent
                  handleSetisEdit={handleSetisEdit}
                  handleRemove={handleRemove}
                  data={Object.values(postCategories)}
                  isCategoryBooking={false}
                />
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
      <CreateNewPostCategory
        open={open}
        onCloseModal={onCloseModal}
        isEdit={isEdit}
        detailsData={details}
        handleNewValue={handleNewValue}
        handleSetIsLoading={handleSetIsLoading}
        isCategoryBooking={false}
      />
      <BackDropComponent open={isLoading} />
    </>
  );
}

export default PostCategoriesPage;
