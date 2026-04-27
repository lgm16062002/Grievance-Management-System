import React from 'react';
import '../styles/admin/Dashboard.css';

const Settings = () => {
  return (
    <div className="admin-dashboard settings-page">
      <header className="page-header-alt">
        <h1>Global Settings</h1>
        <p>Configure SLAs, notification preferences, and system parameters.</p>
      </header>
      <div className="dashboard-card" style={{ padding: '40px', textAlign: 'center' }}>
        <h2>SLA Config</h2>
        <p>Set default resolution windows for different categories.</p>
      </div>
    </div>
  );
};

export default Settings;
