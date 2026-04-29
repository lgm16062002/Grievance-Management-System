import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logoutUpImg from '../../assets/images/logout-up.png';
import sidebarDownImg from '../../assets/images/sidebar-down.png';
import { useAuth } from '../../context/AuthContext.jsx';
import './sidebar.css';

const navItems = [
  { to: '/student/dashboard', label: 'Dashboard', icon: 'fa-solid fa-house' },
  { to: '/student/submit', label: 'Submit Grievance', icon: 'fa-regular fa-pen-to-square' },
  { to: '/student/grievances', label: 'My Grievances', icon: 'fa-solid fa-list-check' },
  { to: '/student/notifications', label: 'Notifications', icon: 'fa-regular fa-bell', badge: '3' },
  { to: '/student/profile', label: 'Profile', icon: 'fa-regular fa-user' },
  { to: '/student/help', label: 'Help & FAQ', icon: 'fa-regular fa-circle-question' },
  { to: '/student/contact', label: 'Contact Support', icon: 'fa-solid fa-headset' },
];

const hodNavItems = [
  { to: '/hod/dashboard', label: 'Dashboard', icon: 'fa-solid fa-clipboard-list' },
  { to: '/hod/assigned', label: 'My Assigned', icon: 'fa-solid fa-list-check' },
  { to: '/hod/notifications', label: 'Notifications', icon: 'fa-regular fa-bell', badge: '3' },
  { to: '/hod/profile', label: 'My Profile', icon: 'fa-regular fa-user' },
  { to: '/hod/help', label: 'Help & FAQ', icon: 'fa-regular fa-circle-question' },
  { to: '/hod/contact', label: 'Contact Support', icon: 'fa-solid fa-headset' },
];

const adminNavItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: 'fa-solid fa-house' },
  { to: '/admin/users', label: 'Manage Users', icon: 'fa-solid fa-users-gear' },
  { to: '/admin/grievances', label: 'Manage Grievances', icon: 'fa-solid fa-clipboard-list' },
  { to: '/admin/categories', label: 'Category Manager', icon: 'fa-regular fa-folder-open' },
  { to: '/admin/assignment-rules', label: 'Assignment Rules', icon: 'fa-solid fa-shuffle' },
  { to: '/admin/notifications', label: 'Notifications', icon: 'fa-regular fa-bell', badge: '3' },
  { to: '/admin/help', label: 'Help & FAQ', icon: 'fa-regular fa-circle-question' },
  { to: '/admin/contact', label: 'Contact Support', icon: 'fa-solid fa-headset' },
];

const Sidebar = ({ isCollapsed }) => {
  const navigate = useNavigate();
  const { logout, role } = useAuth();
  const isHodArea = role === 'hod';
  const isAdminArea = role === 'admin';
  const activeNavItems = isAdminArea ? adminNavItems : isHodArea ? hodNavItems : navItems;

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        <div className="logo-icon">
          <i className="fa-solid fa-building-columns"></i>
        </div>
        <div className="logo-text">
          <h2>Grievance Portal</h2>
          <p>{isAdminArea ? 'Admin Dashboard' : isHodArea ? 'HOD Dashboard' : 'Student Dashboard'}</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {activeNavItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                title={item.label}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {item.badge ? (
                  <div className="icon-wrapper">
                    <i className={item.icon}></i>
                    <span className="badge mini"></span>
                  </div>
                ) : (
                  <i className={item.icon}></i>
                )}
                <span>{item.label}</span>
                {item.badge && <span className="badge">{item.badge}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-illustration">
        <img src={logoutUpImg} alt="Illustration" className="illustration-img" />
      </div>

      <div className="sidebar-logout">
        <button className="logout-btn" title="Logout" onClick={handleLogout}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span>Logout</span>
        </button>
      </div>

      <div className="sidebar-waves">
        <img src={sidebarDownImg} alt="Wave background" className="wave-img" />
      </div>
    </aside>
  );
};

export default Sidebar;
