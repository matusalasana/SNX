import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Configure client response interceptors to ease authentication extraction
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Return formatted error messages directly
    const msg = error.response?.data?.error || error.message || 'An unexpected API connection error occurred.';
    return Promise.reject(new Error(msg));
  }
);

export default api;
