import React from 'react';
import DpSummaryTable from './DpSummaryTable';
import DataPerformanceResults from '../../DataFiles/DataPerformanceResults.json';


//TODO summary page cell link
function DpSummaryPage() {
  const extractThroughput = (path, direction) => {
    const value = path?.Throughput?.[direction]?.Mean || path?.Throughput?.Mean;
    const className = value > 100 ? 'average-fail' : 'average-pass'; // Placeholder logic
    return { label: value ? value.toFixed(2) : 'N/A', className, link: "#" };
  };
  const httpSSData = {
    headers: [
      { label: "HTTP Single Stream Test Download & Upload - 5G Auto", rowSpan: 2 },
      { label: "Market", rowSpan: 2 },
      { label: "Download", rowSpan: 1 },
      { label: "Upload", rowSpan: 1 },
    ],
    rows: [
      {
        cells: [
          { label: "Mean Throughput" },
          { label: "Seattle (5G NR)" },
          {label:'Result',className:'bg-performance-pass',link:'#2.1'},
          {label:'Result',className:'bg-performance-pass',link:'#2.1'}
        ],
      },
    ],
  };

  const httpMSData = {
    headers: [
      { label: "HTTP Multi Stream Test Download & Upload - 5G Auto", rowSpan: 2 },
      { label: "Market", rowSpan: 2 },
      { label: "Download", rowSpan: 1 },
      { label: "Upload", rowSpan: 1 },
    ],
    rows: [
      {
        cells: [
          { label: "Mean Throughput" },
          { label: "Seattle (5G NR)" },
          {label:'Result',className:'bg-performance-pass',link:'#2.2'},
          {label:'Result',className:'bg-performance-marginal-fail',link:'#2.2'}
        ],
      },
    ],
  };

  const udpData = {
    headers: [
      { label: "UDP Test - 5G Auto", rowSpan: 2 },
      { label: "Market", rowSpan: 2 },
      { label: "Download", rowSpan: 1 },
      { label: "Upload", rowSpan: 1 },
    ],
    rows: [
      {
        cells: [
          { label: "Mean Throughput" },
          { label: "Seattle (5G NR)", rowSpan: 3 },
          {label:'Result',className:'bg-performance-pass',link:'#2.3DL'},
          {label:'Result',className:'bg-performance-pass',link:'#2.3UL'}
        ],
      },
      {
        cells: [
          { label: "Mean Jitter" },
          null, // Placeholder for the merged 'Market' cell
          { label: "Result", className: "bg-performance-pass", link: "#2.3DL" },
          { label: "Result", className: "bg-performance-pass", link: "#2.3UL" },
        ],
      },
      {
        cells: [
          { label: "Packet Failure Rate" },
          null, // Placeholder for the merged 'Market' cell
          { label: "Result", className: "bg-performance-pass", link: "#2.3DL" },
          { label: "Result", className: "bg-performance-pass", link: "#2.3UL" },
        ],
      },
    ],
  };

  const pingData = {
    headers: [
      { label: "Ping Test - 5G Auto", rowSpan: 2 },
      { label: "Market", rowSpan: 2 },
      { label: "RTT", rowSpan: 1 },
    ],
    rows: [
      {
        cells: [
          { label: "Mean Round Trip Time" },
          { label: "Seattle (5G NR)" },
          {label:'Result',className:'bg-performance-fail',link:'#2.4'},
        ],
      },
    ],
  };

  const webBrowserData = {
    headers: [
      { label: "Web Browser Test - 5G Auto", rowSpan: 2 },
      { label: "Market", rowSpan: 2 },
      { label: "Load Time", rowSpan: 1 },
    ],
    rows: [
      {
        cells: [
          { label: "Average Page Load Time" },
          { label: "Seattle (5G NR)" },
          {label:'Result',className:'bg-performance-pass',link:'#2.5'},
        ],
      },
    ],
  };

  const playStoreData = {
    headers: [
      { label: "Play-store App Download Test - 5G Auto", rowSpan: 2 },
      { label: "Market", rowSpan: 2 },
      { label: "30M", rowSpan: 1 },
      { label: "60M", rowSpan: 1 },
      { label: "100M", rowSpan: 1 },

    ],
    rows: [
      {
        cells: [
          { label: "Mean Throughput" },
          { label: "Seattle (5G NR)" },
          {label:'Result',className:'bg-performance-fail',link:'#2.6'},
          {label:'Result',className:'bg-performance-fail',link:'#2.6'},
          {label:'Result',className:'bg-performance-fail',link:'#2.6'},

        ],
      },
    ],
  };

  const mhsHttpSSData = {
    headers: [
      { label: "MHS-HTTP Single Stream Test", rowSpan: 2 },
      { label: "Market", rowSpan: 2 },
      { label: "Download", rowSpan: 1 },
      { label: "Upload", rowSpan: 1 },
    ],
    rows: [
      {
        cells: [
          { label: "Mean Throughput" },
          { label: "Seattle (5G NR)" },
          {label:'Result',className:'bg-performance-fail',link:'#2.7.1'},
          {label:'Result',className:'bg-performance-marginal-fail',link:'#2.7.1'}
        ],
      },
    ],
  };

  const mhsHttpMSData = {
    headers: [
      { label: "MHS-HTTP Multi Stream Test", rowSpan: 2 },
      { label: "Market", rowSpan: 2 },
      { label: "Download", rowSpan: 1 },
      { label: "Upload", rowSpan: 1 },
    ],
    rows: [
      {
        cells: [
          { label: "Mean Throughput" },
          { label: "Seattle (5G NR)" },
          {label:'Result',className:'bg-performance-pass',link:'#2.7.2'},
          {label:'Result',className:'bg-performance-pass',link:'#2.7.2'}
        ],
      },
    ],
  };

  const mhsUdpData = {
    headers: [
      { label: "MHS-UDP Test", rowSpan: 2 },
      { label: "Market", rowSpan: 2 },
      { label: "Download", rowSpan: 1 },
      { label: "Upload", rowSpan: 1 },
    ],
    rows: [
      {
        cells: [
          { label: "Mean Throughput" },
          { label: "Seattle (5G NR)", rowSpan: 3 },
          {label:'Result',className:'bg-performance-marginal-fail',link:'#2.7.3DL'},
          {label:'Result',className:'bg-performance-pass',link:'#2.7.3UL'}
        ],
      },
      {
        cells: [
          { label: "Mean Jitter" },
          null, // Placeholder for the merged 'Market' cell
          { label: "Result", className: "bg-performance-pass", link: "#2.7.3DL" },
          { label: "Result", className: "bg-performance-pass", link: "#2.7.3UL" },
        ],
      },
      {
        cells: [
          { label: "Packet Failure Rate" },
          null, // Placeholder for the merged 'Market' cell
          { label: "Result", className: "bg-performance-pass", link: "#2.7.3DL" },
          { label: "Result", className: "bg-performance-pass", link: "#2.7.3UL" },
        ],
      },
    ],
  };


  const mhsPingData = {
    headers: [
      { label: "MHS-Ping Test", rowSpan: 2 },
      { label: "Market", rowSpan: 2 },
      { label: "RTT", rowSpan: 1 },
    ],
    rows: [
      {
        cells: [
          { label: "Mean Round Trip Time" },
          { label: "Seattle (5G NR)" },
          {label:'Result',className:'bg-performance-pass',link:'#2.7.4'},
        ],
      },
    ],
  };

  const mobiltyData = {
    headers: [
      { label: "Mobility Test - 5G Auto", rowSpan: 2 },
      { label: "Market", rowSpan: 2 },
      { label: "Value", rowSpan: 1 },
    ],
    rows: [
      {
        cells: [
          { label: "Mean Throughput" },
          { label: "Seattle (5G NR)", rowSpan: 4 },
          {label:'Result',className:'average-pass',link:'#2.8'},
        ],
      },
      {
        cells: [
          { label: "Mean Jitter" },
          null, // Placeholder for the merged 'Market' cell
          { label: "Result", className: "bg-performance-pass", link: "#2.8" },
        ],
      },
      {
        cells: [
          { label: "Packet Failure Rate" },
          null, // Placeholder for the merged 'Market' cell
          { label: "Result", className: "bg-performance-pass", link: "#2.8" },
        ],
      },
      {
        cells: [
          { label: "Ping RTT" },
          null, // Placeholder for the merged 'Market' cell
          { label: "Result", className: "bg-performance-pass", link: "#2.8" },
        ],
      },
    ],
  };
  
// TODO MHS tables add
  const mobiltyMHSData = {
    headers: [
      { label: "Mobility test - MHS", rowSpan: 2 },
      { label: "Market", rowSpan: 2 },
      { label: "Download", rowSpan: 1 },
      { label: "Upload", rowSpan: 1 },
    ],
    rows: [
      {
        cells: [
          { label: "Mean Throughput" },
          { label: "Seattle (5G NR)" },
          {label:'Result',className:'average-fail',link:'#'},
          {label:'Result',className:'average-fail',link:'#'}
        ],
      },
    ],
  };

  const mrabData = {
    headers: [
      { label: "VoNR MRAB Stationary Test - 5G Auto", rowSpan: 2 },
      { label: "Market", rowSpan: 2 },
      { label: "Download", rowSpan: 1 },
      { label: "Upload", rowSpan: 1 },
    ],
    rows: [
      {
        cells: [
          { label: "Data Throughput Average" },
          { label: "Seattle (5G NR)" },
          {label:'Result',className:'average-fail',link:'#'},
          {label:'Result',className:'average-fail',link:'#'}
        ],
      },
    ],
  };

  // NSA DATA
   const httpNSASSData = {
    headers: [
      { label: "HTTP Single Stream Test Download & Upload - 5G NSA", rowSpan: 2 },
      { label: "Market", rowSpan: 2 },
      { label: "Download", rowSpan: 1 },
      { label: "Upload", rowSpan: 1 },
    ],
    rows: [
      {
        cells: [
          { label: "Data Throughput Average" },
          { label: "Seattle (5G NSA)" },
          {label:'Result',className:'average-fail',link:'#'},
          {label:'Result',className:'average-fail',link:'#'}
        ],
      },
    ],
  };

  const httpNSAMSData = {
    headers: [
      { label: "HTTP Multi Stream Test Download & Upload - 5G NSA", rowSpan: 2 },
      { label: "Market", rowSpan: 2 },
      { label: "Download", rowSpan: 1 },
      { label: "Upload", rowSpan: 1 },
    ],
    rows: [
      {
        cells: [
          { label: "Data Throughput Average" },
          { label: "Seattle (5G NSA)" },
          {label:'Result',className:'average-fail',link:'#'},
          {label:'Result',className:'average-fail',link:'#'}
        ],
      },
    ],
  };

  const udpNSAData = {
    headers: [
      { label: "UDP Test - 5G NSA", rowSpan: 2 },
      { label: "Market", rowSpan: 2 },
      { label: "Download", rowSpan: 1 },
      { label: "Upload", rowSpan: 1 },
    ],
    rows: [
      {
        cells: [
          { label: "Mean Throughput" },
          { label: "Seattle (5G NSA)", rowSpan: 3 },
          {label:'Result',className:'average-fail',link:'#'},
          {label:'Result',className:'average-fail',link:'#'}
        ],
      },
      {
        cells: [
          { label: "Mean Jitter" },
          null, // Placeholder for the merged 'Market' cell
          { label: "Result", className: "average-fail", link: "#" },
          { label: "Result", className: "average-fail", link: "#" },
        ],
      },
      {
        cells: [
          { label: "Packet Failure Rate (%)" },
          null, // Placeholder for the merged 'Market' cell
          { label: "Result", className: "average-fail", link: "#" },
          { label: "Result", className: "average-fail", link: "#" },
        ],
      },
    ],
  };

  const pingNSAData = {
    headers: [
      { label: "Ping Test - 5G NSA", rowSpan: 2 },
      { label: "Market", rowSpan: 2 },
      { label: "Download", rowSpan: 1 },
      { label: "Upload", rowSpan: 1 },
    ],
    rows: [
      {
        cells: [
          { label: "Mean Round Trip Time(ms)" },
          { label: "Seattle (5G NSA)" },
          {label:'Result',className:'average-fail',link:'#'},
          {label:'Result',className:'average-fail',link:'#'}
        ],
      },
    ],
  };
  const mobiltyNSAData = {
    headers: [
      { label: "Mobility Test - 5G NSA", rowSpan: 2 },
      { label: "Market", rowSpan: 2 },
      { label: "Download", rowSpan: 1 },
      { label: "Upload", rowSpan: 1 },
    ],
    rows: [
      {
        cells: [
          { label: "Data Throughput Average" },
          { label: "Seattle (5G NSA)" },
          {label:'Result',className:'average-fail',link:'#'},
          {label:'Result',className:'average-fail',link:'#'}
        ],
      },
    ],
  };



  return (
    <div>
      <div className='page-content'>
        <h2>1. Data Performance Overview – All Network</h2>
        <h3>Data Performance Overview – 5G Auto</h3>
        <DpSummaryTable tableData={httpSSData} />
        <DpSummaryTable tableData={httpMSData} />
        <DpSummaryTable tableData={udpData} />
        <DpSummaryTable tableData={pingData} />
        <DpSummaryTable tableData={webBrowserData} />
        <DpSummaryTable tableData={playStoreData} />
        <DpSummaryTable tableData={mhsHttpSSData} />
        <DpSummaryTable tableData={mhsHttpMSData} />
        <DpSummaryTable tableData={mhsUdpData} />
        <DpSummaryTable tableData={mhsPingData} />

        
        <DpSummaryTable tableData={mobiltyData} />
        <DpSummaryTable tableData={mobiltyMHSData} />
        <DpSummaryTable tableData={mrabData} />
      </div>
      <div className='page-content'>
        <h3>Data Performance Overview – 5G NSA</h3>
        <DpSummaryTable tableData={httpNSASSData} />
        <DpSummaryTable tableData={httpNSAMSData} />
        <DpSummaryTable tableData={udpNSAData} />
        <DpSummaryTable tableData={pingNSAData} />
        <DpSummaryTable tableData={mobiltyNSAData} />
      </div>

    </div>
  );
}

export default DpSummaryPage;