import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getLeadsByEmployee, getLeadsByStatus } from '../api';
import { toast } from 'react-toastify';
// import Input from '../components/Input';
import './Leads.css';
import { FaArrowLeft } from 'react-icons/fa';

const statusOptions = ['hot', 'cold', 'warm'];

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('');
  const token = localStorage.getItem('token');
  const employeeId = localStorage.getItem('employeeId');
  const navigate = useNavigate();
  const location = useLocation();

  // Get navigation state from dashboard
  const navState = location.state;

  useEffect(() => {
    // Get status from query param if present
    const params = new URLSearchParams(location.search);
    const statusParam = params.get('status');
    if (statusParam) setFilter(statusParam);
  }, [location.search]);

  useEffect(() => {
    async function fetchLeads() {
      try {
        let res;
        if (filter === 'all') {
          res = await getLeadsByEmployee(employeeId, token);
        } else if (filter) {
          res = await getLeadsByStatus(filter, token, employeeId);
        } else {
          setLeads([]);
          return;
        }
        console.log('Leads API response:', res);
        console.log('Leads API response data:', res.data);
        setLeads(res.data);
      } catch (err) {
        console.error('Leads API error:', err);
        toast.error('Failed to fetch leads');
      }
    }
    fetchLeads();
  }, [filter, token, employeeId]);

  return (
    <div className="leads-container">
      <div className="leads-header">
        <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0.7rem', borderRadius: '50%' }} title="Back">
          <FaArrowLeft size={22} color="#fff" />
        </button>
        <div className="leads-filters">
          {statusOptions.map(status => (
            <button
              key={status}
              className={filter === status ? 'active' : ''}
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
          <button onClick={() => setFilter('all')}>All</button>
        </div>
      </div>
      <div className="leads-list">
        {filter === '' ? (
          <p>Select a status to view leads.</p>
        ) : leads.length === 0 ? (
          <p>No leads found.</p>
        ) : (
          leads.map(lead => (
            <div className={`lead-item ${lead.status}`} key={lead._id}>
              <div><b>{lead.name}</b> ({lead.status})</div>
              <div>{lead.email} | {lead.phone}</div>
              <div>Date: {lead.date}</div>
              <div>Notes: {lead.notes}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leads;
