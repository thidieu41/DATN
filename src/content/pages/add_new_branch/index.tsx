import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card, Stack } from '@mui/material';
import PageHeader from 'src/components/PageHeader';
import CreateNewBranch from 'src/content/applications/branch/add_new_branch';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { handleSetToken } from 'src/utils/token';

function AddNewBranchPage() {
  const [branchId, setIdBranch] = useState('');
  const location = useLocation();
  const handlePathNameUrl = () => {
    const { pathname } = location;
    const pathnameList = pathname.split('/');
    const valueId = pathnameList[pathnameList.length - 1];
    if (!isNaN(Number(valueId))) {
      setIdBranch(valueId);
    }
  };
  useEffect(() => {
    handlePathNameUrl();
  }, []);

  handleSetToken();
  return (
    <>
      <Helmet>
        <title>Trang tạo chi nhánh</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader title={branchId ? 'Sửa chi nhánh' : 'Tạo chi nhánh'} />
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
                <CreateNewBranch branchId={branchId} />
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AddNewBranchPage;
