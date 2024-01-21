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
import { useLocation } from 'react-router';
import { IPostCategoriesProps } from 'src/interface/categories';
import CustomEmptyData from 'src/components/TableEmptyRow/CardEmptyData';

function DetailsCategoriesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [details, setDetails] = useState<IPostCategoriesProps>();
  const [detailsCategories, setDetailsCategories] = useState<{
    [key: string]: IPostCategoriesProps;
  }>({});
  const [category, setCategogy] = useState<{
    name: string;
    id: string;
  }>({
    name: '',
    id: ''
  });

  const location = useLocation();
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

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
    setIsEdit(false);
  };

  const handleSetIsLoading = (value: boolean) => {
    setIsLoading(value);
  };
  const onGetPostCategories = async (url: string) => {
    handleSetIsLoading(true);
    try {
      const res = await ClientAPI.getAll(url);
      const data = handleObjectKeyData(res.data);
      setDetailsCategories(data);
    } catch (error) {
      toast.error('Lỗi lấy tất cả chi tiết danh mục!');
    } finally {
      handleSetIsLoading(false);
    }
  };

  const handleSetisEdit = (id: string) => {
    setIsEdit(true);
    setDetails(detailsCategories[id]);
    onOpenModal();
  };

  const handleRemove = async (id: string) => {
    handleSetIsLoading(true);
    try {
      await ClientAPI.delete(`/app/menu-items/${id}/`);
      const data = Object.values(detailsCategories).filter(
        (item) => item.id !== id
      );
      const list = handleObjectKeyData(data);
      setDetailsCategories(list);
      toast.success('Xoá chi tiết danh mục thành công!');
    } catch (error) {
      toast.error('Xoá chi tiết danh mục không thành công!');
    } finally {
      handleSetIsLoading(false);
    }
  };

  const handleNewValue = (newValue: IPostCategoriesProps) => {
    const data = {
      ...detailsCategories,
      [newValue.id]: newValue
    };
    setDetailsCategories(data);
  };

  const handleGetMenu = () => {
    const pathname = location.pathname.split('/');
    const name = pathname[pathname.length - 2];
    const categoryId = pathname[pathname.length - 1];
    setCategogy({
      name: decodeURI(name),
      id: categoryId
    });
    onGetPostCategories(`/app/menu-items/?menu=${categoryId}`);
  };

  useEffect(() => {
    handleGetMenu();
  }, []);
  return (
    <>
      <Helmet>
        <title>Trang chi tiết danh mục </title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title={`Chi tiết danh mục / ${category.name}`}
          textButton={'Thêm danh sách'}
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
              {Object.values(detailsCategories).length === 0 ? (
                <CustomEmptyData />
              ) : (
                <CategoriesComponent
                  handleSetisEdit={handleSetisEdit}
                  handleRemove={handleRemove}
                  data={Object.values(detailsCategories)}
                  isCategoryBooking={false}
                  isDetailsCategory={true}
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
        isDetailsCategory={true}
        categoryId={category.id}
      />
      <BackDropComponent open={isLoading} />
    </>
  );
}

export default DetailsCategoriesPage;
