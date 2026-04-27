import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/admin/Dashboard.css';
import '../styles/Profile.css';

const AdminProfile = () => {
  const { user } = useAuth();

  const personalInfo = [
    { label: 'Full Name', value: user?.name || 'Diana Prince' },
    { label: 'Email Address', value: user?.email || 'admin@gmail.com' },
    { label: 'Phone Number', value: '+91 98765 43210' },
    { label: 'Date of Birth', value: 'March 22, 1989' },
    { label: 'Gender', value: 'Female' },
    { label: 'Employee ID', value: 'ADM-202X-001' },
    { label: 'Department', value: user?.department || 'Student Affairs' },
    { label: 'Designation', value: user?.title || 'Portal Administrator' },
    { label: 'Office Address', value: 'Administrative Block, Central Campus' },
  ];

  const sessions = [
    {
      id: 1,
      device: 'Windows 11 · Chrome · Secure Office Network',
    },
  ];

  return (
    <div className="admin-dashboard profile-page">
      <header className="profile-header">
        <h1>Admin Profile</h1>
        <p>Manage your administrator profile, security preferences, and active sessions.</p>
      </header>

      <section className="profile-hero-card dashboard-card">
        <div className="profile-hero-content">
          <div className="profile-avatar-wrapper">
            <div className="profile-hero-avatar">{user?.name?.charAt(0)?.toUpperCase() || 'A'}</div>
            <button className="avatar-edit-btn">
              <i className="fa-solid fa-camera"></i>
            </button>
          </div>

          <div className="profile-hero-info">
            <div className="name-row">
              <h2>{user?.name || 'Diana Prince'}</h2>
              <span className="role-badge">Admin</span>
            </div>
            <p className="dept-text">{user?.department || 'Student Affairs'}</p>
            <p className="univ-text">{user?.title || 'Portal Administrator'}</p>

            <div className="contact-row">
              <span>
                <i className="fa-regular fa-envelope"></i>
                {user?.email || 'admin@gmail.com'}
              </span>
              <span>
                <i className="fa-solid fa-phone"></i>
                +91 98765 43210
              </span>
            </div>
          </div>
        </div>

        <button className="edit-profile-btn">
          <i className="fa-solid fa-pen"></i>
          Edit Profile
        </button>
      </section>

      <div className="profile-main-grid">
        <section className="dashboard-card personal-info-card">
          <div className="card-head">
            <h3>Personal Information</h3>
          </div>
          <div className="info-list">
            {personalInfo.map((info) => (
              <div key={info.label} className="info-item">
                <span className="info-label">{info.label}</span>
                <span className="info-value">{info.value}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="profile-side-col">
          <section className="dashboard-card settings-card">
            <div className="card-head">
              <h3>Account Settings</h3>
            </div>
            <div className="settings-list">
              <div className="setting-item">
                <div className="setting-label">
                  <span>Password</span>
                  <strong>**********</strong>
                </div>
                <button className="outline-btn">Change Password</button>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span>Language</span>
                </div>
                <div className="select-wrapper">
                  <select defaultValue="English">
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          <section className="dashboard-card sessions-card">
            <div className="card-head">
              <h3>Connected Sessions</h3>
            </div>
            <div className="sessions-list">
              {sessions.map((session) => (
                <div key={session.id} className="session-item">
                  <div className="session-icon">
                    <i className="fa-solid fa-laptop"></i>
                  </div>
                  <div className="session-info">
                    <div className="session-head">
                      <strong>Current Session</strong>
                      <span className="active-badge">Active</span>
                    </div>
                    <p>{session.device}</p>
                  </div>
                </div>
              ))}
              <button className="logout-all-btn">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                Log out from all devices
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
