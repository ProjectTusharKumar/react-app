import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LeadForm from './pages/LeadForm';
import Leads from './pages/Leads';
import { AuthProvider, useAuth } from './api/AuthContext.jsx';

function AppRoutes() {
  const { token, role } = useAuth();
  const isAuthenticated = !!token;
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={isAuthenticated && role === 'user' ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/admin-dashboard" element={isAuthenticated && role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
      <Route path="/form" element={isAuthenticated && role === 'user' ? <LeadForm /> : <Navigate to="/login" />} />
      <Route path="/leads" element={isAuthenticated && role === 'user' ? <Leads /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-center" autoClose={3000} />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
