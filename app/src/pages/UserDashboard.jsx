import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Icon from '../components/Icon';
import './UserDashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, hot: 0, cold: 0, warm: 0, conversion: 0, amount: 0 });
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tileLoading, setTileLoading] = useState(false);
  const navigate = useNavigate();
  const name = localStorage.getItem('name');
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const res = await axios.get('https://zi-affiliates-backend.onrender.com/leads/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Dashboard API response:', res);
        console.log('Dashboard API response data:', res.data);
        setStats({
          total: res.data.totalLeads ?? 0,
          hot: res.data.hotCount ?? 0,
          cold: res.data.coldCount ?? 0,
          warm: res.data.warmCount ?? 0,
          conversion: res.data.conversion ?? 0,
          amount: res.data.amount ?? 0,
        });
      } catch (err) {
        console.error('Dashboard API error:', err);
        toast.error('Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [token]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleProfile = () => {
    setMenuOpen(false);
    navigate('/profile');
  };

  const handleFAQ = () => {
    setMenuOpen(false);
    navigate('/faqs');
  };

  const handleLeads = () => {
    setMenuOpen(false);
    navigate('/leads');
  };

  const handleTileClick = (status) => {
    setTileLoading(true);
    setTimeout(() => {
      if (status === 'Total') {
        navigate('/leads', { state: { fromDashboard: true, api: 'employee' } });
      } else if (['Hot', 'Cold', 'Warm'].includes(status)) {
        navigate(`/leads?status=${status.toLowerCase()}`, { state: { fromDashboard: true, api: 'status' } });
      }
      setTileLoading(false);
    }, 400); // short delay for loading effect
  };

  return (
    <div className="dashboard-root">
      <header className="dashboard-header">
        {/* <div className="header-left" style={{ maxWidth: '60vw',  display: 'flex', alignItems: 'center' }}> */}
          <img src="/Zeus_infinity_logo (1).png" alt="Zeus Infinity Affiliates Logo" style={{ height: 90, width: '37%', maxWidth: 420, objectFit: 'contain', background: 'transparent', display: 'block' }} />
        {/* </div> */}
                {/* <div> className="header-title">ZI Affiliates</div> */}
               {/* <img src="/Zeus_infinity_Affiliates_logo.png" alt="Zeus Infinity Affiliates Logo" className="header-title" style={{ height: 72, width: 'auto', objectFit: 'contain', background: 'transparent', display: 'block', maxWidth: 340 }} /> */}


        <div className="header-right" style={{ position: 'relative', overflow: 'visible', zIndex: 10 }}>
          <button className="menu-btn" onClick={() => setMenuOpen(v => !v)} title="Menu"><Icon name="☰" size={28} color="#ffffff" /></button>
          {menuOpen && (
            <div className="dashboard-menu" style={{ position: 'absolute', top: '100%', right: 0, minWidth: 160, zIndex: 1000, boxShadow: '0 4px 16px rgba(0,0,0,0.18)', background: '#23272f', borderRadius: 8, overflow: 'visible' }}>
              <button className="dashboard-menu-item" onClick={handleProfile}><Icon name="👤" size={20} /> Profile</button>
              <button className="dashboard-menu-item" onClick={handleFAQ}><Icon name="❓" size={20} /> FAQs</button>
              <button className="dashboard-menu-item" onClick={handleLeads}><Icon name="📋" size={20} /> Leads</button>
              <button className="dashboard-menu-item logout" onClick={handleLogout}><Icon name="🚪" size={20} /> Logout</button>
            </div>
          )}
        </div>
      </header>
      <div className="dashboard-content">
        <h2 className="dashboard-greet">HI! {name}</h2>
        {tileLoading ? (
          <div className="dashboard-loading">Loading leads...</div>
        ) : loading ? (
          <div className="dashboard-loading">Loading...</div>
        ) : (
          <div className="dashboard-tiles">
            <div className="dashboard-tile total" onClick={() => handleTileClick('Total')} title="Show Total leads">
              <div className="tile-label"><Icon name="📊" size={20} /> Total</div>
              <div className="tile-value">{stats.total}</div>
            </div>
            <div className="dashboard-tile hot" onClick={() => handleTileClick('Hot')} title="Show Hot leads">
              <div className="tile-label"><Icon name="🔥" size={20} /> Hot</div>
              <div className="tile-value">{stats.hot}</div>
            </div>
            <div className="dashboard-tile cold" onClick={() => handleTileClick('Cold')} title="Show Cold leads">
              <div className="tile-label"><Icon name="❄️" size={20} /> Cold</div>
              <div className="tile-value">{stats.cold}</div>
            </div>
            <div className="dashboard-tile warm" onClick={() => handleTileClick('Warm')} title="Show Warm leads">
              <div className="tile-label"><Icon name="🌤️" size={20} /> Warm</div>
              <div className="tile-value">{stats.warm}</div>
            </div>
            <div className="dashboard-tile conversion">
              <div className="tile-label"><Icon name="📈" size={20} /> Conversion</div>
              <div className="tile-value">{stats.conversion}%</div>
            </div>
            <div className="dashboard-tile amount">
              <div className="tile-label"><Icon name="💰" size={20} /> Amount</div>
              <div className="tile-value">{stats.amount}</div>
            </div>
          </div>
        )}
      </div>
      <button className="fab illusion-fab" onClick={() => navigate('/form')} title="New Lead">
        <span className="fab-icon-wrapper">
          <Icon name="+" size={32} />
        </span>
      </button>
    </div>
  );
};

export default Dashboard;
