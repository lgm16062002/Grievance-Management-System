import React, { useMemo, useState } from 'react';
import '../styles/admin/Dashboard.css';
import '../styles/admin/ManageGrievances.css';

const grievanceRows = [
  {
    id: 'GRV-1250',
    student: 'Rahul Sharma',
    category: 'Hostel',
    subCategory: 'Water Supply',
    priority: 'High',
    status: 'Pending',
    assignedTo: { name: 'Maintenance Dept.', subtitle: '(Unassigned)', avatar: 'MD', tone: 'slate' },
    submittedOn: 'May 20, 2025\n10:15 AM',
  },
  {
    id: 'GRV-1249',
    student: 'Priya Patel',
    category: 'Academics',
    subCategory: 'Exam Related',
    priority: 'Medium',
    status: 'In Progress',
    assignedTo: { name: 'Dr. Anil Verma', subtitle: 'Exam Cell', avatar: 'AV', tone: 'purple' },
    submittedOn: 'May 20, 2025\n09:45 AM',
  },
  {
    id: 'GRV-1248',
    student: 'Aman Verma',
    category: 'Transport',
    subCategory: 'Bus Pass',
    priority: 'Low',
    status: 'Pending',
    assignedTo: { name: 'Transport Officer', subtitle: 'Mr. Suresh Kumar', avatar: 'SK', tone: 'cyan' },
    submittedOn: 'May 20, 2025\n09:30 AM',
  },
  {
    id: 'GRV-1247',
    student: 'Sneha Reddy',
    category: 'Hostel',
    subCategory: 'Room Issue',
    priority: 'High',
    status: 'In Progress',
    assignedTo: { name: 'Hostel Warden', subtitle: 'Ms. Kavita Singh', avatar: 'KS', tone: 'pink' },
    submittedOn: 'May 20, 2025\n09:10 AM',
  },
  {
    id: 'GRV-1246',
    student: 'Vikram Singh',
    category: 'Finance',
    subCategory: 'Fee Refund',
    priority: 'Medium',
    status: 'Resolved',
    assignedTo: { name: 'Accounts Dept.', subtitle: 'Mr. Rajiv Mehta', avatar: 'RM', tone: 'amber' },
    submittedOn: 'May 20, 2025\n08:40 AM',
  },
  {
    id: 'GRV-1245',
    student: 'Neha Kumari',
    category: 'Library',
    subCategory: 'Book Issue',
    priority: 'Low',
    status: 'Pending',
    assignedTo: { name: 'Library Incharge', subtitle: 'Mr. Pankaj Joshi', avatar: 'PJ', tone: 'green' },
    submittedOn: 'May 20, 2025\n08:20 AM',
  },
  {
    id: 'GRV-1244',
    student: 'Arjun Nair',
    category: 'IT Services',
    subCategory: 'Wi-Fi Issue',
    priority: 'Medium',
    status: 'In Progress',
    assignedTo: { name: 'IT Support', subtitle: 'Mr. Rohit Yadav', avatar: 'RY', tone: 'red' },
    submittedOn: 'May 20, 2025\n08:05 AM',
  },
  {
    id: 'GRV-1243',
    student: 'Pooja Mehta',
    category: 'Campus',
    subCategory: 'Cleanliness',
    priority: 'Low',
    status: 'Resolved',
    assignedTo: { name: 'Housekeeping Dept.', subtitle: 'Mr. Mahesh Patil', avatar: 'MP', tone: 'slate' },
    submittedOn: 'May 20, 2025\n07:50 AM',
  },
];

const statusTabs = [
  { key: 'All', label: 'All Grievances' },
  { key: 'Pending', label: 'Pending' },
  { key: 'In Progress', label: 'In Progress' },
  { key: 'Resolved', label: 'Resolved' },
  { key: 'Escalated', label: 'Escalated' },
];

const getPriorityTone = (priority) => {
  if (priority === 'High') return 'danger';
  if (priority === 'Medium') return 'warning';
  return 'success';
};

const getStatusTone = (status) => {
  if (status === 'Pending') return 'pending';
  if (status === 'In Progress') return 'progress';
  if (status === 'Resolved') return 'resolved';
  return 'neutral';
};

const ManageGrievances = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [category, setCategory] = useState('All Categories');
  const [subCategory, setSubCategory] = useState('All Sub-categories');
  const [priority, setPriority] = useState('All Priorities');
  const [dateRange, setDateRange] = useState('May 14, 2025 - May 20, 2025');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filtered = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return grievanceRows.filter((row) => {
      const matchesSearch =
        !normalizedSearch ||
        row.id.toLowerCase().includes(normalizedSearch) ||
        row.student.toLowerCase().includes(normalizedSearch) ||
        row.category.toLowerCase().includes(normalizedSearch) ||
        row.subCategory.toLowerCase().includes(normalizedSearch);
      const matchesStatus = status === 'All' || row.status === status;
      const matchesCategory = category === 'All Categories' || row.category === category;
      const matchesSubCategory = subCategory === 'All Sub-categories' || row.subCategory === subCategory;
      const matchesPriority = priority === 'All Priorities' || row.priority === priority;
      return matchesSearch && matchesStatus && matchesCategory && matchesSubCategory && matchesPriority;
    });
  }, [search, status, category, subCategory, priority]);

  const tabCounts = useMemo(() => {
    const counts = { All: grievanceRows.length };
    grievanceRows.forEach((row) => {
      counts[row.status] = (counts[row.status] || 0) + 1;
    });
    counts.Escalated = counts.Escalated || 0;
    return counts;
  }, []);

  const effectivePage = Math.min(page, Math.max(1, Math.ceil(filtered.length / rowsPerPage) || 1));
  const startIndex = (effectivePage - 1) * rowsPerPage;
  const endIndex = Math.min(filtered.length, startIndex + rowsPerPage);
  const paged = filtered.slice(startIndex, endIndex);

  const clearFilters = () => {
    setSearch('');
    setStatus('All');
    setCategory('All Categories');
    setSubCategory('All Sub-categories');
    setPriority('All Priorities');
    setDateRange('May 14, 2025 - May 20, 2025');
    setPage(1);
  };

  const setTab = (key) => {
    setStatus(key);
    setPage(1);
  };

  return (
    <div className="mg-page">
      <div className="mg-hero">
        <div className="mg-hero-copy">
          <h1 className="mg-title">Manage Grievances</h1>
          <p className="mg-subtitle">View, filter, assign and track all grievances across the system.</p>
        </div>

        <div className="mg-hero-actions">
          <button className="mg-btn mg-btn-primary" type="button">
            <i className="fa-solid fa-plus" />
            New Grievance
          </button>
          <button className="mg-btn mg-btn-ghost" type="button">
            <i className="fa-solid fa-download" />
            Export
          </button>
          <button className="mg-btn mg-btn-ghost" type="button">
            <i className="fa-solid fa-filter" />
            Filters
          </button>
        </div>
      </div>

      <section className="mg-panel">
        <div className="mg-filterbar">
          <div className="mg-filter mg-filter-search">
            <i className="fa-solid fa-magnifying-glass" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              type="text"
              placeholder="Search by Ticket ID, student name, category, sub-category..."
            />
            <span className="mg-key">Ctrl K</span>
          </div>

          <div className="mg-filter-grid">
            <label className="mg-filter">
              <span>Date Range</span>
              <div className="mg-filter-control">
                <i className="fa-regular fa-calendar" />
                <input value={dateRange} onChange={(e) => setDateRange(e.target.value)} type="text" />
                <i className="fa-regular fa-calendar-days" />
              </div>
            </label>

            <label className="mg-filter">
              <span>Status</span>
              <select value={status} onChange={(e) => setTab(e.target.value)}>
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </label>

            <label className="mg-filter">
              <span>Category</span>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>All Categories</option>
                <option>Hostel</option>
                <option>Academics</option>
                <option>Transport</option>
                <option>Finance</option>
                <option>Library</option>
                <option>IT Services</option>
                <option>Campus</option>
              </select>
            </label>

            <label className="mg-filter">
              <span>Sub-category</span>
              <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
                <option>All Sub-categories</option>
                <option>Water Supply</option>
                <option>Exam Related</option>
                <option>Bus Pass</option>
                <option>Room Issue</option>
                <option>Fee Refund</option>
                <option>Book Issue</option>
                <option>Wi-Fi Issue</option>
                <option>Cleanliness</option>
              </select>
            </label>

            <label className="mg-filter">
              <span>Priority</span>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option>All Priorities</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </label>

            <button className="mg-link" type="button" onClick={clearFilters}>
              <i className="fa-solid fa-rotate-right" />
              Clear Filters
            </button>
          </div>
        </div>

        <div className="mg-tabs">
          {statusTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`mg-tab ${status === tab.key ? 'active' : ''}`}
              onClick={() => setTab(tab.key)}
            >
              {tab.label} <span className="mg-tab-count">({tabCounts[tab.key] ?? 0})</span>
            </button>
          ))}
        </div>

        <div className="mg-table-wrap">
          <table className="mg-table">
            <thead>
              <tr>
                <th className="mg-col-check">
                  <input type="checkbox" aria-label="Select all" />
                </th>
                <th>Ticket ID</th>
                <th>Student</th>
                <th>Category</th>
                <th>Sub-category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Submitted On</th>
                <th className="mg-col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={10} className="mg-empty">
                    No grievances found matching your filters.
                  </td>
                </tr>
              ) : (
                paged.map((row) => (
                  <tr key={row.id}>
                    <td className="mg-col-check">
                      <input type="checkbox" aria-label={`Select ${row.id}`} />
                    </td>
                    <td>
                      <span className="mg-ticket">{row.id}</span>
                    </td>
                    <td>{row.student}</td>
                    <td>{row.category}</td>
                    <td>{row.subCategory}</td>
                    <td>
                      <span className={`mg-badge mg-badge-${getPriorityTone(row.priority)}`}>{row.priority}</span>
                    </td>
                    <td>
                      <span className={`mg-badge mg-status-${getStatusTone(row.status)}`}>{row.status}</span>
                    </td>
                    <td>
                      <div className="mg-assignee">
                        <div className={`mg-avatar mg-avatar-${row.assignedTo.tone}`}>{row.assignedTo.avatar}</div>
                        <div className="mg-assignee-copy">
                          <div className="mg-assignee-name">{row.assignedTo.name}</div>
                          <div className="mg-assignee-sub">{row.assignedTo.subtitle}</div>
                        </div>
                      </div>
                    </td>
                    <td className="mg-date">
                      {row.submittedOn.split('\n').map((line, idx) => (
                        <span key={idx}>
                          {line}
                          {idx === 0 && <br />}
                        </span>
                      ))}
                    </td>
                    <td className="mg-col-actions">
                      <button className="mg-icon-btn" type="button" aria-label="View">
                        <i className="fa-regular fa-eye" />
                      </button>
                      <button className="mg-icon-btn" type="button" aria-label="More">
                        <i className="fa-solid fa-ellipsis-vertical" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mg-footer">
          <div className="mg-results">Showing {filtered.length === 0 ? 0 : startIndex + 1} to {endIndex} of {filtered.length} entries</div>

          <div className="mg-pagination">
            <button
              type="button"
              className="mg-page-btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={effectivePage <= 1}
              aria-label="Previous"
            >
              <i className="fa-solid fa-chevron-left" />
            </button>

            <button type="button" className="mg-page-btn mg-page-active">
              {effectivePage}
            </button>

            <button
              type="button"
              className="mg-page-btn"
              onClick={() =>
                setPage((p) => {
                  const max = Math.max(1, Math.ceil(filtered.length / rowsPerPage) || 1);
                  return Math.min(max, p + 1);
                })
              }
              disabled={effectivePage >= Math.ceil(filtered.length / rowsPerPage) || filtered.length === 0}
              aria-label="Next"
            >
              <i className="fa-solid fa-chevron-right" />
            </button>
          </div>

          <div className="mg-rows">
            <span>Rows per page</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManageGrievances;
