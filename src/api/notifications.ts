import { IBranchsParamsProps } from 'src/interface/branchs';
import { createClient } from 'src/utils/axios';

const client = createClient();

export const NotificationAPI = {
  getAll: async () => {
    const response = await client.get('/app/notifications');
    return response;
  },

  update: async (id: string) => {
    const response = await client.put(`/app/notifications/${id}`, null);
    return response;
  }
};
