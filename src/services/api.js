import axios from 'axios';

const API = axios.create({
  // baseURL: 'http://localhost:5000/api/auth', 
  baseURL: 'https://mining-backend-0mzk.onrender.com/api/auth', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor (Token attach karne ke liye)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor (Error Handling)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    return Promise.reject({ message, status: error.response?.status });
  }
);

export default API;