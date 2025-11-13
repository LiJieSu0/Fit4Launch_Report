import React from 'react';
import '../../../../../src/StyleScript/Restricted_Report_Style.css';
import { getKpiCellColor } from '../../../../Utils/KpiRules';

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
          {tableData.map((row, index) => {
            const throughputCategory = row.throughput;
            const dutOverall = tableData.find(d => d.throughput === throughputCategory && d.deviceName === 'DUT')?.overall;
            const refOverall = tableData.find(d => d.throughput === throughputCategory && d.deviceName === 'REF')?.overall;

            let overallCellStyle = { border: '1px solid black', backgroundColor: 'white' };
            if (row.deviceName === 'DUT' && dutOverall && refOverall) {
              const color = getKpiCellColor('Throughput', parseFloat(dutOverall), parseFloat(refOverall));
              if (color) {
                overallCellStyle = { ...overallCellStyle, backgroundColor: color };
              }
            }

            return (
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
                <td style={overallCellStyle}>{row.overall}</td>
                <td style={{ border: '1px solid black', backgroundColor: 'white' }}>{row.site1}</td>
                <td style={{ border: '1px solid black', backgroundColor: 'white' }}>{row.site2}</td>
                <td style={{ border: '1px solid black', backgroundColor: 'white' }}>{row.site3}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DpPlayStoreTable;