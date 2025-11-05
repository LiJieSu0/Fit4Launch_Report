import React from 'react';
import styles from './ReportHeader.module.css';

const ReportHeader = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div>
          <h1 className={styles.title}><span className={styles.fit4Launch}>ATMCL TMO Field Performance Test</span></h1>
          <p className={styles.subtitle}>T-Mobile Test Plan – ATMCL Pilot</p>
        </div>
        <div className={styles.logoContainer}>
          <img src="/atmclogo.jpg" alt="Spirent Logo" className={styles.logo} />
        </div>
      </div>
      <div className={styles.bottomLine}></div>
    </div>
  );
};

export default ReportHeader;