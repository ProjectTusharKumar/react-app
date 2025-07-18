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
    if (statusParam) {
      setFilter(statusParam);
    } else if (navState && navState.api === 'employee') {
      setFilter('all');
    }
  }, [location.search, navState]);

  useEffect(() => {
    async function fetchLeads() {
      try {
        let res;
        if (filter === 'all') {
          // Use getLeadsByEmployee API
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
    <div className="leads-container" style={{ scrollBehavior: 'smooth', background: '#18191a', minHeight: '100vh', padding: '1.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="leads-header" style={{ width: '100%', maxWidth: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
          <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0.7rem', borderRadius: '50%' }} title="Back">
            <FaArrowLeft size={22} color="#fff" />
          </button>
          <div className="leads-title" style={{ fontWeight: 700, fontSize: '1.6rem', color: '#fff', letterSpacing: 1, flex: 1, textAlign: 'center' }}>Leads</div>
          <div style={{ width: 36 }}></div>
        </div>
        <div className="leads-filters" style={{ marginTop: 12, width: '100%', display: 'flex', justifyContent: 'center', gap: 8, position: 'sticky', top: 0, zIndex: 10 }}>
          {statusOptions.map(status => (
            <button
              key={status}
              className={filter === status ? 'active' : ''}
              style={{ padding: '0.7rem 1.2rem', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: '1rem', boxShadow: '0 2px 8px rgba(25, 118, 210, 0.18)', background: filter === status ? 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)' : '#23272f', color: filter === status ? '#fff' : '#f1f1f1', transition: 'background 0.2s, box-shadow 0.2s' }}
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
          <button style={{ padding: '0.7rem 1.2rem', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: '1rem', boxShadow: '0 2px 8px rgba(25, 118, 210, 0.18)', background: filter === 'all' ? 'linear-gradient(90deg, #FFD600 60%, #FFFDE7 100%)' : '#23272f', color: filter === 'all' ? '#333' : '#f1f1f1', transition: 'background 0.2s, box-shadow 0.2s' }} onClick={() => setFilter('all')}>All</button>
        </div>
      </div>
      <div className="leads-list" style={{ width: '100%', maxWidth: 700, marginTop: 8 }}>
        {filter === '' ? (
          <p style={{ color: '#f1f1f1', textAlign: 'center', marginTop: 32 }}>Select a status to view leads.</p>
        ) : leads.length === 0 ? (
          <p style={{ color: '#f1f1f1', textAlign: 'center', marginTop: 32 }}>No leads found.</p>
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
