import React, { useMemo, useState } from 'react';
import '../styles/admin/Dashboard.css';
import '../styles/admin/AssignmentRules.css';

const seedRules = [
  {
    id: 'rule-1',
    category: { name: 'Hostel', icon: 'fa-solid fa-house', tone: 'purple' },
    subCategory: 'Room Issue',
    assignedTo: { name: 'Hostel Warden', subtitle: 'Ms. Kavita Singh', avatar: 'HK', tone: 'purple' },
    priority: 'High',
    status: 'Active',
  },
  {
    id: 'rule-2',
    category: { name: 'Academics', icon: 'fa-solid fa-graduation-cap', tone: 'blue' },
    subCategory: 'Exam Related',
    assignedTo: { name: 'Exam Cell', subtitle: 'Dr. Anil Verma', avatar: 'AV', tone: 'blue' },
    priority: 'Medium',
    status: 'Active',
  },
  {
    id: 'rule-3',
    category: { name: 'Transport', icon: 'fa-solid fa-bus', tone: 'amber' },
    subCategory: 'Bus Pass',
    assignedTo: { name: 'Transport Officer', subtitle: 'Mr. Suresh Kumar', avatar: 'SK', tone: 'amber' },
    priority: 'Low',
    status: 'Active',
  },
  {
    id: 'rule-4',
    category: { name: 'Finance', icon: 'fa-solid fa-indian-rupee-sign', tone: 'green' },
    subCategory: 'Fee Refund',
    assignedTo: { name: 'Accounts Dept.', subtitle: 'Mr. Rajiv Mehta', avatar: 'RM', tone: 'green' },
    priority: 'Medium',
    status: 'Active',
  },
  {
    id: 'rule-5',
    category: { name: 'Library', icon: 'fa-solid fa-book', tone: 'purple' },
    subCategory: 'Book Issue',
    assignedTo: { name: 'Library Incharge', subtitle: 'Mr. Pankaj Joshi', avatar: 'PJ', tone: 'purple' },
    priority: 'Low',
    status: 'Active',
  },
  {
    id: 'rule-6',
    category: { name: 'IT Services', icon: 'fa-solid fa-desktop', tone: 'cyan' },
    subCategory: 'Wi-Fi Issue',
    assignedTo: { name: 'IT Support', subtitle: 'Mr. Rohit Yadav', avatar: 'RY', tone: 'cyan' },
    priority: 'Medium',
    status: 'Active',
  },
  {
    id: 'rule-7',
    category: { name: 'Infrastructure', icon: 'fa-solid fa-building', tone: 'amber' },
    subCategory: 'Electrical Issue',
    assignedTo: { name: 'Maintenance Dept.', subtitle: 'Mr. Mahesh Patil', avatar: 'MP', tone: 'amber' },
    priority: 'High',
    status: 'Inactive',
  },
  {
    id: 'rule-8',
    category: { name: 'Other', icon: 'fa-regular fa-circle', tone: 'slate' },
    subCategory: 'Other Queries',
    assignedTo: { name: 'Admin Support', subtitle: 'Support Team', avatar: 'AS', tone: 'slate' },
    priority: 'Low',
    status: 'Active',
  },
];

const formatCount = (n) => n.toLocaleString();

const priorityClass = (priority) => {
  if (priority === 'High') return 'ar-pill-high';
  if (priority === 'Medium') return 'ar-pill-medium';
  return 'ar-pill-low';
};

const AssignmentRules = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [ruleStatus, setRuleStatus] = useState('All Status');
  const [assignee, setAssignee] = useState('All Assignees');
  const [selectedId, setSelectedId] = useState(seedRules[0]?.id);
  const [form, setForm] = useState({
    category: 'Hostel',
    subCategory: 'Room Issue',
    assignTo: 'Hostel Warden (Ms. Kavita Singh)',
    defaultPriority: 'High',
    active: true,
  });
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return seedRules.filter((r) => {
      const matchesQuery =
        !q ||
        r.category.name.toLowerCase().includes(q) ||
        r.subCategory.toLowerCase().includes(q) ||
        r.assignedTo.name.toLowerCase().includes(q) ||
        r.assignedTo.subtitle.toLowerCase().includes(q);
      const matchesCategory = category === 'All Categories' || r.category.name === category;
      const matchesStatus = ruleStatus === 'All Status' || r.status === ruleStatus;
      const matchesAssignee = assignee === 'All Assignees' || r.assignedTo.name === assignee;
      return matchesQuery && matchesCategory && matchesStatus && matchesAssignee;
    });
  }, [query, category, ruleStatus, assignee]);

  const counts = useMemo(() => {
    const total = 42;
    const active = 38;
    const inactive = 4;
    const unmapped = 7;
    return { total, active, inactive, unmapped };
  }, []);

  const maxPage = Math.max(1, Math.ceil(filtered.length / rowsPerPage) || 1);
  const effectivePage = Math.min(page, maxPage);
  const startIndex = (effectivePage - 1) * rowsPerPage;
  const endIndex = Math.min(filtered.length, startIndex + rowsPerPage);
  const paged = filtered.slice(startIndex, endIndex);

  const setSelectedRule = (id) => {
    setSelectedId(id);
    const rule = seedRules.find((r) => r.id === id);
    if (!rule) return;
    setForm({
      category: rule.category.name,
      subCategory: rule.subCategory,
      assignTo: `${rule.assignedTo.name} (${rule.assignedTo.subtitle})`,
      defaultPriority: rule.priority,
      active: rule.status === 'Active',
    });
  };

  return (
    <div className="ar-page">
      <div className="ar-search">
        <i className="fa-solid fa-magnifying-glass" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          type="text"
          placeholder="Search by category, sub-category or assignee..."
        />
        <span className="ar-key">Ctrl K</span>
      </div>

      <div className="ar-hero">
        <div>
          <h1 className="ar-title">Assignment Rules</h1>
          <p className="ar-subtitle">Map categories and sub-categories to the appropriate assignee with default priority.</p>
        </div>

        <div className="ar-actions">
          <button className="ar-btn ar-btn-primary" type="button">
            <i className="fa-solid fa-plus" />
            Add New Rule
          </button>
          <button className="ar-btn" type="button">
            <i className="fa-solid fa-download" />
            Export Rules
          </button>
        </div>
      </div>

      <div className="ar-kpis">
        <div className="ar-kpi">
          <div className="ar-kpi-icon ar-tone-blue">
            <i className="fa-solid fa-sitemap" />
          </div>
          <div>
            <p className="ar-kpi-label">Total Rules</p>
            <div className="ar-kpi-value">{formatCount(counts.total)}</div>
            <div className="ar-kpi-sub">Active mapping rules</div>
          </div>
        </div>
        <div className="ar-kpi">
          <div className="ar-kpi-icon ar-tone-green">
            <i className="fa-solid fa-circle-check" />
          </div>
          <div>
            <p className="ar-kpi-label">Active Rules</p>
            <div className="ar-kpi-value">{formatCount(counts.active)}</div>
            <div className="ar-kpi-sub">Currently active</div>
          </div>
        </div>
        <div className="ar-kpi">
          <div className="ar-kpi-icon ar-tone-amber">
            <i className="fa-solid fa-circle-pause" />
          </div>
          <div>
            <p className="ar-kpi-label">Inactive Rules</p>
            <div className="ar-kpi-value">{formatCount(counts.inactive)}</div>
            <div className="ar-kpi-sub">Temporarily disabled</div>
          </div>
        </div>
        <div className="ar-kpi">
          <div className="ar-kpi-icon ar-tone-purple">
            <i className="fa-solid fa-wand-magic-sparkles" />
          </div>
          <div>
            <p className="ar-kpi-label">Unmapped Items</p>
            <div className="ar-kpi-value">{formatCount(counts.unmapped)}</div>
            <div className="ar-kpi-sub">Need rule mapping</div>
          </div>
        </div>
      </div>

      <div className="ar-grid">
        <section className="ar-panel">
          <div className="ar-panel-head">
            <h3>All Assignment Rules ({formatCount(counts.total)})</h3>
          </div>

          <div className="ar-filter-row">
            <div className="ar-filter">
              <label> </label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>All Categories</option>
                <option>Hostel</option>
                <option>Academics</option>
                <option>Transport</option>
                <option>Finance</option>
                <option>Library</option>
                <option>IT Services</option>
                <option>Infrastructure</option>
                <option>Other</option>
              </select>
            </div>

            <div className="ar-filter">
              <label> </label>
              <select value={ruleStatus} onChange={(e) => setRuleStatus(e.target.value)}>
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="ar-filter">
              <label> </label>
              <select value={assignee} onChange={(e) => setAssignee(e.target.value)}>
                <option>All Assignees</option>
                <option>Hostel Warden</option>
                <option>Exam Cell</option>
                <option>Transport Officer</option>
                <option>Accounts Dept.</option>
                <option>Library Incharge</option>
                <option>IT Support</option>
                <option>Maintenance Dept.</option>
                <option>Admin Support</option>
              </select>
            </div>

            <div className="ar-inline-search">
              <i className="fa-solid fa-magnifying-glass" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                type="text"
                placeholder="Search rules..."
              />
            </div>
          </div>

          <div className="ar-table-wrap">
            <table className="ar-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Sub-category</th>
                  <th>Assigned To</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th className="ar-actions-col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setSelectedRule(r.id)}
                    style={{ cursor: 'pointer', background: r.id === selectedId ? '#f8fafc' : 'transparent' }}
                  >
                    <td>
                      <div className="ar-rule-cat">
                        <span className={`ar-cat-icon ar-tone-${r.category.tone}`}>
                          <i className={r.category.icon} />
                        </span>
                        {r.category.name}
                      </div>
                    </td>
                    <td style={{ fontWeight: 700 }}>{r.subCategory}</td>
                    <td>
                      <div className="ar-assignee">
                        <div className={`ar-avatar ar-tone-${r.assignedTo.tone}`}>{r.assignedTo.avatar}</div>
                        <div>
                          <div style={{ fontWeight: 700 }}>{r.assignedTo.name}</div>
                          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>{r.assignedTo.subtitle}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`ar-pill ${priorityClass(r.priority)}`}>{r.priority}</span>
                    </td>
                    <td>
                      <span className={`ar-pill ${r.status === 'Active' ? 'ar-pill-active' : 'ar-pill-inactive'}`}>{r.status}</span>
                    </td>
                    <td className="ar-actions-col">
                      <button className="ar-icon-btn" type="button" aria-label="Edit">
                        <i className="fa-regular fa-pen-to-square" />
                      </button>
                      <button className="ar-icon-btn" type="button" aria-label="More">
                        <i className="fa-solid fa-ellipsis-vertical" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="ar-footer">
            <div className="ar-results">Showing {filtered.length === 0 ? 0 : startIndex + 1} to {endIndex} of {formatCount(counts.total)} rules</div>
            <div className="ar-pagination">
              <button
                type="button"
                className="ar-page-btn"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={effectivePage <= 1}
                aria-label="Previous"
              >
                <i className="fa-solid fa-chevron-left" />
              </button>
              <button type="button" className="ar-page-btn ar-page-active">
                {effectivePage}
              </button>
              <button
                type="button"
                className="ar-page-btn"
                onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
                disabled={effectivePage >= maxPage}
                aria-label="Next"
              >
                <i className="fa-solid fa-chevron-right" />
              </button>
            </div>
          </div>
        </section>

        <aside className="ar-panel">
          <div className="ar-panel-head">
            <h3>Create / Edit Assignment Rule</h3>
          </div>

          <div className="ar-form">
            <div className="ar-field">
              <label>Category *</label>
              <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                <option>Hostel</option>
                <option>Academics</option>
                <option>Transport</option>
                <option>Finance</option>
                <option>Library</option>
                <option>IT Services</option>
                <option>Infrastructure</option>
                <option>Other</option>
              </select>
            </div>

            <div className="ar-field">
              <label>Sub-category *</label>
              <select
                value={form.subCategory}
                onChange={(e) => setForm((f) => ({ ...f, subCategory: e.target.value }))}
              >
                <option>Room Issue</option>
                <option>Exam Related</option>
                <option>Bus Pass</option>
                <option>Fee Refund</option>
                <option>Book Issue</option>
                <option>Wi-Fi Issue</option>
                <option>Electrical Issue</option>
                <option>Other Queries</option>
              </select>
            </div>

            <div className="ar-field">
              <label>Assign To *</label>
              <select value={form.assignTo} onChange={(e) => setForm((f) => ({ ...f, assignTo: e.target.value }))}>
                <option>Hostel Warden (Ms. Kavita Singh)</option>
                <option>Exam Cell (Dr. Anil Verma)</option>
                <option>Transport Officer (Mr. Suresh Kumar)</option>
                <option>Accounts Dept. (Mr. Rajiv Mehta)</option>
                <option>Library Incharge (Mr. Pankaj Joshi)</option>
                <option>IT Support (Mr. Rohit Yadav)</option>
                <option>Maintenance Dept. (Mr. Mahesh Patil)</option>
                <option>Admin Support (Support Team)</option>
              </select>
              <div className="ar-help">Selected officer will be auto-assigned when this category & sub-category is selected.</div>
            </div>

            <div className="ar-field">
              <label>Default Priority *</label>
              <select
                value={form.defaultPriority}
                onChange={(e) => setForm((f) => ({ ...f, defaultPriority: e.target.value }))}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <div className="ar-help">This priority will be set by default for new grievances.</div>
            </div>

            <div className="ar-field">
              <label>Status</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  className={`ar-switch ${form.active ? 'on' : ''}`}
                  onClick={() => setForm((f) => ({ ...f, active: !f.active }))}
                  aria-label="Toggle rule status"
                />
                {form.active ? 'Active' : 'Inactive'}
              </div>
              <div className="ar-help">Inactive rules will not be applied to new grievances.</div>
            </div>

            <div className="ar-form-actions">
              <button type="button" className="ar-save">
                <i className="fa-regular fa-floppy-disk" />
                Save Rule
              </button>
              <button type="button" className="ar-cancel">Cancel</button>
            </div>

            <div className="ar-info">
              <i className="fa-solid fa-circle-info" />
              When a student selects a category and sub-category, the grievance will be automatically assigned to the selected officer with the default priority.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AssignmentRules;
