import { createClient } from 'src/utils/axios';

const client = createClient();
export const PostCategoriesAPI = {
  addNew: async (name: string) => {
    const response = await client.post('/post/categories/', { name });
    return response;
  },

  getAll: async () => {
    const response = await client.get('/post/categories/');
    return response;
  },

  update: async (name: string, id: string) => {
    const response = await client.put(`/post/categories/${id}`, { name });
    return response;
  },

  detelte: async (id: string) => {
    const response = await client.delete(`/post/categories/${id}`);
    return response;
  }
};
