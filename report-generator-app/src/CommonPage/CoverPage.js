import React from 'react';
import '../StyleScript/CoverPage.css';

const CoverPage = () => {
  return (
    <div className="cover-page">
      <div className="header-logo">
        <img src="atmclogo.jpg" alt="atmcl" style={{ maxWidth: '100%', height: '30%' }} />
      </div>
      <div className="report-title-section">
        <p className="report-title cover-title">T-Mobile Field Performance Report</p>
        <span className="separator">|</span>
        <h2 className="report-subtitle">ATMCL Pilot</h2>
      </div>
      <hr className="title-underline" />
      <div className="tmobile-logo">
        <img src="/CoverPagePic/tmobile-title-logo.png" alt="tmobile-title-logo" style={{ maxWidth: '90%', height: '90%' }} />
      </div>
      <div className="report-details">
        <div className="detail-row">
          <span className="detail-label">DATE</span>
          <span className="detail-value">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">VERSION</span>
          <span className="detail-value">1.0</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">CONTACT</span>
          <span className="detail-value">Claude Li</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">E-MAIL</span>
          <span className="detail-value">Claude.li@atmcl.com</span>
        </div>
      </div>

      <div className="footer-logos">
        <div className="footer-left-content">
          <p className="footer-comment-text">DOCUMENT CONTROL NUMBER NA</p>
          <p className="footer-comment-text">© 2025 ATMCL</p>
          <img src="/CoverPagePic/other-logo.png" alt="other-logo" style={{ maxWidth: '60%', height: '60%' }} />
          <p className="footer-text">ATMCL One Stop Test Service</p>
        </div>
        <img src="/CoverPagePic/signalLogo.png" alt="signal-logo" className="signal-logo" />
      </div>
    </div>
  );
};

export default CoverPage;