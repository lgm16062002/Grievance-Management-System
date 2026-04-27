import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/hod/MyAssigned.css';

const assignedStats = [
  { label: 'Total Assigned', value: '24', sub: 'All time', icon: 'fa-regular fa-clipboard', color: 'blue' },
  { label: 'Pending', value: '5', sub: 'Requires your action', icon: 'fa-regular fa-clock', color: 'orange' },
  { label: 'In Progress', value: '8', sub: 'Currently handling', icon: 'fa-solid fa-rotate', color: 'purple' },
  { label: 'Resolved', value: '9', sub: 'Completed', icon: 'fa-regular fa-circle-check', color: 'green' },
  { label: 'Overdue', value: '2', sub: 'SLA breached', icon: 'fa-regular fa-calendar-xmark', color: 'red' },
];

const grievances = [
  { id: '#GRV-8092', student: 'Alex Johnson', stuId: 'STU-202X-001', category: 'Academic Grading', priority: 'High', status: 'Under Review', assignedOn: 'May 20, 2025', assignedTime: '10:30 AM', dueBy: 'May 23, 2025', dueTime: '11:59 PM' },
  { id: '#GRV-8105', student: 'Sarah Smith', stuId: 'STU-202X-045', category: 'Attendance', priority: 'Medium', status: 'New Request', assignedOn: 'May 20, 2025', assignedTime: '09:15 AM', dueBy: 'May 23, 2025', dueTime: '11:59 PM' },
  { id: '#GRV-7990', student: 'Michael Chang', stuId: 'STU-202X-112', category: 'Exam Schedule', priority: 'High', status: 'Pending Info', assignedOn: 'May 19, 2025', assignedTime: '04:45 PM', dueBy: 'May 22, 2025', dueTime: '11:59 PM' },
  { id: '#GRV-7981', student: 'Priya Patel', stuId: 'STU-202X-077', category: 'Hostel Maintenance', priority: 'Low', status: 'In Progress', assignedOn: 'May 19, 2025', assignedTime: '11:20 AM', dueBy: 'May 24, 2025', dueTime: '11:59 PM' },
  { id: '#GRV-7966', student: 'David Lee', stuId: 'STU-202X-033', category: 'Fee Refund', priority: 'Medium', status: 'Under Review', assignedOn: 'May 18, 2025', assignedTime: '02:10 PM', dueBy: 'May 21, 2025', dueTime: '11:59 PM' },
  { id: '#GRV-7932', student: 'Emma Wilson', stuId: 'STU-202X-098', category: 'Library Access', priority: 'Low', status: 'New Request', assignedOn: 'May 18, 2025', assignedTime: '10:05 AM', dueBy: 'May 21, 2025', dueTime: '11:59 PM' },
  { id: '#GRV-7921', student: 'James Brown', stuId: 'STU-202X-064', category: 'Academic Grading', priority: 'Medium', status: 'In Progress', assignedOn: 'May 17, 2025', assignedTime: '03:30 PM', dueBy: 'May 22, 2025', dueTime: '11:59 PM' },
];

const MyAssigned = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="hod-dashboard my-assigned-page">
      <header className="page-header-alt">
        <div className="header-text">
          <h1>My Assigned</h1>
          <p>Grievances assigned to you. View, update and resolve them.</p>
        </div>
      </header>

      <section className="stats-mini-grid">
        {assignedStats.map((stat) => (
          <div key={stat.label} className={`stat-mini-card ${stat.color}`}>
            <div className="mini-card-main">
              <div className="mini-icon">
                <i className={stat.icon}></i>
              </div>
              <div className="mini-content">
                <p>{stat.label}</p>
                <strong>{stat.value}</strong>
              </div>
            </div>
            <div className="mini-subtext">{stat.sub}</div>
          </div>
        ))}
      </section>

      <section className="dashboard-card main-table-card">
        <div className="table-actions-row">
          <div className="table-tabs">
            <button className={`tab-item ${activeTab === 'All' ? 'active' : ''}`} onClick={() => setActiveTab('All')}>All (24)</button>
            <button className={`tab-item pending`} onClick={() => setActiveTab('Pending')}>Pending (5)</button>
            <button className={`tab-item progress`} onClick={() => setActiveTab('In Progress')}>In Progress (8)</button>
            <button className={`tab-item resolved`} onClick={() => setActiveTab('Resolved')}>Resolved (9)</button>
          </div>
          <div className="table-btn-group">
            <button className="secondary-btn"><i className="fa-solid fa-filter"></i> Filters</button>
            <button className="secondary-btn"><i className="fa-solid fa-download"></i> Export</button>
            <div className="sort-select">
              <select>
                <option>Newest First</option>
                <option>Oldest First</option>
                <option>High Priority</option>
              </select>
            </div>
          </div>
        </div>

        <div className="advanced-filter-bar">
          <div className="search-box-wrap">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search by keyword" />
          </div>
          <div className="filter-selects">
            <select><option>All Priorities</option></select>
            <select><option>All Categories</option></select>
            <select><option>All Statuses</option></select>
            <select><option>All Departments</option></select>
            <button className="clear-btn">Clear</button>
          </div>
        </div>

        <div className="table-wrap">
          <table className="hod-table-alt">
            <thead>
              <tr>
                <th>TICKET ID</th>
                <th>STUDENT</th>
                <th>CATEGORY</th>
                <th>PRIORITY</th>
                <th>STATUS</th>
                <th>ASSIGNED ON</th>
                <th>DUE BY</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {grievances.map((item) => (
                <tr key={item.id}>
                  <td className="id-cell-link">{item.id}</td>
                  <td className="student-cell-alt">
                    <div className="student-name">{item.student}</div>
                    <div className="student-id">{item.stuId}</div>
                  </td>
                  <td className="text-sm">{item.category}</td>
                  <td>
                    <span className={`priority-pill ${item.priority.toLowerCase()}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`status-pill-alt ${item.status.toLowerCase().replace(' ', '-')}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="date-cell">
                    <div>{item.assignedOn}</div>
                    <div className="time-sub">{item.assignedTime}</div>
                  </td>
                  <td className="date-cell overdue-check">
                    <div className="due-date">{item.dueBy}</div>
                    <div className="time-sub">{item.dueTime}</div>
                  </td>
                  <td>
                    <div className="action-cell">
                      <button className="manage-btn" onClick={() => navigate(`/hod/assigned/${item.id.replace('#', '')}`)}>Manage</button>
                      <button className="more-btn"><i className="fa-solid fa-ellipsis-vertical"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer-pagination">
          <div className="results-count">Showing 1 to 7 of 24 results</div>
          <div className="pagination-controls">
            <button className="page-nav"><i className="fa-solid fa-chevron-left"></i></button>
            <button className="page-num active">1</button>
            <button className="page-num">2</button>
            <button className="page-num">3</button>
            <button className="page-num">4</button>
            <button className="page-nav"><i className="fa-solid fa-chevron-right"></i></button>
          </div>
          <div className="per-page-select">
            <select><option>10 / page</option></select>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyAssigned;
