import { styled } from '@mui/material/styles';

import {
  Container,
  Grid,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import { useState, SyntheticEvent } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LoginForm from './login';
import RegisterForm from './register';

const TabCustom = styled(Tab)(
  () => `
    width:100%;
    color:black;
`
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function AuthenticarionPage() {
  const [value, setValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box
      style={{
        marginTop: 100
      }}
    >
      <Container maxWidth="md">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card
              style={{
                padding: '0px'
              }}
            >
              <CardContent sx={{
                padding:0
              }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                    TabIndicatorProps={{
                      style: {
                        // backgroundColor: '#D4EEFF',
                        left:value === 0 ? 0 : '50%',
                        width: '50%',
                        padding:'10px',
                        borderRadius: value === 0 ? '18px 0px 0px 0px' :'0px 18px 0px 0px',
                        border:0,
                        color:'black'
                      }
                    }}    
                  >
                    <TabCustom label="Đăng Nhập" />
                    <TabCustom label="Đăng Ký" />
                  </Tabs>
                  <Divider />
                  <TabPanel value={value} index={0}>
                    <LoginForm/>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                   <RegisterForm/>
                  </TabPanel>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AuthenticarionPage;
