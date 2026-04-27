import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="footer-logo">
          <div className="footer-logo-icon">
            <i className="fa-solid fa-building-columns"></i>
          </div>
          <div className="footer-logo-text">
            <h3>Grievance Portal</h3>
            <p>Copyright 2026 University Name. All rights reserved.</p>
          </div>
        </div>
      </div>

      <div className="footer-links">
        <Link to="/student/help">Privacy Policy</Link>
        <span className="divider"></span>
        <Link to="/student/help">Terms of Service</Link>
        <span className="divider"></span>
        <Link to="/student/help">FAQ</Link>
      </div>

      <div className="footer-social">
        <span>Follow us</span>
        <div className="social-icons">
          <a href="#" className="social-icon">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fa-brands fa-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
