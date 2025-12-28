import React from 'react';
import DpSummaryTable from './DpSummaryTable';
import { ReportContext } from '../../Contexts/ReportContext';
import { useContext } from 'react';
import { getKpiCellColor } from '../../Utils/KpiRules';


//TODO summary page cell link
function DpSummaryPage() {
  const { reportData } = useContext(ReportContext);

  const MARKETS = {
    NR: ["Seattle (5G NR)", "New York (5G NR)"],
    NSA: ["Seattle (5G NSA)", "New York (5G NSA)"]
  };

  const RAW_DATA_INPUT = {
    "Seattle (5G NR)": {
      httpSS: { dl: 500, ul: 500, refDl: 500, refUl: 600 },
      httpMS: { dl: 400, ul: 450, refDl: 500, refUl: 500 },
      udp: { dl: 500, ul: 500, refDl: 500, refUl: 500, jitterDl: 5, jitterUl: 5, jitterRefDl: 10, jitterRefUl: 10, errDl: 0, errUl: 0, errRefDl: 0.1, errRefUl: 0.1 },
      ping: { rtt: 40, ref: 30 },
      web: { time: 1.5, ref: 2 },
      play: { tput30: 500, tput60: 500, tput100: 500, ref: 500 },
      mhsSS: { dl: 500, ul: 500, refDl: 500, refUl: 500 },
      mhsMS: { dl: 500, ul: 500, refDl: 500, refUl: 500 },
      mhsUdp: { dl: 500, ul: 500, refDl: 500, refUl: 500, jitterDl: 5, jitterUl: 5, jitterRefDl: 10, jitterRefUl: 10, errDl: 0, errUl: 0, errRefDl: 0.1, errRefUl: 0.1 },
      mhsPing: { rtt: 40, ref: 30 },
      mobility: { tput: 500, jitter: 5, err: 0, rtt: 40, refTput: 500, refJitter: 10, refErr: 0.1, refRtt: 30 },
      mobilityMhs: { tput: 500, jitter: 5, err: 0, rtt: 40, refTput: 500, refJitter: 10, refErr: 0.1, refRtt: 30 },
      mrab: { pre: 500, in: 500, post: 500, ref: 500 }
    },
    "New York (5G NR)": {
      httpSS: { dl: 500, ul: 500, refDl: 500, refUl: 500 },
      httpMS: { dl: 450, ul: 450, refDl: 500, refUl: 500 },
      udp: { dl: 500, ul: 500, refDl: 500, refUl: 500, jitterDl: 5, jitterUl: 5, jitterRefDl: 10, jitterRefUl: 10, errDl: 0, errUl: 0, errRefDl: 0.1, errRefUl: 0.1 },
      ping: { rtt: 40, ref: 30 },
      web: { time: 1.5, ref: 2 },
      play: { tput30: 500, tput60: 500, tput100: 500, ref: 500 },
      mhsSS: { dl: 500, ul: 500, refDl: 500, refUl: 500 },
      mhsMS: { dl: 500, ul: 500, refDl: 500, refUl: 500 },
      mhsUdp: { dl: 500, ul: 500, refDl: 500, refUl: 500, jitterDl: 5, jitterUl: 5, jitterRefDl: 10, jitterRefUl: 10, errDl: 0, errUl: 0, errRefDl: 0.1, errRefUl: 0.1 },
      mhsPing: { rtt: 40, ref: 30 },
      mobility: { tput: 500, jitter: 5, err: 0, rtt: 40, refTput: 500, refJitter: 10, refErr: 0.1, refRtt: 30 },
      mobilityMhs: { tput: 500, jitter: 5, err: 0, rtt: 40, refTput: 500, refJitter: 10, refErr: 0.1, refRtt: 30 },
      mrab: { pre: 500, in: 500, post: 500, ref: 500 }
    },
    "Seattle (5G NSA)": {
      httpSS: { dl: 500, ul: 500, refDl: 500, refUl: 500 },
      httpMS: { dl: 500, ul: 500, refDl: 500, refUl: 500 },
      udp: { dl: 500, ul: 500, refDl: 500, refUl: 500, jitterDl: 5, jitterUl: 5, jitterRefDl: 10, jitterRefUl: 10, errDl: 0, errUl: 0, errRefDl: 0.1, errRefUl: 0.1 },
      ping: { rtt: 40, ref: 30 },
      mobility: { tput: 500, jitter: 5, err: 0, rtt: 40, refTput: 500, refJitter: 10, refErr: 0.1, refRtt: 30 }
    },
    "New York (5G NSA)": {
      httpSS: { dl: 500, ul: 500, refDl: 500, refUl: 500 },
      httpMS: { dl: 500, ul: 500, refDl: 500, refUl: 500 },
      udp: { dl: 500, ul: 500, refDl: 500, refUl: 500, jitterDl: 5, jitterUl: 5, jitterRefDl: 10, jitterRefUl: 10, errDl: 0, errUl: 0, errRefDl: 0.1, errRefUl: 0.1 },
      ping: { rtt: 40, ref: 30 },
      mobility: { tput: 500, jitter: 5, err: 0, rtt: 40, refTput: 500, refJitter: 10, refErr: 0.1, refRtt: 30 }
    }
  };

  const mapColorVarToClass = (colorVar) => {
    if (!colorVar) return '';
    let mappedVar = colorVar;
    // Rule: Excellent (Pink) -> Pass (Green)
    if (colorVar === 'var(--performance-excellent)') {
      mappedVar = 'var(--performance-pass)';
    }
    return `bg-${mappedVar.replace('var(--', '').replace(')', '')}`;
  };

  const getResultCell = (kpiType, dutValue, refValue, link) => {
    const colorVar = getKpiCellColor(kpiType, dutValue, refValue);
    return {
      label: 'Result',
      className: mapColorVarToClass(colorVar),
      link: link
    };
  };

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
    rows: MARKETS.NR.flatMap(market => {
      const data = RAW_DATA_INPUT[market]?.httpSS || { dl: 0, ul: 0, refDl: 1, refUl: 1 };
      return [
        {
          cells: [
            { label: market },
            { label: "Mean Throughput" },
            getResultCell('Throughput', data.dl, data.refDl, '#2.1'),
            getResultCell('Throughput', data.ul, data.refUl, '#2.1')
          ],
        }
      ];
    })
  };

  const httpMSData = {
    headers: [{ label: "HTTP Multi Stream Test Download & Upload - 5G Auto", colSpan: 4 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Download" },
      { label: "Upload" }
    ],
    rows: MARKETS.NR.flatMap(market => {
      const data = RAW_DATA_INPUT[market]?.httpMS || { dl: 0, ul: 0, refDl: 1, refUl: 1 };
      return [
        {
          cells: [
            { label: market },
            { label: "Mean Throughput" },
            getResultCell('Throughput', data.dl, data.refDl, '#2.2'),
            getResultCell('Throughput', data.ul, data.refUl, '#2.2')
          ],
        }
      ];
    })
  };

  const udpData = {
    headers: [{ label: "UDP Test - 5G Auto", colSpan: 4 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Download" },
      { label: "Upload" }
    ],
    rows: MARKETS.NR.flatMap(market => {
      const data = RAW_DATA_INPUT[market]?.udp || { dl: 0, ul: 0, refDl: 1, refUl: 1, jitterDl: 0, jitterUl: 0, jitterRefDl: 1, jitterRefUl: 1, errDl: 0, errUl: 0, errRefDl: 1, errRefUl: 1 };
      return [
        {
          cells: [
            { label: market, rowSpan: 3 },
            { label: "Mean Throughput" },
            getResultCell('Throughput', data.dl, data.refDl, '#2.3DL'),
            getResultCell('Throughput', data.ul, data.refUl, '#2.3UL')
          ],
        },
        {
          cells: [
            null,
            { label: "Mean Jitter" },
            getResultCell('Jitter', data.jitterDl, data.jitterRefDl, '#2.3DL'),
            getResultCell('Jitter', data.jitterUl, data.jitterRefUl, '#2.3UL')
          ],
        },
        {
          cells: [
            null,
            { label: "Packet Failure Rate" },
            getResultCell('ErrorRatio', data.errDl, data.errRefDl, '#2.3DL'),
            getResultCell('ErrorRatio', data.errUl, data.errRefUl, '#2.3UL')
          ],
        }
      ];
    })
  };

  const pingData = {
    headers: [{ label: "Ping Test - 5G Auto", colSpan: 3 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "RTT" }
    ],
    rows: MARKETS.NR.flatMap(market => {
      const data = RAW_DATA_INPUT[market]?.ping || { rtt: 0, ref: 1 };
      return [
        {
          cells: [
            { label: market },
            { label: "Mean Round Trip Time" },
            getResultCell('PingLatency', data.rtt, data.ref, '#2.4'),
          ],
        }
      ];
    })
  };

  const webBrowserData = {
    headers: [{ label: "Web Browser Test - 5G Auto", colSpan: 3 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Load Time" }
    ],
    rows: MARKETS.NR.flatMap(market => {
      const data = RAW_DATA_INPUT[market]?.web || { time: 0, ref: 1 };
      return [
        {
          cells: [
            { label: market },
            { label: "Average Page Load Time" },
            getResultCell('WebPageLoadTime', data.time, data.ref, '#2.5'),
          ],
        }
      ];
    })
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
    rows: MARKETS.NR.flatMap(market => {
      const data = RAW_DATA_INPUT[market]?.play || { tput30: 0, tput60: 0, tput100: 0, ref: 1 };
      return [
        {
          cells: [
            { label: market },
            { label: "Mean Throughput" },
            getResultCell('Throughput', data.tput30, data.ref, '#2.6'),
            getResultCell('Throughput', data.tput60, data.ref, '#2.6'),
            getResultCell('Throughput', data.tput100, data.ref, '#2.6'),
          ],
        }
      ];
    })
  };

  const mhsHttpSSData = {
    headers: [{ label: "MHS-HTTP Single Stream Test Download & Upload - 5G Auto", colSpan: 4 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Download" },
      { label: "Upload" }
    ],
    rows: MARKETS.NR.flatMap(market => {
      const data = RAW_DATA_INPUT[market]?.mhsSS || { dl: 0, ul: 0, refDl: 1, refUl: 1 };
      return [
        {
          cells: [
            { label: market },
            { label: "Mean Throughput" },
            getResultCell('Throughput', data.dl, data.refDl, '#2.7'),
            getResultCell('Throughput', data.ul, data.refUl, '#2.7'),
          ],
        }
      ];
    })
  };

  const mhsHttpMSData = {
    headers: [{ label: "MHS-HTTP Multi Stream Test Download & Upload - 5G Auto", colSpan: 4 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Download" },
      { label: "Upload" }
    ],
    rows: MARKETS.NR.flatMap(market => {
      const data = RAW_DATA_INPUT[market]?.mhsMS || { dl: 0, ul: 0, refDl: 1, refUl: 1 };
      return [
        {
          cells: [
            { label: market },
            { label: "Mean Throughput" },
            getResultCell('Throughput', data.dl, data.refDl, '#2.8'),
            getResultCell('Throughput', data.ul, data.refUl, '#2.8'),
          ],
        }
      ];
    })
  };

  const mhsUdpData = {
    headers: [{ label: "MHS-UDP Test - 5G Auto", colSpan: 4 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Download" },
      { label: "Upload" }
    ],
    rows: MARKETS.NR.flatMap(market => {
      const data = RAW_DATA_INPUT[market]?.mhsUdp || { dl: 0, ul: 0, refDl: 1, refUl: 1, jitterDl: 0, jitterUl: 0, jitterRefDl: 1, jitterRefUl: 1, errDl: 0, errUl: 0, errRefDl: 1, errRefUl: 1 };
      return [
        {
          cells: [
            { label: market, rowSpan: 3 },
            { label: "Mean Throughput" },
            getResultCell('Throughput', data.dl, data.refDl, '#2.9DL'),
            getResultCell('Throughput', data.ul, data.refUl, '#2.9UL'),
          ],
        },
        {
          cells: [
            null,
            { label: "Mean Jitter" },
            getResultCell('Jitter', data.jitterDl, data.jitterRefDl, '#2.9DL'),
            getResultCell('Jitter', data.jitterUl, data.jitterRefUl, '#2.9UL'),
          ],
        },
        {
          cells: [
            null,
            { label: "Packet Failure Rate" },
            getResultCell('ErrorRatio', data.errDl, data.errRefDl, '#2.9DL'),
            getResultCell('ErrorRatio', data.errUl, data.errRefUl, '#2.9UL'),
          ],
        }
      ];
    })
  };

  const mhsPingData = {
    headers: [{ label: "MHS-Ping Test - 5G Auto", colSpan: 3 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "RTT" }
    ],
    rows: MARKETS.NR.flatMap(market => {
      const data = RAW_DATA_INPUT[market]?.mhsPing || { rtt: 0, ref: 1 };
      return [
        {
          cells: [
            { label: market },
            { label: "Mean Round Trip Time" },
            getResultCell('PingLatency', data.rtt, data.ref, '#2.10'),
          ],
        }
      ];
    })
  };

  const mobiltyData = {
    headers: [{ label: "Mobility Test - 5G Auto", colSpan: 3 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Value" }
    ],
    rows: MARKETS.NR.flatMap(market => {
      const data = RAW_DATA_INPUT[market]?.mobility || { tput: 0, jitter: 0, err: 0, rtt: 0, refTput: 1, refJitter: 1, refErr: 1, refRtt: 1 };
      return [
        {
          cells: [
            { label: market, rowSpan: 4 },
            { label: "Mean Throughput" },
            getResultCell('Throughput', data.tput, data.refTput, '#2.11'),
          ],
        },
        {
          cells: [
            null,
            { label: "Mean Jitter" },
            getResultCell('Jitter', data.jitter, data.refJitter, '#2.11'),
          ],
        },
        {
          cells: [
            null,
            { label: "Packet Failure Rate" },
            getResultCell('ErrorRatio', data.err, data.refErr, '#2.11'),
          ],
        },
        {
          cells: [
            null,
            { label: "Mean Round Trip Time" },
            getResultCell('PingLatency', data.rtt, data.refRtt, '#2.11'),
          ],
        }
      ];
    })
  };

  const mobiltyMHSData = {
    headers: [{ label: "Mobility Test - Mobile Hotspot", colSpan: 3 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Value" }
    ],
    rows: MARKETS.NR.flatMap(market => {
      const data = RAW_DATA_INPUT[market]?.mobilityMhs || { tput: 0, jitter: 0, err: 0, rtt: 0, refTput: 1, refJitter: 1, refErr: 1, refRtt: 1 };
      return [
        {
          cells: [
            { label: market, rowSpan: 4 },
            { label: "Mean Throughput" },
            getResultCell('Throughput', data.tput, data.refTput, '#2.12'),
          ],
        },
        {
          cells: [
            null,
            { label: "Mean Jitter" },
            getResultCell('Jitter', data.jitter, data.refJitter, '#2.12'),
          ],
        },
        {
          cells: [
            null,
            { label: "Packet Failure Rate" },
            getResultCell('ErrorRatio', data.err, data.refErr, '#2.12'),
          ],
        },
        {
          cells: [
            null,
            { label: "Mean Round Trip Time" },
            getResultCell('PingLatency', data.rtt, data.refRtt, '#2.12'),
          ],
        }
      ];
    })
  };

  const mrabData = {
    headers: [{ label: "MRAB Test (Data + VoNR) - 5G Auto", colSpan: 5 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Pre Call" },
      { label: "In Call" },
      { label: "Post Call" }
    ],
    rows: MARKETS.NR.flatMap(market => {
      const data = RAW_DATA_INPUT[market]?.mrab || { pre: 0, in: 0, post: 0, ref: 1 };
      return [
        {
          cells: [
            { label: market },
            { label: "Mean Throughput" },
            getResultCell('Throughput', data.pre, data.ref, '#2.13'),
            getResultCell('Throughput', data.in, data.ref, '#2.13'),
            getResultCell('Throughput', data.post, data.ref, '#2.13'),
          ],
        }
      ];
    })
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
    rows: MARKETS.NSA.flatMap(market => {
      const data = RAW_DATA_INPUT[market]?.httpSS || { dl: 0, ul: 0, refDl: 1, refUl: 1 };
      return [
        {
          cells: [
            { label: market },
            { label: "Data Throughput Average" },
            getResultCell('Throughput', data.dl, data.refDl, '#3.1'),
            getResultCell('Throughput', data.ul, data.refUl, '#3.1'),
          ],
        }
      ];
    })
  };

  const httpNSAMSData = {
    headers: [{ label: "HTTP Multi Stream Test Download & Upload - 5G NSA", colSpan: 4 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Download" },
      { label: "Upload" }
    ],
    rows: MARKETS.NSA.flatMap(market => {
      const data = RAW_DATA_INPUT[market]?.httpMS || { dl: 0, ul: 0, refDl: 1, refUl: 1 };
      return [
        {
          cells: [
            { label: market },
            { label: "Data Throughput Average" },
            getResultCell('Throughput', data.dl, data.refDl, '#3.2'),
            getResultCell('Throughput', data.ul, data.refUl, '#3.2'),
          ],
        }
      ];
    })
  };

  const udpNSAData = {
    headers: [{ label: "UDP Test - 5G NSA", colSpan: 4 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Download" },
      { label: "Upload" }
    ],
    rows: MARKETS.NSA.flatMap(market => {
      const data = RAW_DATA_INPUT[market]?.udp || { dl: 0, ul: 0, refDl: 1, refUl: 1, jitterDl: 0, jitterUl: 0, jitterRefDl: 1, jitterRefUl: 1, errDl: 0, errUl: 0, errRefDl: 1, errRefUl: 1 };
      return [
        {
          cells: [
            { label: market, rowSpan: 3 },
            { label: "Mean Throughput" },
            getResultCell('Throughput', data.dl, data.refDl, '#3.3DL'),
            getResultCell('Throughput', data.ul, data.refUl, '#3.3UL'),
          ],
        },
        {
          cells: [
            null,
            { label: "Mean Jitter" },
            getResultCell('Jitter', data.jitterDl, data.jitterRefDl, '#3.3DL'),
            getResultCell('Jitter', data.jitterUl, data.jitterRefUl, '#3.3UL'),
          ],
        },
        {
          cells: [
            null,
            { label: "Packet Failure Rate" },
            getResultCell('ErrorRatio', data.errDl, data.errRefDl, '#3.3DL'),
            getResultCell('ErrorRatio', data.errUl, data.errRefUl, '#3.3UL'),
          ],
        }
      ];
    })
  };

  const pingNSAData = {
    headers: [{ label: "Ping Test - 5G NSA", colSpan: 3 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "RTT" }
    ],
    rows: MARKETS.NSA.flatMap(market => {
      const data = RAW_DATA_INPUT[market]?.ping || { rtt: 0, ref: 1 };
      return [
        {
          cells: [
            { label: market },
            { label: "Mean Round Trip Time" },
            getResultCell('PingLatency', data.rtt, data.ref, '#3.4'),
          ],
        }
      ];
    })
  };

  const mobiltyNSAData = {
    headers: [{ label: "Mobility Test - 5G NSA", colSpan: 3 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Value" }
    ],
    rows: MARKETS.NSA.flatMap(market => {
      const data = RAW_DATA_INPUT[market]?.mobility || { tput: 0, jitter: 0, err: 0, rtt: 0, refTput: 1, refJitter: 1, refErr: 1, refRtt: 1 };
      return [
        {
          cells: [
            { label: market, rowSpan: 4 },
            { label: "Mean Throughput" },
            getResultCell('Throughput', data.tput, data.refTput, '#3.5'),
          ],
        },
        {
          cells: [
            null,
            { label: "Mean Jitter" },
            getResultCell('Jitter', data.jitter, data.refJitter, '#3.5'),
          ],
        },
        {
          cells: [
            null,
            { label: "Packet Failure Rate" },
            getResultCell('ErrorRatio', data.err, data.refErr, '#3.5'),
          ],
        },
        {
          cells: [
            null,
            { label: "Mean Round Trip Time" },
            getResultCell('PingLatency', data.rtt, data.refRtt, '#3.5'),
          ],
        }
      ];
    })
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

    </div >
  );
}

export default DpSummaryPage;