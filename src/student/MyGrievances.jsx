import React, { useState } from 'react';
import '../styles/student-pages.css';
import '../styles/MyGrievances.css';

const grievanceData = [
  { id: '#GRV-8092', category: 'Academic', subject: 'Incorrect Marks in Midterm Exam', status: 'Under Review', date: 'Oct 24, 2024\n11:30 AM', statusColor: 'orange' },
  { id: '#GRV-8100', category: 'Hostel', subject: 'Wi-Fi Not Working in Block B', status: 'In Progress', date: 'Oct 20, 2024\n02:15 PM', statusColor: 'blue' },
  { id: '#GRV-8041', category: 'Hostel', subject: 'Water Leakage in Room 101', status: 'Resolved', date: 'Oct 12, 2024\n09:20 AM', statusColor: 'green' },
  { id: '#GRV-7922', category: 'Examination', subject: 'Examination Schedule Clash', status: 'Resolved', date: 'Sep 28, 2024\n04:45 PM', statusColor: 'green' },
  { id: '#GRV-7811', category: 'Financial', subject: 'Scholarship Payment Not Received', status: 'In Progress', date: 'Sep 20, 2024\n10:10 AM', statusColor: 'blue' },
  { id: '#GRV-7683', category: 'Academic', subject: 'Unable to Access Course Material', status: 'Under Review', date: 'Sep 15, 2024\n01:30 PM', statusColor: 'orange' },
  { id: '#GRV-7542', category: 'Hostel', subject: 'Mess Food Quality Issue', status: 'Resolved', date: 'Sep 05, 2024\n08:45 AM', statusColor: 'green' },
];

const getCategoryIcon = (category) => {
  const icons = {
    Academic: <i className="fa-solid fa-file-lines" />,
    Hostel: <i className="fa-solid fa-building" />,
    Examination: <i className="fa-solid fa-star" />,
    Financial: <i className="fa-solid fa-dollar-sign" />,
  };
  return icons[category] || icons.Academic;
};

const StatusBadge = ({ status, color }) => {
  return <span className={`ng-status ng-status-${color}`}>{status}</span>;
};

const MyGrievances = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [dateFilter, setDateFilter] = useState('All Time');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const filteredData = grievanceData.filter((item) => {
    const matchesSearch = item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'All Categories' || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All Status');
    setCategoryFilter('All Categories');
    setDateFilter('All Time');
  };

  const openTicketDetails = (ticket) => {
    setSelectedTicket(ticket);
  };

  const closeTicketDetails = () => {
    setSelectedTicket(null);
  };

  return (
    <div className="student-page">
      <section className="ng-panel">
        <div className="ng-header">
          <div>
            <h1 className="ng-title">My Grievances</h1>
            <p className="ng-subtitle">Track and manage all your submitted grievances.</p>
          </div>
          <button className="ng-export-btn">
            <i className="fa-solid fa-download" />
            Export
          </button>
        </div>

        <div className="ng-filters">
          <div className="ng-search">
            <i className="fa-solid fa-magnifying-glass ng-search-icon" />
            <input
              type="text"
              placeholder="Search grievances..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="ng-filter-group">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>All Status</option>
              <option>Under Review</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>

          <div className="ng-filter-group">
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option>All Categories</option>
              <option>Academic</option>
              <option>Hostel</option>
              <option>Examination</option>
              <option>Financial</option>
            </select>
          </div>

          <div className="ng-filter-group">
            <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
              <option>All Time</option>
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>

          <button className="ng-clear-btn" onClick={clearFilters}>
            <i className="fa-solid fa-rotate-right" />
            Clear Filters
          </button>
        </div>

        <div className="ng-table-container">
          <table className="ng-table">
            <thead>
              <tr>
                <th>TICKET ID</th>
                <th>CATEGORY</th>
                <th>SUBJECT</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td className="ng-ticket-id">{item.id}</td>
                  <td>
                    <div className="ng-category">
                      <span className={`ng-category-icon ng-category-${item.category.toLowerCase()}`}>
                        {getCategoryIcon(item.category)}
                      </span>
                      <span>{item.category}</span>
                    </div>
                  </td>
                  <td className="ng-subject">{item.subject}</td>
                  <td>
                    <StatusBadge status={item.status} color={item.statusColor} />
                  </td>
                  <td className="ng-date">{item.date.split('\n').map((line, i) => (
                    <span key={i}>{line}{i === 0 && <br />}</span>
                  ))}</td>
                  <td>
                    <button
                      className="ng-view-link"
                      onClick={() => openTicketDetails(item)}
                    >
                      View Details
                      <i className="fa-solid fa-arrow-right" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="ng-pagination">
          <span className="ng-results">Showing 1 to {filteredData.length} of {grievanceData.length} results</span>
          <div className="ng-page-controls">
            <button className="ng-page-btn" disabled>
              <i className="fa-solid fa-chevron-left" />
            </button>
            <button className="ng-page-btn ng-page-active">1</button>
            <button className="ng-page-btn">2</button>
            <button className="ng-page-btn">3</button>
            <button className="ng-page-btn">
              <i className="fa-solid fa-chevron-right" />
            </button>
          </div>
        </div>
      </section>

      {selectedTicket && (
        <div className="ng-overlay" onClick={closeTicketDetails}>
          <div className="ng-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="ng-drawer-header">
              <button className="ng-drawer-back" onClick={closeTicketDetails}>
                <i className="fa-solid fa-chevron-left" />
              </button>
              <h2 className="ng-drawer-title">Ticket Details</h2>
              <button className="ng-drawer-close" onClick={closeTicketDetails}>
                <i className="fa-solid fa-xmark" />
              </button>
            </div>

            <div className="ng-drawer-content">
              <div className="ng-ticket-header">
                <div className="ng-ticket-info">
                  <h3 className="ng-ticket-id-large">{selectedTicket.id}: {selectedTicket.subject}</h3>
                  <StatusBadge status={selectedTicket.status} color={selectedTicket.statusColor} />
                </div>
                <div className="ng-ticket-meta">
                  <span className="ng-meta-item">
                    <i className="fa-regular fa-calendar" />
                    Oct 24, 2024, 11:30 AM
                  </span>
                  <span className="ng-meta-item">
                    <span className={`ng-category-icon ng-category-${selectedTicket.category.toLowerCase()}`}>
                      {getCategoryIcon(selectedTicket.category)}
                    </span>
                    {selectedTicket.category}
                  </span>
                </div>
              </div>

              <div className="ng-ticket-description">
                <p>The midterm marks updated in the portal for COM-101 are incorrect. I received 38 but the portal shows 28. I have attached the scanned copy of my answer script for verification. Please rectify this as it affects my aggregate score.</p>
              </div>

              <div className="ng-attachment">
                <div className="ng-attachment-icon">
                  <i className="fa-solid fa-paperclip" />
                </div>
                <div className="ng-attachment-info">
                  <span className="ng-attachment-name">Scanned_Script_COM101.pdf</span>
                  <span className="ng-attachment-size">(2 MB)</span>
                </div>
              </div>

              <div className="ng-status-tracker">
                <h4 className="ng-section-title">Status Tracker</h4>
                <div className="ng-timeline">
                  <div className="ng-timeline-item ng-timeline-completed">
                    <div className="ng-timeline-dot" />
                    <div className="ng-timeline-content">
                      <div className="ng-timeline-title">Ticket Submitted</div>
                      <div className="ng-timeline-date">Oct 24, 2024, 10:00 AM</div>
                    </div>
                  </div>
                  <div className="ng-timeline-item ng-timeline-active">
                    <div className="ng-timeline-dot" />
                    <div className="ng-timeline-content">
                      <div className="ng-timeline-title">Under Review</div>
                      <div className="ng-timeline-date">Oct 24, 2024, 11:30 AM</div>
                      <div className="ng-timeline-sub">Professor Verification</div>
                      <div className="ng-timeline-pending">Pending</div>
                    </div>
                  </div>
                  <div className="ng-timeline-item">
                    <div className="ng-timeline-dot" />
                    <div className="ng-timeline-content">
                      <div className="ng-timeline-title">Resolved</div>
                      <div className="ng-timeline-pending">Pending</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ng-conversation">
                <h4 className="ng-section-title">Conversation</h4>
                <div className="ng-messages">
                  <div className="ng-message ng-message-student">
                    <div className="ng-message-avatar">AJ</div>
                    <div className="ng-message-content">
                      <div className="ng-message-header">
                        <span className="ng-message-author">Alex Johnson (You)</span>
                        <span className="ng-message-time">Oct 24, 2024, 10:05 AM</span>
                      </div>
                      <p className="ng-message-text">I submitted the form as requested along with the document proof. Let me know if any other detail is needed.</p>
                    </div>
                  </div>
                  <div className="ng-message ng-message-officer">
                    <div className="ng-message-avatar">D</div>
                    <div className="ng-message-content">
                      <div className="ng-message-header">
                        <span className="ng-message-author">Department Officer</span>
                        <span className="ng-message-time">Oct 25, 2024, 09:30 AM</span>
                      </div>
                      <p className="ng-message-text">Dear Alex, we have forwarded your script copy to the respective professor for verification. We will update the system as soon as we receive confirmation from them. Expected resolution by tomorrow.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ng-reply-box">
              <div className="ng-reply-input-wrap">
                <i className="fa-solid fa-paperclip ng-attach-icon" />
                <input type="text" className="ng-reply-input" placeholder="Type your reply here..." />
              </div>
              <button className="ng-post-btn">Post Reply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGrievances;
