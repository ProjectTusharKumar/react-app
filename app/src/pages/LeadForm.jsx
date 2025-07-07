import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLead } from '../api';
import { toast } from 'react-toastify';
import { validateEmail, validatePhone } from '../utils/validation';
import './LeadForm.css';

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
      <form className="leadform-form" onSubmit={handleSubmit}>
        <h2>Create Lead</h2>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="hot">Hot</option>
          <option value="cold">Cold</option>
          <option value="warm">Warm</option>
        </select>
        <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />
        <div className="leadform-actions">
          <button type="button" onClick={() => navigate('/dashboard')}>Back</button>
          <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
