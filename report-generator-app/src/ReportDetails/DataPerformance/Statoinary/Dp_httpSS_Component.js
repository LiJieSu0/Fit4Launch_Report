import React from 'react';
import DpDetailsTableLoc3 from './Table/DpDetailsTableLoc3';
import DpThroughputOverallTable from '../DpThroughputOverallTable';
import DpRangeChart from '../DpRangeChart';
import DpHistogramComponent from '../DpHistogramComponent';
import DpCDF_Chart from '../DpCDF_Chart';
import { ReportContext } from '../../../Contexts/ReportContext';
import { useContext } from 'react';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../Constants/ChartColors';
import DynamicHeader from '../../../CommonPage/DynamicHeader';

import { useEffect } from 'react';

function Dp_httpSS_Component({ city: propCity, firstSection = false }) {
  const { city: globalCity, projectData, project, loadCityData } = useContext(ReportContext);
  const city = propCity || globalCity;

  useEffect(() => {
    if (city) {
      loadCityData(city);
    }
  }, [city, loadCityData]);

  const reportData = projectData[city];

  // Update to use dataPerformance from the fetched JSON
  if (!reportData) {
    return <div className="page-content">Loading {city} data...</div>;
  }

  if (reportData.dataPerformance === null) {
    return null; // Hide if data is missing
  }

  // Path: ["Data Performance"]["5G AUTO DP"]["HTTP Single Stream"]
  const httpSS_Data_Source = reportData.dataPerformance?.["Data Performance"]?.["5G AUTO DP"]?.["HTTP Single Stream"] || { DL: {}, UL: {} };

  const defaultThroughput = { Mean: 0, "Standard Deviation": 0, Minimum: 0, Maximum: 0 };

  const getThroughput = (dir, category, device) => {
    return httpSS_Data_Source?.[dir]?.[category]?.[device]?.Throughput || defaultThroughput;
  };

  const httpSS_Stationary_DL = {
    Good: {
      DUT: getThroughput('DL', 'Good', 'DUT'),
      REF: getThroughput('DL', 'Good', 'REF'),
    },
    Moderate: {
      DUT: getThroughput('DL', 'Moderate', 'DUT'),
      REF: getThroughput('DL', 'Moderate', 'REF'),
    },
    Poor: {
      DUT: getThroughput('DL', 'Poor', 'DUT'),
      REF: getThroughput('DL', 'Poor', 'REF'),
    },
  };

  const httpSS_Stationary_UL = {
    Good: {
      DUT: getThroughput('UL', 'Good', 'DUT'),
      REF: getThroughput('UL', 'Good', 'REF'),
    },
    Moderate: {
      DUT: getThroughput('UL', 'Moderate', 'DUT'),
      REF: getThroughput('UL', 'Moderate', 'REF'),
    },
    Poor: {
      DUT: getThroughput('UL', 'Poor', 'DUT'),
      REF: getThroughput('UL', 'Poor', 'REF'),
    },
  };

  // Helper to calculate average only for non-zero means (available data)
  const calculateOverallMean = (dataObj, device, field = 'Mean') => {
    const values = [dataObj.Good[device][field], dataObj.Moderate[device][field], dataObj.Poor[device][field]].filter(v => v > 0);
    return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  };

  const calculateOverallMin = (dataObj, device) => {
    const values = [dataObj.Good[device].Minimum, dataObj.Moderate[device].Minimum, dataObj.Poor[device].Minimum].filter(v => v > 0);
    return values.length > 0 ? Math.min(...values) : 0;
  };

  const calculateOverallMax = (dataObj, device) => {
    const values = [dataObj.Good[device].Maximum, dataObj.Moderate[device].Maximum, dataObj.Poor[device].Maximum].filter(v => v > 0);
    return values.length > 0 ? Math.max(...values) : 0;
  };

  const dlRangeChartData = {
    Good: {
      dutMin: httpSS_Stationary_DL.Good.DUT.Minimum,
      dutMax: httpSS_Stationary_DL.Good.DUT.Maximum,
      refMin: httpSS_Stationary_DL.Good.REF.Minimum,
      refMax: httpSS_Stationary_DL.Good.REF.Maximum,
      dutMean: httpSS_Stationary_DL.Good.DUT.Mean,
      refMean: httpSS_Stationary_DL.Good.REF.Mean,
    },
    Moderate: {
      dutMin: httpSS_Stationary_DL.Moderate.DUT.Minimum,
      dutMax: httpSS_Stationary_DL.Moderate.DUT.Maximum,
      refMin: httpSS_Stationary_DL.Moderate.REF.Minimum,
      refMax: httpSS_Stationary_DL.Moderate.REF.Maximum,
      dutMean: httpSS_Stationary_DL.Moderate.DUT.Mean,
      refMean: httpSS_Stationary_DL.Moderate.REF.Mean,
    },
    Poor: {
      dutMin: httpSS_Stationary_DL.Poor.DUT.Minimum,
      dutMax: httpSS_Stationary_DL.Poor.DUT.Maximum,
      refMin: httpSS_Stationary_DL.Poor.REF.Minimum,
      refMax: httpSS_Stationary_DL.Poor.REF.Maximum,
      dutMean: httpSS_Stationary_DL.Poor.DUT.Mean,
      refMean: httpSS_Stationary_DL.Poor.REF.Mean,
    },
    Overall: {
      dutMin: calculateOverallMin(httpSS_Stationary_DL, 'DUT'),
      dutMax: calculateOverallMax(httpSS_Stationary_DL, 'DUT'),
      refMin: calculateOverallMin(httpSS_Stationary_DL, 'REF'),
      refMax: calculateOverallMax(httpSS_Stationary_DL, 'REF'),
      dutMean: calculateOverallMean(httpSS_Stationary_DL, 'DUT'),
      refMean: calculateOverallMean(httpSS_Stationary_DL, 'REF'),
    },
  };

  const ulRangeChartData = {
    Good: {
      dutMin: httpSS_Stationary_UL.Good.DUT.Minimum,
      dutMax: httpSS_Stationary_UL.Good.DUT.Maximum,
      refMin: httpSS_Stationary_UL.Good.REF.Minimum,
      refMax: httpSS_Stationary_UL.Good.REF.Maximum,
      dutMean: httpSS_Stationary_UL.Good.DUT.Mean,
      refMean: httpSS_Stationary_UL.Good.REF.Mean,
    },
    Moderate: {
      dutMin: httpSS_Stationary_UL.Moderate.DUT.Minimum,
      dutMax: httpSS_Stationary_UL.Moderate.DUT.Maximum,
      refMin: httpSS_Stationary_UL.Moderate.REF.Minimum,
      refMax: httpSS_Stationary_UL.Moderate.REF.Maximum,
      dutMean: httpSS_Stationary_UL.Moderate.DUT.Mean,
      refMean: httpSS_Stationary_UL.Moderate.REF.Mean,
    },
    Poor: {
      dutMin: httpSS_Stationary_UL.Poor.DUT.Minimum,
      dutMax: httpSS_Stationary_UL.Poor.DUT.Maximum,
      refMin: httpSS_Stationary_UL.Poor.REF.Minimum,
      refMax: httpSS_Stationary_UL.Poor.REF.Maximum,
      dutMean: httpSS_Stationary_UL.Poor.DUT.Mean,
      refMean: httpSS_Stationary_UL.Poor.REF.Mean,
    },
    Overall: {
      dutMin: calculateOverallMin(httpSS_Stationary_UL, 'DUT'),
      dutMax: calculateOverallMax(httpSS_Stationary_UL, 'DUT'),
      refMin: calculateOverallMin(httpSS_Stationary_UL, 'REF'),
      refMax: calculateOverallMax(httpSS_Stationary_UL, 'REF'),
      dutMean: calculateOverallMean(httpSS_Stationary_UL, 'DUT'),
      refMean: calculateOverallMean(httpSS_Stationary_UL, 'REF'),
    },
  };

  const dlHistogramData = [
    { name: 'Good', DUT: httpSS_Stationary_DL.Good.DUT.Mean, REF: httpSS_Stationary_DL.Good.REF.Mean },
    { name: 'Moderate', DUT: httpSS_Stationary_DL.Moderate.DUT.Mean, REF: httpSS_Stationary_DL.Moderate.REF.Mean },
    { name: 'Poor', DUT: httpSS_Stationary_DL.Poor.DUT.Mean, REF: httpSS_Stationary_DL.Poor.REF.Mean },
    {
      name: 'Overall',
      DUT: calculateOverallMean(httpSS_Stationary_DL, 'DUT'),
      REF: calculateOverallMean(httpSS_Stationary_DL, 'REF')
    },
  ];

  const ulHistogramData = [
    { name: 'Good', DUT: httpSS_Stationary_UL.Good.DUT.Mean, REF: httpSS_Stationary_UL.Good.REF.Mean },
    { name: 'Moderate', DUT: httpSS_Stationary_UL.Moderate.DUT.Mean, REF: httpSS_Stationary_UL.Moderate.REF.Mean },
    { name: 'Poor', DUT: httpSS_Stationary_UL.Poor.DUT.Mean, REF: httpSS_Stationary_UL.Poor.REF.Mean },
    {
      name: 'Overall',
      DUT: calculateOverallMean(httpSS_Stationary_UL, 'DUT'),
      REF: calculateOverallMean(httpSS_Stationary_UL, 'REF')
    },
  ];

  const overallTableHeader = ["Throughput", "Device Name", "Download", "Upload"];
  const combinedOverallTableData = [
    ["Average (Mbps)", "DUT", calculateOverallMean(httpSS_Stationary_DL, 'DUT').toFixed(2), calculateOverallMean(httpSS_Stationary_UL, 'DUT').toFixed(2)],
    ["Average (Mbps)", "REF", calculateOverallMean(httpSS_Stationary_DL, 'REF').toFixed(2), calculateOverallMean(httpSS_Stationary_UL, 'REF').toFixed(2)],
    ["Standard Deviation (Mbps)", "DUT", calculateOverallMean(httpSS_Stationary_DL, 'DUT', 'Standard Deviation').toFixed(2), calculateOverallMean(httpSS_Stationary_UL, 'DUT', 'Standard Deviation').toFixed(2)],
    ["Standard Deviation (Mbps)", "REF", calculateOverallMean(httpSS_Stationary_DL, 'REF', 'Standard Deviation').toFixed(2), calculateOverallMean(httpSS_Stationary_UL, 'REF', 'Standard Deviation').toFixed(2)],
    ["Maximum (Mbps)", "DUT", calculateOverallMax(httpSS_Stationary_DL, 'DUT').toFixed(2), calculateOverallMax(httpSS_Stationary_UL, 'DUT').toFixed(2)],
    ["Maximum (Mbps)", "REF", calculateOverallMax(httpSS_Stationary_DL, 'REF').toFixed(2), calculateOverallMax(httpSS_Stationary_UL, 'REF').toFixed(2)],
    ["Minimum (Mbps)", "DUT", calculateOverallMin(httpSS_Stationary_DL, 'DUT').toFixed(2), calculateOverallMin(httpSS_Stationary_UL, 'DUT').toFixed(2)],
    ["Minimum (Mbps)", "REF", calculateOverallMin(httpSS_Stationary_DL, 'REF').toFixed(2), calculateOverallMin(httpSS_Stationary_UL, 'REF').toFixed(2)],
  ];



  const barKeys = [
    { key: 'DUT', fill: CHART_COLOR_DUT },
    { key: 'REF', fill: CHART_COLOR_REF },
  ];
  console.log("DUT value" + httpSS_Stationary_DL.Good.DUT);
  return (
    <>
      <div className='page-content'>
        {firstSection && <DynamicHeader level={1} style={{ textAlign: 'center' }}>Data Performance - 5G Auto </DynamicHeader>}
        <DynamicHeader level={2}>HTTP Single Stream Test Download & Upload - 5G Auto - {city}</DynamicHeader>
        <h4>Http Single Stream Overview</h4>
        <DpThroughputOverallTable
          tableHeader={overallTableHeader}
          tableData={combinedOverallTableData}
          kpiRule="Throughput"
          kpiTargetCells={[
            {
              rowIndex: 0,
              colIndex: 2,
              dutValue: calculateOverallMean(httpSS_Stationary_DL, 'DUT').toFixed(2),
              refValue: calculateOverallMean(httpSS_Stationary_DL, 'REF').toFixed(2),
            },
            {
              rowIndex: 0,
              colIndex: 3,
              dutValue: calculateOverallMean(httpSS_Stationary_UL, 'DUT').toFixed(2),
              refValue: calculateOverallMean(httpSS_Stationary_UL, 'REF').toFixed(2),
            },
          ]}
        />

        <DpDetailsTableLoc3
          data={httpSS_Stationary_DL}
          tableName="Http Single Stream DL Details"
          kpiRule="Throughput"
          kpiTargetCells={[
            {
              dutValue: calculateOverallMean(httpSS_Stationary_DL, 'DUT'),
              refValue: calculateOverallMean(httpSS_Stationary_DL, 'REF'),
            },
          ]}
        />
        {/* <DpCDF_Chart
          project={project}
          city={city}
          dutFilename="5g_auto_dp_http_single_stream_dl_good_dut.json"
          refFilename="5g_auto_dp_http_single_stream_dl_good_ref.json"
          title="HTTP SS DL Good CDF (DUT vs REF)"
        /> */}

      </div>
      <div className='page-content'>
        <DpHistogramComponent
          data={dlHistogramData}
          title="Http Single Stream Download Throughput"
          yAxisLabel="Throughput (Mbps)"
          barKeys={barKeys}
        />
        <DpRangeChart
          data={dlRangeChartData}
          chartTitle="Http Single Stream Download Throughput Range"
          yAxisTitle="Throughput (Mbps)"
        />
      </div>

      <div className='page-content'>

        <DpDetailsTableLoc3
          data={httpSS_Stationary_UL}
          tableName="Http Single Stream UL Details"
          kpiRule="Throughput"
          kpiTargetCells={[
            {
              dutValue: calculateOverallMean(httpSS_Stationary_UL, 'DUT'),
              refValue: calculateOverallMean(httpSS_Stationary_UL, 'REF'),
            },
          ]}
        />
        <DpHistogramComponent
          data={ulHistogramData}
          title="Http Single Stream Upload Throughput"
          yAxisLabel="Throughput (Mbps)"
          barKeys={barKeys}
        />
      </div>

      <div className='page-content'>

        <DpRangeChart
          data={ulRangeChartData}
          chartTitle="Http Single Stream Upload Throughput Range"
          yAxisTitle="Throughput (Mbps)"
        />
      </div>

    </>

  );
}

export default Dp_httpSS_Component;