import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import './header.css';

const pageMeta = {
  '/student/dashboard': {
    title: 'Dashboard',
    subtitle: "Here's what's happening with your grievances today.",
  },
  '/student/submit': {
    title: 'Submit Grievance',
    subtitle: 'Share the issue clearly and route it to the right support team.',
  },
  '/student/grievances': {
    title: 'My Grievances',
    subtitle: 'Track updates, priorities, and next actions in one place.',
  },
  '/student/notifications': {
    title: 'Notifications',
    subtitle: 'Stay on top of new updates, deadlines, and support replies.',
  },
  '/student/profile': {
    title: 'Profile',
    subtitle: 'Review the account details tied to your grievance submissions.',
  },
  '/student/help': {
    title: 'Help & FAQ',
    subtitle: 'Find quick answers before you raise a new support request.',
  },
  '/student/contact': {
    title: 'Contact Support',
    subtitle: 'Reach the right team when you need a more direct hand.',
  },
  '/hod/dashboard': {
    title: 'Dashboard',
    subtitle: 'Review assigned grievances and department updates.',
  },
  '/hod/assigned': {
    title: 'My Assigned',
    subtitle: 'View the grievances assigned to your department.',
  },
  '/hod/notifications': {
    title: 'Notifications',
    subtitle: 'Check the latest grievance alerts and updates.',
  },
  '/hod/profile': {
    title: 'My Profile',
    subtitle: 'Review your department account details.',
  },
  '/hod/help': {
    title: 'Help & Support',
    subtitle: 'Get support for HOD grievance workflows.',
  },
  '/hod/contact': {
    title: 'Contact Support',
    subtitle: 'Reach the support desk for department workflow issues.',
  },
  '/admin/dashboard': {
    title: 'Dashboard',
    subtitle: 'Monitor platform health, usage, and grievance performance.',
  },
  '/admin/users': {
    title: 'Manage Users',
    subtitle: 'Create and maintain student, HOD, and staff accounts.',
  },
  '/admin/grievances': {
    title: 'All Grievances',
    subtitle: 'Review, filter, and manage complaints across the whole system.',
  },
  '/admin/categories': {
    title: 'Categories',
    subtitle: 'Maintain the complaint categories and sub-categories available to users.',
  },
  '/admin/assignment-rules': {
    title: 'Assignment Rules',
    subtitle: 'Control how grievances are routed to the right department or officer.',
  },
  '/admin/notifications': {
    title: 'Notifications',
    subtitle: 'Track system alerts, escalations, and administrative updates.',
  },
  '/admin/settings': {
    title: 'Settings',
    subtitle: 'Adjust global platform behavior and service-level defaults.',
  },
  '/admin/contact': {
    title: 'Contact Support',
    subtitle: 'Get technical help for the admin workspace.',
  },
};

const Header = ({ toggleSidebar, isMobile }) => {
  const location = useLocation();
  const { user } = useAuth();
  const isHodArea = location.pathname.startsWith('/hod');
  const isAdminArea = location.pathname.startsWith('/admin');
  const currentPage =
    pageMeta[location.pathname] ||
    (location.pathname.startsWith('/hod/assigned/') ? pageMeta['/hod/assigned'] : null) ||
    (location.pathname.startsWith('/admin/grievances/') ? pageMeta['/admin/grievances'] : null) ||
    pageMeta[isAdminArea ? '/admin/dashboard' : isHodArea ? '/hod/dashboard' : '/student/dashboard'];
  const firstName = user?.name?.split(' ')[0] || (isAdminArea ? 'Admin' : isHodArea ? 'HOD' : 'Student');
  const avatarLetter = user?.name?.charAt(0)?.toUpperCase() || (isAdminArea ? 'A' : isHodArea ? 'H' : 'S');

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <i className="fa-solid fa-bars"></i>
        </button>

        <div className="header-divider"></div>

        <div className="greeting">
          <h2>
            <span className="greeting-wave" aria-hidden="true">
              Hi
            </span>
            <span className="greeting-text">
              {currentPage.title}, {firstName}
            </span>
          </h2>
          <p>{currentPage.subtitle}</p>
        </div>
      </div>

      <div className="header-right">
        {isMobile ? (
          <button className="icon-btn search-mobile-btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        ) : (
          <div className="search-bar">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input type="text" placeholder="Search ticket ID, category or keyword..." />
            <div className="shortcut-badge">
              <span className="command-icon">Ctrl</span>
              <span className="key-letter">K</span>
            </div>
          </div>
        )}

        {!isMobile && <div className="header-divider"></div>}

        <div className="header-actions">
          {!isMobile && (
            <button className="icon-btn">
              <i className="fa-regular fa-calendar"></i>
            </button>
          )}

          {!isMobile && <div className="vertical-line"></div>}

          <button className="icon-btn notification-btn">
            <i className="fa-regular fa-bell"></i>
            <span className="notif-badge">3</span>
          </button>
        </div>

        {!isMobile && <div className="header-divider"></div>}

        <div className="user-profile">
          <div className="avatar">{avatarLetter}</div>
          {!isMobile && (
            <div className="user-info">
              <h4>{user?.name || 'Student User'}</h4>
              <p>{user?.department || (isAdminArea ? 'Admin Dashboard' : isHodArea ? 'HOD Dashboard' : 'Student Dashboard')}</p>
            </div>
          )}
          <i className="fa-solid fa-chevron-down dropdown-icon"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
