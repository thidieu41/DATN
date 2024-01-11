import axios from 'axios';

export const getClientToken = () => {
  return axios.defaults.headers.common['Authorization'];
};

export const setClientToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const createClient = () => {
  const baseURL = "https://rich-flies-repeat.loca.lt/api"
  // const baseURL = 'http://localhost:8000/api/';

  const instance = axios.create({
    baseURL,
    timeout: 30000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error.response?.data);
    }
  );

  instance.interceptors.request.use(
    (config) => {
      config.headers = {
        Authorization: getClientToken(),
        ...config.headers
      };
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};
