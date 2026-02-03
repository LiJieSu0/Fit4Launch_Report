import React from 'react';
import '../StyleScript/CoverPage.css';

const CoverPage = ({ reportType, projectName }) => {
  return (
    <div className="cover-page cover-page-component">
      <div className="print-header-cover"></div>
      <div className="header-logo">
        <div className="header-left-content">
          <img src="atmclogo.jpg" alt="atmcl" style={{ maxWidth: '50%', height: '15%' }} />
        </div>
        <div className="header-contact-info" style={{ marginTop: 10 }}>
          <p>30540 SE 84th St, STE 1, Preston, WA 98050 and</p>
          <p>721 Enterprise Dr., Lexington, KY 40510</p>
          <p>Telephone: +1-858-342-8435</p>
          <p>www.atmcl.com</p>
        </div>
      </div>

      <div style={{ marginBottom: 80 }}></div>
      <p className="report-title cover-title cover-title-right-align">T-Mobile {reportType} Field Test Report</p>
      <hr className="title-underline" />
      <p className="report-title cover-title cover-title-right-align">{projectName}</p>
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
          <p className="footer-comment-text">© 2026 ATMC Labs</p>
          <img src="/CoverPagePic/other-logo.png" alt="other-logo" style={{ maxWidth: '60%', height: '60%' }} />
          <p className="footer-text">ATMC Labs One Stop Test Service</p>
        </div>
        <img src="/CoverPagePic/signalLogo.png" alt="signal-logo" className="signal-logo" />
      </div>
    </div>
  );
};

export default CoverPage;