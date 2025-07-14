import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { login as loginApi } from '../api';
import { toast } from 'react-toastify';
import { useAuth } from '../api/AuthContext.jsx';
import Input from '../components/Input';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: setAuth } = useAuth();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginApi(form.email, form.password);
      const { token, empId, name, role } = res.data;
      setAuth({ token, role, name, employeeId: empId });
      toast.success(role === 'admin' ? 'You logged in as admin!' : 'Login successful!');
      setTimeout(() => {
        if (role === 'admin') {
          navigate('/admin-dashboard', { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
      }, 100);
    } catch (err) {
      toast.error('Login failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="leadform-container" style={{ paddingTop: 0 }}>
      <form className="leadform-modern-form" onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
          <img src="/Zeus_infinity_Ilogo.png" alt="ZI Affiliates Logo" style={{ height: 72, width: 72, objectFit: 'contain', marginBottom: 8 }} />
          <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.7rem', margin: 0 }}>Login</h2>
        </div>
        <div className="leadform-row">
          <span className="leadform-icon">📧</span>
          <label className="leadform-label" htmlFor="email">Email</label>
          <Input type="email" name="email" value={form.email} onChange={handleChange} required className="leadform-modern-input" />
        </div>
        <div className="leadform-row">
          <span className="leadform-icon">🔒</span>
          <label className="leadform-label" htmlFor="password">Password</label>
          <Input type="password" name="password" value={form.password} onChange={handleChange} required className="leadform-modern-input" />
        </div>
        <div className="leadform-actions">
          <button type="submit" className="leadform-btn" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
