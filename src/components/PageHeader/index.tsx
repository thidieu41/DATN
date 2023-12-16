import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

interface IProps {
  title: string;
  textButton?: string;
  handleClick?: () => void;
}
function PageHeader({ title, textButton, handleClick }: IProps) {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {title}
        </Typography>
      </Grid>
      <Grid item>
        {textButton && (
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={handleClick}
          >
            {textButton}
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

export default PageHeader;
