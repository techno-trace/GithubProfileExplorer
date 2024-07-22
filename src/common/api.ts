import axios from 'axios';
import { BASE_API, TOKEN } from './constants';

const api = axios.create({
  baseURL: BASE_API,
});

api.interceptors.request.use(
  (config) => {
    const token = TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
