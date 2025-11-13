import React from 'react';
import { getKpiCellColor } from '../../../../Utils/KpiRules';

const DpPlayStoreOverallTable = ({ tableData }) => {
  if (!tableData || tableData.length === 0) {
    return <p>No overall table data available.</p>;
  }

  const processedTableData = [];
  const throughputCategories = [...new Set(tableData.map(item => item.throughput))];

  throughputCategories.forEach(throughput => {
    const dutData = tableData.find(d => d.throughput === throughput && d.deviceName === 'DUT');
    const refData = tableData.find(d => d.throughput === throughput && d.deviceName === 'REF');

    const currentThroughputRows = [];
    if (dutData) {
      currentThroughputRows.push({
        throughput: `${throughput} (kbps)`,
        deviceName: 'DUT',
        overall: dutData.overall,
      });
    }
    if (refData) {
      currentThroughputRows.push({
        throughput: `${throughput} (kbps)`,
        deviceName: 'REF',
        overall: refData.overall,
      });
    }

    currentThroughputRows.forEach((row, index) => {
      processedTableData.push({
        ...row,
        rowSpan: index === 0 ? currentThroughputRows.length : 0,
        isMerged: index !== 0,
      });
    });
  });

  return (
    <table className="general-table-style">
      <thead>
        <tr>
          <th rowSpan={2}>Throughput (kbps)</th>
          <th rowSpan={2}>Device Name</th>
          <th>Seattle (5G NR)</th>
        </tr>
        <tr>
          <th>Overall</th>

        </tr>
      </thead>
      <tbody>
        {processedTableData.map((row, rowIndex) => {
          const throughputCategory = row.throughput.split(' ')[0]; // e.g., "30M" from "30M (kbps)"
          const dutOverall = tableData.find(d => d.throughput === throughputCategory && d.deviceName === 'DUT')?.overall;
          const refOverall = tableData.find(d => d.throughput === throughputCategory && d.deviceName === 'REF')?.overall;

          let cellStyle = {};
          if (row.deviceName === 'DUT' && dutOverall && refOverall) {
            const color = getKpiCellColor('Throughput', parseFloat(dutOverall), parseFloat(refOverall));
            if (color) {
              cellStyle = { backgroundColor: color };
            }
          }

          return (
            <tr key={rowIndex}>
              {!row.isMerged && (
                <td rowSpan={row.rowSpan}>
                  {row.throughput}
                </td>
              )}
              <td>{row.deviceName}</td>
              <td style={cellStyle}>{row.overall}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DpPlayStoreOverallTable;