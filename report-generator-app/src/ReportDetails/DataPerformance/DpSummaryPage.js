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
          { label: "Data Throughput Average" },
          { label: "Seattle (5G NR)" },
          {label:'Result',className:'average-fail',link:'#'},
          {label:'Result',className:'average-fail',link:'#'}
        ],
      },
      {
        cells: [
          { label: "Error Ratio Average" },
          { label: "Seattle (5G NR)"},
          { label: "Result", className: "average-fail", link: "#" },
          { label: "Result", className: "average-fail", link: "#" },
        ],
      },
    ],
  };

  const pingData = {
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

  const webBrowserData = {
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

  const playStoreData = {
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

  const mhsStationaryData = {
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

  const mobiltyData = {
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

  const mobiltyMHSData = {
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

  const mrabData = {
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

  return (
    <div>
      <h2>Data Performance Summary Page</h2>
      <DpSummaryTable tableData={udpData} />
    </div>
  );
}

export default DpSummaryPage;