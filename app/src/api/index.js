import axios from 'axios';

const API_BASE = 'https://zi-affiliates-backend.onrender.com';

const api = axios.create({
  baseURL: API_BASE,
});

export const login = (email, password) =>
  api.post('/user/login', { email, password });

export const getDashboard = (token) =>
  api.get('/leads/dashboard', {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createLead = (data, token, employeeId) =>
  api.post('/leads', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'employee-id': employeeId,
    },
  });

export const getLeadsByEmployee = (employeeId, token) =>
  api.get(`/leads/by-employee/${employeeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'employee-id': employeeId,
    },
  });

export const getLeadsByStatus = (status, token, employeeId) =>
  api.get(`/leads?status=${status}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'employee-id': employeeId,
    },
  });

export default api;
