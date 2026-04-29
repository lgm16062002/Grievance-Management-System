import React, { useState } from 'react';
import '../styles/hod/Notifications.css';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('All');

  const notifications = [
    {
      id: 1,
      type: 'grievance',
      title: 'New grievance assigned to you',
      desc: '#GRV-8105 has been assigned to you by System.',
      time: '10:15 AM',
      date: 'May 20, 2025',
      unread: true,
      icon: 'fa-solid fa-clipboard-list',
      color: 'blue'
    },
    {
      id: 2,
      type: 'status',
      title: 'Status updated to In Progress',
      desc: '#GRV-7981 (Hostel Maintenance) status changed to In Progress.',
      time: '09:48 AM',
      date: 'May 20, 2025',
      unread: true,
      icon: 'fa-solid fa-hourglass-half',
      color: 'orange'
    },
    {
      id: 3,
      type: 'reply',
      title: 'New reply from student',
      desc: 'Kiran Patel replied on #GRV-8092.',
      time: '09:30 AM',
      date: 'May 20, 2025',
      unread: true,
      icon: 'fa-solid fa-comment-dots',
      color: 'purple'
    },
    {
      id: 4,
      type: 'resolved',
      title: 'Grievance resolved',
      desc: '#GRV-7966 (Fee Refund) has been marked as Resolved.',
      time: 'Yesterday',
      date: 'May 19, 2025',
      unread: false,
      icon: 'fa-solid fa-circle-check',
      color: 'green'
    },
    {
      id: 5,
      type: 'warning',
      title: 'SLA warning',
      desc: '#GRV-7990 is approaching SLA breach. Please take action.',
      time: 'Yesterday',
      date: 'May 19, 2025',
      unread: false,
      icon: 'fa-regular fa-clock',
      color: 'orange'
    },
    {
      id: 6,
      type: 'reassigned',
      title: 'Ticket reassigned',
      desc: '#GRV-7921 has been reassigned to you by HOD (Examination).',
      time: 'May 18, 2025',
      date: '04:20 PM',
      unread: false,
      icon: 'fa-solid fa-user-plus',
      color: 'blue'
    },
    {
      id: 7,
      type: 'announcement',
      title: 'Announcement',
      desc: 'System maintenance scheduled on May 25, 2025 from 12:00 AM to 02:00 AM.',
      time: 'May 18, 2025',
      date: '11:00 AM',
      unread: false,
      icon: 'fa-solid fa-bullhorn',
      color: 'red'
    },
    {
      id: 8,
      type: 'resolved',
      title: 'Status updated to Resolved',
      desc: '#GRV-7980 (Library Access) status changed to Resolved.',
      time: 'May 17, 2025',
      date: '05:10 PM',
      unread: false,
      icon: 'fa-solid fa-circle-check',
      color: 'green'
    }
  ];

  return (
    <div className="hod-dashboard notifications-page">
      <header className="page-header-alt">
        <h1>Notifications</h1>
        <p>Stay updated with the latest activities and updates.</p>
      </header>

      <div className="dashboard-card notifications-card">
        <div className="table-actions-row">
          <div className="table-tabs">
            <button 
              className={`tab-item ${activeTab === 'All' ? 'active' : ''}`}
              onClick={() => setActiveTab('All')}
            >
              All
            </button>
            <button 
              className={`tab-item ${activeTab === 'Unread' ? 'active' : ''}`}
              onClick={() => setActiveTab('Unread')}
            >
              Unread (3)
            </button>
          </div>
          <button className="mark-read-btn">
            <i className="fa-solid fa-check"></i>
            Mark all as read
          </button>
        </div>

        <div className="notifications-list">
          {notifications.map((notif) => (
            <div key={notif.id} className={`notif-item ${notif.unread ? 'unread' : ''}`}>
              <div className="notif-indicator">
                {notif.unread && <div className="unread-dot"></div>}
              </div>
              <div className={`notif-icon-wrap ${notif.color}`}>
                <i className={notif.icon}></i>
              </div>
              <div className="notif-content">
                <strong>{notif.title}</strong>
                <p>{notif.desc}</p>
              </div>
              <div className="notif-meta">
                <span className="notif-time">{notif.time}</span>
                <span className="notif-date">{notif.date}</span>
              </div>
              <div className="notif-arrow">
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </div>
          ))}
        </div>

        <div className="table-footer-pagination">
          <span className="results-count">Showing 1 to 8 of 24 notifications</span>
          <div className="pagination-controls">
            <button className="page-nav"><i className="fa-solid fa-chevron-left"></i></button>
            <button className="page-num active">1</button>
            <button className="page-num">2</button>
            <button className="page-num">3</button>
            <button className="page-nav"><i className="fa-solid fa-chevron-right"></i></button>
          </div>
          <div className="per-page-select">
            <select>
              <option>10 / page</option>
              <option>20 / page</option>
              <option>50 / page</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
