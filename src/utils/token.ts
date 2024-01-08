import { setClientToken } from './axios';

export const handleSetToken = () => {
  const token = localStorage.getItem('token');
  setClientToken(token);
};
