import axios from 'axios';

const API_BASE = 'https://organic-disco-4j67jpxpjj6jcqrq-3000.app.github.dev';

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

// ➕ Add these two new API functions:

export const deleteLead = (leadId, token, employeeId) =>
  api.delete(`/leads/${leadId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'employee-id': employeeId,
    },
  });

export const updateLead = (leadId, payload, token, employeeId) => {
  return axios.post('/leads/update', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      'lead-id': leadId,
      'employee-id': employeeId,
    },
  });
};
//admin APIs
export const getAllLeads = (token) =>
  api.get(`/admin/all-leads`, {
    headers: {
      Authorization: `Bearer ${token}`,      
    },
  });

export const getAllLeadsByStatus = (status, token) =>
  api.get(`/admin/all-status-leads?status=${status}`, {
    headers: { Authorization: `Bearer ${token}` }
  });


export default api;
