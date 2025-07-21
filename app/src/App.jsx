import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/user-pages/Login';
import Dashboard from './pages/user-pages/UserDashboard';
import LeadForm from './pages/user-pages/LeadForm';
import Leads from './pages/user-pages/Leads';
import Signup from './pages/admin-pages/Signup';
import AdminDashboard from './pages/admin-pages/AdminDashboard';
import LeadsView from './pages/admin-pages/LeadsView.jsx';
import SplashScreen from './components/SplashScreen';
import { AuthProvider, useAuth } from './api/AuthContext.jsx';

function AppRoutes() {
  const { token, role } = useAuth();
  const isAuthenticated = !!token;
  return (
    <Routes>
      <Route path="/login"           element={<Login />} />
      <Route path="/admin-dashboard" element={isAuthenticated && role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
      <Route path="/signup"          element={isAuthenticated && role === 'admin' ? <Signup /> :         <Navigate to="/login" />} />
      <Route path="/lead-view"       element={isAuthenticated && role === 'admin' ? <LeadsView /> :      <Navigate to="/login" />} />
      <Route path="/dashboard"       element={isAuthenticated && role === 'user' ? <Dashboard /> :       <Navigate to="/login" />} />
      <Route path="/form"            element={isAuthenticated                    ? <LeadForm /> :        <Navigate to="/login" />} />
      <Route path="/leads"           element={isAuthenticated && role === 'user' ? <Leads /> :           <Navigate to="/login" />} />
      <Route path="*"                element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen videoSrc="Zeus_infinty_affiliate_logo_animation_black.mp4" onFinish={() => setShowSplash(false)} />;
  }

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
