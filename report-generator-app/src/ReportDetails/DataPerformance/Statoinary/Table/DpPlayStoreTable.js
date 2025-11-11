import React from 'react';
import '../../../../../src/StyleScript/Restricted_Report_Style.css';

const DpPlayStoreTable = () => {
  const tableData = [
    { market: 'Seattle', throughput: '30MB', deviceName: 'DUT' },
    { market: 'Seattle', throughput: '30MB', deviceName: 'REF' },
    { market: 'Seattle', throughput: '60MB', deviceName: 'DUT' },
    { market: 'Seattle', throughput: '60MB', deviceName: 'REF' },
    { market: 'Seattle', throughput: '100MB', deviceName: 'DUT' },
    { market: 'Seattle', throughput: '100MB', deviceName: 'REF' },
  ];

  return (
    <div className="">
      <table className="general-table-style">
        <thead>
          <tr>
            <th rowSpan="2">Market</th>
            <th rowSpan="2">Throughput (kbps)</th>
            <th rowSpan="2">Device Name</th>
          </tr>
          <tr>
            <th>Overall</th>
            <th>Stationary - Site 1</th>
            <th>Stationary - Site 2</th>
            <th>Stationary - Site 3</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              {index % 2 === 0 && (
                <td rowSpan={2} style={{ border: '1px solid black', backgroundColor: 'white' }}>
                  {row.market}
                </td>
              )}
              {index % 2 === 0 && (
                <td rowSpan={2} style={{ border: '1px solid black', backgroundColor: 'white' }}>
                  {row.throughput}
                </td>
              )}
              <td style={{ border: '1px solid black', backgroundColor: 'white' }}>{row.deviceName}</td>
              <td style={{ border: '1px solid black', backgroundColor: 'white' }}></td>
              <td style={{ border: '1px solid black', backgroundColor: 'white' }}></td>
              <td style={{ border: '1px solid black', backgroundColor: 'white' }}></td>
              <td style={{ border: '1px solid black', backgroundColor: 'white' }}></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DpPlayStoreTable;