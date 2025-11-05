import React from 'react';

const LegalPage = () => {
  return (
    <div className='page-content'>
      <h2>Legal Notice</h2>
      <p>
        This report contains confidential and proprietary information belonging to ATMC Labs and is provided
        exclusively for the intended recipient for internal evaluation and Fit-for-Launch (F4L) verification
        purposes. Any unauthorized review, use, disclosure, reproduction, distribution, or reliance on the
        contents of this report by persons other than the intended recipient is strictly prohibited. The
        information, data, and results contained herein are based on tests performed under specific
        conditions defined by ATMC Labs. While every effort has been made to ensure accuracy, ATMCL
        provides this information “as is,” without any express or implied warranty, including but not limited to
        warranties of merchantability or fitness for a particular purpose. ATMCL shall not be held responsible
        for any loss, damage, or consequence arising from the use or interpretation of the information in this
        report beyond the defined test scope. If you have received this document in error, please notify
        ATMCL immediately and delete all copies from your system.
      </p>
      <p>
        THIS DOCUMENT CONTAINS PROPRIETARY INFORMATION, SOME OF WHICH MAY BE
        LEGALLY PRIVILEGED. IT IS INTENDED FOR THE DESIGNATED RECIPIENT ONLY. IF AN
        ADDRESSING OR TRANSMISSION ERROR HAS MISDIRECTED THIS FILE, PLEASE NOTIFY
        ATMCL IMMEDIATELY. UNAUTHORIZED USE, DISCLOSURE, DISTRIBUTION, COPYING,
        PRINTING, OR RELIANCE ON THIS INFORMATION IS STRICTLY PROHIBITED.
      </p>
        <img src="/LegalPage/infoPic.png" alt="legalPic" />

    </div>
  );
};

export default LegalPage;