import { ILoginFormValue } from 'src/content/authen/login/LoginSchema';
import { IRegisterFormValue } from 'src/content/authen/register/registerSchema';
import { createClient } from 'src/utils/axios';

const client = createClient();

export const User = {
  Login: async (payload: ILoginFormValue) => {
    const response = await client.post('/auth/token/', payload);
    return response;
  },

  Register: async (payload: IRegisterFormValue) => {
    const response = await client.post('/auth/token/register/', payload);
    return response;
  },

  Profile: async () => {
    const response = await client.get('users/me');
    return response;
  }
};
