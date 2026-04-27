import React, { useMemo, useState } from 'react';
import '../styles/admin/Dashboard.css';
import '../styles/admin/CategoryManager.css';

const seedCategories = [
  {
    id: 'cat-hostel',
    name: 'Hostel',
    description: 'Hostel facilities and accommodation related issues',
    status: 'Active',
    icon: { className: 'fa-solid fa-house', tone: 'purple' },
    subCategories: [
      { id: 'sub-room', name: 'Room Issue', description: 'Room allotment, change or maintenance', status: 'Active' },
      { id: 'sub-mess', name: 'Mess Food', description: 'Food quality and mess related issues', status: 'Active' },
      { id: 'sub-clean', name: 'Cleanliness', description: 'Cleanliness and hygiene issues', status: 'Active' },
      { id: 'sub-elec', name: 'Electricity', description: 'Power supply and electrical issues', status: 'Active' },
      { id: 'sub-water', name: 'Water Supply', description: 'Water availability and supply issues', status: 'Active' },
      { id: 'sub-other', name: 'Others', description: 'Other hostel related issues', status: 'Active' },
    ],
  },
  {
    id: 'cat-academics',
    name: 'Academics',
    description: 'Academic and examination related issues',
    status: 'Active',
    icon: { className: 'fa-solid fa-graduation-cap', tone: 'blue' },
    subCategories: [
      { id: 'sub-exam', name: 'Exam Related', description: 'Schedule, marks, and evaluation', status: 'Active' },
      { id: 'sub-att', name: 'Attendance', description: 'Attendance update and corrections', status: 'Active' },
      { id: 'sub-course', name: 'Coursework', description: 'Assignments and coursework', status: 'Active' },
      { id: 'sub-fac', name: 'Faculty', description: 'Faculty feedback and issues', status: 'Active' },
      { id: 'sub-other2', name: 'Others', description: 'Other academic related issues', status: 'Active' },
    ],
  },
  {
    id: 'cat-transport',
    name: 'Transport',
    description: 'Transportation and commuting related issues',
    status: 'Active',
    icon: { className: 'fa-solid fa-bus', tone: 'amber' },
    subCategories: [
      { id: 'sub-pass', name: 'Bus Pass', description: 'Pass generation and renewal', status: 'Active' },
      { id: 'sub-route', name: 'Routes', description: 'Route changes and stops', status: 'Active' },
      { id: 'sub-delay', name: 'Delays', description: 'Bus delays and timing issues', status: 'Active' },
      { id: 'sub-other3', name: 'Others', description: 'Other transport issues', status: 'Active' },
    ],
  },
  {
    id: 'cat-finance',
    name: 'Finance',
    description: 'Fee, refund and other financial matters',
    status: 'Active',
    icon: { className: 'fa-solid fa-indian-rupee-sign', tone: 'green' },
    subCategories: [
      { id: 'sub-refund', name: 'Fee Refund', description: 'Refund requests and status', status: 'Active' },
      { id: 'sub-scholar', name: 'Scholarship', description: 'Scholarship disbursement', status: 'Active' },
      { id: 'sub-fine', name: 'Fines', description: 'Fines and penalties', status: 'Active' },
      { id: 'sub-bill', name: 'Billing', description: 'Billing and receipts', status: 'Active' },
      { id: 'sub-other4', name: 'Others', description: 'Other finance issues', status: 'Active' },
    ],
  },
  {
    id: 'cat-library',
    name: 'Library',
    description: 'Library services and resources related issues',
    status: 'Active',
    icon: { className: 'fa-solid fa-book', tone: 'purple' },
    subCategories: [
      { id: 'sub-issue', name: 'Book Issue', description: 'Book issue/return issues', status: 'Active' },
      { id: 'sub-fine2', name: 'Library Fines', description: 'Fine disputes', status: 'Active' },
      { id: 'sub-access', name: 'Digital Access', description: 'E-resources access', status: 'Active' },
      { id: 'sub-other5', name: 'Others', description: 'Other library issues', status: 'Active' },
    ],
  },
  {
    id: 'cat-it',
    name: 'IT Services',
    description: 'IT infrastructure and technical support',
    status: 'Active',
    icon: { className: 'fa-solid fa-desktop', tone: 'cyan' },
    subCategories: [
      { id: 'sub-wifi', name: 'Wi-Fi Issue', description: 'Wi-Fi connection problems', status: 'Active' },
      { id: 'sub-email', name: 'Email', description: 'Email and account issues', status: 'Active' },
      { id: 'sub-portal', name: 'Portal', description: 'Portal login and usage', status: 'Active' },
      { id: 'sub-other6', name: 'Others', description: 'Other IT issues', status: 'Active' },
    ],
  },
  {
    id: 'cat-infra',
    name: 'Infrastructure',
    description: 'Campus infrastructure related issues',
    status: 'Active',
    icon: { className: 'fa-solid fa-building', tone: 'amber' },
    subCategories: [
      { id: 'sub-road', name: 'Roads', description: 'Road and pathway issues', status: 'Active' },
      { id: 'sub-light', name: 'Lighting', description: 'Street lighting issues', status: 'Active' },
      { id: 'sub-water2', name: 'Water', description: 'Water supply on campus', status: 'Active' },
      { id: 'sub-other7', name: 'Others', description: 'Other infrastructure issues', status: 'Active' },
      { id: 'sub-safety', name: 'Safety', description: 'Safety and hazard reports', status: 'Active' },
    ],
  },
  {
    id: 'cat-other',
    name: 'Other',
    description: 'Other general queries and issues',
    status: 'Active',
    icon: { className: 'fa-regular fa-circle', tone: 'slate' },
    subCategories: [
      { id: 'sub-misc', name: 'Miscellaneous', description: 'General issues', status: 'Active' },
      { id: 'sub-other8', name: 'Others', description: 'Other issues', status: 'Active' },
    ],
  },
];

const CategoryManager = () => {
  const [activeTab, setActiveTab] = useState('Categories');
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState(seedCategories);
  const [selectedId, setSelectedId] = useState(seedCategories[0]?.id);

  const selectedCategory = useMemo(
    () => categories.find((c) => c.id === selectedId) || categories[0],
    [categories, selectedId]
  );

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => {
      const matchesCategory = c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
      const matchesSub = c.subCategories.some(
        (s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      );
      return matchesCategory || matchesSub;
    });
  }, [categories, query]);

  const updateSelected = (patch) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === selectedCategory.id ? { ...c, ...patch } : c))
    );
  };

  const toggleStatus = () => {
    updateSelected({ status: selectedCategory.status === 'Active' ? 'Inactive' : 'Active' });
  };

  return (
    <div className="cm-page">
      <div className="cm-search">
        <i className="fa-solid fa-magnifying-glass" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by category or sub-category..."
        />
        <span className="cm-key">⌘ K</span>
      </div>

      <div className="cm-hero">
        <div>
          <h1 className="cm-title">Category Manager</h1>
          <p className="cm-subtitle">Manage all categories and sub-categories available for students.</p>
        </div>

        <div className="cm-actions">
          <button className="cm-btn cm-btn-primary" type="button">
            <i className="fa-solid fa-plus" />
            Add Category
          </button>
          <button className="cm-btn" type="button">
            <i className="fa-solid fa-download" />
            Export
          </button>
        </div>
      </div>

      <div className="cm-tabs">
        <button
          type="button"
          className={`cm-tab ${activeTab === 'Categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('Categories')}
        >
          Categories
        </button>
        <button
          type="button"
          className={`cm-tab ${activeTab === 'Sub-categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('Sub-categories')}
        >
          Sub-categories
        </button>
      </div>

      <div className="cm-grid">
        <section className="cm-panel">
          <div className="cm-panel-head">
            <h3>All Categories ({filteredCategories.length})</h3>
          </div>

          <div className="cm-table-wrap">
            <table className="cm-table">
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Description</th>
                  <th>Sub-categories</th>
                  <th>Status</th>
                  <th className="cm-actions-col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((cat) => (
                  <tr
                    key={cat.id}
                    onClick={() => setSelectedId(cat.id)}
                    style={{ cursor: 'pointer', background: cat.id === selectedId ? '#f8fafc' : 'transparent' }}
                  >
                    <td>
                      <span className="cm-row-title">
                        <span className={`cm-icon cm-icon-${cat.icon.tone}`}>
                          <i className={cat.icon.className} />
                        </span>
                        {cat.name}
                      </span>
                    </td>
                    <td style={{ color: '#475569', fontWeight: 700 }}>{cat.description}</td>
                    <td style={{ fontWeight: 900, color: '#0f172a' }}>{cat.subCategories.length}</td>
                    <td>
                      <span className={`cm-pill ${cat.status === 'Active' ? 'cm-pill-active' : 'cm-pill-inactive'}`}>
                        {cat.status}
                      </span>
                    </td>
                    <td className="cm-actions-col">
                      <button className="cm-icon-btn" type="button" aria-label="Edit">
                        <i className="fa-regular fa-pen-to-square" />
                      </button>
                      <button className="cm-icon-btn" type="button" aria-label="More">
                        <i className="fa-solid fa-ellipsis-vertical" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cm-footer-note">Showing 1 to {filteredCategories.length} of {filteredCategories.length} categories</div>
        </section>

        <aside className="cm-panel">
          <div className="cm-panel-head">
            <h3>Category Details</h3>
          </div>

          {selectedCategory && (
            <div className="cm-panel-sub">
              <div className="cm-field">
                <label>Category Name</label>
                <input
                  value={selectedCategory.name}
                  onChange={(e) => updateSelected({ name: e.target.value })}
                  type="text"
                />
              </div>

              <div className="cm-field">
                <label>Description</label>
                <textarea
                  value={selectedCategory.description}
                  onChange={(e) => updateSelected({ description: e.target.value })}
                />
              </div>

              <div className="cm-field">
                <label>Status</label>
                <div className="cm-status-row">
                  <div className="cm-toggle">
                    <button
                      type="button"
                      className={`cm-switch ${selectedCategory.status === 'Active' ? 'on' : ''}`}
                      onClick={toggleStatus}
                      aria-label="Toggle status"
                    />
                    {selectedCategory.status}
                  </div>
                </div>
                <div className="cm-help">Inactive categories will not be visible to students.</div>
              </div>

              <div className="cm-subcats-head">
                <h4>Sub-categories ({selectedCategory.subCategories.length})</h4>
                <button className="cm-btn-link" type="button">
                  <i className="fa-solid fa-plus" />
                  Add Sub-category
                </button>
              </div>

              <div className="cm-table-wrap">
                <table className="cm-table" style={{ minWidth: '520px' }}>
                  <thead>
                    <tr>
                      <th>Sub-category Name</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th className="cm-actions-col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCategory.subCategories.map((sub) => (
                      <tr key={sub.id}>
                        <td style={{ fontWeight: 900 }}>{sub.name}</td>
                        <td style={{ color: '#475569', fontWeight: 700 }}>{sub.description}</td>
                        <td>
                          <span className={`cm-pill ${sub.status === 'Active' ? 'cm-pill-active' : 'cm-pill-inactive'}`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="cm-actions-col">
                          <button className="cm-icon-btn" type="button" aria-label="Edit sub-category">
                            <i className="fa-regular fa-pen-to-square" />
                          </button>
                          <button className="cm-icon-btn" type="button" aria-label="Delete sub-category">
                            <i className="fa-regular fa-trash-can" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="cm-info">
                <i className="fa-solid fa-circle-info" />
                These sub-categories will be shown to students when they select “{selectedCategory.name}” as the category.
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default CategoryManager;
