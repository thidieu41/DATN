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
import CustomEmptyData from 'src/components/TableEmptyRow/CardEmptyData';

function CategoryPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [details, setDetails] = useState<IPostCategoriesProps>();
  const [scheduleCategories, setScheduleCategories] = useState<{
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
      setScheduleCategories(data);
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
    setDetails(scheduleCategories[id]);
    onOpenModal();
  };

  const handleRemove = async (id: string) => {
    handleSetIsLoading(true);
    try {
      await ClientAPI.delete(`/app/menus/${id}/`);
      const data = Object.values(scheduleCategories).filter(
        (item) => item.id !== id
      );
      const list = handleObjectKeyData(data);
      setScheduleCategories(list);
      toast.success('Xoá danh mục thành công!');
    } catch (error) {
      toast.error('Xoá danh mục không thành công!');
    } finally {
      handleSetIsLoading(false);
    }
  };

  const handleNewValue = (newValue: IPostCategoriesProps) => {
    const data = {
      ...scheduleCategories,
      [newValue.id]: newValue
    };
    setScheduleCategories(data);
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
                height: 520,
                overflow: 'scroll'
              }}
            >
              {Object.values(scheduleCategories).length === 0 ? (
                <CustomEmptyData />
              ) : (
                <CategoriesComponent
                  handleSetisEdit={handleSetisEdit}
                  handleRemove={handleRemove}
                  data={Object.values(scheduleCategories)}
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
        isCategoryBooking={true}
      />
      <BackDropComponent open={isLoading} />
    </>
  );
}

export default CategoryPage;
