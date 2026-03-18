import React from 'react';
import styles from './ReportFooter.module.css';

const ReportFooter = ({ reportType, version = '1.0', issuer = 'Claude Li, Siva Kavuri' }) => {
  const today = new Date();
  const issueDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  return (
    <footer className={styles.footer}>
      <div className={styles.headerContent}>
        <div className={styles.leftHeader}>
          ATMC Labs: {reportType} Field Test Report
        </div>
        <div className={styles.rightHeader}>
          <a href="#summary-page" className={styles.tableOfContentsLink}>
            Back to Top
          </a>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <table>
          <tbody>
            <tr>
              <td><b>Version:</b> {version}</td>
              <td><b>Issue Date:</b> {issueDate}</td>
              <td><b>Issuer:</b> {issuer}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </footer>
  );
};

export default ReportFooter;