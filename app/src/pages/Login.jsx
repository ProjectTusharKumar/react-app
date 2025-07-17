import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login as loginApi } from '../api';
import { useAuth } from '../api/AuthContext.jsx';
import Input from '../components/Input';
import './Login.css';

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
      navigate(role === 'admin' ? '/admin-dashboard' : '/dashboard', { replace: true });
    } catch (err) {
      toast.error('Login failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-header">
          <img src="/Zeus_infinity_Ilogo.png" alt="Logo" className="login-logo" />
          <h2 className="login-title">ZI AFFILIATES</h2>
        </div>

        <div className="login-row">
          <label className="login-label" htmlFor="email">Email</label>
          <Input
            type="text"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            className="login-input"
            required
          />
        </div>

        <div className="login-row">
          <label className="login-label" htmlFor="password">Password</label>
          <Input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            className="login-input"
            required
          />
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* <div className="forgot-text">
          <a href="/forgot-password">Forgot password?</a>
        </div> */}
      </form>
    </div>
  );
};

export default Login;
