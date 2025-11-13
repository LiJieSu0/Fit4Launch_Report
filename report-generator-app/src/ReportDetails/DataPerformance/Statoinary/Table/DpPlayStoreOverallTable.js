import React from 'react';

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
        {processedTableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {!row.isMerged && (
              <td rowSpan={row.rowSpan}>
                {row.throughput}
              </td>
            )}
            <td>{row.deviceName}</td>
            <td>{row.overall}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DpPlayStoreOverallTable;