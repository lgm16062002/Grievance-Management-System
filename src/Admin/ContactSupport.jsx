import React, { useState } from 'react';
import '../styles/student-pages.css';
import '../styles/ContactSupport.css';
import '../styles/admin/Dashboard.css';

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    fullName: 'System Admin',
    email: 'admin@university.edu',
    subject: '',
    category: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 1000) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="admin-overview-page contact-support-page">
      <header className="page-header">
        <h1>IT & Developer Support</h1>
        <p>Technical assistance for system administrators and portal managers.</p>
      </header>

      <div className="contact-content-grid">
        <div className="contact-main-col">
          <section className="dashboard-card contact-form-card">
            <div className="card-head">
              <h3>Report a System Issue</h3>
            </div>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Admin Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label>Admin Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-group">
                <label>Issue Type</label>
                <div className="select-wrapper">
                  <select name="subject" value={formData.subject} onChange={handleChange}>
                    <option value="" disabled>Select issue type</option>
                    <option value="bug">System Bug / Error</option>
                    <option value="data">Data Export/Import</option>
                    <option value="access">Role & Access Management</option>
                    <option value="other">Other Technical Query</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>System Module</label>
                <div className="select-wrapper">
                  <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="" disabled>Select module</option>
                    <option value="dashboard">Analytics Dashboard</option>
                    <option value="routing">Grievance Routing</option>
                    <option value="users">User Management</option>
                    <option value="notifications">Email/SMS Gateway</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Detailed Description</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe the technical issue, including error codes or exact steps to reproduce..."
                  rows="6"
                ></textarea>
                <div className="char-counter">{formData.message.length} / 1000 characters</div>
              </div>

              <button type="submit" className="send-message-btn">
                <i className="fa-solid fa-paper-plane"></i>
                Submit Ticket to IT
              </button>
            </form>
          </section>
        </div>

        <aside className="contact-side-col">
          <section className="dashboard-card support-info-card">
            <div className="card-head">
              <h3>Developer Desk</h3>
              <p>Direct line to engineering</p>
            </div>
            <div className="info-items-list">
              <div className="info-item-alt">
                <div className="info-icon blue">
                  <i className="fa-solid fa-bug"></i>
                </div>
                <div className="info-text">
                  <strong>IT Helpdesk</strong>
                  <p className="primary-text">dev-support@university.edu</p>
                  <p className="sub-text">P1 Issues: &lt; 1 hour response</p>
                </div>
              </div>
              <div className="info-item-alt">
                <div className="info-icon red">
                  <i className="fa-solid fa-phone-volume"></i>
                </div>
                <div className="info-text">
                  <strong>Emergency Hotline</strong>
                  <p className="primary-text">+91 98765 00000</p>
                  <p className="sub-text">For server downtime only</p>
                </div>
              </div>
              <div className="info-item-alt">
                <div className="info-icon purple">
                  <i className="fa-solid fa-server"></i>
                </div>
                <div className="info-text">
                  <strong>System Status</strong>
                  <p className="primary-text">All systems operational</p>
                  <p className="sub-text">Uptime: 99.99%</p>
                </div>
              </div>
            </div>
          </section>

          <section className="dashboard-card before-contact-card">
            <div className="card-head">
              <h3>Admin Resources</h3>
              <p>Quick guides for system administrators.</p>
            </div>
            <div className="help-center-links">
              <button className="help-link-item">
                <div className="link-icon blue">
                  <i className="fa-solid fa-book-open-reader"></i>
                </div>
                <span>Admin Documentation</span>
                <i className="fa-solid fa-chevron-right arrow"></i>
              </button>
              <button className="help-link-item">
                <div className="link-icon blue">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <span>Security Guidelines</span>
                <i className="fa-solid fa-chevron-right arrow"></i>
              </button>
              <button className="help-link-item">
                <div className="link-icon blue">
                  <i className="fa-solid fa-code-merge"></i>
                </div>
                <span>Release Notes (v2.1)</span>
                <i className="fa-solid fa-chevron-right arrow"></i>
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default ContactSupport;
