import React, { useState } from 'react';
import '../styles/student-pages.css';
import '../styles/HelpFAQ.css';

const faqs = [
  {
    category: 'General',
    question: 'How long does a grievance review take?',
    answer: 'Most submissions are acknowledged within one business day and resolved within three to seven business days depending on the complexity of the category.',
  },
  {
    category: 'Process',
    question: 'Can I edit a submitted grievance?',
    answer: 'Once submitted, you cannot edit the primary description. however, you can add supporting documents or follow-up notes from the grievance timeline at any time.',
  },
  {
    category: 'Escalation',
    question: 'When should I escalate my grievance?',
    answer: 'Escalate when the response window has passed or when the issue involves safety, harassment, or urgent academic risk that requires immediate attention.',
  },
  {
    category: 'Account',
    question: 'How do I track my grievance status?',
    answer: 'You can track all your grievances from the "My Grievances" page. Each grievance has a detailed timeline showing progress and updates.',
  },
  {
    category: 'Support',
    question: 'Who can I contact for technical issues?',
    answer: 'For technical issues regarding the portal, you can contact the IT support desk via the "Contact Support" button at the bottom of this page.',
  },
];

const categories = [
  { id: 'general', title: 'Getting Started', icon: 'fa-solid fa-rocket', color: 'blue' },
  { id: 'academic', title: 'Academic Issues', icon: 'fa-solid fa-graduation-cap', color: 'purple' },
  { id: 'hostel', title: 'Hostel & Facilities', icon: 'fa-solid fa-building-user', color: 'green' },
  { id: 'financial', title: 'Financial & Fees', icon: 'fa-solid fa-wallet', color: 'orange' },
];

const HelpFAQ = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [openIndex, setOpenIndex] = useState(0);

  const topics = [
    { id: 'general', title: 'General', icon: 'fa-regular fa-file-lines', desc: 'General information about the portal', count: '6 FAQs' },
    { id: 'submitting', title: 'Submitting Grievance', icon: 'fa-solid fa-pen-nib', desc: 'How to submit and manage grievances', count: '8 FAQs' },
    { id: 'tracking', title: 'Tracking Grievance', icon: 'fa-regular fa-clipboard', desc: 'Track status and updates of your grievances', count: '6 FAQs' },
    { id: 'account', title: 'Account & Profile', icon: 'fa-regular fa-user', desc: 'Manage your account and profile settings', count: '5 FAQs' },
    { id: 'policies', title: 'Policies & Guidelines', icon: 'fa-regular fa-shield-halved', desc: 'Grievance policies and student guidelines', count: '4 FAQs' },
  ];

  const faqsList = [
    { topicId: 'general', q: 'What is the Grievance Portal?', a: 'The Grievance Portal is an online platform where students can submit their complaints, track their status, and receive updates from the administration.' },
    { topicId: 'general', q: 'Who can use the Grievance Portal?', a: 'All registered students of the university can use the portal to raise concerns.' },
    { topicId: 'general', q: 'Is my information secure?', a: 'Yes, all information submitted through the portal is kept confidential and only shared with authorized personnel.' },
    { topicId: 'submitting', q: 'How do I submit a new grievance?', a: 'You can submit a new grievance by clicking on the "Submit Grievance" button in the sidebar. Fill in the required details, add supporting documents if any, and submit.' },
    { topicId: 'submitting', q: 'What details are required for submission?', a: 'You need to provide a title, category, description, and any supporting evidence like images or documents.' },
    { topicId: 'tracking', q: 'How can I track the status of my grievance?', a: 'You can track the status of your grievances from the "My Grievances" page in your dashboard.' },
    { topicId: 'tracking', q: 'What do the different status labels mean?', a: '"Under Review" means it is being checked, "In Progress" means action is being taken, and "Resolved" means the issue is closed.' },
    { topicId: 'account', q: 'How do I update my profile information?', a: 'You can update your personal details and contact information from the "Profile" section in the sidebar.' },
    { topicId: 'policies', q: 'What should I do if I am not satisfied with the resolution?', a: 'You can escalate the grievance through the formal appeal process or contact the support team for further clarification.' },
  ];

  const filteredFaqs = selectedTopic 
    ? faqsList.filter(f => f.topicId === selectedTopic)
    : faqsList.slice(0, 5); // Show first 5 on home page

  if (selectedTopic) {
    const topic = topics.find(t => t.id === selectedTopic);
    return (
      <div className="student-page help-faq-page">
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
                  <p>Find {topic.title.toLowerCase()} information about the portal, features and how things work.</p>
                </div>
              </div>
            </header>

            <section className="dashboard-card search-container">
              <div className="search-bar">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder={`Search in ${topic.title} topics...`} />
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
                <h3>Browse by Topics</h3>
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
              <h3>Still need help?</h3>
              <p>Can't find what you're looking for? Our support team is here to help.</p>
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
    <div className="student-page help-faq-page">
      <header className="page-header">
        <h1>Help & FAQs</h1>
        <p>Find answers to common questions or get help with your grievances.</p>
      </header>

      <div className="help-content-grid">
        <div className="help-main-col">
          <section className="dashboard-card search-container">
            <div className="search-bar">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Search for help topics, questions or keywords..." />
            </div>
          </section>

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
            <h3>Need More Help?</h3>
            <p>Can't find what you're looking for? We're here to help!</p>
            <div className="support-illustration">
              <div className="headset-icon-circle">
                <i className="fa-solid fa-headset"></i>
              </div>
            </div>
            <button className="contact-support-primary">
              Contact Support <i className="fa-solid fa-arrow-right"></i>
            </button>
          </section>

          <section className="dashboard-card extra-options-card">
            <h3>Other Help Options</h3>
            <div className="extra-options-list">
              <div className="extra-option-item">
                <div className="option-icon blue">
                  <i className="fa-regular fa-file-lines"></i>
                </div>
                <div className="option-info">
                  <strong>User Guide</strong>
                  <p>Step-by-step instructions</p>
                </div>
              </div>
              <div className="extra-option-item">
                <div className="option-icon blue">
                  <i className="fa-solid fa-circle-play"></i>
                </div>
                <div className="option-info">
                  <strong>Video Tutorials</strong>
                  <p>Watch helpful videos</p>
                </div>
              </div>
              <div className="extra-option-item">
                <div className="option-icon blue">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <div className="option-info">
                  <strong>Contact Support Team</strong>
                  <p>Get in touch with our team</p>
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
