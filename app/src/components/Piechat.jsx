import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import './DashboardPie.css'; // for custom styling

const DashboardPie = ({ total, done, todo, pending }) => {
  const data = [
    { title: 'Hot', value: done, color: '#FF6A54' },      // Orange-red
    { title: 'Warm', value: todo, color: '#FFCB52' },      // Yellow
    { title: 'Cold', value: pending, color: '#5C5CFF' }, // Purple
  ];

  return (
    <div className="pie-wrapper">
      <div className="pie-chart-container">
        <PieChart
        lineWidth={15}
        paddingAngle={3}
        radius={50} // Increase this from default 50 to maybe 45–60
        totalValue={total || 1}
        rounded
        animate
        data={data}
          label={() => null}
          labelStyle={{ fontSize: '5px' }}
        viewBoxSize={[100, 100]}
        />
        <div className="pie-center">
          <div className="pie-total">{total}</div>
          <div className="pie-subtitle">Total Project</div>
        </div>
      </div>

      <div className="pie-legend">
        {data.map((item, idx) => {
          const pct = ((item.value / total) * 100).toFixed(0);
          return (
            <div className="legend-item" key={idx}>
              <span className="dot" style={{ background: item.color }}></span>
              <span className="legend-label">{pct}%</span>
              <span className="legend-title">{item.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardPie;
