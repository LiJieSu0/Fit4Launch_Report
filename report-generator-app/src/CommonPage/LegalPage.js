import React from 'react';
import styles from './LegalPage.module.css';

const LegalPage = ({ number }) => {
  return (
    <div className='page-content'>
      <h2>{number}. Legal Notice</h2>
      <p>
        This report contains confidential and proprietary information belonging to ATMC Labs
        and is provided exclusively for the intended recipient for internal evaluation and TMO Field Performance Test
        verification purposes. Any unauthorized review, use, disclosure, reproduction, distribution, or reliance on the
        contents of this report by persons other than the intended recipient is strictly prohibited. The information, data, and results
        contained herein are based on tests performed under specific conditions defined by ATMC Labs. While every effort
        has been made to ensure accuracy, ATMC Labs provides this information “as is,” without any express or implied warranty,
        including but not limited to warranties of merchantability or fitness for a particular purpose. ATMC Labs shall not be held
        responsible for any loss, damage, or consequence arising from the use or interpretation of the information in this report beyond
        the defined test scope. If you have received this document in error, please notify ATMC Labs immediately and delete all copies
        from your system.
      </p>
      <p>
        THIS DOCUMENT CONTAINS PROPRIETARY INFORMATION, SOME OF WHICH MAY BE LEGALLY PRIVILEGED.
        IT IS INTENDED FOR THE DESIGNATED RECIPIENT ONLY. IF AN ADDRESSING OR TRANSMISSION ERROR HAS MISDIRECTED THIS FILE,
        PLEASE NOTIFY ATMC LABS IMMEDIATELY. UNAUTHORIZED USE, DISCLOSURE, DISTRIBUTION, COPYING, PRINTING,
        OR RELIANCE ON THIS INFORMATION IS STRICTLY PROHIBITED.
      </p>
      <img src="/LegalPage/infoPic.png" alt="legalPic" className={styles.legalImage} style={{ marginBottom: '10px' }} />
      <p>
        30540 SE 84th St, STE 1, Preston, WA 98050 and <br />
        721 Enterprise Dr., Lexington, KY  40510 <br />
        <br />
        Contact: info@atmcl.com <br />
        <br />
        Telephone: +1-858-342-8435
      </p>

    </div>
  );
};

export default LegalPage;