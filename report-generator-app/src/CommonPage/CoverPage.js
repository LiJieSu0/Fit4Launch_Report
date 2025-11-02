import React from 'react';
import '../StyleScript/CoverPage.css';

const CoverPage = () => {
  return (
    <div className="cover-page">
      <h1>Report Title</h1>
      <h2>Subtitle or Project Name</h2>
      <p className="author">Prepared by: [Your Name/Organization]</p>
      <p className="date">Date: [Current Date]</p>
      <div className="logo-container">
        {/* Add your logo here */}
        {/* <img src="path/to/your/logo.png" alt="Company Logo" /> */}
      </div>
    </div>
  );
};

export default CoverPage;