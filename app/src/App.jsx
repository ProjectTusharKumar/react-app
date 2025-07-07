import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LeadForm from './pages/LeadForm';
import Leads from './pages/Leads';

function AuthWrapper({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const location = useLocation();

  useEffect(() => {
    const onStorage = () => setIsAuthenticated(!!localStorage.getItem('token'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, [location]);

  return children(isAuthenticated);
}

function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000} />
      <AuthWrapper>
        {(isAuthenticated) => (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/form" element={isAuthenticated ? <LeadForm /> : <Navigate to="/login" />} />
            <Route path="/leads" element={isAuthenticated ? <Leads /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </AuthWrapper>
    </Router>
  );
}

export default App;
