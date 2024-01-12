import { Box, Button, Typography, styled, lighten, alpha } from '@mui/material';

export const UserBoxButton = styled(Button)(
  ({ theme }) => `
          padding-left: ${theme.spacing(1)};
          padding-right: ${theme.spacing(1)};
  `
);

export const MenuUserBox = styled(Box)(
  ({ theme }) => `
          background: ${theme.colors.alpha.black[5]};
          padding: ${theme.spacing(2)};
  `
);

export const UserBoxText = styled(Box)(
  ({ theme }) => `
          text-align: left;
          padding-left: ${theme.spacing(1)};
  `
);

export const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
          font-weight: ${theme.typography.fontWeightBold};
          color: ${theme.palette.secondary.main};
          display: block;
  `
);

export const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
          color: ${lighten(theme.palette.secondary.main, 0.5)}
  `
);

export const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
        background-color: ${alpha(theme.header.background, 0.95)};
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`
);
