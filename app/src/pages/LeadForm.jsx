import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLead } from '../api';
import { toast } from 'react-toastify';
import { validateEmail, validatePhone } from '../utils/validation';
import './LeadForm.css';
import Input from '../components/Input';
import { Range } from 'react-range';

const LeadForm = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    status: 'hot',
    notes: '',
    existingAgency: 'yes',
    services: [],
    industry: '',
    budget: [15000, 100000],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const employeeId = localStorage.getItem('employeeId');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBudgetChange = values => {
    setForm(f => ({ ...f, budget: values }));
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

  const BUDGET_MIN = 15000;
  const BUDGET_MAX = 100000;

  return (
    <div className="leadform-container" style={{ scrollBehavior: 'smooth' }}>
      <div className="leadform-modern-form"><button
        type="button"
        className="leadform-btn leadform-back-outside"
        onClick={() => navigate('/dashboard')}
      >
        <span style={{ fontSize: 22, marginRight: 4 }}>←</span> Back
      </button>

        <div className="leadform-title">
          {/*<span className="leadform-icon">📝</span> */}
          Add New Lead
        </div>
        <form onSubmit={handleSubmit}>
          <div className="leadform-row">
            {/* <span className="leadform-icon">👤</span> */}
            <label className="leadform-label" htmlFor="name">Full Name</label>
            <Input type="text" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="leadform-row">
            {/* <span className="leadform-icon">📞</span> */}
            <label className="leadform-label" htmlFor="phone">Phone</label>
            <Input type="text" name="phone" value={form.phone} onChange={handleChange} required />
          </div>
          <div className="leadform-row">
            {/* <span className="leadform-icon">📧</span> */}
            <label className="leadform-label" htmlFor="email">Email</label>
            <Input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="leadform-row">
            {/* <span className="leadform-icon">📅</span> */}
            <label className="leadform-label" htmlFor="date">Date</label>
            <Input type="date" name="date" value={form.date} onChange={handleChange} required />
          </div>
          <div className="leadform-row">
            {/* <span className="leadform-icon">🏢</span> */}
            <label className="leadform-label">Existing Agency</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label><input type="radio" name="existingAgency" value="yes" checked={form.existingAgency === 'yes'} onChange={handleChange} required /> Yes</label>
              <label><input type="radio" name="existingAgency" value="no" checked={form.existingAgency === 'no'} onChange={handleChange} required /> No</label>
            </div>
          </div>
          <div className="leadform-row">
            {/* <span className="leadform-icon">🛠️</span> */}
            <label className="leadform-label">Services</label>
            <select name="services" multiple value={form.services || []} onChange={e => setForm(f => ({ ...f, services: Array.from(e.target.selectedOptions, o => o.value) }))} className="leadform-select" required>
              <option value="digital marketing">Digital Marketing</option>
              <option value="development">Development</option>
              <option value="social media">Social Media</option>
              <option value="gmb">GMB</option>
              <option value="lead generation">Lead Generation</option>
            </select>
          </div>
          <div className="leadform-row">
            {/* <span className="leadform-icon">🏭</span> */}
            <label className="leadform-label">Industry</label>
            <select name="industry" value={form.industry || ''} onChange={handleChange} className="leadform-select" required>
              <option value="">Select Industry</option>
              <option value="1 year">1 year</option>
              <option value="2 year">2 year</option>
              <option value="3 year">3 year</option>
              <option value="4 year">4 year</option>
              <option value="5 year">5 year</option>
            </select>
          </div>
          <div className="leadform-row">
            {/* <span className="leadform-icon">💰</span> */}
            <label className="leadform-label">Budget</label>
            <Range
              step={100}
              min={BUDGET_MIN}
              max={BUDGET_MAX}
              values={form.budget}
              onChange={handleBudgetChange}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '6px',
                    width: '100%',
                    background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)',
                    borderRadius: 4,
                    margin: '16px 0',
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '24px',
                    width: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    border: '2px solid #1976d2',
                    boxShadow: '0 2px 8px rgba(25, 118, 210, 0.18)',
                  }}
                />
              )}
            />
            <div style={{ color: '#fff', fontSize: 14, textAlign: 'center' }}>
              Rs {form.budget[0]} - Rs {form.budget[1]}
            </div>
          </div>
          <div className="leadform-row">
            {/* <span className="leadform-icon">📋</span> */}
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
