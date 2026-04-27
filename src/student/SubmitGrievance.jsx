import React, { useMemo, useState } from 'react';
import '../styles/student-pages.css';
import '../styles/SubmitGrievance.css';

const SubmitGrievance = () => {
  const DESCRIPTION_MAX = 1000;
  const [description, setDescription] = useState('');
  const descriptionCount = useMemo(() => description.length, [description]);

  return (
    <div className="student-page">
      <section className="sg-card">
        <div className="sg-header">
          <h1 className="sg-title">Grievance Details</h1>
          <p className="sg-subtitle">Please provide accurate information about your issue.</p>
        </div>

        <form className="sg-form">
          <div className="sg-grid">
            <div className="sg-field">
              <label className="sg-label">
                Category <span className="sg-required">*</span>
              </label>
              <div className="sg-selectWrap">
                <div className="sg-leadingIcon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3h6l4 4v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
                    <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
                  </svg>
                </div>
                <select className="sg-control sg-controlWithIcon" defaultValue="Academic" required>
                  <option>Academic</option>
                  <option>Hostel</option>
                  <option>Finance</option>
                  <option>Facilities</option>
                  <option>Examination</option>
                </select>
              </div>
            </div>

            <div className="sg-field">
              <label className="sg-label">
                Sub-category <span className="sg-required">*</span>
              </label>
              <select className="sg-control" defaultValue="Internal Assessment / Marks" required>
                <option>Internal Assessment / Marks</option>
                <option>Attendance</option>
                <option>Timetable</option>
                <option>Result / Grade</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="sg-field">
            <label className="sg-label">
              Subject <span className="sg-required">*</span>
            </label>
            <input className="sg-control" type="text" placeholder="Enter a short subject of your grievance" required />
          </div>

          <div className="sg-field">
            <label className="sg-label">
              Description <span className="sg-required">*</span>
            </label>
            <div className="sg-textareaWrap">
              <textarea
                className="sg-control sg-textarea"
                rows="7"
                placeholder="Describe your issue in detail..."
                maxLength={DESCRIPTION_MAX}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <div className="sg-counter">
                {descriptionCount}/{DESCRIPTION_MAX}
              </div>
            </div>
          </div>

          <div className="sg-field">
            <div className="sg-label">Upload Attachments (Optional)</div>
            <div className="sg-dropzone" role="button" tabIndex={0}>
              <input className="sg-fileInput" id="sg-file" type="file" multiple />
              <div className="sg-dropzoneInner">
                <div className="sg-cloud" aria-hidden="true">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 18a4 4 0 01.39-7.98A5 5 0 0116.9 8.5 3.5 3.5 0 0117.5 18H7Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 12v7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                    <path d="M9.5 14.5L12 12l2.5 2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="sg-dropzoneText">
                  <div className="sg-dropzoneTitle">
                    Drag &amp; drop files here or{' '}
                    <label className="sg-browse" htmlFor="sg-file">
                      click to browse
                    </label>
                  </div>
                  <div className="sg-dropzoneHint">Max file size: 10MB | Allowed: PDF, JPG, PNG, DOC, DOCX</div>
                </div>
              </div>
            </div>
          </div>

          <div className="sg-footer">
            <button type="button" className="sg-btn sg-btnSecondary">
              Cancel
            </button>
            <button type="submit" className="sg-btn sg-btnPrimary">
              Submit Grievance
              <span className="sg-arrow" aria-hidden="true">
                &rarr;
              </span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SubmitGrievance;

