import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/student-pages.css';
import '../styles/Profile.css';

const Profile = () => {
  const { user } = useAuth();

  // Mock data matching the image for visual demonstration
  const personalInfo = [
    { label: 'Full Name', value: 'Bruce Wayne' },
    { label: 'Email Address', value: 'bruce.wayne@university.edu' },
    { label: 'Phone Number', value: '+91 98765 43210' },
    { label: 'Date of Birth', value: 'May 02, 2003' },
    { label: 'Gender', value: 'Male' },
    { label: 'Enrollment Number', value: 'UNIV20231245' },
    { label: 'Department', value: 'Computer Science & Engineering' },
    { label: 'Year', value: '3rd Year' },
    { label: 'Address', value: 'Wayne Manor, Gotham City, USA' },
  ];

  const sessions = [
    {
      id: 1,
      device: 'Windows • Chrome • Gotham City, USA',
      status: 'Active',
      isCurrent: true,
    }
  ];

  return (
    <div className="student-page profile-page">
      <header className="profile-header">
        <h1>Profile</h1>
        <p>Manage your personal information and account settings.</p>
      </header>

      <section className="profile-hero-card dashboard-card">
        <div className="profile-hero-content">
          <div className="profile-avatar-wrapper">
            <div className="profile-hero-avatar">B</div>
            <button className="avatar-edit-btn">
              <i className="fa-solid fa-camera"></i>
            </button>
          </div>
          
          <div className="profile-hero-info">
            <div className="name-row">
              <h2>Bruce Wayne</h2>
              <span className="role-badge">Student</span>
            </div>
            <p className="dept-text">CSE - 3rd Year</p>
            <p className="univ-text">University Name</p>
            
            <div className="contact-row">
              <span>
                <i className="fa-regular fa-envelope"></i>
                bruce.wayne@university.edu
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

export default Profile;
