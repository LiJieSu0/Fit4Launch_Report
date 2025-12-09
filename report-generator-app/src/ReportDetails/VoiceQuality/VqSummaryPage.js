import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import voiceQualityResults from '../../DataFiles/VoiceQualityResults.json';

const VqSummaryPage = () => {
  const VqSummaryData = [
    { testCase: '5G Auto VoNR Enabled AMR NB VQ', market: 'Seattle',link:'#2.1', cellColor:'bg-performance-pass' },
    { testCase: '5G Auto VoNR Enabled AMR WB VQ', market: 'Seattle',link:'#2.2', cellColor:'bg-performance-pass' },
    { testCase: '5G Auto VoNR Disabled EVS WB VQ', market: 'Seattle',link:'#2.3', cellColor:'bg-performance-fail' },
    { testCase: '5G Auto VoNR Enabled EVS WB VQ', market: 'Seattle',link:'#2.4', cellColor:'bg-performance-fail' },
    { testCase: 'Auto VoNR Disabled Audio Delay', market: 'Seattle',link:'#2.5', cellColor:'bg-performance-pass' },
    { testCase: 'Auto VoNR Enabled Audio Delay', market: 'Seattle',link:'#2.6', cellColor:'bg-performance-pass' },
  ];

  return (
    <div className="page-content">
      <h2>1. Voice Quality Test Overview</h2>
      <table className="general-table-style">
        <thead>
          <tr>
            <th rowspan="1">Test Cases</th>
            <th rowspan="1">Market</th>
            <th rowspan="1">Results</th>
          </tr>
        </thead>
        <tbody>
          {VqSummaryData.map((data, index) => (
            <tr key={index}>
              <td>{data.testCase}</td>
              <td>{data.market}</td>
              <td className={data.cellColor}><a href={data.link}>Results</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VqSummaryPage;