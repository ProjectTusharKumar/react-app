import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Popover } from '@headlessui/react';
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
          <header className="dashboard-top">
            <img
              src="/Zeus_infinity_logo (1).png"
              alt="Company Logo"
              className="dashboard-logo"
              onClick={() => navigate('/')}
            />
            <Popover className="dashboard-menu-wrapper">
              <Popover.Button className="dashboard-menu-btn">☰</Popover.Button>
              <Popover.Panel className="dashboard-menu-items">
                <button onClick={() => navigate('/lead-view')}>Leads View</button>
                <button onClick={() => navigate('/signup')}>New User</button>
                <button onClick={() => { localStorage.clear(); navigate('/login'); }}>Logout</button>
              </Popover.Panel>
            </Popover>
          </header>
      <h2>HI! {name}</h2>
      {/* <div className="dashboard-cards">
      <h2>Hi! {name}</h2>
          <div className="card">
            {/* <ChartWithCenter hot={stats.hot} warm={stats.warm} cold={stats.cold} /> 
           </div> */}
        

        {/* <div className="card full">
          <div className="card-label">Total Leads : <strong>{stats.total}</strong></div>
          <div className="reach-stats">
            <div><span>Hot:</span><strong>{stats.hot}</strong></div>
            <div><span>Warm:</span><strong>{stats.warm}</strong></div>
            <div><span>Cold:</span><strong>{stats.cold}</strong></div>
          </div>
        </div>        

        <div className="card full">
          <div className="card-label">Last 3-Monthly Reach</div>
          <div className="chart-placeholder">📈 Chart Placeholder</div>
          <div className="legend">
            <span className="dot hot" /> Jan
            <span className="dot warm" /> Feb
            <span className="dot cold" /> Mar
          </div>
        </div>
        <div className="card">
          <div className="card-label">Avg Leads/Month</div>
          <div className="card-value">{stats.amount}</div>
        </div>

        <div className="flex">
        <div className="card">
          <div className="card-label">Total Conversion </div>
          <div className="card-value">{stats.conversion}</div>
        </div>
        <div className="card">
          <div className="card-label">Conversion</div>
          <div className="card-value">{stats.amount}%</div>
        </div>
        </div>
        <div className="card">
          <div className="card-label" id="double-label">Total Commission Earned</div>
          <div className="card-value">{stats.amount}</div>
        </div>

        <div className="flex">
        <div className="card">
          <div className="card-label" id="double-lable">Commission Earned </div>
          <div className="card-value">{stats.conversion}</div>
        </div>
        <div className="card ">
          <div className="card-label">Commission</div>
          <div className="card-value">{stats.amount}%</div>
        </div>
        </div>

        <div className="flex">
        <div className="card">
          <div className="card-label " id="double-lable">Commission Credited </div>
          <div className="card-value">{stats.conversion}</div>
        </div>
        <div className="card">
          <div className="card-label" id="double-lable">Commission Due</div>
          <div className="card-value">{stats.amount}</div>
        </div>
        </div> */}
        

       

      <button className="fab" onClick={() => navigate('/form')} title="Add Lead">
        +
      </button>
    </div>
  );
};

export default AdminDashboard;
