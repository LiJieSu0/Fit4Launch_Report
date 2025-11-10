import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import voiceQualityResults from '../../DataFiles/VoiceQualityResults.json';

const VqSummaryPage = () => {
  

  return (
    <div className="page-content">
      <h2>Voice Quality Summary Page</h2>
      <table className="general-table-style">
        <thead>
          <tr>
            <th rowspan="4">Market</th>
            <th rowspan="2">Test cases</th>
            <th colspan="2">MOS AVERAGE</th>
            <th rowspan="2">Results</th>
          </tr>
          <tr>
            <th>DUT AVG.</th>
            <th>REF AVG.</th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Seattle</td>
            <td>5G Auto VoNR Enabled AMR NB VQ</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Seattle</td>
            <td>5G Auto VoNR Enabled AMR WB VQ</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Seattle</td>
            <td>5G Auto VoNR Disabled EVS WB VQ</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Seattle</td>
            <td>5G Auto VoNR Enabled EVS WB VQ</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>

    </div>
  );
};

export default VqSummaryPage;