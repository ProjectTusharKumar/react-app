import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboard } from '../api';
import { toast } from 'react-toastify';
import './UserDashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, hot: 0, cold: 0, warm: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const res = await getDashboard(token);
        // Map backend response to UI state
        setStats({
          total: res.data.totalLeads ?? 0,
          hot: res.data.hotCount ?? 0,
          cold: res.data.coldCount ?? 0,
          warm: res.data.warmCount ?? 0,
        });
      } catch (err) {
        toast.error('Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('employeeId');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {loading ? (
        <div style={{textAlign: 'center', fontWeight: 600, fontSize: '1.2rem'}}>Loading...</div>
      ) : (
        <>
          <h2>HI! {name}</h2>
          <div className="tiles">
            <div className="tile total">Total Leads: {stats.total}</div>
            <div className="tile hot">Hot: {stats.hot}</div>
            <div className="tile cold">Cold: {stats.cold}</div>
            <div className="tile warm">Warm: {stats.warm}</div>
          </div>
          <div className="dashboard-actions">
            <button onClick={() => navigate('/form')}>Create Lead</button>
            <button onClick={() => navigate('/leads')}>View Leads</button>
            <button onClick={handleLogout} className="logout">Logout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
