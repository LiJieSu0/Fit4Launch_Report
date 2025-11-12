import React from 'react';
import DpPlayStoreTable from './Table/DpPlayStoreTable';
import playStoreData from '../../../DataFiles/SA/DpPlayStoreResults/Play Store.json';

const Dp_playStore_Component = () => {
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
      <div className='page-content'>
        <h2>Play-store app download test - 5G NR</h2>
        <DpPlayStoreTable tableData={tableData} />
      </div>
  );
};

export default Dp_playStore_Component;