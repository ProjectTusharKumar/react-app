import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const name = localStorage.getItem('name');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('employeeId');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <h2>HI! {name}</h2>
      <div className="dashboard-actions">
        <button onClick={handleLogout} className="logout">Logout</button>
      </div>
      {/* Add admin dashboard features here */}
    </div>
  );
};

export default AdminDashboard;
