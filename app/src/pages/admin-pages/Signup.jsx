import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../api/AuthContext.jsx';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Signup.css';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    gender: '',
    age: '',
    address: '',
    cityState: '',
    documents: '',
    salesLocations: '',
    phone: '',
    email: '',
    profession: '',
    affiliation: '',
    password: '',
    role: 'user'
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const phoneRegex = /^\+91\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (form.name.trim() === '') return toast.error('Full Name is required');
    if (!['male', 'female'].includes(form.gender)) return toast.error('Select a valid gender');
    if (parseInt(form.age) < 18) return toast.error('Age must be 18 or older');
    if (!phoneRegex.test(form.phone)) return toast.error('Phone must be in +911234567890 format');
    if (!emailRegex.test(form.email)) return toast.error('Invalid email address');
    if (!['Partnership', 'Commission'].includes(form.affiliation)) return toast.error('Choose a valid affiliation model');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        'https://zi-affiliates-backend.onrender.com/user/signup',
        form,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`
          }
        }
      );
      toast.success('Affiliate account created successfully!');
      setForm({
        name: '',
        gender: '',
        age: '',
        address: '',
        cityState: '',
        documents: '',
        salesLocations: '',
        phone: '',
        email: '',
        profession: '',
        affiliation: '',
        password: '',
        role: 'user'
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
          <a onClick={() => navigate('/admin-dashboard')} className="back-btn" title="Back">
              <FaArrowLeft size={22}/>
          </a>
        </div>
      <div className="leads-title">Registration Form</div>
    <div className="signup-body">
      <label className="signup-label">Full Name</label>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="signup-input" required />
        <label className="signup-label">Gender</label>
        <select name="gender" value={form.gender} onChange={handleChange} className="signup-input" required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label className="signup-label">Age</label>
        <input type="number" name="age" placeholder="Age (must be 18+)" value={form.age} onChange={handleChange} className="signup-input" required />
        <label className="signup-label">Address</label>
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="signup-input" required />
        <label className="signup-label">City, State</label>
        <input name="cityState" placeholder="City, State" value={form.cityState} onChange={handleChange} className="signup-input" required />
        <label className="signup-label">Documents Submitted</label>
        <input name="documents" placeholder="Documents Submitted" value={form.documents} onChange={handleChange} className="signup-input" required />
        <label className="signup-label">Top 3 Sales Locations</label>
        <input name="salesLocations" placeholder="Top 3 Sales Locations" value={form.salesLocations} onChange={handleChange} className="signup-input" required />
        <label className="signup-label">Phone Number</label>
        <input name="phone" placeholder="Phone Number (+911234567890)" value={form.phone} onChange={handleChange} className="signup-input" required />
        <label className="signup-label">Email Address</label>
        <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} className="signup-input" required />
        <label className="signup-label">Current Profession</label>
        <input name="profession" placeholder="Current Profession" value={form.profession} onChange={handleChange} className="signup-input" required />
        <label className="signup-label">Affiliation Model</label>
        <select name="affiliation" value={form.affiliation} onChange={handleChange} className="signup-input" required>
          <option value="">Select Affiliation Model</option>
          <option value="Partnership">Partnership</option>
          <option value="Commission">Commission</option>
        </select>
        <label className="signup-label">Password</label>
        <input type="password" name="password" placeholder="Password (min 6 characters)" value={form.password} onChange={handleChange} className="signup-input" required />

        <button type="submit" className="signup-btn" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

        <button
          type="button"
          onClick={() => navigate('/admin-dashboard')}
          className="signup-btn"x  
          style={{ marginTop: '1rem' }}
        >
          Back
        </button>
      </div>
      </form>
    </div>
  );
};

export default Signup;
