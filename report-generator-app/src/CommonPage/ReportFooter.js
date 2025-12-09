import React from 'react';
import styles from './ReportFooter.module.css';

const ReportFooter = ({ version = '1.0', issuer = 'Claude Li' }) => {
  const today = new Date();
  const issueDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  return (
    <footer className={styles.footer}>
      <div className={styles.headerContent}>
        <div className={styles.leftHeader}>
          ATMC Labs: Phase Two Report, Field Routes <br/>Confidential
        </div>
        <div className={styles.rightHeader}>
          <a href="#table-of-contents" className={styles.tableOfContentsLink}>
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