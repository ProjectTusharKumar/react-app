import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAllLeads, getAllLeadsByStatus } from '../../api';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';
import './LeadsView.css';

const statusOptions = ['hot', 'cold', 'warm'];

const LeadsView = () => {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();

  const navState = location.state;

  
  useEffect(() => {
    async function fetchLeads() {
      try {
        let res;
        if (filter === 'all') {
          res = await getAllLeads(token);
        } else if (filter) {
          res = await getAllLeadsByStatus(filter, token);
        } else {
          setLeads([]);
          return;
        }
        setLeads(res.data);
      } catch (err) {
        console.error('Leads API error:', err);
        toast.error('Failed to fetch leads');
      }
    }
    fetchLeads();
  }, [filter, token]);

  return (
    <div className="leads-container">
      <div className="leads-header">
        <button onClick={() => navigate('/dashboard')} className="back-btn" title="Back">
          <FaArrowLeft size={22} color="#fff" />
        </button>
        <div className="leads-title">Leads</div>
      </div>

      <div className="leads-filters">
        {statusOptions.map((status) => (
          <button
            key={status}
            className={`filter-btn ${filter === status ? 'active' : ''}`}
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
      </div>

      <div className="leads-list">
        {filter === '' ? (
          <p className="placeholder">Select a status to view leads.</p>
        ) : leads.length === 0 ? (
          <p className="placeholder">No leads found.</p>
        ) : (
          leads.map((lead) => (
            <div className={`lead-item ${lead.status}`} key={lead._id}>
              <div className="lead-header">
                <strong>{lead.name}</strong> <span>({lead.status})</span>
              </div>
              <div>Email: {lead.email} <br></br> Phone: {lead.phone}</div>
              <div>Date: {lead.date}</div>
              <div>Existing Agency: {lead.existingAgency}</div>

              <div>
                Budget:{' '}
                {Array.isArray(lead.budget)
                  ? lead.budget.join('-')
                  : lead.budget}
              </div>

              {Array.isArray(lead.services) && lead.services.length > 0 ? (
                <div className="services-section">
                  <div>Services:</div>
                  <ul className="services-list">
                    {lead.services.map((svc, idx) => (
                      <li key={idx}>{svc}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>Services: {lead.services || ','}</div>
              )}

              <div>Industry: {lead.industry}</div>
              <div>Notes: {lead.notes}</div>
              <div className="lead-actions">
                <button className="edit-btn" onClick={() => handleEdit(lead)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(lead._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeadsView;
