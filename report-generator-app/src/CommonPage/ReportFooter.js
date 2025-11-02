import React from 'react';
import styles from './ReportFooter.module.css';

const ReportFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.leftContent}>
        Proprietary & Confidential
      </div>
      <div className={styles.rightContent}>
        spirent.com | 3
      </div>
    </footer>
  );
};

export default ReportFooter;