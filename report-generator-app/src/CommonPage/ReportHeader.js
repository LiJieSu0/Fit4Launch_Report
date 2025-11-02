import React from 'react';
import styles from './ReportHeader.module.css';

const ReportHeader = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div>
          <h1 className={styles.title}>Spirent <span className={styles.fit4Launch}>Fit4Launch</span></h1>
          <p className={styles.subtitle}>T-Mobile Non-Stock Device Test Plan: 5G Auto Call Performance Report |<a href="#" className={styles.link}>Wingtech Plunkett</a></p>
        </div>
        <div className={styles.logoContainer}>
          <img src="/logo.svg" alt="Spirent Logo" className={styles.logo} />
        </div>
      </div>
      <div className={styles.bottomLine}></div>
    </div>
  );
};

export default ReportHeader;