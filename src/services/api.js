// services/api.js
import axios from 'axios';

const API = axios.create({
  // baseURL: 'http://localhost:5000/api',  
  baseURL: 'https://mining-backend-0mzk.onrender.com/api',  
  timeout: 10000,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

// // src/services/api.js
// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",    
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;