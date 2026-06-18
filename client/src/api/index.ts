import axios from 'axios';

const VITE_API_URL = import.meta.env.VITE_API_URL;

const getBaseURL = () => {
  if (import.meta.env.DEV) {
    return "http://localhost:3000/api/v1";
  }
  return VITE_API_URL;
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true
});

export default api;