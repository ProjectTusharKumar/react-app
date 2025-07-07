import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboard } from '../api';
import { toast } from 'react-toastify';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, hot: 0, cold: 0, warm: 0 });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await getDashboard(token);
        setStats(res.data);
      } catch (err) {
        toast.error('Failed to fetch dashboard data');
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
    </div>
  );
};

export default Dashboard;
