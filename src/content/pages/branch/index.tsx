import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import PageHeader from 'src/components/PageHeader';
import BranchTable from 'src/content/applications/branch/BranchTable';
import { useNavigate } from 'react-router-dom';
import { handleSetToken } from 'src/utils/token';

function BranchPage() {
  const navigate = useNavigate();
  const onNavigateToCreateBranch = () => {
    navigate('/admin/chi-nhanh/tao-chi-nhanh');
  };
  handleSetToken();
  return (
    <>
      <Helmet>
        <title>Trang chi nhánh nha khoa</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title={'Chi nhánh nha khoa'}
          textButton={'Thêm chi nhánh'}
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
              <BranchTable />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default BranchPage;
