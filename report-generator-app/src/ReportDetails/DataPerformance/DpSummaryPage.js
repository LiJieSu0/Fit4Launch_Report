import React from 'react';
import DpSummaryTable from './DpSummaryTable';
import DataPerformanceResults from '../../DataFiles/DataPerformanceResults.json';

function DpSummaryPage() {
  const extractThroughput = (path, direction) => {
    const value = path?.Throughput?.[direction]?.Mean || path?.Throughput?.Mean;
    const className = value > 100 ? 'average-fail' : 'average-pass'; // Placeholder logic
    return { label: value ? value.toFixed(2) : 'N/A', className, link: "#" };
  };
  const httpSSData = {
    headers: [
      { label: "File Transfer (HTTP) Single Stream", rowSpan: 2 },
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

  const httpMSData = {
    headers: [
      { label: "File Transfer (HTTP) Multi-Stream", rowSpan: 2 },
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

  const udpData = {
    headers: [
      { label: "UDP test", rowSpan: 2 },
      { label: "Market", rowSpan: 2 },
      { label: "Download", rowSpan: 1 },
      { label: "Upload", rowSpan: 1 },
    ],
    rows: [
      {
        cells: [
          { label: "Mean Throughput" },
          { label: "Seattle (5G NR)", rowSpan: 3 },
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

  const pingData = {
    headers: [
      { label: "Ping Test", rowSpan: 2 },
      { label: "Market", rowSpan: 2 },
      { label: "Download", rowSpan: 1 },
      { label: "Upload", rowSpan: 1 },
    ],
    rows: [
      {
        cells: [
          { label: "Mean Round Trip Time(ms)" },
          { label: "Seattle (5G NR)" },
          {label:'Result',className:'average-fail',link:'#'},
          {label:'Result',className:'average-fail',link:'#'}
        ],
      },
    ],
  };

  const webBrowserData = {
    headers: [
      { label: "Web Browser", rowSpan: 2 },
      { label: "Market", rowSpan: 2 },
      { label: "Download", rowSpan: 1 },
      { label: "Upload", rowSpan: 1 },
    ],
    rows: [
      {
        cells: [
          { label: "Average Page LoadTime (s)" },
          { label: "Seattle (5G NR)" },
          {label:'Result',className:'average-fail',link:'#'},
          {label:'Result',className:'average-fail',link:'#'}
        ],
      },
    ],
  };

  const playStoreData = {
    headers: [
      { label: "Play Store", rowSpan: 2 },
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


  const mhsStationaryData = {
    headers: [
      { label: "Mobile hot spot Test", rowSpan: 2 },
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

  const mobiltyData = {
    headers: [
      { label: "5G Auto Data Test Drive", rowSpan: 2 },
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

  const mobiltyMHSData = {
    headers: [
      { label: "5G Auto Data Test MHS Drive", rowSpan: 2 },
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

  const mrabData = {
    headers: [
      { label: "VoNR MRAB Stationary Test", rowSpan: 2 },
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

  return (
    <div>
      <h2>Data Performance Summary Page</h2>
      <DpSummaryTable tableData={udpData} />
    </div>
  );
}

export default DpSummaryPage;