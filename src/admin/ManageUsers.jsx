import React, { useMemo, useState } from 'react';
import '../styles/admin/Dashboard.css';
import '../styles/admin/ManageUsers.css';

const userRows = [
  {
    id: 'USR-1001',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@uni.edu',
    role: 'Student',
    department: 'Computer Science',
    status: 'Active',
    joinedOn: 'May 20, 2025',
    avatar: 'RS',
    tone: 'purple',
  },
  {
    id: 'USR-1002',
    name: 'Priya Desai',
    email: 'priya.desai@uni.edu',
    role: 'Student',
    department: 'Electrical Engineering',
    status: 'Active',
    joinedOn: 'May 18, 2025',
    avatar: 'PD',
    tone: 'green',
  },
  {
    id: 'USR-1003',
    name: 'Dr. Anil Verma',
    email: 'anil.verma@uni.edu',
    role: 'HOD',
    department: 'Mechanical Engineering',
    status: 'Active',
    joinedOn: 'Jan 10, 2024',
    avatar: 'AV',
    tone: 'amber',
  },
  {
    id: 'USR-1004',
    name: 'Mr. Suresh Kumar',
    email: 'suresh.kumar@uni.edu',
    role: 'Staff',
    department: 'Maintenance',
    status: 'Active',
    joinedOn: 'Feb 15, 2024',
    avatar: 'SK',
    tone: 'blue',
  },
  {
    id: 'USR-1005',
    name: 'Ms. Kavita Singh',
    email: 'kavita.singh@uni.edu',
    role: 'Staff',
    department: 'Hostel Management',
    status: 'Active',
    joinedOn: 'Mar 12, 2024',
    avatar: 'KS',
    tone: 'purple',
  },
  {
    id: 'USR-1006',
    name: 'Rohit Patel',
    email: 'rohit.patel@uni.edu',
    role: 'Student',
    department: 'Civil Engineering',
    status: 'Inactive',
    joinedOn: 'Apr 05, 2025',
    avatar: 'RP',
    tone: 'green',
  },
  {
    id: 'USR-1007',
    name: 'Dr. Meena Joshi',
    email: 'meena.joshi@uni.edu',
    role: 'HOD',
    department: 'Science',
    status: 'Active',
    joinedOn: 'Dec 20, 2023',
    avatar: 'MJ',
    tone: 'amber',
  },
  {
    id: 'USR-1008',
    name: 'Amit Bhardwaj',
    email: 'amit.bhardwaj@uni.edu',
    role: 'Staff',
    department: 'Accounts',
    status: 'Active',
    joinedOn: 'Jan 25, 2025',
    avatar: 'AB',
    tone: 'blue',
  },
];

const tabs = [
  { key: 'All', label: 'All Users' },
  { key: 'Student', label: 'Students' },
  { key: 'HOD', label: 'HODs' },
  { key: 'Staff', label: 'Staff' },
  { key: 'Inactive', label: 'Inactive Users' },
];

const formatCount = (n) => n.toLocaleString();

const ManageUsers = () => {
  const [role, setRole] = useState('All Roles');
  const [department, setDepartment] = useState('All Departments');
  const [status, setStatus] = useState('All Status');
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserFormData, setNewUserFormData] = useState({
    name: '',
    email: '',
    role: 'Student',
    password: '',
  });

  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    setIsAddUserModalOpen(false);
    setNewUserFormData({ name: '', email: '', role: 'Student', password: '' });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return userRows.filter((u) => {
      const matchesQuery =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) ||
        u.department.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q);

      const matchesRole = role === 'All Roles' || u.role === role;
      const matchesDept = department === 'All Departments' || u.department === department;
      const matchesStatus = status === 'All Status' || u.status === status;

      const matchesTab =
        activeTab === 'All' ||
        (activeTab === 'Inactive' ? u.status === 'Inactive' : u.role === activeTab);

      return matchesQuery && matchesRole && matchesDept && matchesStatus && matchesTab;
    });
  }, [query, role, department, status, activeTab]);

  const counts = useMemo(() => {
    const base = {
      All: userRows.length,
      Student: 0,
      HOD: 0,
      Staff: 0,
      Inactive: 0,
    };
    userRows.forEach((u) => {
      base[u.role] = (base[u.role] || 0) + 1;
      if (u.status === 'Inactive') base.Inactive += 1;
    });
    return base;
  }, []);

  const kpis = useMemo(() => {
    return [
      { label: 'Total Users', value: counts.All, tone: 'blue', icon: 'fa-regular fa-user' },
      { label: 'Students', value: counts.Student, tone: 'green', icon: 'fa-solid fa-graduation-cap' },
      { label: 'HODs', value: counts.HOD, tone: 'purple', icon: 'fa-solid fa-user-tie' },
      { label: 'Staff', value: counts.Staff, tone: 'amber', icon: 'fa-solid fa-users' },
    ];
  }, [counts]);

  const maxPage = Math.max(1, Math.ceil(filtered.length / rowsPerPage) || 1);
  const effectivePage = Math.min(page, maxPage);
  const startIndex = (effectivePage - 1) * rowsPerPage;
  const endIndex = Math.min(filtered.length, startIndex + rowsPerPage);
  const paged = filtered.slice(startIndex, endIndex);

  const clearFilters = () => {
    setRole('All Roles');
    setDepartment('All Departments');
    setStatus('All Status');
    setQuery('');
    setActiveTab('All');
    setPage(1);
  };

  const setTab = (key) => {
    setActiveTab(key);
    setPage(1);
  };

  return (
    <div className="mu-page">
      <div className="mu-hero">
        <div>
          <h1 className="mu-title">Manage Users</h1>
          <p className="mu-subtitle">Create, view, edit and manage all users in the system.</p>
        </div>

        <div className="mu-actions">
          <button type="button" className="mu-btn mu-btn-primary" onClick={() => setIsAddUserModalOpen(true)}>
            <i className="fa-solid fa-plus" />
            Add User
          </button>
          <button type="button" className="mu-btn">
            <i className="fa-solid fa-upload" />
            Import Users
          </button>
          <button type="button" className="mu-btn">
            <i className="fa-solid fa-download" />
            Export
          </button>
        </div>
      </div>

      <div className="mu-kpis">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="mu-kpi">
            <div className={`mu-kpi-icon mu-tone-${kpi.tone}`}>
              <i className={kpi.icon} />
            </div>
            <div className="mu-kpi-copy">
              <p className="mu-kpi-label">{kpi.label}</p>
              <div className="mu-kpi-value">{formatCount(kpi.value)}</div>
              <div className="mu-kpi-trend">
                <span>↗</span> 12.5% <span style={{ color: '#64748b', fontWeight: 700 }}>from last 30 days</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="mu-panel">
        <div className="mu-filters">
          <div className="mu-filter">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option>All Roles</option>
              <option>Student</option>
              <option>HOD</option>
              <option>Staff</option>
            </select>
          </div>

          <div className="mu-filter">
            <label>Department</label>
            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option>All Departments</option>
              <option>Computer Science</option>
              <option>Electrical Engineering</option>
              <option>Mechanical Engineering</option>
              <option>Maintenance</option>
              <option>Hostel Management</option>
              <option>Civil Engineering</option>
              <option>Science</option>
              <option>Accounts</option>
            </select>
          </div>

          <div className="mu-filter">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="mu-search">
            <i className="fa-solid fa-magnifying-glass" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              type="text"
              placeholder="Search users..."
            />
          </div>

          <button type="button" className="mu-filter-btn">
            <i className="fa-solid fa-filter" />
            Filters
          </button>

          <button type="button" className="mu-clear" onClick={clearFilters}>
            <i className="fa-solid fa-rotate-right" />
            Clear Filters
          </button>
        </div>

        <div className="mu-tabs">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              className={`mu-tab ${activeTab === t.key ? 'active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              {t.label} ({formatCount(counts[t.key])})
            </button>
          ))}
        </div>

        <div className="mu-table-wrap">
          <table className="mu-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Joined On</th>
                <th className="mu-actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '40px 16px', color: '#64748b', fontWeight: 700 }}>
                    No users found matching your filters.
                  </td>
                </tr>
              ) : (
                paged.map((u) => (
                  <tr key={u.id}>
                    <td style={{ fontWeight: 700, color: '#0f172a' }}>{u.id}</td>
                    <td>
                      <div className="mu-user">
                        <div className={`mu-avatar mu-avatar-${u.tone}`}>{u.avatar}</div>
                        <span style={{ fontWeight: 700 }}>{u.name}</span>
                      </div>
                    </td>
                    <td style={{ color: '#475569', fontWeight: 700 }}>{u.email}</td>
                    <td>
                      <span
                        className={`mu-pill ${{
                          Student: 'mu-pill-student',
                          HOD: 'mu-pill-hod',
                          Staff: 'mu-pill-staff',
                        }[u.role]}`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700 }}>{u.department}</td>
                    <td>
                      <span className={`mu-pill ${u.status === 'Active' ? 'mu-pill-active' : 'mu-pill-inactive'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td style={{ color: '#475569', fontWeight: 700 }}>{u.joinedOn}</td>
                    <td className="mu-actions-col">
                      <button className="mu-icon-btn" type="button" aria-label="View">
                        <i className="fa-regular fa-eye" />
                      </button>
                      <button className="mu-icon-btn" type="button" aria-label="Edit">
                        <i className="fa-regular fa-pen-to-square" />
                      </button>
                      <button className="mu-icon-btn" type="button" aria-label="More">
                        <i className="fa-solid fa-ellipsis-vertical" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mu-footer">
          <div className="mu-results">
            Showing {filtered.length === 0 ? 0 : startIndex + 1} to {endIndex} of {formatCount(filtered.length)} entries
          </div>

          <div className="mu-pagination">
            <button
              type="button"
              className="mu-page-btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={effectivePage <= 1}
              aria-label="Previous"
            >
              <i className="fa-solid fa-chevron-left" />
            </button>

            <button type="button" className="mu-page-btn mu-page-active">
              {effectivePage}
            </button>

            <button
              type="button"
              className="mu-page-btn"
              onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
              disabled={effectivePage >= maxPage}
              aria-label="Next"
            >
              <i className="fa-solid fa-chevron-right" />
            </button>
          </div>

          <div className="mu-rows">
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

      {isAddUserModalOpen && (
        <div className="mu-modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }}>
          <div className="mu-modal-content dashboard-card" style={{ width: '100%', maxWidth: '420px', padding: '28px', position: 'relative', margin: '16px' }}>
            <button 
              onClick={() => setIsAddUserModalOpen(false)} 
              style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', fontSize: '1.2rem', color: '#64748b', cursor: 'pointer' }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <h2 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '8px', fontWeight: 700 }}>Add New User</h2>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '24px' }}>Enter details to create a new user account.</p>
            
            <form onSubmit={handleAddUserSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>Name</label>
                <input 
                  type="text" 
                  required
                  value={newUserFormData.name}
                  onChange={(e) => setNewUserFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name" 
                  style={{ padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>Email Address</label>
                <input 
                  type="email" 
                  required
                  value={newUserFormData.email}
                  onChange={(e) => setNewUserFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email address" 
                  style={{ padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>Role</label>
                <select 
                  value={newUserFormData.role}
                  onChange={(e) => setNewUserFormData(prev => ({ ...prev, role: e.target.value }))}
                  style={{ padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.85rem', outline: 'none', background: '#fff' }}
                >
                  <option value="Student">Student</option>
                  <option value="HOD">HOD</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>Password</label>
                <input 
                  type="password" 
                  required
                  value={newUserFormData.password}
                  onChange={(e) => setNewUserFormData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter password" 
                  style={{ padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setIsAddUserModalOpen(false)} style={{ padding: '10px 16px', background: 'transparent', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#475569', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 20px', background: 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 8px 20px rgba(37, 99, 235, 0.18)' }}>Create User</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
