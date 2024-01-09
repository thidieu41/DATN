import React from 'react';
import { createClient } from 'src/utils/axios';

const client = createClient();

export const User = {
  Login: async (email, password) => {
    const response = await client.post('/auth/token/', { email, password });
    return response;
  },

  Register: async (email, password, phone) => {
    const response = await client.post('/auth/token/register/', {
      email,
      password,
      phone
    });
    return response;
  },

  Profile: async () => {
    const response = await client.get('users/me');
    return response;
  }
};
