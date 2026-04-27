import React, { useEffect, useMemo, useState } from 'react';
import '../styles/admin/Dashboard.css';
import {
  FiAlertTriangle,
  FiArrowUpRight,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiFolderPlus,
  FiPlusCircle,
  FiRefreshCw,
  FiSettings,
  FiTrendingUp,
  FiUserPlus,
  FiUsers,
} from 'react-icons/fi';

const stats = [
  {
    label: 'Total Grievances',
    value: '1,248',
    trend: '12.5%',
    trendLabel: 'from last 7 days',
    trendTone: 'blue',
    icon: FiFileText,
    accent: 'blue',
  },
  {
    label: 'Pending',
    value: '326',
    trend: '8.3%',
    trendLabel: 'from last 7 days',
    trendTone: 'amber',
    icon: FiClock,
    accent: 'amber',
  },
  {
    label: 'In Progress',
    value: '412',
    trend: '5.7%',
    trendLabel: 'from last 7 days',
    trendTone: 'blue',
    icon: FiRefreshCw,
    accent: 'blue',
  },
  {
    label: 'Resolved',
    value: '482',
    trend: '18.6%',
    trendLabel: 'from last 7 days',
    trendTone: 'green',
    icon: FiCheckCircle,
    accent: 'green',
  },
  {
    label: 'Escalated',
    value: '28',
    trend: '27.3%',
    trendLabel: 'from last 7 days',
    trendTone: 'red',
    icon: FiAlertTriangle,
    accent: 'red',
  },
];

const chartSeries = [
  { name: 'Total', color: '#2563eb', values: [240, 300, 292, 318, 297, 334, 358] },
  { name: 'Pending', color: '#f59e0b', values: [156, 178, 169, 201, 175, 198, 221] },
  { name: 'In Progress', color: '#06b6d4', values: [95, 112, 104, 118, 111, 128, 117] },
  { name: 'Resolved', color: '#22c55e', values: [62, 83, 79, 92, 98, 116, 138] },
  { name: 'Escalated', color: '#fb7185', values: [38, 41, 49, 61, 68, 72, 53] },
];

const chartLabels = ['May 14', 'May 15', 'May 16', 'May 17', 'May 18', 'May 19', 'May 20'];

const alerts = [
  {
    title: '12 grievances breached SLA',
    detail: 'Require immediate attention',
    time: '10:15 AM',
    tone: 'red',
    icon: FiAlertTriangle,
  },
  {
    title: '8 grievances due in next 24 hours',
    detail: 'Approaching SLA deadline',
    time: '09:30 AM',
    tone: 'amber',
    icon: FiClock,
  },
  {
    title: 'New grievance received',
    detail: 'GRV-1250 · Hostel · Water Supply',
    time: '09:10 AM',
    tone: 'blue',
    icon: FiUsers,
  },
  {
    title: 'Grievance escalated',
    detail: 'GRV-1245 escalated by student',
    time: 'Yesterday',
    tone: 'purple',
    icon: FiTrendingUp,
  },
];

const recentGrievances = [
  {
    id: 'GRV-1250',
    student: 'Rahul Sharma',
    category: 'Hostel',
    subCategory: 'Water Supply',
    assignedTo: 'Maintenance Dept.',
    priority: 'High',
    priorityTone: 'red',
    status: 'Pending',
    statusTone: 'amber',
  },
  {
    id: 'GRV-1249',
    student: 'Priya Patel',
    category: 'Academics',
    subCategory: 'Exam Related',
    assignedTo: 'Exam Cell',
    priority: 'Medium',
    priorityTone: 'amber',
    status: 'In Progress',
    statusTone: 'blue',
  },
  {
    id: 'GRV-1248',
    student: 'Aman Verma',
    category: 'Transport',
    subCategory: 'Bus Pass',
    assignedTo: 'Transport Officer',
    priority: 'Low',
    priorityTone: 'green',
    status: 'Pending',
    statusTone: 'amber',
  },
  {
    id: 'GRV-1247',
    student: 'Sneha Reddy',
    category: 'Hostel',
    subCategory: 'Room Issue',
    assignedTo: 'Hostel Warden',
    priority: 'High',
    priorityTone: 'red',
    status: 'In Progress',
    statusTone: 'blue',
  },
  {
    id: 'GRV-1246',
    student: 'Vikram Singh',
    category: 'Finance',
    subCategory: 'Fee Refund',
    assignedTo: 'Accounts Dept.',
    priority: 'Medium',
    priorityTone: 'amber',
    status: 'Resolved',
    statusTone: 'green',
  },
];

const quickActions = [
  { label: 'Add New User', icon: FiUserPlus, tone: 'blue' },
  { label: 'Add Category', icon: FiFolderPlus, tone: 'green' },
  { label: 'Configure Rules', icon: FiSettings, tone: 'purple' },
  { label: 'View All Grievances', icon: FiFileText, tone: 'blue' },
  { label: 'SLA Settings', icon: FiClock, tone: 'amber' },
  { label: 'Generate Report', icon: FiPlusCircle, tone: 'cyan' },
];

const chartHeight = 250;
const chartWidth = 720;
const chartPaddingX = 28;
const chartPaddingTop = 24;
const chartPaddingBottom = 34;
const maxValue = 400;
const DASHBOARD_DATE_STORAGE_KEY = 'grievance-portal-selected-date';

const formatLongDate = (value) => {
  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return 'May 20, 2025';
  }

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const getPoints = (values) =>
  values
    .map((value, index) => {
      const x =
        chartPaddingX + (index * (chartWidth - chartPaddingX * 2)) / (values.length - 1);
      const y =
        chartPaddingTop +
        ((maxValue - value) / maxValue) * (chartHeight - chartPaddingTop - chartPaddingBottom);
      return `${x},${y}`;
    })
    .join(' ');

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(() => {
    if (typeof window === 'undefined') {
      return '2025-05-20';
    }

    return window.localStorage.getItem(DASHBOARD_DATE_STORAGE_KEY) || '2025-05-20';
  });
  const longDate = useMemo(() => formatLongDate(selectedDate), [selectedDate]);

  useEffect(() => {
    const handleDateChange = (event) => {
      if (event.detail?.value) {
        setSelectedDate(event.detail.value);
      }
    };

    window.addEventListener('grievance-dashboard-date-change', handleDateChange);
    return () => window.removeEventListener('grievance-dashboard-date-change', handleDateChange);
  }, []);

  return (
    <div className="admin-overview-page">
      <section className="admin-overview-hero">
        <div className="admin-overview-copy">
          <h1>Welcome back, Admin!</h1>
          <p>Here&apos;s what&apos;s happening with grievances today.</p>
        </div>

        <button type="button" className="admin-date-chip">
          <FiCalendar />
          <span>{longDate}</span>
          <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
        </button>
      </section>

      <section className="admin-kpi-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article key={stat.label} className="admin-kpi-card">
              <div className={`admin-kpi-icon tone-${stat.accent}`}>
                <Icon />
              </div>
              <div className="admin-kpi-content">
                <p>{stat.label}</p>
                <strong>{stat.value}</strong>
                <div className={`admin-kpi-trend tone-${stat.trendTone}`}>
                  <FiArrowUpRight />
                  <span>{stat.trend}</span>
                  <small>{stat.trendLabel}</small>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="admin-overview-grid">
        <article className="admin-panel admin-chart-panel">
          <div className="admin-panel-head">
            <div>
              <h2>Grievance Overview</h2>
            </div>
            <button type="button" className="admin-ghost-select">
              <span>This Week</span>
              <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
            </button>
          </div>

          <div className="admin-chart-legend">
            {chartSeries.map((series) => (
              <div key={series.name} className="admin-legend-item">
                <span className="admin-legend-dot" style={{ backgroundColor: series.color }}></span>
                <span>{series.name}</span>
              </div>
            ))}
          </div>

          <div className="admin-chart-wrap">
            <div className="admin-chart-ylabels">
              {[400, 300, 200, 100, 0].map((value) => (
                <span key={value}>{value}</span>
              ))}
            </div>

            <div className="admin-chart-stage">
              <div className="admin-chart-grid">
                {[0, 1, 2, 3, 4].map((row) => (
                  <span key={row}></span>
                ))}
              </div>

              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="admin-line-chart" aria-hidden="true">
                {chartSeries.map((series) => (
                  <g key={series.name}>
                    <polyline
                      fill="none"
                      stroke={series.color}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={getPoints(series.values)}
                    />
                    {series.values.map((value, index) => {
                      const x =
                        chartPaddingX +
                        (index * (chartWidth - chartPaddingX * 2)) / (series.values.length - 1);
                      const y =
                        chartPaddingTop +
                        ((maxValue - value) / maxValue) *
                          (chartHeight - chartPaddingTop - chartPaddingBottom);

                      return (
                        <circle
                          key={`${series.name}-${chartLabels[index]}`}
                          cx={x}
                          cy={y}
                          r="4.5"
                          fill={series.color}
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                      );
                    })}
                  </g>
                ))}
              </svg>

              <div className="admin-chart-xlabels">
                {chartLabels.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            </div>
          </div>
        </article>

        <article className="admin-panel admin-alerts-panel">
          <div className="admin-panel-head">
            <h2>Alerts &amp; Notifications</h2>
            <button type="button" className="admin-link-btn">
              View All
            </button>
          </div>

          <div className="admin-alert-list">
            {alerts.map((alert) => {
              const Icon = alert.icon;
              return (
                <div key={`${alert.title}-${alert.time}`} className="admin-alert-item">
                  <div className={`admin-alert-icon tone-${alert.tone}`}>
                    <Icon />
                  </div>
                  <div className="admin-alert-copy">
                    <strong>{alert.title}</strong>
                    <p>{alert.detail}</p>
                  </div>
                  <span className="admin-alert-time">{alert.time}</span>
                </div>
              );
            })}
          </div>
        </article>
      </section>

      <section className="admin-overview-grid admin-overview-grid-bottom">
        <article className="admin-panel admin-table-panel">
          <div className="admin-panel-head">
            <h2>Recent Grievances</h2>
            <button type="button" className="admin-link-btn">
              View All
            </button>
          </div>

          <div className="admin-table-scroll">
            <table className="admin-recent-table">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Student Name</th>
                  <th>Category</th>
                  <th>Sub-category</th>
                  <th>Assigned To</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentGrievances.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <a href={`/admin/grievances/${item.id.toLowerCase()}`} className="admin-ticket-link">
                        {item.id}
                      </a>
                    </td>
                    <td>{item.student}</td>
                    <td>{item.category}</td>
                    <td>{item.subCategory}</td>
                    <td>{item.assignedTo}</td>
                    <td>
                      <span className={`admin-pill tone-${item.priorityTone}`}>{item.priority}</span>
                    </td>
                    <td>
                      <span className={`admin-pill tone-${item.statusTone} subtle`}>{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="admin-panel admin-actions-panel">
          <div className="admin-panel-head">
            <h2>Quick Actions</h2>
          </div>

          <div className="admin-action-grid">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button key={action.label} type="button" className={`admin-action-card tone-${action.tone}`}>
                  <div className="admin-action-icon">
                    <Icon />
                  </div>
                  <span>{action.label}</span>
                </button>
              );
            })}
          </div>
        </article>
      </section>
    </div>
  );
};

export default Dashboard;
