import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import { useReportData } from '../../Contexts/ReportContext';

const CpSummaryPage = () => {
  const { reportData, loading, error } = useReportData();

  if (loading) return <div>Loading Call Performance Summary...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!reportData || !reportData.callPerformance) return <div>No Call Performance data available.</div>;

  const callPerformanceResults = reportData.callPerformance['Call Performance'];

  const summaryData = Object.keys(callPerformanceResults).map(key => {
    const testName = key.split(' ').slice(2).join(' '); // Extracts "5G Auto VoNR Disabled CP MO Drive"
    const dataEntry = callPerformanceResults[key];

    // Safely access properties, providing default values if undefined
    const dutFailures = (dataEntry?.DUT?.total_retention_failures || 0) + (dataEntry?.DUT?.total_initiation_failures || 0);
    const refFailures = (dataEntry?.REF?.total_retention_failures || 0) + (dataEntry?.REF?.total_initiation_failures || 0);
    return {
      market: "Seattle",
      test: testName,
    };
  });
  return (
    <div className="page-content">
      <h2>1. Call Performance Overview</h2>
      <table className="general-table-style" style={{ display: 'table' }}>
        <thead style={{ display: 'table-header-group' }}>
          <tr style={{ display: 'table-row' }}>
            <th style={{ display: 'table-cell' }}>Test</th>
            <th style={{ display: 'table-cell' }}>Market</th>
          </tr>
        </thead>
        <tbody style={{ display: 'table-row-group' }}>
          {summaryData.map((data, index) => (
            <tr key={index} style={{ display: 'table-row' }}>
              <td style={{ display: 'table-cell' }}>{data.test}</td>
              <td style={{ display: 'table-cell' }}>{data.market}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CpSummaryPage;