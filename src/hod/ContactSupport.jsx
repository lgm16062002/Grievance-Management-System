import React, { useState } from 'react';
import '../styles/hod/CommonHOD.css';
import '../styles/ContactSupport.css';

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    fullName: 'Officer Davis',
    email: 'hod@gmail.com',
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
    <div className="hod-dashboard contact-support-page">
      <header className="page-header-alt">
        <h1>Contact Support</h1>
        <p>Need technical assistance? Our admin support team is here to help you manage the portal effectively.</p>
      </header>

      <div className="contact-content-grid">
        <div className="contact-main-col">
          <section className="dashboard-card contact-form-card">
            <div className="card-head">
              <h3>Send us a message</h3>
            </div>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <div className="select-wrapper">
                  <select name="subject" value={formData.subject} onChange={handleChange}>
                    <option value="" disabled>Select a subject</option>
                    <option value="technical">Portal Bug / Error</option>
                    <option value="access">Access Control Issue</option>
                    <option value="reporting">Report Generation Error</option>
                    <option value="other">Other Technical Query</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Category</label>
                <div className="select-wrapper">
                  <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="" disabled>Select a category</option>
                    <option value="dashboard">Dashboard Metrics</option>
                    <option value="workflow">Grievance Workflow</option>
                    <option value="account">Admin Account Settings</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe the technical issue or query in detail..."
                  rows="6"
                ></textarea>
                <div className="char-counter">{formData.message.length} / 1000 characters</div>
              </div>

              <button type="submit" className="send-message-btn">
                <i className="fa-solid fa-paper-plane"></i>
                Send Message
              </button>
            </form>
          </section>
        </div>

        <aside className="contact-side-col">
          <section className="dashboard-card support-info-card">
            <div className="card-head">
              <h3>Admin Support Desk</h3>
              <p>Dedicated help for portal administrators.</p>
            </div>
            <div className="info-items-list">
              <div className="info-item-alt">
                <div className="info-icon blue">
                  <i className="fa-regular fa-envelope"></i>
                </div>
                <div className="info-text">
                  <strong>Technical Email</strong>
                  <p className="primary-text">admin.support@university.edu</p>
                  <p className="sub-text">Typical response time: 2-4 hours</p>
                </div>
              </div>
              <div className="info-item-alt">
                <div className="info-icon green">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="info-text">
                  <strong>IT Helpdesk</strong>
                  <p className="primary-text">+91 98765 00001</p>
                  <p className="sub-text">Direct line for HODs & Officers</p>
                </div>
              </div>
            </div>
          </section>

          <section className="dashboard-card before-contact-card">
            <div className="card-head">
              <h3>Admin Resources</h3>
              <p>Quick guides for portal management.</p>
            </div>
            <div className="help-center-links">
              <button className="help-link-item">
                <div className="link-icon blue">
                  <i className="fa-regular fa-file-lines"></i>
                </div>
                <span>Officer User Manual</span>
                <i className="fa-solid fa-chevron-right arrow"></i>
              </button>
              <button className="help-link-item">
                <div className="link-icon blue">
                  <i className="fa-solid fa-circle-play"></i>
                </div>
                <span>Workflow Tutorials</span>
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
