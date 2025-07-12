import axios from 'axios';

const API = axios.create({
  baseURL: 'https://3f96e1329c8d.ngrok-free.app/api/v1',
});

// Add token automatically to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/users/register', data);

// User Management API
export const getAllUsers = () => API.get('/users');
export const getUserById = (id) => API.get(`/users/${id}`);
export const banUser = (id) => API.put(`/users/${id}/ban`);
export const unbanUser = (id) => API.put(`/users/${id}/unban`);
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const loginUser = (data) => API.post('/users/login', data);