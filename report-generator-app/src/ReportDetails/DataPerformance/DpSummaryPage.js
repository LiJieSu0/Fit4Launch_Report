import React from 'react';
import DpSummaryTable from './DpSummaryTable';
import { ReportContext } from '../../Contexts/ReportContext';
import { useContext } from 'react';
import { getKpiCellColor } from '../../Utils/KpiRules';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import { HeaderContext } from '../../Contexts/HeaderContext';


//TODO summary page cell link
function DpSummaryPage() {
  const { allReportData } = useContext(ReportContext);
  const { numberedHeaders } = useContext(HeaderContext);

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

  const getLink = (caseName, market, subId = '') => {
    const city = market.city;
    const network = market.network.includes("AUTO") ? "5G Auto" : "5G NSA";
    const isMHS = caseName.startsWith("MHS");
    const cleanCaseName = caseName.replace("MHS-", "").replace("Play-store", "Play-store");

    // Find header that matches city, network, case name, and subId
    const header = numberedHeaders.find(h => {
      const text = h.text.toLowerCase();
      const matchesCity = text.includes(city.toLowerCase());
      const matchesNetwork = text.includes(network.toLowerCase());
      const matchesCase = text.includes(cleanCaseName.toLowerCase()) ||
        (cleanCaseName === "Web Browser" && text.includes("web browser")) ||
        (cleanCaseName === "Play-store App Download" && text.includes("play-store")) ||
        (caseName === "Mobility" && text.includes("mobility test"));
      const matchesMHS = isMHS ?
        (text.includes("mobile hotspot") || text.includes("mhs")) :
        (!text.includes("mobile hotspot") && !text.includes("mhs"));

      const matchesSub = !subId ||
        (subId === 'DL' && (text.includes("download") || text.includes("dl"))) ||
        (subId === 'UL' && (text.includes("upload") || text.includes("ul")));

      return matchesCity && matchesNetwork && matchesCase && matchesMHS && matchesSub;
    });

    if (header) {
      return `#${header.id}`;
    }

    return '#';
  };

  const NR_MARKETS = MARKETS_CONFIG.filter(m => m.network === "5G AUTO DP");
  const NSA_MARKETS = MARKETS_CONFIG.filter(m => m.network === "5G NSA DP");

  const httpSSData = {
    headers: [{ label: "HTTP Single Stream Test Download & Upload - 5G Auto", colSpan: 4 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Download" }, { label: "Upload" }],
    rows: NR_MARKETS.map((market, marketIdx) => {
      const cityData = allReportData[market.city];
      const dlResult = getAveragedKPI(cityData, market.network, "HTTP Single Stream", ["Throughput", "Mean"], "Throughput", "DL");
      const ulResult = getAveragedKPI(cityData, market.network, "HTTP Single Stream", ["Throughput", "Mean"], "Throughput", "UL");
      if (dlResult === 'default' && ulResult === 'default') return null;
      return {
        cells: [
          { label: market.label },
          { label: "Mean Throughput" },
          { label: 'Result', className: mapColorVarToClass(dlResult), link: getLink("HTTP Single Stream", market, 'DL') },
          { label: 'Result', className: mapColorVarToClass(ulResult), link: getLink("HTTP Single Stream", market, 'UL') }
        ]
      };
    }).filter(Boolean)
  };

  const httpMSData = {
    headers: [{ label: "HTTP Multi Stream Test Download & Upload - 5G Auto", colSpan: 4 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Download" }, { label: "Upload" }],
    rows: NR_MARKETS.map((market, marketIdx) => {
      const cityData = allReportData[market.city];
      const dlResult = getAveragedKPI(cityData, market.network, "HTTP Multi Stream", ["Throughput", "Mean"], "Throughput", "DL");
      const ulResult = getAveragedKPI(cityData, market.network, "HTTP Multi Stream", ["Throughput", "Mean"], "Throughput", "UL");
      if (dlResult === 'default' && ulResult === 'default') return null;
      return {
        cells: [
          { label: market.label },
          { label: "Mean Throughput" },
          { label: 'Result', className: mapColorVarToClass(dlResult), link: getLink("HTTP Multi Stream", market, 'DL') },
          { label: 'Result', className: mapColorVarToClass(ulResult), link: getLink("HTTP Multi Stream", market, 'UL') }
        ]
      };
    }).filter(Boolean)
  };

  const udpData = {
    headers: [{ label: "UDP Test - 5G Auto", colSpan: 4 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Download" }, { label: "Upload" }],
    rows: NR_MARKETS.flatMap((market, marketIdx) => {
      const cityData = allReportData[market.city];
      const dlTput = getUdpResult(cityData, market.network, "DL", "Throughput");
      const ulTput = getUdpResult(cityData, market.network, "UL", "Throughput");
      const dlJitter = getUdpResult(cityData, market.network, "DL", "Jitter");
      const ulJitter = getUdpResult(cityData, market.network, "UL", "Jitter");
      const dlErr = getUdpResult(cityData, market.network, "DL", "ErrorRatio");
      const ulErr = getUdpResult(cityData, market.network, "UL", "ErrorRatio");
      if ([dlTput, ulTput, dlJitter, ulJitter, dlErr, ulErr].every(r => r === 'default')) return [];
      return [
        { cells: [{ label: market.label, rowSpan: 3 }, { label: "Mean Throughput" }, { label: 'Result', className: mapColorVarToClass(dlTput), link: getLink("UDP", market, 'DL') }, { label: 'Result', className: mapColorVarToClass(ulTput), link: getLink("UDP", market, 'UL') }] },
        { cells: [null, { label: "Mean Jitter" }, { label: 'Result', className: mapColorVarToClass(dlJitter), link: getLink("UDP", market, 'DL') }, { label: 'Result', className: mapColorVarToClass(ulJitter), link: getLink("UDP", market, 'UL') }] },
        { cells: [null, { label: "Packet Failure Rate" }, { label: 'Result', className: mapColorVarToClass(dlErr), link: getLink("UDP", market, 'DL') }, { label: 'Result', className: mapColorVarToClass(ulErr), link: getLink("UDP", market, 'UL') }] }
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
    rows: NR_MARKETS.map((market, marketIdx) => {
      const cityData = allReportData[market.city];
      const result = getAveragedKPI(cityData, market.network, "Ping", ["Ping RTT", "avg"], "PingLatency");
      if (result === 'default') return null;
      return {
        cells: [
          { label: market.label },
          { label: "Mean Round Trip Time" },
          { label: 'Result', className: mapColorVarToClass(result), link: getLink("Ping", market) }
        ]
      };
    }).filter(Boolean)
  };

  const webBrowserData = {
    headers: [{ label: "Web Browser Test - 5G Auto", colSpan: 3 }],
    subHeaders: [
      { label: "Market" },
      { label: "Metrics" },
      { label: "Load Time" }
    ],
    rows: NR_MARKETS.map((market, marketIdx) => {
      const cityData = allReportData[market.city];
      const result = getAveragedKPI(cityData, market.network, "5G Auto Data Web-Kepler", ["Web Page Load Time", "Mean"], "WebPageLoadTime");
      if (result === 'default') return null;
      return {
        cells: [
          { label: market.label },
          { label: "Average Page Load Time" },
          { label: 'Result', className: mapColorVarToClass(result), link: getLink("Web Browser", market) }
        ]
      };
    }).filter(Boolean)
  };

  const playStoreData = {
    headers: [{ label: "Play-store App Download Test - 5G Auto", colSpan: 5 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "30M" }, { label: "60M" }, { label: "100M" }],
    rows: NR_MARKETS.map((market, marketIdx) => {
      const cityData = allReportData[market.city];
      // Play-store data structure usually multiple tasks or aggregated? Assume similar averaging
      const r30m = getAveragedKPI(cityData, market.network, "5G Auto Data Play-store app Download", ["30M", "overall_average_throughput"], "Throughput");
      const r60m = getAveragedKPI(cityData, market.network, "5G Auto Data Play-store app Download", ["60M", "overall_average_throughput"], "Throughput");
      const r100m = getAveragedKPI(cityData, market.network, "5G Auto Data Play-store app Download", ["100M", "overall_average_throughput"], "Throughput");

      if ([r30m, r60m, r100m].every(r => r === 'default')) return null;

      return {
        cells: [
          { label: market.label },
          { label: "Mean Throughput" },
          { label: 'Result', className: mapColorVarToClass(r30m), link: getLink("Play-store App Download", market) },
          { label: 'Result', className: mapColorVarToClass(r60m), link: getLink("Play-store App Download", market) },
          { label: 'Result', className: mapColorVarToClass(r100m), link: getLink("Play-store App Download", market) }
        ]
      };
    }).filter(Boolean)
  };

  const mhsHttpSSData = {
    headers: [{ label: "MHS-HTTP Single Stream Test Download & Upload - 5G Auto", colSpan: 4 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Download" }, { label: "Upload" }],
    rows: NR_MARKETS.map((market, marketIdx) => {
      const cityData = allReportData[market.city];
      const base = ["Mobile Hotspot Test", "HTTP Single Stream"];
      const dl = getAveragedKPI(cityData, market.network, base[0], ["Throughput", "Mean"], "Throughput", [base[1], "DL"]);
      const ul = getAveragedKPI(cityData, market.network, base[0], ["Throughput", "Mean"], "Throughput", [base[1], "UL"]);
      if (dl === 'default' && ul === 'default') return null;
      return {
        cells: [
          { label: market.label },
          { label: "Mean Throughput" },
          { label: 'Result', className: mapColorVarToClass(dl), link: getLink("MHS-HTTP Single Stream", market, 'DL') },
          { label: 'Result', className: mapColorVarToClass(ul), link: getLink("MHS-HTTP Single Stream", market, 'UL') }
        ]
      };
    }).filter(Boolean)
  };

  const mhsHttpMSData = {
    headers: [{ label: "MHS-HTTP Multi Stream Test Download & Upload - 5G Auto", colSpan: 4 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Download" }, { label: "Upload" }],
    rows: NR_MARKETS.map((market, marketIdx) => {
      const cityData = allReportData[market.city];
      const base = ["Mobile Hotspot Test", "HTTP Multi Stream"];
      const dl = getAveragedKPI(cityData, market.network, base[0], ["Throughput", "Mean"], "Throughput", [base[1], "DL"]);
      const ul = getAveragedKPI(cityData, market.network, base[0], ["Throughput", "Mean"], "Throughput", [base[1], "UL"]);
      if (dl === 'default' && ul === 'default') return null;
      return {
        cells: [
          { label: market.label },
          { label: "Mean Throughput" },
          { label: 'Result', className: mapColorVarToClass(dl), link: getLink("MHS-HTTP Multi Stream", market, 'DL') },
          { label: 'Result', className: mapColorVarToClass(ul), link: getLink("MHS-HTTP Multi Stream", market, 'UL') }
        ]
      };
    }).filter(Boolean)
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
    rows: NR_MARKETS.flatMap((market, marketIdx) => {
      const cityData = allReportData[market.city];
      const dlTput = getMhsUdpResult(cityData, market.network, "DL", "Throughput");
      const ulTput = getMhsUdpResult(cityData, market.network, "UL", "Throughput");
      const dlJitter = getMhsUdpResult(cityData, market.network, "DL", "Jitter");
      const ulJitter = getMhsUdpResult(cityData, market.network, "UL", "Jitter");
      const dlErr = getMhsUdpResult(cityData, market.network, "DL", "ErrorRatio");
      const ulErr = getMhsUdpResult(cityData, market.network, "UL", "ErrorRatio");
      if ([dlTput, ulTput, dlJitter, ulJitter, dlErr, ulErr].every(r => r === 'default')) return [];
      return [
        { cells: [{ label: market.label, rowSpan: 3 }, { label: "Mean Throughput" }, { label: 'Result', className: mapColorVarToClass(dlTput), link: getLink("MHS-UDP", market, 'DL') }, { label: 'Result', className: mapColorVarToClass(ulTput), link: getLink("MHS-UDP", market, 'UL') }] },
        { cells: [null, { label: "Mean Jitter" }, { label: 'Result', className: mapColorVarToClass(dlJitter), link: getLink("MHS-UDP", market, 'DL') }, { label: 'Result', className: mapColorVarToClass(ulJitter), link: getLink("MHS-UDP", market, 'UL') }] },
        { cells: [null, { label: "Packet Failure Rate" }, { label: 'Result', className: mapColorVarToClass(dlErr), link: getLink("MHS-UDP", market, 'DL') }, { label: 'Result', className: mapColorVarToClass(ulErr), link: getLink("MHS-UDP", market, 'UL') }] }
      ];
    })
  };

  const mhsPingData = {
    headers: [{ label: "MHS-Ping Test - 5G Auto", colSpan: 3 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "RTT" }],
    rows: NR_MARKETS.map((market, marketIdx) => {
      const cityData = allReportData[market.city];
      const res = getAveragedKPI(cityData, market.network, "Mobile Hotspot Test", ["Ping RTT", "avg"], "PingLatency", "Ping");
      if (res === 'default') return null;
      return {
        cells: [
          { label: market.label },
          { label: "Mean Round Trip Time" },
          { label: 'Result', className: mapColorVarToClass(res), link: getLink("MHS-Ping", market) }
        ]
      };
    }).filter(Boolean)
  };

  const getMobilityResult = (cityData, network, caseName, metricType) => {
    const cityBase = cityData?.dataPerformance?.["Data Performance"]?.[network];
    let base = getMetricValue(cityBase, ["Mobility Test", caseName]);
    if (!base) {
      // Fallback for cases where caseName is missing in JSON (e.g. NSA)
      const mobTest = getMetricValue(cityBase, ["Mobility Test"]);
      if (mobTest && (mobTest.DUT || mobTest.REF)) {
        base = mobTest;
      }
    }
    if (!base) return 'default';
    const dut = base.DUT;
    const ref = base.REF;
    if (!dut || !ref) return 'default';

    // Helper to get metric value with fallback keys
    const getVal = (dev, primaryKey, fallbackKey, subKey = 'Mean') => {
      return dev[primaryKey]?.[subKey] ?? dev[fallbackKey]?.[subKey];
    };

    if (metricType === 'Throughput') {
      const dutVal = getVal(dut, "DL Throughput", "Throughput");
      const refVal = getVal(ref, "DL Throughput", "Throughput");
      return getKpiCellColor('Throughput', dutVal, refVal);
    }
    if (metricType === 'Jitter') {
      const dutVal = getVal(dut, "DL Jitter", "Jitter");
      const refVal = getVal(ref, "DL Jitter", "Jitter");
      return getKpiCellColor('Jitter', dutVal, refVal);
    }
    if (metricType === 'ErrorRatio') {
      const dutVal = getVal(dut, "DL Error Ratio", "Error Ratio");
      const refVal = getVal(ref, "DL Error Ratio", "Error Ratio");
      return getKpiCellColor('ErrorRatio', dutVal, refVal);
    }
    if (metricType === 'PingLatency') {
      const dutVal = dut["Ping RTT"]?.Mean ?? dut["Ping RTT"]?.avg;
      const refVal = ref["Ping RTT"]?.Mean ?? ref["Ping RTT"]?.avg;
      return getKpiCellColor('PingLatency', dutVal, refVal);
    }
    return 'default';
  };

  const mobiltyData = {
    headers: [{ label: "Mobility Test - 5G Auto", colSpan: 3 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Value" }],
    rows: NR_MARKETS.flatMap((market, marketIdx) => {
      const cityData = allReportData[market.city];
      const caseName = "5G Auto Data Test Drive";
      const tput = getMobilityResult(cityData, market.network, caseName, "Throughput");
      const jitter = getMobilityResult(cityData, market.network, caseName, "Jitter");
      const err = getMobilityResult(cityData, market.network, caseName, "ErrorRatio");
      const rtt = getMobilityResult(cityData, market.network, caseName, "PingLatency");
      if ([tput, jitter, err, rtt].every(r => r === 'default')) return [];
      return [
        { cells: [{ label: market.label, rowSpan: 4 }, { label: "Mean Throughput" }, { label: 'Result', className: mapColorVarToClass(tput), link: getLink("Mobility", market) }] },
        { cells: [null, { label: "Mean Jitter" }, { label: 'Result', className: mapColorVarToClass(jitter), link: getLink("Mobility", market) }] },
        { cells: [null, { label: "Packet Failure Rate" }, { label: 'Result', className: mapColorVarToClass(err), link: getLink("Mobility", market) }] },
        { cells: [null, { label: "Mean Round Trip Time" }, { label: 'Result', className: mapColorVarToClass(rtt), link: getLink("Mobility", market) }] }
      ];
    })
  };

  const mobiltyMHSData = {
    headers: [{ label: "Mobility Test - Mobile Hotspot", colSpan: 3 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Value" }],
    rows: NR_MARKETS.flatMap((market, marketIdx) => {
      const cityData = allReportData[market.city];
      const caseName = "5G Auto Data Test MHS Drive";
      const tput = getMobilityResult(cityData, market.network, caseName, "Throughput");
      const jitter = getMobilityResult(cityData, market.network, caseName, "Jitter");
      const err = getMobilityResult(cityData, market.network, caseName, "ErrorRatio");
      const rtt = getMobilityResult(cityData, market.network, caseName, "PingLatency");
      if ([tput, jitter, err, rtt].every(r => r === 'default')) return [];
      return [
        { cells: [{ label: market.label, rowSpan: 4 }, { label: "Mean Throughput" }, { label: 'Result', className: mapColorVarToClass(tput), link: getLink("MHS-Mobility", market) }] },
        { cells: [null, { label: "Mean Jitter" }, { label: 'Result', className: mapColorVarToClass(jitter), link: getLink("MHS-Mobility", market) }] },
        { cells: [null, { label: "Packet Failure Rate" }, { label: 'Result', className: mapColorVarToClass(err), link: getLink("MHS-Mobility", market) }] },
        { cells: [null, { label: "Mean Round Trip Time" }, { label: 'Result', className: mapColorVarToClass(rtt), link: getLink("MHS-Mobility", market) }] }
      ];
    })
  };

  const mrabData = {
    headers: [{ label: "MRAB Test - 5G Auto", colSpan: 5 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Pre Call" }, { label: "In Call" }, { label: "Post Call" }],
    rows: NR_MARKETS.map((market, marketIdx) => {
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
          { label: 'Result', className: mapColorVarToClass(getMrabRes("Pre Call")), link: getLink("MRAB", market) },
          { label: 'Result', className: mapColorVarToClass(getMrabRes("In Call")), link: getLink("MRAB", market) },
          { label: 'Result', className: mapColorVarToClass(getMrabRes("Post Call")), link: getLink("MRAB", market) }
        ]
      };
    })
  };

  const httpNSASSData = {
    headers: [{ label: "HTTP Single Stream Test Download & Upload - 5G NSA", colSpan: 4 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Download" }, { label: "Upload" }],
    rows: NSA_MARKETS.map((market, marketIdx) => {
      const cityData = allReportData[market.city];
      const dl = getAveragedKPI(cityData, market.network, "HTTP Single Stream", ["Throughput", "Mean"], "Throughput", "DL");
      const ul = getAveragedKPI(cityData, market.network, "HTTP Single Stream", ["Throughput", "Mean"], "Throughput", "UL");
      if (dl === 'default' && ul === 'default') return null;
      return {
        cells: [
          { label: market.label },
          { label: "Data Throughput Average" },
          { label: 'Result', className: mapColorVarToClass(dl), link: getLink("HTTP Single Stream", market, 'DL') },
          { label: 'Result', className: mapColorVarToClass(ul), link: getLink("HTTP Single Stream", market, 'UL') }
        ]
      };
    }).filter(Boolean)
  };

  const httpNSAMSData = {
    headers: [{ label: "HTTP Multi Stream Test Download & Upload - 5G NSA", colSpan: 4 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Download" }, { label: "Upload" }],
    rows: NSA_MARKETS.map((market, marketIdx) => {
      const cityData = allReportData[market.city];
      const dl = getAveragedKPI(cityData, market.network, "HTTP Multi Stream", ["Throughput", "Mean"], "Throughput", "DL");
      const ul = getAveragedKPI(cityData, market.network, "HTTP Multi Stream", ["Throughput", "Mean"], "Throughput", "UL");
      if (dl === 'default' && ul === 'default') return null;
      return {
        cells: [
          { label: market.label },
          { label: "Data Throughput Average" },
          { label: 'Result', className: mapColorVarToClass(dl), link: getLink("HTTP Multi Stream", market, 'DL') },
          { label: 'Result', className: mapColorVarToClass(ul), link: getLink("HTTP Multi Stream", market, 'UL') }
        ]
      };
    }).filter(Boolean)
  };

  const udpNSAData = {
    headers: [{ label: "UDP Test - 5G NSA", colSpan: 4 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Download" }, { label: "Upload" }],
    rows: NSA_MARKETS.flatMap((market, marketIdx) => {
      const cityData = allReportData[market.city];
      const dlTput = getUdpResult(cityData, market.network, "DL", "Throughput");
      const ulTput = getUdpResult(cityData, market.network, "UL", "Throughput");
      const dlJitter = getUdpResult(cityData, market.network, "DL", "Jitter");
      const ulJitter = getUdpResult(cityData, market.network, "UL", "Jitter");
      const dlErr = getUdpResult(cityData, market.network, "DL", "ErrorRatio");
      const ulErr = getUdpResult(cityData, market.network, "UL", "ErrorRatio");
      if ([dlTput, ulTput, dlJitter, ulJitter, dlErr, ulErr].every(r => r === 'default')) return [];
      return [
        { cells: [{ label: market.label, rowSpan: 3 }, { label: "Mean Throughput" }, { label: 'Result', className: mapColorVarToClass(dlTput), link: getLink("UDP", market, 'DL') }, { label: 'Result', className: mapColorVarToClass(ulTput), link: getLink("UDP", market, 'UL') }] },
        { cells: [null, { label: "Mean Jitter" }, { label: 'Result', className: mapColorVarToClass(dlJitter), link: getLink("UDP", market, 'DL') }, { label: 'Result', className: mapColorVarToClass(ulJitter), link: getLink("UDP", market, 'UL') }] },
        { cells: [null, { label: "Packet Failure Rate" }, { label: 'Result', className: mapColorVarToClass(dlErr), link: getLink("UDP", market, 'DL') }, { label: 'Result', className: mapColorVarToClass(ulErr), link: getLink("UDP", market, 'UL') }] }
      ];
    })
  };

  const pingNSAData = {
    headers: [{ label: "Ping Test - 5G NSA", colSpan: 3 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "RTT" }],
    rows: NSA_MARKETS.map((market, marketIdx) => {
      const cityData = allReportData[market.city];
      const res = getAveragedKPI(cityData, market.network, "Ping", ["Ping RTT", "avg"], "PingLatency");
      if (res === 'default') return null;
      return {
        cells: [
          { label: market.label },
          { label: "Mean Round Trip Time" },
          { label: 'Result', className: mapColorVarToClass(res), link: getLink("Ping", market) }
        ]
      };
    }).filter(Boolean)
  };

  const mobiltyNSAData = {
    headers: [{ label: "Mobility Test - 5G NSA", colSpan: 3 }],
    subHeaders: [{ label: "Market" }, { label: "Metrics" }, { label: "Value" }],
    rows: NSA_MARKETS.flatMap((market, marketIdx) => {
      const cityData = allReportData[market.city];
      const caseName = "5G NSA Data Test Drive"; // Placeholder case name for NSA
      const tput = getMobilityResult(cityData, market.network, caseName, "Throughput");
      const jitter = getMobilityResult(cityData, market.network, caseName, "Jitter");
      const err = getMobilityResult(cityData, market.network, caseName, "ErrorRatio");
      const rtt = getMobilityResult(cityData, market.network, caseName, "PingLatency");
      if ([tput, jitter, err, rtt].every(r => r === 'default')) return [];
      return [
        { cells: [{ label: market.label, rowSpan: 4 }, { label: "Mean Throughput" }, { label: 'Result', className: mapColorVarToClass(tput), link: getLink("Mobility", market) }] },
        { cells: [null, { label: "Mean Jitter" }, { label: 'Result', className: mapColorVarToClass(jitter), link: getLink("Mobility", market) }] },
        { cells: [null, { label: "Packet Failure Rate" }, { label: 'Result', className: mapColorVarToClass(err), link: getLink("Mobility", market) }] },
        { cells: [null, { label: "Mean Round Trip Time" }, { label: 'Result', className: mapColorVarToClass(rtt), link: getLink("Mobility", market) }] }
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
        {/* <DpSummaryTable tableData={mrabData} /> */}
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