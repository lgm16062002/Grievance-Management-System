import React from 'react';
import '../styles/hod/Dashboard.css';

const hodStats = [
  { label: 'Total Grievances', value: '124', trend: '+12.5%', color: 'blue', icon: 'fa-solid fa-folder-open' },
  { label: 'Pending Action', value: '42', trend: '-4.2%', color: 'orange', icon: 'fa-solid fa-clock' },
  { label: 'In Progress', value: '56', trend: '+2.1%', color: 'purple', icon: 'fa-solid fa-spinner' },
  { label: 'Resolved Cases', value: '26', trend: '+8.4%', color: 'green', icon: 'fa-solid fa-check-double' },
];

const pendingGrievances = [
  { id: '#GRV-8092', student: 'Arjun Kapoor', category: 'Academic', date: 'Today, 11:30 AM', status: 'Pending', icon: 'fa-solid fa-graduation-cap', tone: 'blue' },
  { id: '#GRV-8041', student: 'Clark Kent', category: 'Hostel', date: 'Yesterday', status: 'Under Review', icon: 'fa-solid fa-building-user', tone: 'orange' },
  { id: '#GRV-8100', student: 'Ananya Sharma', category: 'Finance', date: 'Oct 10, 2026', status: 'Critical', icon: 'fa-solid fa-wallet', tone: 'red' },
  { id: '#GRV-8001', student: 'Rohan Desai', category: 'Infrastructure', date: 'Oct 09, 2026', status: 'In Progress', icon: 'fa-solid fa-tools', tone: 'purple' },
];

const Dashboard = () => {
  return (
    <div className="hod-dashboard">
      <header className="dashboard-header">
        <div className="header-greeting">
          <h1>Good morning, Dr. Sarah!</h1>
          <p>HOD - Computer Science & Engineering</p>
        </div>
        <div className="header-actions">
          <button className="export-btn">
            <i className="fa-solid fa-download"></i>
            Export Report
          </button>
        </div>
      </header>

      <section className="stats-grid">
        {hodStats.map((stat) => (
          <div key={stat.label} className={`stat-card ${stat.color}`}>
            <div className="stat-main">
              <div className="stat-icon">
                <i className={stat.icon}></i>
              </div>
              <div className="stat-content">
                <p>{stat.label}</p>
                <strong>{stat.value}</strong>
              </div>
            </div>
            <div className={`stat-trend ${stat.trend.startsWith('+') ? 'positive' : 'negative'}`}>
              <i className={`fa-solid fa-arrow-${stat.trend.startsWith('+') ? 'up' : 'down'}`}></i>
              {stat.trend} vs last month
            </div>
          </div>
        ))}
      </section>

      <div className="charts-main-grid">
        <section className="dashboard-card chart-card">
          <div className="card-head">
            <h3>Resolution Efficiency</h3>
            <div className="chart-actions">
              <select defaultValue="Monthly">
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </div>
          </div>
          <div className="chart-placeholder">
            {/* Resolution trend line visualization */}
            <div className="line-chart-viz">
              <div className="y-axis">
                <span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
              </div>
              <div className="chart-body">
                <div className="chart-line"></div>
                <div className="chart-points">
                  <span className="point" style={{bottom: '40%'}}></span>
                  <span className="point" style={{bottom: '55%'}}></span>
                  <span className="point" style={{bottom: '45%'}}></span>
                  <span className="point active" style={{bottom: '70%'}}></span>
                </div>
              </div>
              <div className="x-axis">
                <span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span>
              </div>
            </div>
          </div>
        </section>

        <section className="dashboard-card chart-card">
          <div className="card-head">
            <h3>Grievances by Category</h3>
          </div>
          <div className="chart-placeholder flex-center">
            <div className="donut-viz-large">
              <div className="donut-inner">
                <strong>124</strong>
                <span>Total</span>
              </div>
            </div>
            <div className="donut-legend">
              <div className="legend-item"><span className="dot blue"></span> Academic (45%)</div>
              <div className="legend-item"><span className="dot purple"></span> Hostel (25%)</div>
              <div className="legend-item"><span className="dot orange"></span> Finance (20%)</div>
              <div className="legend-item"><span className="dot green"></span> Others (10%)</div>
            </div>
          </div>
        </section>
      </div>

      <section className="dashboard-card grievances-table-card">
        <div className="card-head">
          <h3>Grievances Requiring Action</h3>
          <button className="view-all-link">View All Grievances</button>
        </div>
        <div className="table-wrap">
          <table className="hod-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Student</th>
                <th>Category</th>
                <th>Date Received</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingGrievances.map((item) => (
                <tr key={item.id}>
                  <td className="id-cell">{item.id}</td>
                  <td className="student-cell">
                    <div className="student-info">
                      <div className="avatar-small">{item.student.charAt(0)}</div>
                      {item.student}
                    </div>
                  </td>
                  <td>
                    <span className={`cat-pill ${item.tone}`}>
                      <i className={item.icon}></i>
                      {item.category}
                    </span>
                  </td>
                  <td>{item.date}</td>
                  <td>
                    <span className={`status-badge ${item.status.toLowerCase().replace(' ', '-')}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
