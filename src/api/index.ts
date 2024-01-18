import { createClient, getClientToken } from 'src/utils/axios';

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

  add: async (url: string, params: any, headers?: any) => {
    const response = await client.post(url, params, headers);
    return response;
  },

  update: async (url: string, params, headers?: any) => {
    const response = await client.put(url, params, headers);
    return response;
  },

  delete: async (url: string) => {
    const response = await client.delete(url);
    return response;
  },

  updateFormdata: async (url: string, params) => {
    const response = await client.put(url, params, {
      headers: {
        Authorization: getClientToken(),
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  }
};
