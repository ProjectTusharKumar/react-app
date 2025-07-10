import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LeadForm from './pages/LeadForm';
import Leads from './pages/Leads';

function AuthWrapper({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [location.pathname]);

  return children(isAuthenticated);
}

function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000} />
      <AuthWrapper>
        {(isAuthenticated) => {
          const role = localStorage.getItem('role');
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
        }}
      </AuthWrapper>
    </Router>
  );
}

export default App;
