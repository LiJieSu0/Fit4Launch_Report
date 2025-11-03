import React from 'react';
import styles from './ReportFooter.module.css';

const ReportFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.leftContent}>
        Proprietary & Confidential
      </div>
      <div className={styles.rightContent}>
        <a href="#table-of-contents" className="back-to-top-print">Back to Top</a> | pageNumber
      </div>
    </footer>
  );
};

export default ReportFooter;