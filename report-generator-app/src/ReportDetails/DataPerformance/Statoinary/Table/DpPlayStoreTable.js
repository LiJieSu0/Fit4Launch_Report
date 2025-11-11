import React from 'react';
import '../../../../../src/StyleScript/Restricted_Report_Style.css';
import playStoreData from '../../../../DataFiles/SA/DpPlayStoreResults/Play Store.json';

const DpPlayStoreTable = () => {
  const processData = () => {
    const processed = [];
    const throughputCategories = ['30M', '60M', '100M'];
    const deviceTypes = ['DUT', 'REF'];
    const locations = ['location1', 'location2', 'location3'];

    throughputCategories.forEach(throughput => {
      deviceTypes.forEach(device => {
        const rowData = {
          market: 'Seattle', // Assuming market is always Seattle for now
          throughput: throughput,
          deviceName: device,
          site1: null,
          site2: null,
          site3: null,
          overall: null,
        };

        let siteThroughputs = [];

        locations.forEach((location, index) => {
          const siteKey = `site${index + 1}`;
          if (playStoreData[location] && playStoreData[location][device] && playStoreData[location][device][throughput]) {
            const dataKey = Object.keys(playStoreData[location][device][throughput])[0];
            const value = playStoreData[location][device][throughput][dataKey].overall_average_throughput;
            rowData[siteKey] = value !== undefined ? value.toFixed(2) : 'N/A';
            if (value !== undefined) {
              siteThroughputs.push(value);
            }
          } else {
            rowData[siteKey] = 'N/A';
          }
        });

        if (siteThroughputs.length > 0) {
          const sum = siteThroughputs.reduce((acc, val) => acc + val, 0);
          rowData.overall = (sum / siteThroughputs.length).toFixed(2);
        } else {
          rowData.overall = 'N/A';
        }
        processed.push(rowData);
      });
    });
    return processed;
  };

  const tableData = processData();

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