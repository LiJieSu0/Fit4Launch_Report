import React from 'react';
import DpSummaryTable from './DpSummaryTable';
// import DataPerformanceResults from '../../DataFiles/DataPerformanceResults.json'; // Removed direct import
import { ReportContext } from '../../Contexts/ReportContext';
import { useContext } from 'react';


//TODO summary page cell link
function DpSummaryPage() {
  const { reportData } = useContext(ReportContext);

  // Note: DataPerformanceResults import was unused in the visible code, 
  // but if it is needed, access it here:
  // const DataPerformanceResults = reportData ? reportData.dataPerformance : null;

  const extractThroughput = (path, direction) => {
    const value = path?.Throughput?.[direction]?.Mean || path?.Throughput?.Mean;
    const className = value > 100 ? 'average-fail' : 'average-pass'; // Placeholder logic
    return { label: value ? value.toFixed(2) : 'N/A', className, link: "#" };
  };
  const httpSSData = {
    headers: [{ label: "HTTP Single Stream Test Download & Upload - 5G Auto", colSpan: 4 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Download" },
      { label: "Upload" }
    ],
    rows: [
      {
        cells: [
          { label: "Seattle (5G NR)" },
          { label: "Mean Throughput" },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.1' },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.1' }
        ],
      },
      {
        cells: [
          { label: "New York (5G NR)" },
          { label: "Mean Throughput" },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.1' },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.1' }
        ],
      },
    ],
  };

  const httpMSData = {
    headers: [{ label: "HTTP Multi Stream Test Download & Upload - 5G Auto", colSpan: 4 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Download" },
      { label: "Upload" }
    ],
    rows: [
      {
        cells: [
          { label: "Seattle (5G NR)" },
          { label: "Mean Throughput" },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.2' },
          { label: 'Result', className: 'bg-performance-marginal-fail', link: '#2.2' }
        ],
      },
      {
        cells: [
          { label: "New York (5G NR)" },
          { label: "Mean Throughput" },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.2' },
          { label: 'Result', className: 'bg-performance-marginal-fail', link: '#2.2' }
        ],
      },
    ],
  };

  const udpData = {
    headers: [{ label: "UDP Test - 5G Auto", colSpan: 4 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Download" },
      { label: "Upload" }
    ],
    rows: [
      {
        cells: [
          { label: "Seattle (5G NR)", rowSpan: 3 },
          { label: "Mean Throughput" },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.3DL' },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.3UL' }
        ],
      },
      {
        cells: [
          null, // Placeholder for the merged 'Market' cell
          { label: "Mean Jitter" },
          { label: "Result", className: "bg-performance-pass", link: "#2.3DL" },
          { label: "Result", className: "bg-performance-pass", link: "#2.3UL" },
        ],
      },
      {
        cells: [
          null, // Placeholder for the merged 'Market' cell
          { label: "Packet Failure Rate" },
          { label: "Result", className: "bg-performance-pass", link: "#2.3DL" },
          { label: "Result", className: "bg-performance-pass", link: "#2.3UL" },
        ],
      },
      {
        cells: [
          { label: "New York (5G NR)", rowSpan: 3 },
          { label: "Mean Throughput" },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.3DL' },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.3UL' }
        ],
      },
      {
        cells: [
          null, // Placeholder for the merged 'Market' cell
          { label: "Mean Jitter" },
          { label: "Result", className: "bg-performance-pass", link: "#2.3DL" },
          { label: "Result", className: "bg-performance-pass", link: "#2.3UL" },
        ],
      },
      {
        cells: [
          null, // Placeholder for the merged 'Market' cell
          { label: "Packet Failure Rate" },
          { label: "Result", className: "bg-performance-pass", link: "#2.3DL" },
          { label: "Result", className: "bg-performance-pass", link: "#2.3UL" },
        ],
      },
    ],
  };

  const pingData = {
    headers: [{ label: "Ping Test - 5G Auto", colSpan: 3 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "RTT" }
    ],
    rows: [
      {
        cells: [
          { label: "Seattle (5G NR)" },
          { label: "Mean Round Trip Time" },
          { label: 'Result', className: 'bg-performance-fail', link: '#2.4' },
        ],
      },
      {
        cells: [
          { label: "New York (5G NR)" },
          { label: "Mean Round Trip Time" },
          { label: 'Result', className: 'bg-performance-fail', link: '#2.4' },
        ],
      },
    ],
  };

  const webBrowserData = {
    headers: [{ label: "Web Browser Test - 5G Auto", colSpan: 3 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Load Time" }
    ],
    rows: [
      {
        cells: [
          { label: "Seattle (5G NR)" },
          { label: "Average Page Load Time" },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.5' },
        ],
      },
      {
        cells: [
          { label: "New York (5G NR)" },
          { label: "Average Page Load Time" },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.5' },
        ],
      },
    ],
  };

  const playStoreData = {
    headers: [{ label: "Play-store App Download Test - 5G Auto", colSpan: 5 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "30M" },
      { label: "60M" },
      { label: "100M" }
    ],
    rows: [
      {
        cells: [
          { label: "Seattle (5G NR)" },
          { label: "Mean Throughput" },
          { label: 'Result', className: 'bg-performance-fail', link: '#2.6' },
          { label: 'Result', className: 'bg-performance-fail', link: '#2.6' },
          { label: 'Result', className: 'bg-performance-fail', link: '#2.6' },

        ],
      },
      {
        cells: [
          { label: "New York (5G NR)" },
          { label: "Mean Throughput" },
          { label: 'Result', className: 'bg-performance-fail', link: '#2.6' },
          { label: 'Result', className: 'bg-performance-fail', link: '#2.6' },
          { label: 'Result', className: 'bg-performance-fail', link: '#2.6' },

        ],
      },
    ],
  };

  const mhsHttpSSData = {
    headers: [{ label: "HTTP Single Stream Test - Mobile Hotspot", colSpan: 4 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Download" },
      { label: "Upload" }
    ],
    rows: [
      {
        cells: [
          { label: "Seattle (5G NR)" },
          { label: "Mean Throughput" },
          { label: 'Result', className: 'bg-performance-fail', link: '#2.7.1' },
          { label: 'Result', className: 'bg-performance-marginal-fail', link: '#2.7.1' }
        ],
      },
      {
        cells: [
          { label: "New York (5G NR)" },
          { label: "Mean Throughput" },
          { label: 'Result', className: 'bg-performance-fail', link: '#2.7.1' },
          { label: 'Result', className: 'bg-performance-marginal-fail', link: '#2.7.1' }
        ],
      },
    ],
  };

  const mhsHttpMSData = {
    headers: [{ label: "HTTP Multi Stream Test - Mobile Hotspot", colSpan: 4 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Download" },
      { label: "Upload" }
    ],
    rows: [
      {
        cells: [
          { label: "Seattle (5G NR)" },
          { label: "Mean Throughput" },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.7.2' },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.7.2' }
        ],
      },
      {
        cells: [
          { label: "New York (5G NR)" },
          { label: "Mean Throughput" },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.7.2' },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.7.2' }
        ],
      },
    ],
  };

  const mhsUdpData = {
    headers: [{ label: "UDP Test - Mobile Hotspot", colSpan: 4 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Download" },
      { label: "Upload" }
    ],
    rows: [
      {
        cells: [
          { label: "Seattle (5G NR)", rowSpan: 3 },
          { label: "Mean Throughput" },
          { label: 'Result', className: 'bg-performance-marginal-fail', link: '#2.7.3DL' },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.7.3UL' }
        ],
      },
      {
        cells: [
          null, // Placeholder for the merged 'Market' cell
          { label: "Mean Jitter" },
          { label: "Result", className: "bg-performance-pass", link: "#2.7.3DL" },
          { label: "Result", className: "bg-performance-pass", link: "#2.7.3UL" },
        ],
      },
      {
        cells: [
          null, // Placeholder for the merged 'Market' cell
          { label: "Packet Failure Rate" },
          { label: "Result", className: "bg-performance-pass", link: "#2.7.3DL" },
          { label: "Result", className: "bg-performance-pass", link: "#2.7.3UL" },
        ],
      },
      {
        cells: [
          { label: "New York (5G NR)", rowSpan: 3 },
          { label: "Mean Throughput" },
          { label: 'Result', className: 'bg-performance-marginal-fail', link: '#2.7.3DL' },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.7.3UL' }
        ],
      },
      {
        cells: [
          null, // Placeholder for the merged 'Market' cell
          { label: "Mean Jitter" },
          { label: "Result", className: "bg-performance-pass", link: "#2.7.3DL" },
          { label: "Result", className: "bg-performance-pass", link: "#2.7.3UL" },
        ],
      },
      {
        cells: [
          null, // Placeholder for the merged 'Market' cell
          { label: "Packet Failure Rate" },
          { label: "Result", className: "bg-performance-pass", link: "#2.7.3DL" },
          { label: "Result", className: "bg-performance-pass", link: "#2.7.3UL" },
        ],
      },
    ],
  };


  const mhsPingData = {
    headers: [{ label: "Ping Test - Mobile Hotspot", colSpan: 3 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "RTT" }
    ],
    rows: [
      {
        cells: [
          { label: "Seattle (5G NR)" },
          { label: "Mean Round Trip Time" },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.7.4' },
        ],
      },
      {
        cells: [
          { label: "New York (5G NR)" },
          { label: "Mean Round Trip Time" },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.7.4' },
        ],
      },
    ],
  };

  const mobiltyData = {
    headers: [{ label: "Mobility Test - 5G Auto", colSpan: 3 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Value" }
    ],
    rows: [
      {
        cells: [
          { label: "Seattle (5G NR)", rowSpan: 4 },
          { label: "Mean Throughput" },
          { label: 'Result', className: 'average-pass', link: '#2.8' },
        ],
      },
      {
        cells: [
          null, // Placeholder for the merged 'Market' cell
          { label: "Mean Jitter" },
          { label: "Result", className: "bg-performance-pass", link: "#2.8" },
        ],
      },
      {
        cells: [
          null, // Placeholder for the merged 'Market' cell
          { label: "Packet Failure Rate" },
          { label: "Result", className: "bg-performance-pass", link: "#2.8" },
        ],
      },
      {
        cells: [
          null, // Placeholder for the merged 'Market' cell
          { label: "Mean Round Trip Time" },
          { label: "Result", className: "bg-performance-pass", link: "#2.8" },
        ],
      },
      {
        cells: [
          { label: "New York (5G NR)", rowSpan: 4 },
          { label: "Mean Throughput" },
          { label: 'Result', className: 'average-pass', link: '#2.8' },
        ],
      },
      {
        cells: [
          null, // Placeholder for the merged 'Market' cell
          { label: "Mean Jitter" },
          { label: "Result", className: "bg-performance-pass", link: "#2.8" },
        ],
      },
      {
        cells: [
          null, // Placeholder for the merged 'Market' cell
          { label: "Packet Failure Rate" },
          { label: "Result", className: "bg-performance-pass", link: "#2.8" },
        ],
      },
      {
        cells: [
          null, // Placeholder for the merged 'Market' cell
          { label: "Mean Round Trip Time" },
          { label: "Result", className: "bg-performance-pass", link: "#2.8" },
        ],
      },
    ],
  };

  // TODO MHS tables add
  const mobiltyMHSData = {
    headers: [{ label: "Mobility Test - Mobile Hotspot", colSpan: 4 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Download" },
      { label: "Upload" }
    ],
    rows: [
      {
        cells: [
          { label: "Seattle (5G NR)", rowSpan: 4 },
          { label: "Mean Throughput" },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.8.2' },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.8.2' }
        ],
      },
      {
        cells: [
          null,
          { label: "Mean Jitter" },
          { label: 'Result', className: 'bg-performance-fail', link: '#2.8.2' },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.8.2' }
        ],
      },
      {
        cells: [
          null,
          { label: "Packet Failure Rate " },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.8.2' },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.8.2' }
        ],
      },
      {
        cells: [
          null,
          { label: "Mean Round Trip Time" },
          { label: 'Result', className: 'bg-performance-marginal-fail', link: '#2.8.2', colSpan: 2 },
        ],
      },
      {
        cells: [
          { label: "New York (5G NR)", rowSpan: 4 },
          { label: "Mean Throughput" },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.8.2' },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.8.2' }
        ],
      },
      {
        cells: [
          null,
          { label: "Mean Jitter" },
          { label: 'Result', className: 'bg-performance-fail', link: '#2.8.2' },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.8.2' }
        ],
      },
      {
        cells: [
          null,
          { label: "Packet Failure Rate " },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.8.2' },
          { label: 'Result', className: 'bg-performance-pass', link: '#2.8.2' }
        ],
      },
      {
        cells: [
          null,
          { label: "Mean Round Trip Time" },
          { label: 'Result', className: 'bg-performance-marginal-fail', link: '#2.8.2', colSpan: 2 },
        ],
      },
    ],
  };

  const mrabData = {
    headers: [{ label: "VoNR MRAB Stationary Test - 5G Auto", colSpan: 5 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Pre Call" },
      { label: "In Call" },
      { label: "Post Call" }
    ],
    rows: [
      {
        cells: [
          { label: "Seattle (5G NR)" },
          { label: "Mean Throughput" },
          { label: 'Result', className: 'average-fail', link: '#2.9' },
          { label: 'Result', className: 'average-fail', link: '#2.9' },
          { label: 'Result', className: 'average-fail', link: '#2.9' }
        ],
      },
      {
        cells: [
          { label: "New York (5G NR)" },
          { label: "Mean Throughput" },
          { label: 'Result', className: 'average-fail', link: '#2.9' },
          { label: 'Result', className: 'average-fail', link: '#2.9' },
          { label: 'Result', className: 'average-fail', link: '#2.9' }
        ],
      },
    ],
  };

  // -------------------------------------------------------NSA DATA-------------------------------------------------------
  const httpNSASSData = {
    headers: [{ label: "HTTP Single Stream Test Download & Upload - 5G NSA", colSpan: 4 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Download" },
      { label: "Upload" }
    ],
    rows: [
      {
        cells: [
          { label: "Seattle (5G NSA)" },
          { label: "Data Throughput Average" },
          { label: 'Result', className: 'bg-performance-pass', link: '#3.1' },
          { label: 'Result', className: 'bg-performance-pass', link: '#3.1' }
        ],
      },
      {
        cells: [
          { label: "New York (5G NSA)" },
          { label: "Data Throughput Average" },
          { label: 'Result', className: 'bg-performance-pass', link: '#3.1' },
          { label: 'Result', className: 'bg-performance-pass', link: '#3.1' }
        ],
      },
    ],
  };

  const httpNSAMSData = {
    headers: [{ label: "HTTP Multi Stream Test Download & Upload - 5G NSA", colSpan: 4 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Download" },
      { label: "Upload" }
    ],
    rows: [
      {
        cells: [
          { label: "Seattle (5G NSA)" },
          { label: "Data Throughput Average" },
          { label: 'Result', className: 'bg-performance-fail', link: '#3.2' },
          { label: 'Result', className: 'bg-performance-pass', link: '#3.2' }
        ],
      },
      {
        cells: [
          { label: "New York (5G NSA)" },
          { label: "Data Throughput Average" },
          { label: 'Result', className: 'bg-performance-fail', link: '#3.2' },
          { label: 'Result', className: 'bg-performance-pass', link: '#3.2' }
        ],
      },
    ],
  };

  const udpNSAData = {
    headers: [{ label: "UDP Test - 5G NSA", colSpan: 4 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Download" },
      { label: "Upload" }
    ],
    rows: [
      {
        cells: [
          { label: "Seattle (5G NSA)", rowSpan: 3 },
          { label: "Mean Throughput" },
          { label: 'Result', className: 'bg-performance-pass', link: '#3.3DL' },
          { label: 'Result', className: 'bg-performance-pass', link: '#3.3UL' }
        ],
      },
      {
        cells: [
          null, // Placeholder for the merged 'Market' cell
          { label: "Mean Jitter" },
          { label: "Result", className: "bg-performance-fail", link: "#3.3DL" },
          { label: "Result", className: "bg-performance-pass", link: "#3.3UL" },
        ],
      },
      {
        cells: [
          null, // Placeholder for the merged 'Market' cell
          { label: "Packet Failure Rate" },
          { label: "Result", className: "bg-performance-marginal-fail", link: "#3.3DL" },
          { label: "Result", className: "bg-performance-fail", link: "#3.3UL" },
        ],
      },
      {
        cells: [
          { label: "New York (5G NSA)", rowSpan: 3 },
          { label: "Mean Throughput" },
          { label: 'Result', className: 'bg-performance-pass', link: '#3.3DL' },
          { label: 'Result', className: 'bg-performance-pass', link: '#3.3UL' }
        ],
      },
      {
        cells: [
          null, // Placeholder for the merged 'Market' cell
          { label: "Mean Jitter" },
          { label: "Result", className: "bg-performance-fail", link: "#3.3DL" },
          { label: "Result", className: "bg-performance-pass", link: "#3.3UL" },
        ],
      },
      {
        cells: [
          null, // Placeholder for the merged 'Market' cell
          { label: "Packet Failure Rate" },
          { label: "Result", className: "bg-performance-marginal-fail", link: "#3.3DL" },
          { label: "Result", className: "bg-performance-fail", link: "#3.3UL" },
        ],
      },
    ],
  };

  const pingNSAData = {
    headers: [{ label: "Ping Test - 5G NSA", colSpan: 3 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Download" }
    ],
    rows: [
      {
        cells: [
          { label: "Seattle (5G NSA)" },
          { label: "Mean Round Trip Time" },
          { label: 'Result', className: 'bg-performance-pass', link: '#3.4' },
        ],
      },
      {
        cells: [
          { label: "New York (5G NSA)" },
          { label: "Mean Round Trip Time" },
          { label: 'Result', className: 'bg-performance-pass', link: '#3.4' },
        ],
      },
    ],
  };
  const mobiltyNSAData = {
    headers: [{ label: "Mobility Test - 5G NSA", colSpan: 3 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Value" }
    ],
    rows: [
      {
        cells: [
          { label: "Seattle (5G NSA)", rowSpan: 4 },
          { label: "Mean Throughput" },
          { label: 'Result', className: 'bg-performance-pass', link: '#3.5' },
        ],
      },
      {
        cells: [
          null,
          { label: "Mean Jitter" },
          { label: 'Result', className: 'bg-performance-pass', link: '#3.5' },
        ],
      },
      {
        cells: [
          null,
          { label: "Packet Failure Rate" },
          { label: 'Result', className: 'bg-performance-pass', link: '#3.5' },
        ],
      },
      {
        cells: [
          null,
          { label: "Mean Round Trip Time" },
          { label: 'Result', className: 'bg-performance-pass', link: '#3.5' },
        ],
      },
      {
        cells: [
          { label: "New York (5G NSA)", rowSpan: 4 },
          { label: "Mean Throughput" },
          { label: 'Result', className: 'bg-performance-pass', link: '#3.5' },
        ],
      },
      {
        cells: [
          null,
          { label: "Mean Jitter" },
          { label: 'Result', className: 'bg-performance-pass', link: '#3.5' },
        ],
      },
      {
        cells: [
          null,
          { label: "Packet Failure Rate" },
          { label: 'Result', className: 'bg-performance-pass', link: '#3.5' },
        ],
      },
      {
        cells: [
          null,
          { label: "Mean Round Trip Time" },
          { label: 'Result', className: 'bg-performance-pass', link: '#3.5' },
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
      </div>
      <div className='page-content'>
        <div style={{ marginTop: 10 }}></div>
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