import React from "react";
import DpMHSHttpMSTable from "./Table/DpMHSHttpMSTable";
import DpHistogramComponent from "../DpHistogramComponent";
import DpRangeChart from "../DpRangeChart";
import DpThroughputOverallTable from "../DpThroughputOverallTable";
import { ReportContext } from '../../../Contexts/ReportContext';
import { useContext } from 'react';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../Constants/ChartColors';
import DynamicHeader from '../../../CommonPage/DynamicHeader';


import { useEffect } from 'react';

function Dp_MHS_httpMS_Component({ city: propCity }) {
  const { city: globalCity, projectData, loadCityData } = useContext(ReportContext);
  const city = propCity || globalCity;

  useEffect(() => {
    if (city) {
      loadCityData(city);
    }
  }, [city, loadCityData]);

  const reportData = projectData[city];

  if (!reportData) {
    return <div className="page-content">Loading {city} data...</div>;
  }

  if (reportData.dataPerformance === null) {
    return null; // Hide if data is missing
  }

  const nsaData = reportData.dataPerformance['Data Performance']?.['5G AUTO DP']?.['Mobile Hotspot Test']?.['HTTP Multi Stream'];

  // Helper to extract throughput stats safely
  const getStats = (direction, coverage, device) => {
    return nsaData?.[direction]?.[coverage]?.[device]?.['Throughput'] || {};
  };

  const dataDL = {
    Good: {
      DUT: getStats('DL', 'Moderate', 'DUT'),
      REF: getStats('DL', 'Moderate', 'REF'),
    },
    Moderate: {
      DUT: getStats('DL', 'Poor', 'DUT'),
      REF: getStats('DL', 'Poor', 'REF'),
    },
    Poor: {
      DUT: {},
      REF: {},
    }
  };

  const dataUL = {
    Good: {
      DUT: getStats('UL', 'Moderate', 'DUT'),
      REF: getStats('UL', 'Moderate', 'REF'),
    },
    Moderate: {
      DUT: getStats('UL', 'Poor', 'DUT'),
      REF: getStats('UL', 'Poor', 'REF'),
    },
    Poor: {
      DUT: {},
      REF: {},
    }
  };

  const calculateOverall = (dataObj, metric) => {
    const validValues = ['Good', 'Moderate', 'Poor']
      .map(cov => dataObj[cov]?.DUT?.[metric])
      .filter(val => val !== undefined && val !== null);

    if (validValues.length === 0) return 0;
    return validValues.reduce((a, b) => a + b, 0) / validValues.length;
  };

  const calculateOverallRef = (dataObj, metric) => {
    const validValues = ['Good', 'Moderate', 'Poor']
      .map(cov => dataObj[cov]?.REF?.[metric])
      .filter(val => val !== undefined && val !== null);

    if (validValues.length === 0) return 0;
    return validValues.reduce((a, b) => a + b, 0) / validValues.length;
  };

  const overallDownloadDUTMean = calculateOverall(dataDL, 'Mean');
  const overallDownloadREFMean = calculateOverallRef(dataDL, 'Mean');
  const overallUploadDUTMean = calculateOverall(dataUL, 'Mean');
  const overallUploadREFMean = calculateOverallRef(dataUL, 'Mean');

  const overallTableHeader = ["Throughput (Mbps)", "Device Name", "Download", "Upload"];

  // Helper for aggregating stats for table (Average of available coverages)
  const getAggregatedStat = (dataObj, metric, device) => {
    const validValues = ['Good', 'Moderate', 'Poor']
      .map(cov => dataObj[cov]?.[device]?.[metric])
      .filter(val => val !== undefined && val !== null);
    if (validValues.length === 0) return 'N/A';
    return (validValues.reduce((a, b) => a + b, 0) / validValues.length).toFixed(2);
  };

  const combinedOverallTableData = [
    ["Average", "DUT", overallDownloadDUTMean.toFixed(2), overallUploadDUTMean.toFixed(2)],
    ["Average", "REF", overallDownloadREFMean.toFixed(2), overallUploadREFMean.toFixed(2)],
    ["Standard Deviation", "DUT", getAggregatedStat(dataDL, 'Standard Deviation', 'DUT'), getAggregatedStat(dataUL, 'Standard Deviation', 'DUT')],
    ["Standard Deviation", "REF", getAggregatedStat(dataDL, 'Standard Deviation', 'REF'), getAggregatedStat(dataUL, 'Standard Deviation', 'REF')],
    ["Maximum", "DUT", getAggregatedStat(dataDL, 'Maximum', 'DUT'), getAggregatedStat(dataUL, 'Maximum', 'DUT')],
    ["Maximum", "REF", getAggregatedStat(dataDL, 'Maximum', 'REF'), getAggregatedStat(dataUL, 'Maximum', 'REF')],
    ["Minimum", "DUT", getAggregatedStat(dataDL, 'Minimum', 'DUT'), getAggregatedStat(dataUL, 'Minimum', 'DUT')],
    ["Minimum", "REF", getAggregatedStat(dataDL, 'Minimum', 'REF'), getAggregatedStat(dataUL, 'Minimum', 'REF')],
  ];

  // Helper to filter and construct chart data
  const getChartData = (dataObj, overallDUT, overallREF) => {
    const chartData = ['Good', 'Moderate', 'Poor']
      .filter(cov => dataObj[cov]?.DUT?.['Mean'] !== undefined || dataObj[cov]?.REF?.['Mean'] !== undefined)
      .map(cov => ({
        name: cov,
        DUT: dataObj[cov]?.DUT?.['Mean'],
        REF: dataObj[cov]?.REF?.['Mean']
      }));

    chartData.push({ name: 'Overall', DUT: overallDUT, REF: overallREF });
    return chartData;
  };

  const getRangeChartData = (dataObj) => {
    const rangeData = {};
    ['Good', 'Moderate', 'Poor'].forEach(cov => {
      if (dataObj[cov]?.DUT?.['Mean'] !== undefined || dataObj[cov]?.REF?.['Mean'] !== undefined) {
        rangeData[cov] = {
          dutMin: dataObj[cov]?.DUT?.Minimum, dutMax: dataObj[cov]?.DUT?.Maximum, dutMean: dataObj[cov]?.DUT?.Mean,
          refMin: dataObj[cov]?.REF?.Minimum, refMax: dataObj[cov]?.REF?.Maximum, refMean: dataObj[cov]?.REF?.Mean,
        };
      }
    });
    return rangeData;
  };

  const downloadRangeChartData = getRangeChartData(dataDL);

  // Calculate Overall Range Data
  const calculateOverallRange = (rangeData) => {
    const metrics = ['dutMin', 'dutMax', 'dutMean', 'refMin', 'refMax', 'refMean'];
    const result = {};
    metrics.forEach(metric => {
      const values = Object.keys(rangeData)
        .map(cov => rangeData[cov]?.[metric])
        .filter(val => val !== undefined && val !== null);
      result[metric] = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    });
    return result;
  };

  if (Object.keys(downloadRangeChartData).length > 0) {
    downloadRangeChartData.Overall = calculateOverallRange(downloadRangeChartData);
  }

  const uploadRangeChartData = getRangeChartData(dataUL);

  if (Object.keys(uploadRangeChartData).length > 0) {
    uploadRangeChartData.Overall = calculateOverallRange(uploadRangeChartData);
  }

  return (
    <>
      <div className='page-content'>
        <DynamicHeader level={3}>HTTP Multi Stream Test - Mobile Hotspot - {city}</DynamicHeader>
        <h4>MHS Http Multi Stream Overview </h4>
        <DpThroughputOverallTable
          tableHeader={overallTableHeader}
          tableData={combinedOverallTableData}
          kpiRule="Throughput"
          kpiTargetCells={[
            {
              rowIndex: 0,
              colIndex: 2,
              dutValue: overallDownloadDUTMean.toFixed(2),
              refValue: overallDownloadREFMean.toFixed(2),
            },
            {
              rowIndex: 0,
              colIndex: 3,
              dutValue: overallUploadDUTMean.toFixed(2),
              refValue: overallUploadREFMean.toFixed(2),
            },
          ]}
        />
        <DpMHSHttpMSTable data={dataDL} tableName="MHS Http Multi Stream DL Details" kpiRule="Throughput" />
      </div>

      <div className='page-content'>
        <DpHistogramComponent
          data={getChartData(dataDL, overallDownloadDUTMean, overallDownloadREFMean)}
          title="MHS Http Multi Stream Download Throughput"
          yAxisLabel="Throughput"
          barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
        />
        <DpRangeChart
          data={downloadRangeChartData}
          chartTitle="MHS Http Multi Stream Download Throughput Range Chart"
          yAxisTitle="Throughput"
        />
      </div>

      <div className='page-content'>
        <DpMHSHttpMSTable data={dataUL} tableName="MHS Http Multi Stream UL Details" kpiRule="Throughput" />
      </div>

      <div className='page-content'>
        <DpHistogramComponent
          data={getChartData(dataUL, overallUploadDUTMean, overallUploadREFMean)}
          title="MHS Multi Stream HTTP Upload Throughput"
          yAxisLabel="Throughput"
          barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
        />
        <DpRangeChart
          data={uploadRangeChartData}
          chartTitle="MHS Multi Stream HTTP Upload Throughput Range Chart"
          yAxisTitle="Throughput"
        />
      </div>
    </>
  );
}



export default Dp_MHS_httpMS_Component;