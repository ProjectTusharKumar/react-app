import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Popover } from '@headlessui/react';
import { PieChart } from 'react-minimal-pie-chart';
import DashboardPie from '../../components/Piechat'; // Import the pie chart component
import './UserDashboard.css';

const ChartWithCenter = ({ hot, warm, cold }) => {
  const total = hot + warm + cold || 1;
  const data = [
    { title: 'Hot', value: hot, color: '#E53935' },
    { title: 'Warm', value: warm, color: '#FB8C00' },
    { title: 'Cold', value: cold, color: '#039BE5' },
  ];
  const hotPct = ((hot / total) * 100).toFixed(0);
  const warmPct = ((warm / total) * 100).toFixed(0);
  const coldPct = ((cold / total) * 100).toFixed(0);

  return (
    <div className="pie-container">
      <PieChart
        data={data}
        totalValue={total}
        lineWidth={20}
        paddingAngle={2}
        radius={50}
        rounded
        label={() => null}
        viewBoxSize={[100, 100]}
      />
      <div className="pie-center">
        <div className="pie-total">{total}</div>
        <div className="pie-percent">
          <span style={{ color: '#E53935' }}>{hotPct}%</span> |
          <span style={{ color: '#FB8C00' }}> {warmPct}%</span> |
          <span style={{ color: '#039BE5' }}> {coldPct}%</span>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, hot: 0, cold: 0, warm: 0, conversion: 0, amount: 0 });
  const [loading, setLoading] = useState(true);
  const name = localStorage.getItem('name');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('https://zi-affiliates-backend.onrender.com/leads/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats({
          total: res.data.totalLeads ?? 0,
          hot: res.data.hotCount ?? 0,
          cold: res.data.coldCount ?? 0,
          warm: res.data.warmCount ?? 0,
          conversion: res.data.conversion ?? 0,
          amount: res.data.amount ?? 0,
        });
      } catch {
        toast.error('Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

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
            <button onClick={() => navigate('/leads')}>Leads</button>
            <button onClick={() => navigate('/leads')}>FAQ</button>
            <button onClick={() => { localStorage.clear(); navigate('/login'); }}>Logout</button>
          </Popover.Panel>
        </Popover>
      </header>

      <div className="dashboard-cards">
      <h2>Hi! {name}</h2>
          <div className="card">
            {/* {/* <ChartWithCenter hot={stats.hot} warm={stats.warm} cold={stats.cold} /> */}
            <DashboardPie
               total={stats.total}
               done={stats.hot}
               todo={stats.warm}
               pending={stats.cold}/>
          </div>
        

        <div className="card full">
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
        </div>
        

       

      <button className="fab" onClick={() => navigate('/form')} title="Add Lead">
        +
      </button>

    </div>
    </div>
  );
};

export default Dashboard;
