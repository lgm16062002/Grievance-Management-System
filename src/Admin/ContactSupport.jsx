import React from 'react';
import '../styles/admin/Dashboard.css';

const ContactSupport = () => {
  return (
    <div className="admin-dashboard contact-support-page">
      <header className="page-header-alt">
        <h1>IT Support</h1>
        <p>Technical assistance for system administrators.</p>
      </header>
      <div className="dashboard-card" style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Developer Support Desk</h2>
        <p>Direct line to system developers.</p>
      </div>
    </div>
  );
};

export default ContactSupport;
