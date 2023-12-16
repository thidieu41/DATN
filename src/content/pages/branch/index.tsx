import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import PageHeader from 'src/components/PageHeader';
import DoctorTable from 'src/content/applications/doctors/DoctorTable';
import { DoctorList } from 'src/content/applications/doctors/data';
import CategoryTable from 'src/content/applications/category/CategoryTable';
import BranchTable from 'src/content/applications/brach/BranchTable';


function BranchPage() {
  return (
    <>
      <Helmet>
        <title>Trang danh sách chi tiết danh mục</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader title={'Chi tiết danh mục'} textButton={'Thêm danh sách'} />
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
              <BranchTable branchList={[]} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default BranchPage;
