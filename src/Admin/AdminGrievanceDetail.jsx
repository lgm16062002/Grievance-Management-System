import React from 'react';
import '../styles/admin/Dashboard.css';

const GrievanceDetail = () => {
  return (
    <div className="admin-dashboard grievance-detail-page">
      <header className="page-header-alt">
        <h1>Grievance Detail</h1>
        <p>Full audit trail and management controls.</p>
      </header>
      <div className="dashboard-card" style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Grievance Detail View</h2>
        <p>Select a grievance from the list to view details.</p>
      </div>
    </div>
  );
};

export default GrievanceDetail;
