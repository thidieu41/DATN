import { createClient } from 'src/utils/axios';

const client = createClient();

export const PostAPI = {
  getAll: async (url: string) => {
    const response = await client.get(url);
    return response;
  },

  getDetails: async (id: string) => {
    const response = await client.get(`/post/posts/${id}/`);
    return response;
  },

  delete: async (id: string) => {
    const response = await client.delete(`/post/posts/${id}/`);
    return response;
  }
};
