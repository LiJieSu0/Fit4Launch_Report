import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import voiceQualityResults from '../../DataFiles/VoiceQualityResults.json';

const VqDetailsPage = () => {
  

  return (
    <div>
        <div className="page-content">
            <h2>3.1 5G Auto VoNR Enabled AMR NB VQ</h2>
            {/* 3.1 table area */}
        </div>
        <div className="page-content">
            <h2>3.2 5G Auto VoNR Enabled AMR WB VQ</h2>
            {/* 3.2 table area */}
        </div>
        <div className="page-content">
            <h2>3.3 5G Auto VoNR Disabled EVS WB VQ</h2>
            {/* 3.3 table area */}
        </div>
        <div className="page-content">
            <h2>3.4 5G Auto VoNR Enabled EVS WB VQ</h2>
            {/* 3.4 table area */}
        </div>
    </div>
    
  );
};

export default VqDetailsPage;