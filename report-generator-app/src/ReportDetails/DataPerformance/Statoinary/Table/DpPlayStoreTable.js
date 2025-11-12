import React from 'react';
import '../../../../../src/StyleScript/Restricted_Report_Style.css';
const DpPlayStoreTable = ({ tableData }) => {
  return (
    <div className="">
      <table className="general-table-style">
        <thead>
          <tr>
            <th rowSpan="2">Market</th>
            <th rowSpan="2">Throughput (kbps)</th>
            <th rowSpan="2">Device Name</th>
            <th colSpan="4">Play Store Download Throughput (Mbps)</th>
          </tr>
          <tr>
            <th>Overall</th>
            <th>Site 1</th>
            <th>Site 2</th>
            <th>Site 3</th>
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
              <td style={{ border: '1px solid black', backgroundColor: 'white' }}>{row.overall}</td>
              <td style={{ border: '1px solid black', backgroundColor: 'white' }}>{row.site1}</td>
              <td style={{ border: '1px solid black', backgroundColor: 'white' }}>{row.site2}</td>
              <td style={{ border: '1px solid black', backgroundColor: 'white' }}>{row.site3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DpPlayStoreTable;