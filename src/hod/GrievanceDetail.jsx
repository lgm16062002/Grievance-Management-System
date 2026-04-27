import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/hod/GrievanceDetail.css';

const GrievanceDetail = () => {
  const navigate = useNavigate();

  const conversation = [
    { sender: 'Alex Johnson', role: 'Student', initials: 'AJ', text: 'I submitted the form as requested along with the document proof. Let me know if any other detail is needed.', date: 'May 20, 2025, 10:30 AM' },
    { sender: 'Officer Davis', role: 'You', initials: 'OD', text: 'Dear Alex, we have forwarded your script copy to the respective professor for verification. Expected resolution by tomorrow.', date: 'May 20, 2025, 11:15 AM' },
    { sender: 'Alex Johnson', role: 'Student', initials: 'AJ', text: 'Thank you for the update.', date: 'May 20, 2025, 11:20 AM' },
  ];

  return (
    <div className="hod-dashboard grievance-detail-page">
      <button className="back-btn-alt" onClick={() => navigate('/hod/assigned')}>
        <i className="fa-solid fa-arrow-left"></i>
        Back to My Assigned
      </button>

      <div className="detail-content-grid">
        <div className="detail-main-col">
          <section className="dashboard-card ticket-main-card">
            <header className="ticket-header">
              <div className="ticket-title-wrap">
                <h1>#GRV-8092: Incorrect Marks in Midterm Setup</h1>
                <span className="priority-tag high">PRIORITY: HIGH</span>
              </div>
              <p className="ticket-desc">
                The midterm marks updated in the portal for COM-101 are incorrect. I received 38 but the portal shows 28. 
                I have attached the scanned copy of my answer script for verification. Please rectify this as it affects my aggregate score.
              </p>
              <div className="ticket-meta-row">
                <div className="meta-item">
                  <i className="fa-regular fa-user"></i>
                  <div>
                    <strong>Alex Johnson</strong>
                    <span>STU-202X-001</span>
                  </div>
                </div>
                <div className="meta-item">
                  <i className="fa-regular fa-folder-open"></i>
                  <div>
                    <strong>Academic Grading</strong>
                    <span>Category</span>
                  </div>
                </div>
                <div className="meta-item">
                  <i className="fa-regular fa-calendar"></i>
                  <div>
                    <strong>May 20, 2025</strong>
                    <span>10:30 AM Submitted On</span>
                  </div>
                </div>
                <div className="meta-item status-meta">
                  <div className="status-label-wrap">
                    <span className="status-val-alt orange">Under Review</span>
                    <span>Status</span>
                  </div>
                </div>
              </div>
            </header>

            <div className="attachments-section">
              <h3>Attached Documents (1)</h3>
              <div className="doc-card-alt">
                <div className="doc-icon pdf">
                  <i className="fa-solid fa-file-pdf"></i>
                </div>
                <div className="doc-info">
                  <strong>Scanned_Script_COM101.pdf</strong>
                  <span>1.2 MB</span>
                </div>
                <button className="doc-download-btn">
                  <i className="fa-solid fa-download"></i>
                </button>
              </div>
            </div>
          </section>

          <section className="dashboard-card conversation-section">
            <div className="card-head">
              <h3>Conversation History</h3>
            </div>
            <div className="conversation-list">
              {conversation.map((msg, index) => (
                <div key={index} className="message-row">
                  <div className={`avatar-circle ${msg.initials === 'OD' ? 'officer' : 'student'}`}>
                    {msg.initials}
                  </div>
                  <div className="message-content">
                    <div className="message-head">
                      <strong>{msg.sender} ({msg.role})</strong>
                      <span>{msg.date}</span>
                    </div>
                    <p className="message-text">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="reply-box-wrap">
              <textarea placeholder="Add a public reply..."></textarea>
              <div className="reply-actions">
                <div className="left-tools">
                  <button><i className="fa-solid fa-paperclip"></i></button>
                  <button><i className="fa-regular fa-face-smile"></i></button>
                </div>
                <button className="send-reply-btn">Send Reply</button>
              </div>
            </div>
          </section>
        </div>

        <aside className="detail-side-col">
          <section className="dashboard-card sidebar-form-card">
            <div className="card-head">
              <h3>Update Ticket</h3>
            </div>
            <div className="sidebar-form">
              <div className="form-group-side">
                <label>Status</label>
                <select defaultValue="under-review">
                  <option value="under-review">Under Review</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              <div className="form-group-side">
                <label>Action Priority</label>
                <select defaultValue="high">
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>
              <div className="form-group-side">
                <label>Assign To (If needed)</label>
                <select defaultValue="">
                  <option value="" disabled>Select Officer</option>
                  <option value="davis">Officer Davis</option>
                </select>
              </div>
              <div className="upload-zone-mini">
                <i className="fa-solid fa-plus"></i>
                <span>Upload File</span>
                <p>PDF, DOC, DOCX (Max 10MB)</p>
              </div>
              <button className="primary-update-btn">Update Ticket</button>
            </div>
          </section>

          <section className="dashboard-card sidebar-info-card">
            <div className="card-head">
              <h3>Student Information</h3>
            </div>
            <div className="student-side-profile">
              <div className="student-profile-head">
                <div className="avatar-large">AJ</div>
                <div className="profile-titles">
                  <strong>Alex Johnson</strong>
                  <span>STU-202X-001</span>
                </div>
              </div>
              <div className="info-grid-side">
                <div className="info-node">
                  <label>Course:</label>
                  <span>B.Tech Computer Science</span>
                </div>
                <div className="info-node text-right">
                  <label>Semester:</label>
                  <span>4th Semester</span>
                </div>
                <div className="info-node">
                  <label>Email:</label>
                  <span>alex.j@uni.edu</span>
                </div>
                <div className="info-node text-right">
                  <label>Phone:</label>
                  <span>+1 98765 43210</span>
                </div>
                <div className="info-node">
                  <label>Past Grievances:</label>
                  <span>2</span>
                </div>
              </div>
            </div>
          </section>

          <section className="dashboard-card sidebar-actions-card">
            <div className="card-head">
              <h3>Quick Actions</h3>
            </div>
            <div className="quick-actions-list">
              <button className="q-action-btn blue">
                <i className="fa-regular fa-message"></i>
                Request More Info
              </button>
              <button className="q-action-btn red">
                <i className="fa-regular fa-circle-xmark"></i>
                Close Ticket
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default GrievanceDetail;
