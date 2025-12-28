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
      httpSS: { dl: 500, ul: 500, refDl: 500, refUl: 600, link: '#2.1' },
      httpMS: { dl: 400, ul: 450, refDl: 500, refUl: 500, link: '#2.2' },
      udp: { dl: 500, ul: 500, refDl: 500, refUl: 500, jitterDl: 5, jitterUl: 5, jitterRefDl: 10, jitterRefUl: 10, errDl: 0, errUl: 0, errRefDl: 0.1, errRefUl: 0.1, linkDl: '#2.3DL', linkUl: '#2.3UL' },
      ping: { rtt: 40, ref: 30, link: '#2.4' },
      web: { time: 1.5, ref: 2, link: '#2.5' },
      play: { tput30: 500, tput60: 500, tput100: 500, ref: 500, link: '#2.6' },
      mhsSS: { dl: 500, ul: 500, refDl: 500, refUl: 500, link: '#2.7' },
      mhsMS: { dl: 500, ul: 500, refDl: 500, refUl: 500, link: '#2.8' },
      mhsUdp: { dl: 500, ul: 500, refDl: 500, refUl: 500, jitterDl: 5, jitterUl: 5, jitterRefDl: 10, jitterRefUl: 10, errDl: 0, errUl: 0, errRefDl: 0.1, errRefUl: 0.1, linkDl: '#2.9DL', linkUl: '#2.9UL' },
      mhsPing: { rtt: 40, ref: 30, link: '#2.10' },
      mobility: { tput: 500, jitter: 5, err: 0, rtt: 40, refTput: 500, refJitter: 10, refErr: 0.1, refRtt: 30, link: '#2.11' },
      mobilityMhs: { tput: 500, jitter: 5, err: 0, rtt: 40, refTput: 500, refJitter: 10, refErr: 0.1, refRtt: 30, link: '#2.12' },
      mrab: { pre: 500, in: 500, post: 500, ref: 500, link: '#2.13' }
    },
    "New York (5G NR)": {
      httpSS: { dl: 500, ul: 500, refDl: 500, refUl: 500, link: '#2.1' },
      httpMS: { dl: 450, ul: 450, refDl: 500, refUl: 500, link: '#2.2' },
      udp: { dl: 500, ul: 500, refDl: 500, refUl: 500, jitterDl: 5, jitterUl: 5, jitterRefDl: 10, jitterRefUl: 10, errDl: 0, errUl: 0, errRefDl: 0.1, errRefUl: 0.1, linkDl: '#2.3DL', linkUl: '#2.3UL' },
      ping: { rtt: 40, ref: 30, link: '#2.4' },
      web: { time: 1.5, ref: 2, link: '#2.5' },
      play: { tput30: 500, tput60: 500, tput100: 500, ref: 500, link: '#2.6' },
      mhsSS: { dl: 500, ul: 500, refDl: 500, refUl: 500, link: '#2.7' },
      mhsMS: { dl: 500, ul: 500, refDl: 500, refUl: 500, link: '#2.8' },
      mhsUdp: { dl: 500, ul: 500, refDl: 500, refUl: 500, jitterDl: 5, jitterUl: 5, jitterRefDl: 10, jitterRefUl: 10, errDl: 0, errUl: 0, errRefDl: 0.1, errRefUl: 0.1, linkDl: '#2.9DL', linkUl: '#2.9UL' },
      mhsPing: { rtt: 40, ref: 30, link: '#2.10' },
      mobility: { tput: 500, jitter: 5, err: 0, rtt: 40, refTput: 500, refJitter: 10, refErr: 0.1, refRtt: 30, link: '#2.11' },
      mobilityMhs: { tput: 500, jitter: 5, err: 0, rtt: 40, refTput: 500, refJitter: 10, refErr: 0.1, refRtt: 30, link: '#2.12' },
      mrab: { pre: 500, in: 500, post: 500, ref: 500, link: '#2.13' }
    },
    "Seattle (5G NSA)": {
      httpSS: { dl: 500, ul: 500, refDl: 500, refUl: 500, link: '#3.1' },
      httpMS: { dl: 500, ul: 500, refDl: 500, refUl: 500, link: '#3.2' },
      udp: { dl: 500, ul: 500, refDl: 500, refUl: 500, jitterDl: 5, jitterUl: 5, jitterRefDl: 10, jitterRefUl: 10, errDl: 0, errUl: 0, errRefDl: 0.1, errRefUl: 0.1, linkDl: '#3.3DL', linkUl: '#3.3UL' },
      ping: { rtt: 40, ref: 30, link: '#3.4' },
      mobility: { tput: 500, jitter: 5, err: 0, rtt: 40, refTput: 500, refJitter: 10, refErr: 0.1, refRtt: 30, link: '#3.5' }
    },
    "New York (5G NSA)": {
      httpSS: { dl: 500, ul: 500, refDl: 500, refUl: 500, link: '#3.1' },
      httpMS: { dl: 500, ul: 500, refDl: 500, refUl: 500, link: '#3.2' },
      udp: { dl: 500, ul: 500, refDl: 500, refUl: 500, jitterDl: 5, jitterUl: 5, jitterRefDl: 10, jitterRefUl: 10, errDl: 0, errUl: 0, errRefDl: 0.1, errRefUl: 0.1, linkDl: '#3.3DL', linkUl: '#3.3UL' },
      ping: { rtt: 40, ref: 30, link: '#3.4' },
      mobility: { tput: 500, jitter: 5, err: 0, rtt: 40, refTput: 500, refJitter: 10, refErr: 0.1, refRtt: 30, link: '#3.5' }
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

  // const extractThroughput = (path, direction) => { 
  //   const value = path?.Throughput?.[direction]?.Mean || path?.Throughput?.Mean;
  //   const className = value > 100 ? 'average-fail' : 'average-pass'; // Placeholder logic
  //   return { label: value ? value.toFixed(2) : 'N/A', className, link: "#" };
  // };
  const httpSSData = {
    headers: [{ label: "HTTP Single Stream Test Download & Upload - 5G Auto", colSpan: 4 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Download" },
      { label: "Upload" }
    ],
    rows: MARKETS.NR.flatMap(market => {
      const data = RAW_DATA_INPUT[market]?.httpSS || { dl: 0, ul: 0, refDl: 1, refUl: 1, link: '#' };
      return [
        {
          cells: [
            { label: market },
            { label: "Mean Throughput" },
            getResultCell('Throughput', data.dl, data.refDl, data.link),
            getResultCell('Throughput', data.ul, data.refUl, data.link)
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
      const data = RAW_DATA_INPUT[market]?.httpMS || { dl: 0, ul: 0, refDl: 1, refUl: 1, link: '#' };
      return [
        {
          cells: [
            { label: market },
            { label: "Mean Throughput" },
            getResultCell('Throughput', data.dl, data.refDl, data.link),
            getResultCell('Throughput', data.ul, data.refUl, data.link)
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
      const data = RAW_DATA_INPUT[market]?.udp || { dl: 0, ul: 0, refDl: 1, refUl: 1, jitterDl: 0, jitterUl: 0, jitterRefDl: 1, jitterRefUl: 1, errDl: 0, errUl: 0, errRefDl: 1, errRefUl: 1, linkDl: '#', linkUl: '#' };
      return [
        {
          cells: [
            { label: market, rowSpan: 3 },
            { label: "Mean Throughput" },
            getResultCell('Throughput', data.dl, data.refDl, data.linkDl),
            getResultCell('Throughput', data.ul, data.refUl, data.linkUl)
          ],
        },
        {
          cells: [
            null,
            { label: "Mean Jitter" },
            getResultCell('Jitter', data.jitterDl, data.jitterRefDl, data.linkDl),
            getResultCell('Jitter', data.jitterUl, data.jitterRefUl, data.linkUl)
          ],
        },
        {
          cells: [
            null,
            { label: "Packet Failure Rate" },
            getResultCell('ErrorRatio', data.errDl, data.errRefDl, data.linkDl),
            getResultCell('ErrorRatio', data.errUl, data.errRefUl, data.linkUl)
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
      const data = RAW_DATA_INPUT[market]?.ping || { rtt: 0, ref: 1, link: '#' };
      return [
        {
          cells: [
            { label: market },
            { label: "Mean Round Trip Time" },
            getResultCell('PingLatency', data.rtt, data.ref, data.link),
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
      const data = RAW_DATA_INPUT[market]?.web || { time: 0, ref: 1, link: '#' };
      return [
        {
          cells: [
            { label: market },
            { label: "Average Page Load Time" },
            getResultCell('WebPageLoadTime', data.time, data.ref, data.link),
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
      const data = RAW_DATA_INPUT[market]?.play || { tput30: 0, tput60: 0, tput100: 0, ref: 1, link: '#' };
      return [
        {
          cells: [
            { label: market },
            { label: "Mean Throughput" },
            getResultCell('Throughput', data.tput30, data.ref, data.link),
            getResultCell('Throughput', data.tput60, data.ref, data.link),
            getResultCell('Throughput', data.tput100, data.ref, data.link),
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
      const data = RAW_DATA_INPUT[market]?.mhsSS || { dl: 0, ul: 0, refDl: 1, refUl: 1, link: '#' };
      return [
        {
          cells: [
            { label: market },
            { label: "Mean Throughput" },
            getResultCell('Throughput', data.dl, data.refDl, data.link),
            getResultCell('Throughput', data.ul, data.refUl, data.link),
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
      const data = RAW_DATA_INPUT[market]?.mhsMS || { dl: 0, ul: 0, refDl: 1, refUl: 1, link: '#' };
      return [
        {
          cells: [
            { label: market },
            { label: "Mean Throughput" },
            getResultCell('Throughput', data.dl, data.refDl, data.link),
            getResultCell('Throughput', data.ul, data.refUl, data.link),
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
      const data = RAW_DATA_INPUT[market]?.mhsUdp || { dl: 0, ul: 0, refDl: 1, refUl: 1, jitterDl: 0, jitterUl: 0, jitterRefDl: 1, jitterRefUl: 1, errDl: 0, errUl: 0, errRefDl: 1, errRefUl: 1, linkDl: '#', linkUl: '#' };
      return [
        {
          cells: [
            { label: market, rowSpan: 3 },
            { label: "Mean Throughput" },
            getResultCell('Throughput', data.dl, data.refDl, data.linkDl),
            getResultCell('Throughput', data.ul, data.refUl, data.linkUl),
          ],
        },
        {
          cells: [
            null,
            { label: "Mean Jitter" },
            getResultCell('Jitter', data.jitterDl, data.jitterRefDl, data.linkDl),
            getResultCell('Jitter', data.jitterUl, data.jitterRefUl, data.linkUl),
          ],
        },
        {
          cells: [
            null,
            { label: "Packet Failure Rate" },
            getResultCell('ErrorRatio', data.errDl, data.errRefDl, data.linkDl),
            getResultCell('ErrorRatio', data.errUl, data.errRefUl, data.linkUl),
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
      const data = RAW_DATA_INPUT[market]?.mhsPing || { rtt: 0, ref: 1, link: '#' };
      return [
        {
          cells: [
            { label: market },
            { label: "Mean Round Trip Time" },
            getResultCell('PingLatency', data.rtt, data.ref, data.link),
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
      const data = RAW_DATA_INPUT[market]?.mobility || { tput: 0, jitter: 0, err: 0, rtt: 0, refTput: 1, refJitter: 1, refErr: 1, refRtt: 1, link: '#' };
      return [
        {
          cells: [
            { label: market, rowSpan: 4 },
            { label: "Mean Throughput" },
            getResultCell('Throughput', data.tput, data.refTput, data.link),
          ],
        },
        {
          cells: [
            null,
            { label: "Mean Jitter" },
            getResultCell('Jitter', data.jitter, data.refJitter, data.link),
          ],
        },
        {
          cells: [
            null,
            { label: "Packet Failure Rate" },
            getResultCell('ErrorRatio', data.err, data.refErr, data.link),
          ],
        },
        {
          cells: [
            null,
            { label: "Mean Round Trip Time" },
            getResultCell('PingLatency', data.rtt, data.refRtt, data.link),
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
      const data = RAW_DATA_INPUT[market]?.mobilityMhs || { tput: 0, jitter: 0, err: 0, rtt: 0, refTput: 1, refJitter: 1, refErr: 1, refRtt: 1, link: '#' };
      return [
        {
          cells: [
            { label: market, rowSpan: 4 },
            { label: "Mean Throughput" },
            getResultCell('Throughput', data.tput, data.refTput, data.link),
          ],
        },
        {
          cells: [
            null,
            { label: "Mean Jitter" },
            getResultCell('Jitter', data.jitter, data.refJitter, data.link),
          ],
        },
        {
          cells: [
            null,
            { label: "Packet Failure Rate" },
            getResultCell('ErrorRatio', data.err, data.refErr, data.link),
          ],
        },
        {
          cells: [
            null,
            { label: "Mean Round Trip Time" },
            getResultCell('PingLatency', data.rtt, data.refRtt, data.link),
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
      const data = RAW_DATA_INPUT[market]?.mrab || { pre: 0, in: 0, post: 0, ref: 1, link: '#' };
      return [
        {
          cells: [
            { label: market },
            { label: "Mean Throughput" },
            getResultCell('Throughput', data.pre, data.ref, data.link),
            getResultCell('Throughput', data.in, data.ref, data.link),
            getResultCell('Throughput', data.post, data.ref, data.link),
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
      const data = RAW_DATA_INPUT[market]?.httpSS || { dl: 0, ul: 0, refDl: 1, refUl: 1, link: '#' };
      return [
        {
          cells: [
            { label: market },
            { label: "Data Throughput Average" },
            getResultCell('Throughput', data.dl, data.refDl, data.link),
            getResultCell('Throughput', data.ul, data.refUl, data.link),
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
      const data = RAW_DATA_INPUT[market]?.httpMS || { dl: 0, ul: 0, refDl: 1, refUl: 1, link: '#' };
      return [
        {
          cells: [
            { label: market },
            { label: "Data Throughput Average" },
            getResultCell('Throughput', data.dl, data.refDl, data.link),
            getResultCell('Throughput', data.ul, data.refUl, data.link),
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
      const data = RAW_DATA_INPUT[market]?.udp || { dl: 0, ul: 0, refDl: 1, refUl: 1, jitterDl: 0, jitterUl: 0, jitterRefDl: 1, jitterRefUl: 1, errDl: 0, errUl: 0, errRefDl: 1, errRefUl: 1, linkDl: '#', linkUl: '#' };
      return [
        {
          cells: [
            { label: market, rowSpan: 3 },
            { label: "Mean Throughput" },
            getResultCell('Throughput', data.dl, data.refDl, data.linkDl),
            getResultCell('Throughput', data.ul, data.refUl, data.linkUl),
          ],
        },
        {
          cells: [
            null,
            { label: "Mean Jitter" },
            getResultCell('Jitter', data.jitterDl, data.jitterRefDl, data.linkDl),
            getResultCell('Jitter', data.jitterUl, data.jitterRefUl, data.linkUl),
          ],
        },
        {
          cells: [
            null,
            { label: "Packet Failure Rate" },
            getResultCell('ErrorRatio', data.errDl, data.errRefDl, data.linkDl),
            getResultCell('ErrorRatio', data.errUl, data.errRefUl, data.linkUl),
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
      const data = RAW_DATA_INPUT[market]?.ping || { rtt: 0, ref: 1, link: '#' };
      return [
        {
          cells: [
            { label: market },
            { label: "Mean Round Trip Time" },
            getResultCell('PingLatency', data.rtt, data.ref, data.link),
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
      const data = RAW_DATA_INPUT[market]?.mobility || { tput: 0, jitter: 0, err: 0, rtt: 0, refTput: 1, refJitter: 1, refErr: 1, refRtt: 1, link: '#' };
      return [
        {
          cells: [
            { label: market, rowSpan: 4 },
            { label: "Mean Throughput" },
            getResultCell('Throughput', data.tput, data.refTput, data.link),
          ],
        },
        {
          cells: [
            null,
            { label: "Mean Jitter" },
            getResultCell('Jitter', data.jitter, data.refJitter, data.link),
          ],
        },
        {
          cells: [
            null,
            { label: "Packet Failure Rate" },
            getResultCell('ErrorRatio', data.err, data.refErr, data.link),
          ],
        },
        {
          cells: [
            null,
            { label: "Mean Round Trip Time" },
            getResultCell('PingLatency', data.rtt, data.refRtt, data.link),
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