import React, { useState } from 'react';
import '../styles/student-pages.css';
import '../styles/ContactSupport.css';

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    fullName: 'Arjun Kapoor',
    email: 'bruce.wayne@university.edu',
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
    <div className="student-page contact-support-page">
      <header className="page-header">
        <h1>Contact Support</h1>
        <p>Need help? Our support team is here to assist you with any questions or issues.</p>
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
                    <option value="technical">Technical Issue</option>
                    <option value="academic">Academic Query</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Category</label>
                <div className="select-wrapper">
                  <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="" disabled>Select a category</option>
                    <option value="portal">Portal Access</option>
                    <option value="grievance">Grievance Submission</option>
                    <option value="account">Account Settings</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your issue or question in detail..."
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
              <h3>Support Information</h3>
              <p>We're here to help you!</p>
            </div>
            <div className="info-items-list">
              <div className="info-item-alt">
                <div className="info-icon blue">
                  <i className="fa-regular fa-envelope"></i>
                </div>
                <div className="info-text">
                  <strong>Email Support</strong>
                  <p className="primary-text">support@university.edu</p>
                  <p className="sub-text">We typically reply within 24 hours</p>
                </div>
              </div>
              <div className="info-item-alt">
                <div className="info-icon green">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="info-text">
                  <strong>Phone Support</strong>
                  <p className="primary-text">+91 98765 43210</p>
                  <p className="sub-text">Mon - Fri, 9:00 AM - 6:00 PM</p>
                </div>
              </div>
              <div className="info-item-alt">
                <div className="info-icon purple">
                  <i className="fa-regular fa-clock"></i>
                </div>
                <div className="info-text">
                  <strong>Support Hours</strong>
                  <p className="primary-text">Monday - Friday</p>
                  <p className="sub-text">9:00 AM - 6:00 PM (IST)</p>
                </div>
              </div>
            </div>
          </section>

          <section className="dashboard-card before-contact-card">
            <div className="card-head">
              <h3>Before you contact us</h3>
              <p>You may find answers in our Help Center.</p>
            </div>
            <div className="help-center-links">
              <button className="help-link-item">
                <div className="link-icon blue">
                  <i className="fa-solid fa-circle-info"></i>
                </div>
                <span>Browse FAQs</span>
                <i className="fa-solid fa-chevron-right arrow"></i>
              </button>
              <button className="help-link-item">
                <div className="link-icon blue">
                  <i className="fa-regular fa-file-lines"></i>
                </div>
                <span>User Guide</span>
                <i className="fa-solid fa-chevron-right arrow"></i>
              </button>
              <button className="help-link-item">
                <div className="link-icon blue">
                  <i className="fa-solid fa-circle-play"></i>
                </div>
                <span>Video Tutorials</span>
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
