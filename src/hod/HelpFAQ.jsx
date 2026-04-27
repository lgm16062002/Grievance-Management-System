import React, { useState } from 'react';
import '../styles/hod/CommonHOD.css';
import '../styles/HelpFAQ.css';

const HelpFAQ = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [openIndex, setOpenIndex] = useState(0);

  const topics = [
    { id: 'management', title: 'Ticket Management', icon: 'fa-solid fa-ticket-simple', desc: 'How to manage, assign and resolve grievances', count: '8 FAQs' },
    { id: 'reports', title: 'Reports & Analytics', icon: 'fa-solid fa-chart-line', desc: 'Generate and understand dashboard metrics', count: '5 FAQs' },
    { id: 'communication', title: 'Student Communication', icon: 'fa-regular fa-message', desc: 'Best practices for replying to students', count: '6 FAQs' },
    { id: 'account', title: 'Admin Account', icon: 'fa-regular fa-id-card', desc: 'Manage your officer profile and settings', count: '4 FAQs' },
    { id: 'guidelines', title: 'Resolution Guidelines', icon: 'fa-solid fa-gavel', desc: 'University policies for grievance resolution', count: '7 FAQs' },
  ];

  const faqsList = [
    { topicId: 'management', q: 'How do I reassign a grievance to another officer?', a: 'Open the grievance detail, and in the "Update Ticket" sidebar, select the desired officer from the "Assign To" dropdown and click "Update Ticket".' },
    { topicId: 'management', q: 'Can I resolve a ticket without a student reply?', a: 'Yes, if the issue is resolved on the university side, you can mark it as resolved. However, it is recommended to leave a final note for the student.' },
    { topicId: 'reports', q: 'How often is the dashboard data updated?', a: 'The dashboard metrics are updated in real-time as grievances are submitted, updated, or resolved.' },
    { topicId: 'communication', q: 'Are my replies visible to other officers?', a: 'Yes, all conversation history is stored and can be audited by the administration to ensure quality resolution.' },
    { topicId: 'guidelines', q: 'What is the standard SLA for academic grievances?', a: 'Most academic grievances should be acknowledged within 24 hours and resolved within 3-5 business days.' },
  ];

  const filteredFaqs = selectedTopic 
    ? faqsList.filter(f => f.topicId === selectedTopic)
    : faqsList.slice(0, 5);

  if (selectedTopic) {
    const topic = topics.find(t => t.id === selectedTopic);
    return (
      <div className="hod-dashboard help-faq-page">
        <nav className="breadcrumbs">
          <span>Help & FAQs</span>
          <i className="fa-solid fa-chevron-right"></i>
          <span className="current">{topic.title}</span>
        </nav>

        <button className="back-to-help-btn" onClick={() => setSelectedTopic(null)}>
          <i className="fa-solid fa-arrow-left"></i>
          Back to Help & FAQs
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
                  <p>Officer guides and FAQs for {topic.title.toLowerCase()}.</p>
                </div>
              </div>
            </header>

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
            </section>
          </div>

          <aside className="help-side-col">
            <section className="dashboard-card still-help-card">
              <h3>Need more help?</h3>
              <p>Can't find the answer? Contact technical support.</p>
              <button className="contact-support-side-btn">
                <div className="headset-circle-small">
                  <i className="fa-solid fa-headset"></i>
                </div>
                Contact Support
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </section>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="hod-dashboard help-faq-page">
      <header className="page-header-alt">
        <h1>Admin Help & FAQs</h1>
        <p>Find quick answers to management questions and portal guidelines.</p>
      </header>

      <div className="help-content-grid">
        <div className="help-main-col">
          <section className="dashboard-card topics-section">
            <div className="section-head-alt">
              <h3>Browse by Topics</h3>
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
              <h3>Common Admin Questions</h3>
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
          </section>
        </div>

        <aside className="help-side-col">
          <section className="dashboard-card need-help-card">
            <h3>Portal Support</h3>
            <p>Experiencing technical issues? Our support desk is available for HODs.</p>
            <div className="support-illustration">
              <div className="headset-icon-circle">
                <i className="fa-solid fa-headset"></i>
              </div>
            </div>
            <button className="contact-support-primary">
              Contact Support <i className="fa-solid fa-arrow-right"></i>
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default HelpFAQ;
