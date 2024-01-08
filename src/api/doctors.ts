import { IBranchsParamsProps } from 'src/interface/branchs';
import { createClient } from 'src/utils/axios';

const client = createClient();

export const DoctorAPI = {
  getAll: async (url: string) => {
    const response = await client.get(url);
    return response;
  },

  getDetails: async (id: string) => {
    const response = await client.get(`/dental/doctors/${id}/`);
    return response;
  },

  add: async (params: IBranchsParamsProps) => {
    const response = await client.post(`/dental/doctors/`, params);
    return response;
  },

  update: async (id: string, params) => {
    const response = await client.put(`/dental/doctors/${id}/`, params);
    return response;
  },

  delete: async (id: string) => {
    const response = await client.delete(`/dental/doctors/${id}/`);
    return response;
  }
};
