import React, { useState } from 'react';
import '../styles/student-pages.css';
import '../styles/Notifications.css';

const notificationsData = [
  {
    id: 1,
    type: 'status',
    icon: 'fa-solid fa-rotate',
    color: 'blue',
    title: 'Your complaint #GRV-8092 status has been updated',
    description: 'Your complaint status has been changed to "Under Review". We will update you once there is further progress.',
    time: 'Today, 11:30 AM',
    unread: true,
  },
  {
    id: 2,
    type: 'resolved',
    icon: 'fa-solid fa-check',
    color: 'green',
    title: 'Your complaint #GRV-8041 has been resolved',
    description: 'Great news! Your complaint has been successfully resolved. Thank you for your patience.',
    time: 'Oct 12, 04:15 PM',
    unread: true,
  },
  {
    id: 3,
    type: 'assigned',
    icon: 'fa-regular fa-user',
    color: 'orange',
    title: 'Your complaint #GRV-8100 has been assigned',
    description: 'Your complaint has been assigned to Assistant Superintendent. They will review and take necessary action.',
    time: 'Oct 10, 09:20 AM',
    unread: false,
  },
  {
    id: 4,
    type: 'reply',
    icon: 'fa-regular fa-comment-dots',
    color: 'purple',
    title: 'New reply on your complaint #GRV-8001',
    description: 'You have received a new reply on your complaint. Please check the details.',
    time: 'Oct 09, 02:45 PM',
    unread: false,
  },
  {
    id: 5,
    type: 'status',
    icon: 'fa-regular fa-file-lines',
    color: 'blue',
    title: 'Your complaint #GRV-7922 status has been updated',
    description: 'Your complaint status has been changed to "Resolved". Thank you for bringing this to our attention.',
    time: 'Oct 08, 01:10 PM',
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
    <div className="student-page notifications-page">
      <header className="notifications-header">
        <h1>Notifications</h1>
        <p>Stay updated with the latest updates and alerts.</p>
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
