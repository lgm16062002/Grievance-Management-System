import React, { useState } from 'react';
import '../styles/student-pages.css';
import '../styles/HelpFAQ.css';
import '../styles/admin/Dashboard.css';

const faqsList = [
  { topicId: 'general', q: 'How does the automated SLA tracking work?', a: 'The system automatically tracks the time since a grievance was assigned. If no action is taken within the defined SLA hours (e.g., 48 hours for High Priority), it is flagged and an alert is sent.' },
  { topicId: 'general', q: 'Can I reassign a grievance to another department?', a: 'Yes, as an admin, you can reassign any grievance by opening the grievance detail view and selecting a new department from the assignment dropdown.' },
  { topicId: 'management', q: 'How do I add a new grievance category?', a: 'Go to the Category Manager from the sidebar. Click "Add Category", provide the name, SLA duration, and assign the default handler (HOD or Officer).' },
  { topicId: 'management', q: 'What happens when a grievance is escalated?', a: 'Escalated grievances are highlighted in red and pushed to the top of the queue. The designated higher authority is also notified via email immediately.' },
  { topicId: 'users', q: 'How do I create a new HOD or Officer account?', a: 'Navigate to Manage Users, click "Add New User", fill in their details, and select the appropriate role (HOD/Officer) and their respective department.' },
  { topicId: 'users', q: 'Can I suspend a user account?', a: 'Yes, you can temporarily disable any user account from the Manage Users tab by toggling their active status. They will not be able to log in until re-enabled.' },
  { topicId: 'reporting', q: 'How do I export grievance data?', a: 'In the Manage Grievances page, click the "Export" button at the top right. You can choose to export the current view as CSV or Excel.' },
  { topicId: 'reporting', q: 'Are reports generated automatically?', a: 'Weekly and monthly summary reports are generated automatically and sent to the super admin email. You can also generate custom reports manually.' },
  { topicId: 'system', q: 'How do I update the portal announcements?', a: 'System-wide announcements can be added from the Settings page. These will appear as banners on the student and staff dashboards.' },
];

const topics = [
  { id: 'general', title: 'Admin Overview', icon: 'fa-solid fa-gauge-high', desc: 'General dashboard and SLA tracking', count: '2 FAQs' },
  { id: 'management', title: 'Grievance Management', icon: 'fa-solid fa-layer-group', desc: 'Rules, categories, and assignments', count: '2 FAQs' },
  { id: 'users', title: 'User Access Control', icon: 'fa-solid fa-users-gear', desc: 'Managing students, HODs, and Officers', count: '2 FAQs' },
  { id: 'reporting', title: 'Data & Reporting', icon: 'fa-solid fa-chart-pie', desc: 'Analytics, exports, and automated reports', count: '2 FAQs' },
  { id: 'system', title: 'System Settings', icon: 'fa-solid fa-sliders', desc: 'Portal configuration and announcements', count: '1 FAQs' },
];

const HelpFAQ = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs = selectedTopic 
    ? faqsList.filter(f => f.topicId === selectedTopic)
    : faqsList.slice(0, 5);

  if (selectedTopic) {
    const topic = topics.find(t => t.id === selectedTopic);
    return (
      <div className="admin-overview-page help-faq-page">
        <nav className="breadcrumbs">
          <span>Admin Guidelines</span>
          <i className="fa-solid fa-chevron-right"></i>
          <span className="current">{topic.title}</span>
        </nav>

        <button className="back-to-help-btn" onClick={() => setSelectedTopic(null)}>
          <i className="fa-solid fa-arrow-left"></i>
          Back to Admin Guidelines
        </button>

        <div className="help-content-grid">
          <div className="help-main-col">
            <header className="topic-detail-header dashboard-card">
              <div className="topic-header-main">
                <div className="topic-icon-large">
                  <i className={topic.icon}></i>
                </div>
                <div className="topic-header-text">
                  <h1>{topic.title}</h1>
                  <p>Learn best practices and configuration details for {topic.title.toLowerCase()}.</p>
                </div>
              </div>
            </header>

            <section className="dashboard-card search-container">
              <div className="search-bar">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder={`Search in ${topic.title}...`} />
              </div>
            </section>

            <section className="dashboard-card faqs-section">
              <div className="section-head-alt">
                <h3>{topic.title} Topics</h3>
              </div>
              <div className="faqs-list-alt">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className={`faq-row-alt ${openIndex === index ? 'active' : ''}`}>
                    <button className="faq-toggle-btn" onClick={() => setOpenIndex(openIndex === index ? -1 : index)}>
                      <span className="faq-q-text">
                        <span className="faq-num">{index + 1}.</span> {faq.q}
                      </span>
                      <span className="toggle-icon">
                        {openIndex === index ? (
                          <i className="fa-solid fa-circle-minus active"></i>
                        ) : (
                          <i className="fa-regular fa-circle-plus"></i>
                        )}
                      </span>
                    </button>
                    {openIndex === index && (
                      <div className="faq-ans-text">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="was-this-helpful">
                <span>Was this helpful?</span>
                <div className="helpful-btns">
                  <button className="helpful-btn">
                    <i className="fa-regular fa-thumbs-up"></i> Yes
                  </button>
                  <button className="helpful-btn">
                    <i className="fa-regular fa-thumbs-down"></i> No
                  </button>
                </div>
              </div>
            </section>
          </div>

          <aside className="help-side-col">
            <section className="dashboard-card browse-topics-side">
              <div className="section-head-alt">
                <h3>Browse Admin Modules</h3>
              </div>
              <div className="side-topics-list">
                {topics.map((t) => (
                  <button 
                    key={t.id} 
                    className={`side-topic-item ${selectedTopic === t.id ? 'active' : ''}`}
                    onClick={() => setSelectedTopic(t.id)}
                  >
                    <div className="side-topic-icon">
                      <i className={t.icon}></i>
                    </div>
                    <div className="side-topic-info">
                      <strong>{t.title}</strong>
                      <p>{t.desc}</p>
                    </div>
                    <i className="fa-solid fa-chevron-right arrow-icon"></i>
                  </button>
                ))}
              </div>
            </section>

            <section className="dashboard-card still-help-card">
              <h3>System Issue?</h3>
              <p>Need developer assistance? Contact IT support directly.</p>
              <button className="contact-support-side-btn">
                <div className="headset-circle-small">
                  <i className="fa-solid fa-bug"></i>
                </div>
                Report a Bug
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </section>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-overview-page help-faq-page">
      <header className="page-header">
        <h1>Admin Guidelines & FAQs</h1>
        <p>Comprehensive guide to managing the grievance portal and resolving system queries.</p>
      </header>

      <div className="help-content-grid">
        <div className="help-main-col">
          <section className="dashboard-card search-container">
            <div className="search-bar">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Search for admin policies, configurations, or keywords..." />
            </div>
          </section>

          <section className="dashboard-card topics-section">
            <div className="section-head-alt">
              <h3>Admin Modules</h3>
            </div>
            <div className="topics-grid">
              {topics.map((topic) => (
                <div key={topic.id} className="topic-card" onClick={() => setSelectedTopic(topic.id)}>
                  <div className="topic-icon">
                    <i className={topic.icon}></i>
                  </div>
                  <h4>{topic.title}</h4>
                  <p>{topic.desc}</p>
                  <span>{topic.count}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-card faqs-section">
            <div className="section-head-alt">
              <h3>Frequently Asked Questions</h3>
            </div>
            <div className="faqs-list-alt">
              {filteredFaqs.map((faq, index) => (
                <div key={index} className={`faq-row-alt ${openIndex === index ? 'active' : ''}`}>
                  <button className="faq-toggle-btn" onClick={() => setOpenIndex(openIndex === index ? -1 : index)}>
                    <span className="faq-q-text">
                      <span className="faq-num">{index + 1}.</span> {faq.q}
                    </span>
                    <span className="toggle-icon">
                      {openIndex === index ? (
                        <i className="fa-solid fa-circle-minus active"></i>
                      ) : (
                        <i className="fa-regular fa-circle-plus"></i>
                      )}
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className="faq-ans-text">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="faqs-footer">
              <button className="view-all-faqs-btn">
                View All FAQs <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </section>
        </div>

        <aside className="help-side-col">
          <section className="dashboard-card need-help-card">
            <h3>Technical Support</h3>
            <p>Experiencing system errors or need custom configurations?</p>
            <div className="support-illustration">
              <div className="headset-icon-circle" style={{background: '#fef2f2', color: '#ef4444'}}>
                <i className="fa-solid fa-server"></i>
              </div>
            </div>
            <button className="contact-support-primary">
              Contact IT Desk <i className="fa-solid fa-arrow-right"></i>
            </button>
          </section>

          <section className="dashboard-card extra-options-card">
            <h3>Admin Resources</h3>
            <div className="extra-options-list">
              <div className="extra-option-item">
                <div className="option-icon blue">
                  <i className="fa-solid fa-book-journal-whills"></i>
                </div>
                <div className="option-info">
                  <strong>System Manual</strong>
                  <p>Full documentation</p>
                </div>
              </div>
              <div className="extra-option-item">
                <div className="option-icon green">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <div className="option-info">
                  <strong>Data Privacy</strong>
                  <p>Security protocols</p>
                </div>
              </div>
              <div className="extra-option-item">
                <div className="option-icon purple">
                  <i className="fa-solid fa-chart-line"></i>
                </div>
                <div className="option-info">
                  <strong>Analytics Guide</strong>
                  <p>How to use reports</p>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default HelpFAQ;
