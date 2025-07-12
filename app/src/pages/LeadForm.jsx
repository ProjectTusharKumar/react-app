import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLead } from '../api';
import { toast } from 'react-toastify';
import { validateEmail, validatePhone } from '../utils/validation';
import './LeadForm.css';
import Input from '../components/Input';

const LeadForm = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    status: 'hot',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const employeeId = localStorage.getItem('employeeId');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateEmail(form.email)) {
      toast.error('Invalid email');
      return;
    }
    if (!validatePhone(form.phone)) {
      toast.error('Invalid phone number');
      return;
    }
    setLoading(true);
    try {
      await createLead(form, token, employeeId);
      toast.success('Lead created!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to create lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="leadform-container">
      <div className="leadform-modern-form">
        <div className="leadform-title">
          <span className="leadform-icon">📝</span>
          Add New Lead
        </div>
        <form onSubmit={handleSubmit}>
          <div className="leadform-row">
            <span className="leadform-icon">👤</span>
            <label className="leadform-label" htmlFor="name">Name</label>
            <Input type="text" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="leadform-row">
            <span className="leadform-icon">📞</span>
            <label className="leadform-label" htmlFor="phone">Phone</label>
            <Input type="text" name="phone" value={form.phone} onChange={handleChange} required />
          </div>
          <div className="leadform-row">
            <span className="leadform-icon">📧</span>
            <label className="leadform-label" htmlFor="email">Email</label>
            <Input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="leadform-row">
            <span className="leadform-icon">📅</span>
            <label className="leadform-label" htmlFor="date">Date</label>
            <Input type="date" name="date" value={form.date} onChange={handleChange} required />
          </div>
          <div className="leadform-row">
            <span className="leadform-icon">📋</span>
            <label className="leadform-label" htmlFor="notes">Notes</label>
            <textarea
              className="leadform-textarea"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              style={{ width: '100%', background: '#18191a', color: '#fff', border: '1.5px solid #fff', borderRadius: '8px', resize: 'vertical', boxSizing: 'border-box' }}
              placeholder="Enter notes..."
            />
          </div>
          <div className="leadform-actions">
            <button type="submit" className="leadform-btn">Submit</button>
            <button type="button" className="leadform-btn leadform-back" onClick={() => navigate('/dashboard')}>Back</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
