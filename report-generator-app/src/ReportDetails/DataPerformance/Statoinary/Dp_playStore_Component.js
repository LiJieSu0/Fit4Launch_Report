import React from 'react';
import DpPlayStoreTable from './Table/DpPlayStoreTable';
import DpPlayStoreOverallTable from './Table/DpPlayStoreOverallTable';
import DpHistogramComponent from '../DpHistogramComponent';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../Constants/ChartColors';
import { ReportContext } from '../../../Contexts/ReportContext';
import { useContext } from 'react';
import DynamicHeader from '../../../CommonPage/DynamicHeader';

const Dp_playStore_Component = () => {
  const { reportData } = useContext(ReportContext);

  if (!reportData || !reportData.dataPerformance) {
    return <div className="page-content">Loading...</div>;
  }

  const playStoreData = reportData.dataPerformance['Data Performance']?.['5G AUTO DP']?.['Play-store app Download'];

  const processData = () => {
    const processed = [];
    const throughputCategories = ['30M', '60M', '100M'];
    const deviceTypes = ['DUT', 'REF'];
    const locations = ['Good', 'Moderate', 'Poor'];

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

  const getHistogramData = (throughputCategory) => {
    const dutData = tableData.find(d => d.throughput === throughputCategory && d.deviceName === 'DUT');
    const refData = tableData.find(d => d.throughput === throughputCategory && d.deviceName === 'REF');

    const histogramData = [
      { name: 'Good', DUT: parseFloat(dutData?.site1), REF: parseFloat(refData?.site1) },
      { name: 'Moderate', DUT: parseFloat(dutData?.site2), REF: parseFloat(refData?.site2) },
      { name: 'Poor', DUT: parseFloat(dutData?.site3), REF: parseFloat(refData?.site3) },
      { name: 'Overall', DUT: parseFloat(dutData?.overall), REF: parseFloat(refData?.overall) },
    ].filter(item => !isNaN(item.DUT) || !isNaN(item.REF)); // Filter out rows with no valid data

    return histogramData;
  };

  const histogramData30M = getHistogramData('30M');
  const histogramData60M = getHistogramData('60M');
  const histogramData100M = getHistogramData('100M');

  const barKeys = [
    { key: 'DUT', fill: CHART_COLOR_DUT },
    { key: 'REF', fill: CHART_COLOR_REF },
  ];

  return (
    <>
      <div className='page-content'>
        <DynamicHeader level={2}>Play-store App Download Test - 5G Auto</DynamicHeader>
        <h4>Play-store App Download Test Overview</h4>
        <DpPlayStoreOverallTable tableData={tableData} />
        <h4>Play-store App Download Test Details</h4>
        <DpPlayStoreTable tableData={tableData} />
      </div>
      <div className='page-content'>

        <DpHistogramComponent
          data={histogramData30M}
          title="Play Store 30M Download Throughput"
          yAxisLabel="Throughput (Mbps)"
          barKeys={barKeys}
        />
        <DpHistogramComponent
          data={histogramData60M}
          title="Play Store 60M Download Throughput"
          yAxisLabel="Throughput (Mbps)"
          barKeys={barKeys}
        />
      </div>

      <div className='page-content'>

        <DpHistogramComponent
          data={histogramData100M}
          title="Play Store 100M Download Throughput"
          yAxisLabel="Throughput (Mbps)"
          barKeys={barKeys}
        />
      </div>
    </>

  );
};

export default Dp_playStore_Component;