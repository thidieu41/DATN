import { useNavigate } from 'react-router';
import { createClient } from 'src/utils/axios';

const client = createClient();
const doman = window.location;

const handleErrors401 =()=>{
  window.open(`${window.location.origin}/authen`);
}
export const ClientAPI = {
  getAll: async (url: string) => {
    const response = await client.get(url);
    if (response.status === 401) {
      handleErrors401()
      return
    }
    return response;
  },

  getDetails: async (url: string) => {
    const response = await client.get(url);
    if (response.status === 401) {
      handleErrors401()
      return
    }
    return response;
  },

  add: async (url: string, params: any) => {
    const response = await client.post(url, params);
    if (response.status === 401) {
      handleErrors401()
      return
    }
    return response;
  },

  update: async (url: string, params) => {
    const response = await client.put(url, params);
    if (response.status === 401) {
      handleErrors401()
      return
    }
    return response;
  },

  delete: async (url: string) => {
    const response = await client.delete(url);
    if (response.status === 401) {
      handleErrors401()
      return
    }
    return response;
  }
};
