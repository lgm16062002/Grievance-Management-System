import React from 'react';
import '../styles/admin/Dashboard.css';

const Notifications = () => {
  return (
    <div className="admin-dashboard notifications-page">
      <header className="page-header-alt">
        <h1>System Alerts</h1>
        <p>SLA breaches, security alerts, and system notifications.</p>
      </header>
      <div className="dashboard-card" style={{ padding: '40px', textAlign: 'center' }}>
        <h2>No critical alerts.</h2>
        <p>System is running normally.</p>
      </div>
    </div>
  );
};

export default Notifications;
