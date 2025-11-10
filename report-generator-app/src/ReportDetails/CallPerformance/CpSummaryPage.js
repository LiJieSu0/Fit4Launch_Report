import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import callPerformanceResults from '../../DataFiles/CallPerformanceResults.json';

const CpSummaryPage = () => {
  const summaryData = Object.keys(callPerformanceResults).map(key => {
    const testName = key.split(' ').slice(2).join(' '); // Extracts "5G Auto VoNR Disabled CP MO Drive"
    const dutFailures = callPerformanceResults[key].DUT.total_retention_failures + callPerformanceResults[key].DUT.total_initiation_failures;
    const refFailures = callPerformanceResults[key].REF.total_retention_failures + callPerformanceResults[key].REF.total_initiation_failures;
    const pValue = callPerformanceResults[key].retention_p_value; // Using retention_p_value as an example
    const result = pValue < 0.05 ? "Fail" : "Pass"; // Example logic for result

    return {
      market: "Seattle",
      test: testName,
      dutFailures: dutFailures,
      refFailures: refFailures,
      pValue: pValue.toFixed(3), // Format to 3 decimal places
      result: result
    };
  });
  return (
    <div className="page-content">
      <h2>Summary Page</h2>
      <table className="general-table-style" style={{ display: 'table' }}>
        <thead style={{ display: 'table-header-group' }}>
          <tr style={{ display: 'table-row' }}>
            <th style={{ display: 'table-cell' }}>Market</th>
            <th style={{ display: 'table-cell' }}>Test</th>
            <th style={{ display: 'table-cell' }}>DUT Failures</th>
            <th style={{ display: 'table-cell' }}>REF Failures</th>
            <th style={{ display: 'table-cell' }}>p-value</th>
            <th style={{ display: 'table-cell' }}>Result</th>
          </tr>
        </thead>
        <tbody style={{ display: 'table-row-group' }}>
          {summaryData.map((data, index) => (
            <tr key={index} style={{ display: 'table-row' }}>
              <td style={{ display: 'table-cell' }}>{data.market}</td>
              <td style={{ display: 'table-cell' }}>{data.test}</td>
              <td style={{ display: 'table-cell' }}>{data.dutFailures}</td>
              <td style={{ display: 'table-cell' }}>{data.refFailures}</td>
              <td style={{ display: 'table-cell' }}>{data.pValue}</td>
              <td style={{ display: 'table-cell', backgroundColor: data.result === 'Pass' ? 'var(--performance-pass)' : 'var(--performance-fail)' }}>{data.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CpSummaryPage;