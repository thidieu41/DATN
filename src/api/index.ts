import { createClient } from 'src/utils/axios';

const client = createClient();

export const ClientAPI = {
  getAll: async (url: string) => {
    const response = await client.get(url);
    return response;
  },

  getDetails: async (url: string) => {
    const response = await client.get(url);
    return response;
  },

  add: async (url: string, params: any) => {
    const response = await client.post(url, params);
    return response;
  },

  update: async (url: string, params) => {
    const response = await client.put(url, params);
    return response;
  },

  delete: async (url: string) => {
    const response = await client.delete(url);
    return response;
  }
};
