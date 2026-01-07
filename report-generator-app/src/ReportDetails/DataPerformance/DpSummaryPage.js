import React from 'react';
import DpSummaryTable from './DpSummaryTable';
import { ReportContext } from '../../Contexts/ReportContext';
import { useContext } from 'react';
import { getKpiCellColor } from '../../Utils/KpiRules';
import DynamicHeader from '../../CommonPage/DynamicHeader';


//TODO summary page cell link
function DpSummaryPage() {
  const { allReportData } = useContext(ReportContext);

  const MARKETS_CONFIG = [
    { label: "Seattle (5G NR)", city: "Seattle", network: "5G AUTO DP" },
    { label: "New York (5G NR)", city: "New York", network: "5G AUTO DP" },
    { label: "Seattle (5G NSA)", city: "Seattle", network: "5G NSA DP" },
    { label: "New York (5G NSA)", city: "New York", network: "5G NSA DP" }
  ];

  const COLOR_RANK = {
    'var(--performance-fail)': 3,
    'var(--performance-marginal-fail)': 2,
    'var(--performance-pass)': 1,
    'var(--performance-excellent)': 1,
    'default': 0
  };

  const getWorstColor = (colors) => {
    if (!colors || colors.length === 0) return 'default';
    let worst = colors[0];
    colors.forEach(c => {
      if ((COLOR_RANK[c] || 0) > (COLOR_RANK[worst] || 0)) {
        worst = c;
      }
    });
    return worst;
  };

  const getMetricValue = (data, path) => {
    return path.reduce((acc, key) => (acc && acc[key] !== undefined) ? acc[key] : undefined, data);
  };

  const getAveragedKPI = (cityData, network, caseName, metricPath, kpiType, direction = null) => {
    const locations = ['Good', 'Moderate', 'Poor'];
    let dutSum = 0;
    let refSum = 0;
    let count = 0;

    const baseData = cityData?.dataPerformance?.["Data Performance"]?.[network]?.[caseName];
    if (!baseData) return 'default';

    locations.forEach(loc => {
      const locPath = direction ? (Array.isArray(direction) ? [...direction, loc] : [direction, loc]) : [loc];
      const dutVal = getMetricValue(baseData, [...locPath, 'DUT', ...metricPath]);
      const refVal = getMetricValue(baseData, [...locPath, 'REF', ...metricPath]);

      if (dutVal !== undefined && refVal !== undefined) {
        dutSum += parseFloat(dutVal);
        refSum += parseFloat(refVal);
        count++;
      }
    });

    if (count === 0) {
      // Try non-location path (some cases might not have Good/Moderate/Poor)
      const dutVal = getMetricValue(baseData, ['DUT', ...metricPath]);
      const refVal = getMetricValue(baseData, ['REF', ...metricPath]);
      if (dutVal !== undefined && refVal !== undefined) {
        return getKpiCellColor(kpiType, parseFloat(dutVal), parseFloat(refVal));
      }
      return 'default';
    }

    return getKpiCellColor(kpiType, dutSum / count, refSum / count);
  };

  const getUdpResult = (cityData, network, direction, metricType) => {
    const baseData = cityData?.dataPerformance?.["Data Performance"]?.[network]?.["Udp Test"]?.[direction];
    if (!baseData) return 'default';

    const tasks = Object.keys(baseData);
    const taskResults = tasks.map(taskName => {
      const locations = ['Good', 'Moderate', 'Poor'];
      let dutSum = 0;
      let refSum = 0;
      let count = 0;
      const metricPath = metricType === 'Throughput' ? ['Throughput', 'Mean'] :
        metricType === 'Jitter' ? ['Jitter', 'Mean'] : ['Error Ratio', 'Mean'];
      const kpiType = metricType === 'Throughput' ? 'Throughput' :
        metricType === 'Jitter' ? 'Jitter' : 'ErrorRatio';

      locations.forEach(loc => {
        const dutVal = getMetricValue(baseData[taskName], [loc, 'DUT', ...metricPath]);
        const refVal = getMetricValue(baseData[taskName], [loc, 'REF', ...metricPath]);
        if (dutVal !== undefined && refVal !== undefined) {
          dutSum += parseFloat(dutVal);
          refSum += parseFloat(refVal);
          count++;
        }
      });

      if (count === 0) return 'default';
      return getKpiCellColor(kpiType, dutSum / count, refSum / count);
    }).filter(r => r !== 'default');

    return getWorstColor(taskResults);
  };

  const mapColorVarToClass = (colorVar) => {
    if (!colorVar || colorVar === 'default') return '';
    let mappedVar = colorVar;
    // Rule: Excellent (Pink) & Pass (Green) -> Pass (Green)
    if (colorVar === 'var(--performance-excellent)' || colorVar === 'var(--performance-pass)') {
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
  const NR_MARKETS = MARKETS_CONFIG.filter(m => m.network === "5G AUTO DP");
  const NSA_MARKETS = MARKETS_CONFIG.filter(m => m.network === "5G NSA DP");

  const httpSSData = {
    headers: [{ label: "HTTP Single Stream Test Download & Upload - 5G Auto", colSpan: 4 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Download" }, { label: "Upload" }],
    rows: NR_MARKETS.map(market => {
      const cityData = allReportData[market.city];
      const dlResult = getAveragedKPI(cityData, market.network, "HTTP Single Stream", ["Throughput", "Mean"], "Throughput", "DL");
      const ulResult = getAveragedKPI(cityData, market.network, "HTTP Single Stream", ["Throughput", "Mean"], "Throughput", "UL");
      return {
        cells: [
          { label: market.label },
          { label: "Mean Throughput" },
          { label: 'Result', className: mapColorVarToClass(dlResult), link: '#2.1' },
          { label: 'Result', className: mapColorVarToClass(ulResult), link: '#2.1' }
        ]
      };
    })
  };

  const httpMSData = {
    headers: [{ label: "HTTP Multi Stream Test Download & Upload - 5G Auto", colSpan: 4 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Download" }, { label: "Upload" }],
    rows: NR_MARKETS.map(market => {
      const cityData = allReportData[market.city];
      const dlResult = getAveragedKPI(cityData, market.network, "HTTP Multi Stream", ["Throughput", "Mean"], "Throughput", "DL");
      const ulResult = getAveragedKPI(cityData, market.network, "HTTP Multi Stream", ["Throughput", "Mean"], "Throughput", "UL");
      return {
        cells: [
          { label: market.label },
          { label: "Mean Throughput" },
          { label: 'Result', className: mapColorVarToClass(dlResult), link: '#2.2' },
          { label: 'Result', className: mapColorVarToClass(ulResult), link: '#2.2' }
        ]
      };
    })
  };

  const udpData = {
    headers: [{ label: "UDP Test - 5G Auto", colSpan: 4 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Download" }, { label: "Upload" }],
    rows: NR_MARKETS.flatMap(market => {
      const cityData = allReportData[market.city];
      const dlTput = getUdpResult(cityData, market.network, "DL", "Throughput");
      const ulTput = getUdpResult(cityData, market.network, "UL", "Throughput");
      const dlJitter = getUdpResult(cityData, market.network, "DL", "Jitter");
      const ulJitter = getUdpResult(cityData, market.network, "UL", "Jitter");
      const dlErr = getUdpResult(cityData, market.network, "DL", "ErrorRatio");
      const ulErr = getUdpResult(cityData, market.network, "UL", "ErrorRatio");
      return [
        { cells: [{ label: market.label, rowSpan: 3 }, { label: "Mean Throughput" }, { label: 'Result', className: mapColorVarToClass(dlTput), link: '#2.3DL' }, { label: 'Result', className: mapColorVarToClass(ulTput), link: '#2.3UL' }] },
        { cells: [null, { label: "Mean Jitter" }, { label: 'Result', className: mapColorVarToClass(dlJitter), link: '#2.3DL' }, { label: 'Result', className: mapColorVarToClass(ulJitter), link: '#2.3UL' }] },
        { cells: [null, { label: "Packet Failure Rate" }, { label: 'Result', className: mapColorVarToClass(dlErr), link: '#2.3DL' }, { label: 'Result', className: mapColorVarToClass(ulErr), link: '#2.3UL' }] }
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
    rows: NR_MARKETS.map(market => {
      const cityData = allReportData[market.city];
      const result = getAveragedKPI(cityData, market.network, "Ping", ["Ping RTT", "avg"], "PingLatency");
      return {
        cells: [
          { label: market.label },
          { label: "Mean Round Trip Time" },
          { label: 'Result', className: mapColorVarToClass(result), link: '#2.4' }
        ]
      };
    })
  };

  const webBrowserData = {
    headers: [{ label: "Web Browser Test - 5G Auto", colSpan: 3 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Load Time" }
    ],
    rows: NR_MARKETS.map(market => {
      const cityData = allReportData[market.city];
      const result = getAveragedKPI(cityData, market.network, "5G Auto Data Web-Kepler", ["Web Page Load Time", "Mean"], "WebPageLoadTime");
      return {
        cells: [
          { label: market.label },
          { label: "Average Page Load Time" },
          { label: 'Result', className: mapColorVarToClass(result), link: '#2.5' }
        ]
      };
    })
  };

  const playStoreData = {
    headers: [{ label: "Play-store App Download Test - 5G Auto", colSpan: 5 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "30M" }, { label: "60M" }, { label: "100M" }],
    rows: NR_MARKETS.map(market => {
      const cityData = allReportData[market.city];
      // Play-store data structure usually multiple tasks or aggregated? Assume similar averaging
      const r30m = getAveragedKPI(cityData, market.network, "5G Auto Data Play-store app Download", ["30M", "overall_average_throughput"], "Throughput");
      const r60m = getAveragedKPI(cityData, market.network, "5G Auto Data Play-store app Download", ["60M", "overall_average_throughput"], "Throughput");
      const r100m = getAveragedKPI(cityData, market.network, "5G Auto Data Play-store app Download", ["100M", "overall_average_throughput"], "Throughput");

      return {
        cells: [
          { label: market.label },
          { label: "Mean Throughput" },
          { label: 'Result', className: mapColorVarToClass(r30m), link: '#2.6' },
          { label: 'Result', className: mapColorVarToClass(r60m), link: '#2.6' },
          { label: 'Result', className: mapColorVarToClass(r100m), link: '#2.6' }
        ]
      };
    })
  };

  const mhsHttpSSData = {
    headers: [{ label: "MHS-HTTP Single Stream Test Download & Upload - 5G Auto", colSpan: 4 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Download" }, { label: "Upload" }],
    rows: NR_MARKETS.map(market => {
      const cityData = allReportData[market.city];
      const base = ["Mobile Hotspot Test", "HTTP Single Stream"];
      const dl = getAveragedKPI(cityData, market.network, base[0], ["Throughput", "Mean"], "Throughput", [base[1], "DL"]);
      const ul = getAveragedKPI(cityData, market.network, base[0], ["Throughput", "Mean"], "Throughput", [base[1], "UL"]);
      return {
        cells: [
          { label: market.label },
          { label: "Mean Throughput" },
          { label: 'Result', className: mapColorVarToClass(dl), link: '#2.7' },
          { label: 'Result', className: mapColorVarToClass(ul), link: '#2.7' }
        ]
      };
    })
  };

  const mhsHttpMSData = {
    headers: [{ label: "MHS-HTTP Multi Stream Test Download & Upload - 5G Auto", colSpan: 4 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Download" }, { label: "Upload" }],
    rows: NR_MARKETS.map(market => {
      const cityData = allReportData[market.city];
      const base = ["Mobile Hotspot Test", "HTTP Multi Stream"];
      const dl = getAveragedKPI(cityData, market.network, base[0], ["Throughput", "Mean"], "Throughput", [base[1], "DL"]);
      const ul = getAveragedKPI(cityData, market.network, base[0], ["Throughput", "Mean"], "Throughput", [base[1], "UL"]);
      return {
        cells: [
          { label: market.label },
          { label: "Mean Throughput" },
          { label: 'Result', className: mapColorVarToClass(dl), link: '#2.8' },
          { label: 'Result', className: mapColorVarToClass(ul), link: '#2.8' }
        ]
      };
    })
  };

  const getMhsUdpResult = (cityData, network, direction, metricType) => {
    const baseData = cityData?.dataPerformance?.["Data Performance"]?.[network]?.["Mobile Hotspot Test"]?.["Udp Test"]?.[direction];
    if (!baseData) return 'default';
    const tasks = Object.keys(baseData);
    const taskResults = tasks.map(taskName => {
      const metricPath = metricType === 'Throughput' ? ['Throughput', 'Mean'] :
        metricType === 'Jitter' ? ['Jitter', 'Mean'] : ['Error Ratio', 'Mean'];
      const kpiType = metricType === 'Throughput' ? 'Throughput' :
        metricType === 'Jitter' ? 'Jitter' : 'ErrorRatio';
      // MHS UDP might also have locations
      const locations = ['Good', 'Moderate', 'Poor'];
      let dutSum = 0, refSum = 0, count = 0;
      locations.forEach(loc => {
        const dutVal = getMetricValue(baseData[taskName], [loc, 'DUT', ...metricPath]);
        const refVal = getMetricValue(baseData[taskName], [loc, 'REF', ...metricPath]);
        if (dutVal !== undefined && refVal !== undefined) {
          dutSum += parseFloat(dutVal); refSum += parseFloat(refVal); count++;
        }
      });
      if (count === 0) return 'default';
      return getKpiCellColor(kpiType, dutSum / count, refSum / count);
    }).filter(r => r !== 'default');
    return getWorstColor(taskResults);
  };

  const mhsUdpData = {
    headers: [{ label: "MHS-UDP Test - 5G Auto", colSpan: 4 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Download" }, { label: "Upload" }],
    rows: NR_MARKETS.flatMap(market => {
      const cityData = allReportData[market.city];
      const dlTput = getMhsUdpResult(cityData, market.network, "DL", "Throughput");
      const ulTput = getMhsUdpResult(cityData, market.network, "UL", "Throughput");
      const dlJitter = getMhsUdpResult(cityData, market.network, "DL", "Jitter");
      const ulJitter = getMhsUdpResult(cityData, market.network, "UL", "Jitter");
      const dlErr = getMhsUdpResult(cityData, market.network, "DL", "ErrorRatio");
      const ulErr = getMhsUdpResult(cityData, market.network, "UL", "ErrorRatio");
      return [
        { cells: [{ label: market.label, rowSpan: 3 }, { label: "Mean Throughput" }, { label: 'Result', className: mapColorVarToClass(dlTput), link: '#2.9DL' }, { label: 'Result', className: mapColorVarToClass(ulTput), link: '#2.9UL' }] },
        { cells: [null, { label: "Mean Jitter" }, { label: 'Result', className: mapColorVarToClass(dlJitter), link: '#2.9DL' }, { label: 'Result', className: mapColorVarToClass(ulJitter), link: '#2.9UL' }] },
        { cells: [null, { label: "Packet Failure Rate" }, { label: 'Result', className: mapColorVarToClass(dlErr), link: '#2.9DL' }, { label: 'Result', className: mapColorVarToClass(ulErr), link: '#2.9UL' }] }
      ];
    })
  };

  const mhsPingData = {
    headers: [{ label: "MHS-Ping Test - 5G Auto", colSpan: 3 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "RTT" }],
    rows: NR_MARKETS.map(market => {
      const cityData = allReportData[market.city];
      const res = getAveragedKPI(cityData, market.network, "Mobile Hotspot Test", ["Ping RTT", "avg"], "PingLatency", "Ping");
      return {
        cells: [
          { label: market.label },
          { label: "Mean Round Trip Time" },
          { label: 'Result', className: mapColorVarToClass(res), link: '#2.10' }
        ]
      };
    })
  };

  const getMobilityResult = (cityData, network, caseName, metricType) => {
    const cityBase = cityData?.dataPerformance?.["Data Performance"]?.[network];
    const base = getMetricValue(cityBase, ["Mobility Test", caseName]);
    if (!base) return 'default';
    const dut = base.DUT;
    const ref = base.REF;
    if (!dut || !ref) return 'default';

    if (metricType === 'Throughput') return getKpiCellColor('Throughput', dut.Throughput?.Mean, ref.Throughput?.Mean);
    if (metricType === 'Jitter') return getKpiCellColor('Jitter', dut.Jitter?.Mean, ref.Jitter?.Mean);
    if (metricType === 'ErrorRatio') return getKpiCellColor('ErrorRatio', dut["Error Ratio"]?.Mean, ref["Error Ratio"]?.Mean);
    if (metricType === 'PingLatency') return getKpiCellColor('PingLatency', dut["Ping RTT"]?.avg, ref["Ping RTT"]?.avg);
    return 'default';
  };

  const mobiltyData = {
    headers: [{ label: "Mobility Test - 5G Auto", colSpan: 3 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Value" }],
    rows: NR_MARKETS.flatMap(market => {
      const cityData = allReportData[market.city];
      const caseName = "5G Auto Data Test Drive";
      const tput = getMobilityResult(cityData, market.network, caseName, "Throughput");
      const jitter = getMobilityResult(cityData, market.network, caseName, "Jitter");
      const err = getMobilityResult(cityData, market.network, caseName, "ErrorRatio");
      const rtt = getMobilityResult(cityData, market.network, caseName, "PingLatency");
      return [
        { cells: [{ label: market.label, rowSpan: 4 }, { label: "Mean Throughput" }, { label: 'Result', className: mapColorVarToClass(tput), link: '#2.11' }] },
        { cells: [null, { label: "Mean Jitter" }, { label: 'Result', className: mapColorVarToClass(jitter), link: '#2.11' }] },
        { cells: [null, { label: "Packet Failure Rate" }, { label: 'Result', className: mapColorVarToClass(err), link: '#2.11' }] },
        { cells: [null, { label: "Mean Round Trip Time" }, { label: 'Result', className: mapColorVarToClass(rtt), link: '#2.11' }] }
      ];
    })
  };

  const mobiltyMHSData = {
    headers: [{ label: "Mobility Test - Mobile Hotspot", colSpan: 3 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Value" }],
    rows: NR_MARKETS.flatMap(market => {
      const cityData = allReportData[market.city];
      const caseName = "5G Auto Data Test MHS Drive";
      const tput = getMobilityResult(cityData, market.network, caseName, "Throughput");
      const jitter = getMobilityResult(cityData, market.network, caseName, "Jitter");
      const err = getMobilityResult(cityData, market.network, caseName, "ErrorRatio");
      const rtt = getMobilityResult(cityData, market.network, caseName, "PingLatency");
      return [
        { cells: [{ label: market.label, rowSpan: 4 }, { label: "Mean Throughput" }, { label: 'Result', className: mapColorVarToClass(tput), link: '#2.12' }] },
        { cells: [null, { label: "Mean Jitter" }, { label: 'Result', className: mapColorVarToClass(jitter), link: '#2.12' }] },
        { cells: [null, { label: "Packet Failure Rate" }, { label: 'Result', className: mapColorVarToClass(err), link: '#2.12' }] },
        { cells: [null, { label: "Mean Round Trip Time" }, { label: 'Result', className: mapColorVarToClass(rtt), link: '#2.12' }] }
      ];
    })
  };

  const mrabData = {
    headers: [{ label: "MRAB Test - 5G Auto", colSpan: 5 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Pre Call" }, { label: "In Call" }, { label: "Post Call" }],
    rows: NR_MARKETS.map(market => {
      const cityData = allReportData[market.city];
      const base = cityData?.dataPerformance?.["Data Performance"]?.[market.network]?.["5G VoNR MRAB Stationary"];
      const getMrabRes = (sub) => {
        const dut = base?.DUT?.["MRAB Statistics"]?.[sub]?.Mean;
        const ref = base?.REF?.["MRAB Statistics"]?.[sub]?.Mean;
        return dut !== undefined && ref !== undefined ? getKpiCellColor('Throughput', dut, ref) : 'default';
      };
      return {
        cells: [
          { label: market.label },
          { label: "Mean Throughput" },
          { label: 'Result', className: mapColorVarToClass(getMrabRes("Pre Call")), link: '#2.13' },
          { label: 'Result', className: mapColorVarToClass(getMrabRes("In Call")), link: '#2.13' },
          { label: 'Result', className: mapColorVarToClass(getMrabRes("Post Call")), link: '#2.13' }
        ]
      };
    })
  };

  const httpNSASSData = {
    headers: [{ label: "HTTP Single Stream Test Download & Upload - 5G NSA", colSpan: 4 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Download" }, { label: "Upload" }],
    rows: NSA_MARKETS.map(market => {
      const cityData = allReportData[market.city];
      const dl = getAveragedKPI(cityData, market.network, "HTTP Single Stream", ["Throughput", "Mean"], "Throughput", "DL");
      const ul = getAveragedKPI(cityData, market.network, "HTTP Single Stream", ["Throughput", "Mean"], "Throughput", "UL");
      return {
        cells: [
          { label: market.label },
          { label: "Data Throughput Average" },
          { label: 'Result', className: mapColorVarToClass(dl), link: '#3.1' },
          { label: 'Result', className: mapColorVarToClass(ul), link: '#3.1' }
        ]
      };
    })
  };

  const httpNSAMSData = {
    headers: [{ label: "HTTP Multi Stream Test Download & Upload - 5G NSA", colSpan: 4 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Download" }, { label: "Upload" }],
    rows: NSA_MARKETS.map(market => {
      const cityData = allReportData[market.city];
      const dl = getAveragedKPI(cityData, market.network, "HTTP Multi Stream", ["Throughput", "Mean"], "Throughput", "DL");
      const ul = getAveragedKPI(cityData, market.network, "HTTP Multi Stream", ["Throughput", "Mean"], "Throughput", "UL");
      return {
        cells: [
          { label: market.label },
          { label: "Data Throughput Average" },
          { label: 'Result', className: mapColorVarToClass(dl), link: '#3.2' },
          { label: 'Result', className: mapColorVarToClass(ul), link: '#3.2' }
        ]
      };
    })
  };

  const udpNSAData = {
    headers: [{ label: "UDP Test - 5G NSA", colSpan: 4 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Download" }, { label: "Upload" }],
    rows: NSA_MARKETS.flatMap(market => {
      const cityData = allReportData[market.city];
      const dlTput = getUdpResult(cityData, market.network, "DL", "Throughput");
      const ulTput = getUdpResult(cityData, market.network, "UL", "Throughput");
      const dlJitter = getUdpResult(cityData, market.network, "DL", "Jitter");
      const ulJitter = getUdpResult(cityData, market.network, "UL", "Jitter");
      const dlErr = getUdpResult(cityData, market.network, "DL", "ErrorRatio");
      const ulErr = getUdpResult(cityData, market.network, "UL", "ErrorRatio");
      return [
        { cells: [{ label: market.label, rowSpan: 3 }, { label: "Mean Throughput" }, { label: 'Result', className: mapColorVarToClass(dlTput), link: '#3.3DL' }, { label: 'Result', className: mapColorVarToClass(ulTput), link: '#3.3UL' }] },
        { cells: [null, { label: "Mean Jitter" }, { label: 'Result', className: mapColorVarToClass(dlJitter), link: '#3.3DL' }, { label: 'Result', className: mapColorVarToClass(ulJitter), link: '#3.3UL' }] },
        { cells: [null, { label: "Packet Failure Rate" }, { label: 'Result', className: mapColorVarToClass(dlErr), link: '#3.3DL' }, { label: 'Result', className: mapColorVarToClass(ulErr), link: '#3.3UL' }] }
      ];
    })
  };

  const pingNSAData = {
    headers: [{ label: "Ping Test - 5G NSA", colSpan: 3 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "RTT" }],
    rows: NSA_MARKETS.map(market => {
      const cityData = allReportData[market.city];
      const res = getAveragedKPI(cityData, market.network, "Ping", ["Ping RTT", "avg"], "PingLatency");
      return {
        cells: [
          { label: market.label },
          { label: "Mean Round Trip Time" },
          { label: 'Result', className: mapColorVarToClass(res), link: '#3.4' }
        ]
      };
    })
  };

  const mobiltyNSAData = {
    headers: [{ label: "Mobility Test - 5G NSA", colSpan: 3 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Value" }],
    rows: NSA_MARKETS.flatMap(market => {
      const cityData = allReportData[market.city];
      const caseName = "5G NSA Data Test Drive"; // Placeholder case name for NSA
      const tput = getMobilityResult(cityData, market.network, caseName, "Throughput");
      const jitter = getMobilityResult(cityData, market.network, caseName, "Jitter");
      const err = getMobilityResult(cityData, market.network, caseName, "ErrorRatio");
      const rtt = getMobilityResult(cityData, market.network, caseName, "PingLatency");
      return [
        { cells: [{ label: market.label, rowSpan: 4 }, { label: "Mean Throughput" }, { label: 'Result', className: mapColorVarToClass(tput), link: '#3.5' }] },
        { cells: [null, { label: "Mean Jitter" }, { label: 'Result', className: mapColorVarToClass(jitter), link: '#3.5' }] },
        { cells: [null, { label: "Packet Failure Rate" }, { label: 'Result', className: mapColorVarToClass(err), link: '#3.5' }] },
        { cells: [null, { label: "Mean Round Trip Time" }, { label: 'Result', className: mapColorVarToClass(rtt), link: '#3.5' }] }
      ];
    })
  };



  return (
    <div>
      <div className='page-content'>
        <DynamicHeader level={1}>Data Performance Overview – All Network</DynamicHeader>
        <h4>Data Performance Overview – 5G Auto</h4>
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
      </div>
      <div className='page-content'>
        <div style={{ marginTop: 10 }}></div>
        <DpSummaryTable tableData={mobiltyMHSData} />
        <DpSummaryTable tableData={mrabData} />
      </div>
      <div className='page-content'>
        <h4>Data Performance Overview – 5G NSA</h4>
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