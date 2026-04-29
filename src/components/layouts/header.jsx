import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import './header.css';

const DASHBOARD_DATE_STORAGE_KEY = 'grievance-portal-selected-date';

const formatDisplayDate = (value) => {
  if (!value) {
    return 'Select date';
  }

  const date = new Date(`${value}T00:00:00`);

  return Number.isNaN(date.getTime())
    ? 'Select date'
    : date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
};

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
  '/admin/profile': {
    title: 'Profile',
    subtitle: 'Review administrator account details and active sessions.',
  },
};

const Header = ({ toggleSidebar, isMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, role, logout } = useAuth();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    if (typeof window === 'undefined') {
      return '2025-05-20';
    }

    return window.localStorage.getItem(DASHBOARD_DATE_STORAGE_KEY) || '2025-05-20';
  });
  const calendarRef = useRef(null);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const isHodArea = location.pathname.startsWith('/hod');
  const isAdminArea = location.pathname.startsWith('/admin');
  const notificationRoute = isAdminArea
    ? '/admin/notifications'
    : isHodArea
      ? '/hod/notifications'
      : '/student/notifications';
  const profileRoute = isAdminArea
    ? '/admin/profile'
    : isHodArea
      ? '/hod/profile'
      : '/student/profile';
  const settingsRoute = isAdminArea ? '/admin/settings' : profileRoute;
  const currentPage =
    pageMeta[location.pathname] ||
    (location.pathname.startsWith('/hod/assigned/') ? pageMeta['/hod/assigned'] : null) ||
    (location.pathname.startsWith('/admin/grievances/') ? pageMeta['/admin/grievances'] : null) ||
    pageMeta[isAdminArea ? '/admin/dashboard' : isHodArea ? '/hod/dashboard' : '/student/dashboard'];
  const firstName = user?.name?.split(' ')[0] || (isAdminArea ? 'Admin' : isHodArea ? 'HOD' : 'Student');
  const avatarLetter = user?.name?.charAt(0)?.toUpperCase() || (isAdminArea ? 'A' : isHodArea ? 'H' : 'S');
  const displayDate = useMemo(() => formatDisplayDate(selectedDate), [selectedDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }

      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }

      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsCalendarOpen(false);
    setIsProfileOpen(false);
    setIsNotificationsOpen(false);
  }, [location.pathname]);

  const applySelectedDate = (value) => {
    setSelectedDate(value);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(DASHBOARD_DATE_STORAGE_KEY, value);
      window.dispatchEvent(
        new CustomEvent('grievance-dashboard-date-change', {
          detail: { value },
        }),
      );
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

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
              Hi,
            </span>
            <span className="greeting-text">
              {firstName}
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
            <div className="header-popover-wrap" ref={calendarRef}>
              <button
                className={`icon-btn ${isCalendarOpen ? 'active' : ''}`}
                onClick={() => setIsCalendarOpen((current) => !current)}
                aria-label="Open calendar"
              >
                <i className="fa-regular fa-calendar"></i>
              </button>

              {isCalendarOpen && (
                <div className="header-popover calendar-popover">
                  <div className="popover-head">
                    <strong>Calendar</strong>
                    <span>{displayDate}</span>
                  </div>
                  <input
                    className="calendar-input"
                    type="date"
                    value={selectedDate}
                    onChange={(event) => applySelectedDate(event.target.value)}
                  />
                  <div className="calendar-shortcuts">
                    <button type="button" onClick={() => applySelectedDate('2025-05-20')}>
                      Today
                    </button>
                    <button type="button" onClick={() => applySelectedDate('2025-05-19')}>
                      Yesterday
                    </button>
                    <button type="button" onClick={() => applySelectedDate('2025-05-14')}>
                      This Week
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {!isMobile && <div className="vertical-line"></div>}

          <div className="header-popover-wrap" ref={notificationRef}>
            <button
              className={`icon-btn notification-btn ${isNotificationsOpen ? 'active' : ''}`}
              onClick={() => setIsNotificationsOpen((current) => !current)}
              aria-label="Open notifications"
              title="Notifications"
            >
              <i className="fa-regular fa-bell"></i>
              <span className="notif-badge">3</span>
            </button>

            {isNotificationsOpen && (
              <div className="header-popover notification-popover" style={{ width: '280px', padding: '12px' }}>
                <div className="popover-head" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #eef2f7', marginBottom: '2px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>Notifications</strong>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>3 unread alerts</span>
                  </div>
                  <button type="button" style={{ background: 'transparent', border: 'none', color: '#2563eb', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', padding: 0 }}>Mark all read</button>
                </div>
                
                <div className="notification-list" style={{ maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '10px 8px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: '10px', cursor: 'pointer', borderRadius: '8px', transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444', marginTop: '6px', flexShrink: 0 }}></div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e293b' }}>12 grievances breached SLA</span>
                      <span style={{ fontSize: '0.7rem', color: '#64748b', lineHeight: 1.4 }}>Require immediate attention in Hostel.</span>
                      <span style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '4px', fontWeight: 600 }}>10 mins ago</span>
                    </div>
                  </div>
                  <div style={{ padding: '10px 8px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: '10px', cursor: 'pointer', borderRadius: '8px', transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b', marginTop: '6px', flexShrink: 0 }}></div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e293b' }}>New grievance received</span>
                      <span style={{ fontSize: '0.7rem', color: '#64748b', lineHeight: 1.4 }}>GRV-1250 raised by Rahul Sharma.</span>
                      <span style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '4px', fontWeight: 600 }}>1 hour ago</span>
                    </div>
                  </div>
                  <div style={{ padding: '10px 8px', display: 'flex', gap: '10px', cursor: 'pointer', borderRadius: '8px', transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563eb', marginTop: '6px', flexShrink: 0 }}></div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e293b' }}>Grievance escalated</span>
                      <span style={{ fontSize: '0.7rem', color: '#64748b', lineHeight: 1.4 }}>GRV-1245 escalated to HOD.</span>
                      <span style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '4px', fontWeight: 600 }}>Yesterday</span>
                    </div>
                  </div>
                </div>

                <div style={{ paddingTop: '10px', borderTop: '1px solid #eef2f7', textAlign: 'center', marginTop: '2px' }}>
                  <button 
                    type="button"
                    onClick={() => {
                      setIsNotificationsOpen(false);
                      navigate(notificationRoute);
                    }}
                    style={{ background: 'transparent', border: 'none', color: '#2563eb', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: '100%', padding: '6px 0' }}
                  >
                    View All Notifications <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {!isMobile && <div className="header-divider"></div>}

        <div className="header-popover-wrap" ref={profileRef}>
          <button
            className={`user-profile ${isProfileOpen ? 'active' : ''}`}
            onClick={() => setIsProfileOpen((current) => !current)}
            aria-label="Open profile menu"
          >
            <div className="avatar">{avatarLetter}</div>
            {!isMobile && (
              <div className="user-info">
                <h4>{user?.name || 'Student User'}</h4>
                <p>{user?.department?.replace('Computer Science & Engineering', 'CSE') || (isAdminArea ? 'Admin Dashboard' : isHodArea ? 'HOD Dashboard' : 'Student Dashboard')}</p>
              </div>
            )}
            <i className="fa-solid fa-chevron-down dropdown-icon"></i>
          </button>

          {isProfileOpen && (
            <div className="header-popover profile-popover">
              <div className="popover-head">
                <strong>{user?.name || 'User'}</strong>
                <span>{role?.toUpperCase() || 'ACCOUNT'}</span>
              </div>
              <div className="profile-popover-actions">
                <button type="button" onClick={() => navigate(profileRoute)}>
                  <i className="fa-regular fa-user"></i>
                  <span>View Profile</span>
                </button>
                <button type="button" onClick={() => navigate(settingsRoute)}>
                  <i className="fa-solid fa-gear"></i>
                  <span>Settings</span>
                </button>
                <button type="button" className="danger" onClick={handleLogout}>
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
