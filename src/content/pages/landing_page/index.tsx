import { Box } from '@mui/material';
import LandingPageComponent from 'src/content/landingpage';
import { handleSetToken } from 'src/utils/token';

const LandingPage = () => {
  handleSetToken();
  return (
    <Box
      sx={{
        backgroundColor: 'white'
      }}
    >
      <LandingPageComponent />
    </Box>
  );
};

export default LandingPage;
