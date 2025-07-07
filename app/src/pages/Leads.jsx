import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLeadsByEmployee, getLeadsByStatus } from '../api';
import { toast } from 'react-toastify';
import './Leads.css';

const statusOptions = ['hot', 'cold', 'warm'];

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('');
  const token = localStorage.getItem('token');
  const employeeId = localStorage.getItem('employeeId');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLeads() {
      try {
        let res;
        if (filter) {
          res = await getLeadsByStatus(filter, token, employeeId);
        } else {
          res = await getLeadsByEmployee(employeeId, token);
        }
        setLeads(res.data);
      } catch (err) {
        toast.error('Failed to fetch leads');
      }
    }
    fetchLeads();
  }, [filter, token, employeeId]);

  return (
    <div className="leads-container">
      <div className="leads-header">
        <button onClick={() => navigate('/dashboard')}>Back</button>
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
          <button onClick={() => setFilter('')}>All</button>
        </div>
      </div>
      <div className="leads-list">
        {leads.length === 0 ? (
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
