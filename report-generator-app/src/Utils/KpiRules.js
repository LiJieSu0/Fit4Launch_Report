// KpiRules.js

export const getKpiCellColor = (kpiType, dutValue, refValue = null) => {
  const dut = parseFloat(dutValue);
  const ref = refValue !== null ? parseFloat(refValue) : null;

  switch (kpiType) {
    case 'Throughput':
      if (dut > 1.1 * ref) {
        return 'var(--performance-excellent)';
      } else if (dut >= 0.9 * ref && dut <= 1.1 * ref) {
        return 'var(--performance-pass)';
      } else if (dut >= 0.8 * ref && dut < 0.9 * ref) {
        return 'var(--performance-marginal-fail)';
      } else if (dut < 0.8 * ref) {
        return 'var(--performance-fail)';
      }
      break;
    case 'Jitter':
      if (dut < 0.9 * ref) {
        return 'var(--performance-excellent)';
      } else if ((dut >= 0.9 * ref && dut <= 1.1 * ref) || dut < 10) {
        return 'var(--performance-pass)';
      } else if (dut > 1.1 * ref && dut <= 1.2 * ref) {
        return 'var(--performance-marginal-fail)';
      } else if (dut > 1.2 * ref) {
        return 'var(--performance-fail)';
      }
      break;
    case 'PingLatency':
      if (dut < 0.9 * ref) {
        return 'var(--performance-excellent)';
      } else if (dut >= 0.9 * ref && dut <= 1.1 * ref) {
        return 'var(--performance-pass)';
      } else if (dut > 1.1 * ref && dut <= 1.2 * ref) {
        return 'var(--performance-marginal-fail)';
      } else if (dut > 1.2 * ref) {
        return 'var(--performance-fail)';
      }
      break;
    case 'AudioDelay':
      if (dut < 0.9 * ref) {
        return 'var(--performance-excellent)';
      } else if (dut >= 0.9 * ref && dut <= 1.1 * ref) {
        return 'var(--performance-pass)';
      } else if (dut > 1.1 * ref && dut <= 1.2 * ref) {
        return 'var(--performance-marginal-fail)';
      } else if (dut > 1.2 * ref) {
        return 'var(--performance-fail)';
      }
      break;
    case 'AmrMosAverage':
      if (dut > ref) {
        return 'var(--performance-excellent)';
      } else if (dut >= ref - 0.1) {
        return 'var(--performance-pass)';
      } else if (dut < ref - 0.25) {
        return 'var(--performance-fail)';
      } else {
        return 'var(--performance-marginal-fail)';
      }
      break;
    case 'AmrMosTwoPointZero':
      if (dut < ref) {
        return 'var(--performance-excellent)';
      } else if (dut <= ref + 2) {
        return 'var(--performance-pass)';
      } else if (dut > ref + 4) {
        return 'var(--performance-fail)';
      } else {
        return 'var(--performance-marginal-fail)';
      }
      break;
    case 'AmrMosThreePointZero':
      if (dut < ref) {
        return 'var(--performance-excellent)';
      } else if (dut <= ref + 5) {
        return 'var(--performance-pass)';
      } else if (dut > ref + 8) {
        return 'var(--performance-fail)';
      } else {
        return 'var(--performance-marginal-fail)';
      }
      break;
    case 'EvsToEvsMosAverage':
      if (dut > 3.9) {
        return 'var(--performance-excellent)';
      } else if (dut >= 3.8) {
        return 'var(--performance-pass)';
      } else {
        return 'var(--performance-fail)';
      }
      break;
    case 'EvsToEvsMosThreePointFour':
      if (dut < ref) {
        return 'var(--performance-excellent)';
      } else if (dut <= ref + 5) {
        return 'var(--performance-pass)';
      } else if (dut > ref + 8) {
        return 'var(--performance-fail)';
      } else {
        return 'var(--performance-marginal-fail)';
      }
      break;
    case 'EvsToEvsMosThreePointZero':
      if (dut < ref) {
        return 'var(--performance-excellent)';
      } else if (dut <= ref + 2) {
        return 'var(--performance-pass)';
      } else if (dut > ref + 4) {
        return 'var(--performance-fail)';
      } else {
        return 'var(--performance-marginal-fail)';
      }
      break;
    case 'EvsToAmrMosAverage':
      if (dut > 3.6) {
        return 'var(--performance-excellent)';
      } else if (dut >= 3.4) {
        return 'var(--performance-pass)';
      } else {
        return 'var(--performance-fail)';
      }
      break;
    case 'EvsToAmrMosThreePointFour':
      if (dut < ref) {
        return 'var(--performance-excellent)';
      } else if (dut <= ref + 10) {
        return 'var(--performance-pass)';
      } else {
        return 'var(--performance-fail)';
      }
      break;
    case 'EvsToAmrMosThreePointZero':
      if (dut < ref) {
        return 'var(--performance-excellent)';
      } else if (dut <= ref + 5) {
        return 'var(--performance-pass)';
      } else if (dut > ref + 8) {
        return 'var(--performance-fail)';
      } else {
        return 'var(--performance-marginal-fail)';
      }
      break;
    case 'ErrorRatio':
      const diff = dut - ref;
      if (dut < ref) {
        return 'var(--performance-excellent)';
      } else if (dut <= 5 || diff <= 10) {
        return 'var(--performance-pass)';
      } else if (diff > 10 && diff <= 20) {
        return 'var(--performance-marginal-fail)';
      } else if (diff > 20) {
        return 'var(--performance-fail)';
      }
      break;
    case 'WebPageLoadTime':
      if (dut < 0.9 * ref) {
        return 'var(--performance-excellent)';
      } else if ((dut >= 0.9 * ref && dut <= 1.1 * ref) || dut < 2) {
        return 'var(--performance-pass)';
      } else if (dut > 1.1 * ref && dut <= 1.2 * ref) {
        return 'var(--performance-marginal-fail)';
      } else if (dut > 1.2 * ref) {
        return 'var(--performance-fail)';
      }
      break;
    case 'CallSetupTime':
      if (dut < ref) {
        return 'var(--performance-excellent)';
      } else if (dut >= ref && dut <= 1.1 * ref) {
        return 'var(--performance-pass)';
      } else if (dut > 1.1 * ref && dut <= 1.25 * ref) {
        return 'var(--performance-marginal-fail)';
      } else if (dut > 1.25 * ref) {
        return 'var(--performance-fail)';
      }
      break;
    case 'CallRetention':
      if (dut > 0.99) {
        return 'var(--performance-excellent)';
      } else if (dut >= 0.05 && dut <= 0.99) {
        return 'var(--performance-pass)';
      } else if (dut < 0.05) {
        return 'var(--performance-fail)';
      }
      break;
    case 'CallInitiation':
      if (dut > 0.99) {
        return 'var(--performance-excellent)';
      } else if (dut >= 0.05 && dut <= 0.99) {
        return 'var(--performance-pass)';
      } else if (dut < 0.05) {
        return 'var(--performance-fail)';
      }
      break;
    case 'WfcCallCriteria':
      if (dut > 0.95) {
        return 'var(--performance-excellent)';
      } else if (dut >= 0.05 && dut <= 0.95) {
        return 'var(--performance-pass)';
      } else if (dut < 0.05 && ref < 0.01) {
        return 'var(--performance-marginal-fail)';
      } else if (dut < 0.05) {
        return 'var(--performance-fail)';
      }
      break;
    case 'WfcMOS':
      if (dut > ref) {
        return 'var(--performance-excellent)';
      } else if (dut > ref - 0.1) {
        return 'var(--performance-pass)';
      } else if (dut < ref - 0.25) {
        return 'var(--performance-fail)';
      } else {
        return 'var(--performance-marginal-fail)';
      }
      break;
    case 'CoverageDistance':
      if (dut >= 0.95 * ref) {
        return 'var(--performance-pass)';
      } else {
        return 'var(--performance-fail)';
      }
      break;
    case 'MinimumHandovers':
      if (dut >= 5) {
        return 'var(--performance-pass)';
      } else {
        return 'var(--performance-fail)';
      }
      break;
    case 'WfcCallDrop':
      if (dut === 0) {
        return 'var(--performance-pass)';
      } else if (dut === 1) {
        return 'var(--performance-marginal-fail)';
      } else if (dut >= 2) {
        return 'var(--performance-fail)';
      }
      break;
    case 'IpImpairmentMOS':
      if (dut > ref) {
        return 'var(--performance-excellent)';
      } else if (dut > ref - 0.1) {
        return 'var(--performance-pass)';
      } else if (dut < ref - 0.25) {
        return 'var(--performance-fail)';
      } else {
        return 'var(--performance-marginal-fail)';
      }
      break;
    case 'IpImpairmentCallDrops':
      if (dut === 0) {
        return 'var(--performance-pass)';
      } else if (dut === 1) {
        return 'var(--performance-marginal-fail)';
      } else if (dut >= 2) {
        return 'var(--performance-fail)';
      }
      break;
    default:
      return null;
  }
  return null;
};

export const getKpiCellClass = (kpiType, dutValue, refValue = null) => {
  const color = getKpiCellColor(kpiType, dutValue, refValue);
  switch (color) {
    case 'var(--performance-excellent)': return 'bg-performance-excellent';
    case 'var(--performance-pass)': return 'bg-performance-pass';
    case 'var(--performance-marginal-fail)': return 'bg-performance-marginal-fail';
    case 'var(--performance-fail)': return 'bg-performance-fail';
    default: return '';
  }
};
