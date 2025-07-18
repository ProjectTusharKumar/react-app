import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLead } from '../api';
import { toast } from 'react-toastify';
import { validateEmail, validatePhone } from '../utils/validation';
import './LeadForm.css';
import Input from '../components/Input';
import { Range } from 'react-range';
import { FaArrowLeft } from 'react-icons/fa';


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
    <div className="leadform-container" style={{ scrollBehavior: 'smooth', justifyContent: 'center', alignItems: 'center' }}>
      
      <form className="leadform-modern-form" onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 420, margin: '0 auto', background: '#23272f', borderRadius: 18, boxShadow: '0 6px 32px rgba(25, 118, 210, 0.10), 0 1.5px 6px rgba(0,0,0,0.18)', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '2rem', color: '#fff' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24, marginTop: 10 }}>
          <img src="/Zeus_infinity_Ilogo.png" alt="ZI Affiliates Logo" style={{ height: 64, width: 64, objectFit: 'contain', marginBottom: 8 }} />
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                    <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0.7rem', borderRadius: '50%' }} title="Back">
                      <FaArrowLeft size={22} color="#fff" />
                    </button>
                    <div className="leads-title" style={{ fontWeight: 700, fontSize: '1.6rem', color: '#fff', letterSpacing: 1, flex: 1, textAlign: 'center' }}>Leads Form</div>
                    <div style={{ width: 36 }}></div>
                  </div>
        </div>
          <div className="leadform-row">
            <label className="leadform-label" htmlFor="name">Full Name</label>
            <Input type="text" name="name" value={form.name} onChange={handleChange} required className="leadform-input" />
          </div>
          <div className="leadform-row">
            <label className="leadform-label" htmlFor="phone">Phone</label>
            <Input type="text" name="phone" value={form.phone} onChange={handleChange} required className="leadform-input" />
          </div>
          <div className="leadform-row">
            <label className="leadform-label" htmlFor="email">Email</label>
            <Input type="email" name="email" value={form.email} onChange={handleChange} required className="leadform-input" />
          </div>
          <div className="leadform-row">
            <label className="leadform-label" htmlFor="date">Date</label>
            <Input type="date" name="date" value={form.date} onChange={handleChange} required className="leadform-input" />
          </div>
          <div className="leadform-row">
            <label className="leadform-label">Existing Agency</label>
            <div style={{ display: 'flex', gap: '1.2rem' }}>
              <label style={{ color: '#fff' }}><input type="radio" name="existingAgency" value="yes" checked={form.existingAgency === 'yes'} onChange={handleChange} required /> Yes</label>
              <label style={{ color: '#fff' }}><input type="radio" name="existingAgency" value="no" checked={form.existingAgency === 'no'} onChange={handleChange} required /> No</label>
            </div>
          </div>
          <div className="leadform-row">
            <label className="leadform-label">Services</label>
            <select name="services" multiple value={form.services || []} onChange={e => setForm(f => ({ ...f, services: Array.from(e.target.selectedOptions, o => o.value) }))} className="leadform-select" required style={{ minHeight: 44 }}>
              <option value="digital marketing">Digital Marketing</option>
              <option value="development">Development</option>
              <option value="social media">Social Media</option>
              <option value="gmb">GMB</option>
              <option value="lead generation">Lead Generation</option>
            </select>
          </div>
          <div className="leadform-row">
            <label className="leadform-label">Industry</label>
            <select name="industry" value={form.industry || ''} onChange={handleChange} className="leadform-select" required style={{ minHeight: 44 }}>
              <option value="">Select Industry</option>
              <option value="1 year">1 year</option>
              <option value="2 year">2 year</option>
              <option value="3 year">3 year</option>
              <option value="4 year">4 year</option>
              <option value="5 year">5 year</option>
            </select>
          </div>
          <div className="leadform-row" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
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
            <div style={{ color: '#fff', fontSize: 14, textAlign: 'center', width: '100%' }}>
              Rs {form.budget[0]} - Rs {form.budget[1]}
            </div>
          </div>
          <div className="leadform-row">
            <label className="leadform-label" htmlFor="notes">Notes</label>
            <textarea
              className="leadform-textarea"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              style={{ width: '100%', background: '#18191a', color: '#fff', border: '1.5px solid #fff', borderRadius: '8px', resize: 'vertical', boxSizing: 'border-box', minHeight: 60 }}
              placeholder="Enter notes..."
            />
          </div>
          <div className="leadform-actions" style={{ gap: 8 }}>
            <button type="submit" className="leadform-btn"  disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
            <button type="button" className="leadform-btn leadform-back"  onClick={() => navigate('/dashboard')}>Back</button>
          </div>
        </form>
    </div>
  );
};

export default LeadForm;
