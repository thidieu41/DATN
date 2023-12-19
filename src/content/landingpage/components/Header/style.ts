import { Box, Container, Stack, styled } from '@mui/material';

export const Wrapper = styled(Container)(
  () => `
    padding-top: 80px;
    width: 100%;
    min-height: 840px;
    @media (max-width: 960px) {
      flex-direction: column;
    }
  `
);
export const LeftSide = styled(Box)(`
    width: 50%;
    height: 100%;
    @media (max-width: 960px) {
      width: 100%;
      order: 2;
      margin: 50px 0;
      text-align: center;
    }
    @media (max-width: 560px) {
      margin: 80px 0 50px 0;
    }
  `);
export const RightSide = styled(Box)(
  () => `
    width: 50%;
    height: 100%;
    @media (max-width: 960px) {
      width: 100%;
      order: 1;
      margin-top: 30px;
    }
  `
);
export const HeaderP = styled(Box)(
  () => `
    max-width: 470px;
    padding: 15px 0 50px 0;
    line-height: 1.5rem;
    @media (max-width: 960px) {
      padding: 15px 0 50px 0;
      text-align: center;
      max-width: 100%;
    }
  `
);
export const BtnWrapper = styled(Box)(
  () => `
    max-width: 190px;
    @media (max-width: 960px) {
      margin: 0 auto;
    }
  `
);
export const GreyDiv = styled(Stack)(
  () => `
    width: 30%;
    height: 700px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 0;
    @media (max-width: 960px) {
      display: none;
    }
  `
);
export const ImageWrapper = styled(Box)(
  () => `
    display: flex;
    justify-content: flex-end;
    position: relative;
    z-index: 9;
    @media (max-width: 960px) {
      width: 100%;
      justify-content: center;
    }
  `
);

export const QuoteWrapper = styled(Box)(
  () => `
    position: absolute;
    left: 0;
    bottom: 50px;
    max-width: 330px;
    padding: 30px;
    z-index: 99;
    
    background-color: #0b093b;
    border-radisu:8px,
    @media (max-width: 960px) {
      left: 20px;
    }
    @media (max-width: 560px) {
      bottom: -50px;
    }
  `
);
export const QuotesWrapper = styled(Box)(
  () => `
    position: absolute;
    left: -20px;
    top: -10px;
  `
);
export const DotsWrapper = styled(Box)(
  () => `
    position: absolute;
    right: -100px;
    bottom: 100px;
    z-index: 2;
    @media (max-width: 960px) {
      right: 100px;
    }
    @media (max-width: 560px) {
      display: none;
    }
  `
);
