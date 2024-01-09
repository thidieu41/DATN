import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import PageHeader from 'src/components/PageHeader';
import CategoriesComponent from 'src/content/applications/post_categories';
import CreateNewPostCategory from 'src/content/applications/post_categories/components/CreateNewPostCategory';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BackDropComponent from 'src/components/BackDrop';
import { handleSetToken } from 'src/utils/token';
import { ClientAPI } from 'src/api';

export interface IPostCategoriesProps {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
}

function CategoryPage() {
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
      toast.error('Lỗi lấy tất cả danh mục lịch khám!');
    } finally {
      handleSetIsLoading(false);
    }
  };

  useEffect(() => {
    onGetPostCategories('/app/menus/');
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
      await ClientAPI.delete(`/app/menus/${id}/`);
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
        <title>Trang danh mục lịch khám</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title={'Danh mục lịch khám'}
          textButton={'Thêm danh mục lịch khám'}
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
              <CategoriesComponent
                handleSetisEdit={handleSetisEdit}
                handleRemove={handleRemove}
                data={Object.values(postCategories)}
                isCategoryBooking={true}
              />
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
        isCategoryBooking={true}
      />
      <BackDropComponent open={isLoading} />
    </>
  );
}

export default CategoryPage;
