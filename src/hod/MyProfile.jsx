import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/hod/CommonHOD.css';
import '../styles/Profile.css';

const MyProfile = () => {
  const { user } = useAuth();

  const personalInfo = [
    { label: 'Full Name', value: 'Rajiv Mehta' },
    { label: 'Email Address', value: 'hod@gmail.com' },
    { label: 'Phone Number', value: '+91 98765 43210' },
    { label: 'Date of Birth', value: 'April 12, 1985' },
    { label: 'Gender', value: 'Male' },
    { label: 'Employee ID', value: 'HOD-202X-001' },
    { label: 'Department', value: 'Examination Department' },
    { label: 'Designation', value: 'Head of Department' },
    { label: 'Office Address', value: '123 Administrative Block, University Campus' },
  ];

  const sessions = [
    {
      id: 1,
      device: 'macOS â€¢ Chrome â€¢ University Network',
      status: 'Active',
      isCurrent: true,
    }
  ];

  return (
    <div className="hod-dashboard profile-page">
      <header className="profile-header">
        <h1>My Profile</h1>
        <p>Manage your administrative profile and account settings.</p>
      </header>

      <section className="profile-hero-card dashboard-card">
        <div className="profile-hero-content">
          <div className="profile-avatar-wrapper">
            <div className="profile-hero-avatar">D</div>
            <button className="avatar-edit-btn">
              <i className="fa-solid fa-camera"></i>
            </button>
          </div>
          
          <div className="profile-hero-info">
            <div className="name-row">
              <h2>Rajiv Mehta</h2>
              <span className="role-badge">HOD</span>
            </div>
            <p className="dept-text">Examination Department</p>
            <p className="univ-text">Grievance Portal Admin</p>
            
            <div className="contact-row">
              <span>
                <i className="fa-regular fa-envelope"></i>
                hod@gmail.com
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

export default MyProfile;
