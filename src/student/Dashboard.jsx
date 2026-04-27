import React from 'react';
import '../styles/student-pages.css';

const summaryCards = [
  {
    title: 'Total Grievances',
    value: '12',
    subtitle: 'All time submissions',
    trend: '+ 18.6%',
    trendType: 'positive',
    icon: 'fa-solid fa-users',
    tone: 'blue',
  },
  {
    title: 'Pending',
    value: '3',
    subtitle: 'Awaiting action',
    trend: '- 8.3%',
    trendType: 'negative',
    icon: 'fa-regular fa-clock',
    tone: 'orange',
  },
  {
    title: 'In Progress',
    value: '2',
    subtitle: 'Being resolved',
    trend: '+ 12.5%',
    trendType: 'positive',
    icon: 'fa-solid fa-rotate',
    tone: 'indigo',
  },
  {
    title: 'Resolved',
    value: '7',
    subtitle: 'Successfully resolved',
    trend: '+ 22.4%',
    trendType: 'positive',
    icon: 'fa-solid fa-circle-check',
    tone: 'green',
  },
];

const quickActions = [
  {
    title: 'Submit New Grievance',
    subtitle: 'Raise a new complaint',
    icon: 'fa-solid fa-plus',
    tone: 'blue',
  },
  {
    title: 'Track My Grievance',
    subtitle: 'Check status of existing complaints',
    icon: 'fa-solid fa-magnifying-glass',
    tone: 'green',
  },
  {
    title: 'View All Grievances',
    subtitle: 'See all your submitted complaints',
    icon: 'fa-regular fa-file-lines',
    tone: 'purple',
  },
];

const recentGrievances = [
  {
    id: '#GRV-8092',
    category: 'Academic & Grading',
    categoryIcon: 'fa-regular fa-file-lines',
    categoryTone: 'purple',
    subject: 'Incorrect Marks in Midterm Setup',
    status: 'Under Review',
    statusClass: 'under-review',
    date: 'Oct 24, 2024',
  },
  {
    id: '#GRV-8100',
    category: 'Hostel',
    categoryIcon: 'fa-solid fa-house',
    categoryTone: 'green',
    subject: 'Wi-Fi Not Working in Block B',
    status: 'In Progress',
    statusClass: 'in-progress',
    date: 'Oct 20, 2024',
  },
  {
    id: '#GRV-8041',
    category: 'Hostel',
    categoryIcon: 'fa-solid fa-house',
    categoryTone: 'green',
    subject: 'Water Leakage in Room',
    status: 'Resolved',
    statusClass: 'resolved',
    date: 'Oct 12, 2024',
  },
  {
    id: '#GRV-7922',
    category: 'Examination',
    categoryIcon: 'fa-regular fa-clipboard',
    categoryTone: 'red',
    subject: 'Examination Schedule Clash',
    status: 'Resolved',
    statusClass: 'resolved',
    date: 'Sep 28, 2024',
  },
];

const activityItems = [
  {
    icon: 'fa-solid fa-rotate',
    tone: 'blue',
    text: 'Your complaint #GRV-8092 status has been updated to Under Review.',
    time: 'Today, 11:30 AM',
  },
  {
    icon: 'fa-solid fa-check',
    tone: 'green',
    text: 'Your complaint #GRV-8041 has been resolved.',
    time: 'Oct 12, 04:15 PM',
  },
  {
    icon: 'fa-regular fa-user',
    tone: 'orange',
    text: 'Your complaint #GRV-8100 has been assigned to Assistant Superintendent.',
    time: 'Oct 10, 09:20 AM',
  },
  {
    icon: 'fa-regular fa-comment-dots',
    tone: 'purple',
    text: 'New reply on your complaint #GRV-8001.',
    time: 'Oct 09, 02:45 PM',
  },
];

const categoryStats = [
  { label: 'Hostel', value: 5 },
  { label: 'Academic & Grading', value: 4 },
  { label: 'Examination', value: 2 },
  { label: 'Financial', value: 1 },
  { label: 'Other', value: 0 },
];

const overviewLegend = [
  { label: 'Resolved', count: '7', percent: '(58.3%)', tone: 'green' },
  { label: 'In Progress', count: '2', percent: '(16.7%)', tone: 'blue' },
  { label: 'Under Review', count: '3', percent: '(25.0%)', tone: 'orange' },
  { label: 'Rejected', count: '0', percent: '(0%)', tone: 'purple' },
];

const Dashboard = () => {
  return (
    <div className="student-page dashboard-page">
      <div className="dashboard-topbar">
        <div></div>
        <button type="button" className="dashboard-primary-btn">
          <i className="fa-solid fa-plus"></i>
          <span>Submit New Grievance</span>
        </button>
      </div>

      <section className="dashboard-summary-grid">
        {summaryCards.map((card) => (
          <article key={card.title} className="dashboard-card summary-card">
            <div className={`summary-icon ${card.tone}`}>
              <i className={card.icon}></i>
            </div>
            <div className="summary-content">
              <div className="summary-head">
                <div>
                  <h3>{card.title}</h3>
                  <strong>{card.value}</strong>
                </div>
                <span className={`trend-badge ${card.trendType}`}>{card.trend}</span>
              </div>
              <p>{card.subtitle}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="dashboard-main-grid">
        {/* <article className="dashboard-card quick-actions-card">
          <div className="dashboard-section-head">
            <h2>Quick Actions</h2>
          </div>

          <div className="quick-actions-list">
            {quickActions.map((action) => (
              <button key={action.title} type="button" className={`quick-action-item ${action.tone}`}>
                <span className="quick-action-icon">
                  <i className={action.icon}></i>
                </span>
                <span className="quick-action-copy">
                  <strong>{action.title}</strong>
                  <small>{action.subtitle}</small>
                </span>
                <i className="fa-solid fa-arrow-right quick-action-arrow"></i>
              </button>
            ))}
          </div>
        </article> */}

        <article className="dashboard-card grievances-card">
          <div className="dashboard-section-head">
            <h2>Recent Grievances</h2>
            <button type="button" className="text-link-btn">
              View All
            </button>
          </div>

          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Category</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentGrievances.map((item) => (
                  <tr key={item.id}>
                    <td className="ticket-id-cell">{item.id}</td>
                    <td>
                      <div className="category-cell">
                        <span className={`category-icon ${item.categoryTone}`}>
                          <i className={item.categoryIcon}></i>
                        </span>
                        <span>{item.category}</span>
                      </div>
                    </td>
                    <td className="subject-cell">{item.subject}</td>
                    <td>
                      <span className={`table-status ${item.statusClass}`}>{item.status}</span>
                    </td>
                    <td>{item.date}</td>
                    <td>
                      <button type="button" className="table-link-btn">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="dashboard-card-footer center">
            <button type="button" className="view-all-link">
              <span>View All Grievances</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </article>

        <article className="dashboard-card activity-card">
          <div className="dashboard-section-head">
            <h2>Recent Activity</h2>
            <button type="button" className="text-link-btn">
              View All
            </button>
          </div>

          <div className="activity-list">
            {activityItems.map((item) => (
              <div key={`${item.text}-${item.time}`} className="activity-item">
                <span className={`activity-icon ${item.tone}`}>
                  <i className={item.icon}></i>
                </span>
                <div className="activity-copy">
                  <p>{item.text}</p>
                  <small>{item.time}</small>
                </div>
                <span className="activity-dot"></span>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* <section className="dashboard-bottom-grid">
        <article className="dashboard-card combined-stats-card">
          <div className="combined-stats-grid">
            <div className="stats-col">
              <div className="dashboard-section-head">
                <h2>Grievance Status Overview</h2>
              </div>

              <div className="overview-body">
                <div className="donut-chart">
                  <div className="donut-inner">
                    <strong>12</strong>
                    <span>Total</span>
                  </div>
                </div>

                <div className="overview-legend">
                  {overviewLegend.map((item) => (
                    <div key={item.label} className="legend-row">
                      <span className="legend-label">
                        <span className={`legend-dot ${item.tone}`}></span>
                        {item.label}
                      </span>
                      <div className="legend-value">
                        <strong>{item.count}</strong>
                        <span>{item.percent}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="stats-col">
              <div className="dashboard-section-head">
                <h2>Category Wise Grievances</h2>
                <button type="button" className="text-link-btn">
                  View All
                </button>
              </div>

              <div className="category-chart">
                {categoryStats.map((item) => (
                  <div key={item.label} className="category-row">
                    <span className="category-name">{item.label}</span>
                    <div className="category-bar-track">
                      <span className="category-bar-fill" style={{ width: `${(item.value / 6) * 100}%` }}></span>
                    </div>
                    <strong className="category-value">{item.value}</strong>
                  </div>
                ))}

                <div className="category-axis">
                  {[0, 1, 2, 3, 4, 5, 6].map((tick) => (
                    <span key={tick}>{tick}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className="dashboard-card help-card">
          <div className="help-icon-wrap">
            <i className="fa-solid fa-headset"></i>
          </div>
          <div className="help-copy">
            <h2>Need Help?</h2>
            <p>Facing an issue or need assistance? Our support team is here to help you.</p>
          </div>
          <button type="button" className="dashboard-primary-btn full-width">
            <span>Contact Support</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </article>
      </section> */}
    </div>
  );
};

export default Dashboard;
