import React from "react";
import DpMHSHttpMSTable from "./Table/DpMHSHttpMSTable";
import DpHistogramComponent from "../DpHistogramComponent";
import DpBoxPlot from '../Statoinary/DpBoxPlot';
import DpThroughputOverallTable from "../DpThroughputOverallTable";
import { ReportContext } from '../../../Contexts/ReportContext';
import { useContext } from 'react';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../Constants/ChartColors';
import DynamicHeader from '../../../CommonPage/DynamicHeader';
import PageBreak from '../../../CommonPage/PageBreak';


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
    return <PageBreak>Loading {city} data...</PageBreak>;
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

  const getBoxPlotData = (dataSource) => {
    const categories = ['Good', 'Moderate', 'Poor'];
    const plotData = [];

    categories.forEach(cat => {
      ['DUT', 'REF'].forEach(dev => {
        const stats = dataSource?.[cat]?.[dev];
        // Skip if no data or Mean is missing/zero
        if (!stats || !stats.Mean) return;

        let min = stats.Minimum;
        let max = stats.Maximum;
        let q1 = stats.Q1;
        let median = stats.Median;
        let q3 = stats.Q3;
        let outliers = stats.Outliers || [];

        // Fallback estimation if Q1 is missing
        if (q1 === undefined) {
          const mean = stats.Mean;
          const stdDev = stats['Standard Deviation'];
          median = mean;
          q1 = Math.max(min, mean - 0.675 * stdDev);
          q3 = Math.min(max, mean + 0.675 * stdDev);
        }

        plotData.push({
          x: `${cat} (${dev})`,
          min, q1, median, q3, max, outliers
        });
      });
    });
    return plotData;
  };

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



  return (
    <>
      <PageBreak>
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
      </PageBreak>

      <PageBreak>
        <DpHistogramComponent
          data={getChartData(dataDL, overallDownloadDUTMean, overallDownloadREFMean)}
          title="MHS Http Multi Stream Download Throughput"
          yAxisLabel="Throughput"
          barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
        />
        <DpBoxPlot
          data={getBoxPlotData(dataDL)}
          title="MHS Http Multi Stream Download Throughput Box Plot"
          yAxisLabel="Throughput"
        />
      </PageBreak>

      <PageBreak>
        <DpMHSHttpMSTable data={dataUL} tableName="MHS Http Multi Stream UL Details" kpiRule="Throughput" />
      </PageBreak>

      <PageBreak>
        <DpHistogramComponent
          data={getChartData(dataUL, overallUploadDUTMean, overallUploadREFMean)}
          title="MHS Multi Stream HTTP Upload Throughput"
          yAxisLabel="Throughput"
          barKeys={[{ key: 'DUT', fill: CHART_COLOR_DUT }, { key: 'REF', fill: CHART_COLOR_REF }]}
        />
        <DpBoxPlot
          data={getBoxPlotData(dataUL)}
          title="MHS Multi Stream HTTP Upload Throughput Box Plot"
          yAxisLabel="Throughput"
        />
      </PageBreak>
    </>
  );
}



export default Dp_MHS_httpMS_Component;