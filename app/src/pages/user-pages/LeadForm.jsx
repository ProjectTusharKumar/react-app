import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createLead, updateLead } from '../../api';
import { toast } from 'react-toastify';
import { validateEmail, validatePhone } from '../../utils/validation';
import './LeadForm.css';
import Input from '../../components/Input';
import { Range } from 'react-range';
import { FaArrowLeft } from 'react-icons/fa';

const BUDGET_MIN = 15000;
const BUDGET_MAX = 100000;

const LeadForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const employeeId = localStorage.getItem('employeeId');

  const editing = Boolean(location.state?.lead);
  const initialLead = location.state?.lead;

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
    budget: [BUDGET_MIN, BUDGET_MAX],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editing && initialLead) {
      setForm({
        name: initialLead.name || '',
        phone: initialLead.phone || '',
        email: initialLead.email || '',
        date: initialLead.date?.split('T')[0] || '',
        status: initialLead.status,
        notes: initialLead.notes || '',
        existingAgency: initialLead.existingAgency || 'yes',
        services: initialLead.services || [],
        industry: initialLead.industry || '',
        budget: Array.isArray(initialLead.budget)
          ? initialLead.budget
          : [BUDGET_MIN, BUDGET_MAX],
        _id: initialLead._id, // keep the id for update
      });
    }
  }, [editing, initialLead]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm(f => ({
        ...f,
        services: checked
          ? [...f.services, value]
          : f.services.filter(s => s !== value),
      }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleBudgetChange = values => {
    setForm(f => ({ ...f, budget: values }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateEmail(form.email)) {
      return toast.error('Invalid email');
    }
    if (!validatePhone(form.phone)) {
      return toast.error('Invalid phone number');
    }

    setLoading(true);
    try {
      if (editing) {
        await updateLead(form._id, form, token, employeeId);
        toast.success('Lead updated successfully!');
      } else {
        await createLead(form, token, employeeId);
        toast.success('Lead created successfully!');
      }
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Submission failed');
    } finally { 
      setLoading(false);
    }
  };

  return (
    <div className="leadform-container">
      <form className="leadform-modern-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="back-btn"
            title="Back"
          >
            <FaArrowLeft size={22} color="#fff" />
          </button>
          <h2>{editing ? 'Edit Lead' : 'New Lead'}</h2>
          <div style={{ width: 36 }} />
        </div>

        <label className="leadform-label" htmlFor="name">Full Name</label>
        <Input className="leadform-input"  name="name" value={form.name} onChange={handleChange} required />
        <label className="leadform-label" htmlFor="phone">Phone</label>
        <Input className="leadform-input"  name="phone" value={form.phone} onChange={handleChange} required />
        <label className="leadform-label" htmlFor="email">Email</label>
        <Input className="leadform-input"  name="email" value={form.email} onChange={handleChange} required />
        <label className="leadform-label" htmlFor="date">Date</label>
        <Input className="leadform-input"  name="date" type="date" value={form.date} onChange={handleChange} required />

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

        <div className="leadform-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : editing ? 'Update Lead' : 'Create Lead'}
          </button>
          <button type="button" onClick={() => navigate('/dashboard')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
