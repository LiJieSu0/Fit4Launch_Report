import React from 'react';
import styles from './ReportFooter.module.css';

const ReportFooter = ({ version = '1.0', issueDate = '11/24/2025', issuer = 'Claude Li' }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.headerContent}>
        <div className={styles.leftHeader}>
          ATMC Labs: Phase Two Report, Field Routes Confidential
        </div>
        <div className={styles.rightHeader}>
          ATMC Labs
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