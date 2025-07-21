import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getLeadsByEmployee, getLeadsByStatus, deleteLead, updateLead } from '../../api'; // import your new API methods
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';
import './Leads.css';

const statusOptions = ['hot', 'cold', 'warm'];

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('');
  const token = localStorage.getItem('token');
  const employeeId = localStorage.getItem('employeeId');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const statusParam = params.get('status');
    if (statusParam) {
      setFilter(statusParam);
    } else if (location.state?.api === 'employee') {
      setFilter('all');
    }
  }, [location.search, location.state]);

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
        setLeads(res.data);
      } catch (err) {
        console.error('Leads API error:', err);
        toast.error('Failed to fetch leads');
      }
    }
    fetchLeads();
  }, [filter, token, employeeId]);

  const handleDelete = async (leadId) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await deleteLead(leadId, token, employeeId);
      setLeads((prev) => prev.filter((l) => l._id !== leadId));
      toast.success('Lead deleted');
    } catch (err) {
      console.error('Delete API error:', err);
      toast.error('Failed to delete lead');
    }
  };

  const handleEdit = (lead) => {
    navigate('/form', { state: { lead } }); // or however you're passing edit data
  };

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
              <div>Email: {lead.email}<br/>Phone: {lead.phone}</div>
              <div>Date: {lead.date}</div>
              <div>Existing Agency: {lead.existingAgency}</div>
              <div>Budget: {Array.isArray(lead.budget) ? lead.budget.join('-') : lead.budget}</div>
              {Array.isArray(lead.services) && lead.services.length > 0 ? (
                <div className="services-section">
                  <div>Services:</div>
                  <ul className="services-list">
                    {lead.services.map((svc, idx) => <li key={idx}>{svc}</li>)}
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

export default Leads;
