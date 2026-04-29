import React, { useState } from 'react';
import '../styles/student-pages.css'; // For common dashboard-card and grid styles
import '../styles/Notifications.css'; // For notification specific styles
import '../styles/admin/Dashboard.css'; // For admin-overview-page

const notificationsData = [
  {
    id: 1,
    type: 'alert',
    icon: 'fa-solid fa-triangle-exclamation',
    color: 'red',
    title: '12 grievances breached SLA',
    description: 'Multiple grievances in the Hostel category have breached the 48-hour SLA. Immediate action is required.',
    time: 'Today, 10:15 AM',
    unread: true,
  },
  {
    id: 2,
    type: 'assigned',
    icon: 'fa-solid fa-users',
    color: 'blue',
    title: 'New grievance received: GRV-1250',
    description: 'A new high-priority grievance has been submitted by Rahul Sharma regarding Water Supply.',
    time: 'Today, 09:10 AM',
    unread: true,
  },
  {
    id: 3,
    type: 'escalated',
    icon: 'fa-solid fa-arrow-trend-up',
    color: 'purple',
    title: 'Grievance GRV-1245 escalated',
    description: 'Student has escalated GRV-1245 due to lack of response within the expected timeframe.',
    time: 'Yesterday, 04:30 PM',
    unread: false,
  },
  {
    id: 4,
    type: 'system',
    icon: 'fa-solid fa-server',
    color: 'orange',
    title: 'Scheduled System Maintenance',
    description: 'The grievance portal will undergo routine maintenance tonight from 12:00 AM to 02:00 AM IST.',
    time: 'Oct 12, 02:00 PM',
    unread: false,
  },
  {
    id: 5,
    type: 'resolved',
    icon: 'fa-solid fa-check',
    color: 'green',
    title: 'Weekly SLA Report Generated',
    description: 'The weekly SLA and performance report is now available for download in the analytics section.',
    time: 'Oct 10, 09:00 AM',
    unread: false,
  },
];

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');

  const unreadCount = notificationsData.filter(n => n.unread).length;
  const filteredNotifications = activeTab === 'unread'
    ? notificationsData.filter(n => n.unread)
    : notificationsData;

  return (
    <div className="admin-overview-page notifications-page">
      <header className="notifications-header">
        <h1>System Alerts & Notifications</h1>
        <p>Monitor SLA breaches, new grievances, and system alerts.</p>
      </header>

      <div className="notifications-container dashboard-card">
        <div className="notifications-tabs">
          <button
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All <span className="badge">{notificationsData.length}</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'unread' ? 'active' : ''}`}
            onClick={() => setActiveTab('unread')}
          >
            Unread <span className="badge">{unreadCount}</span>
          </button>
        </div>

        <div className="notifications-list">
          {filteredNotifications.map((notification) => (
            <article key={notification.id} className={`notification-item ${notification.unread ? 'unread' : ''}`}>
              <div className={`notification-icon-wrap ${notification.color}`}>
                <i className={notification.icon}></i>
              </div>

              <div className="notification-content">
                <div className="notification-main">
                  <h3>{notification.title}</h3>
                  <p>{notification.description}</p>
                </div>
                <div className="notification-meta">
                  <span className="time">{notification.time}</span>
                  <span className={`status-dot ${notification.unread ? 'active' : ''}`}></span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
