// KpiRules.js

export const getKpiCellColor = (kpiType, dutValue, refValue = null) => { // only apply color on the cell of dut average value or mean value
  if (refValue === null) {
    return; 
  }

  switch (kpiType) {
    case 'Throughput':
      if (dutValue > 1.1 * refValue) {
        return 'var(--performance-excellent)';
      } else if (dutValue >= 0.9 * refValue && dutValue <= 1.1 * refValue) {
        return 'var(--performance-pass)';
      } else if (dutValue >= 0.8 * refValue && dutValue < 0.9 * refValue) {
        return 'var(--performance-marginal-fail)';
      } else if (dutValue < 0.8 * refValue) {
        return 'var(--performance-fail)';
      }
      break;
    case 'Jitter':
      if (dutValue < 0.9 * refValue) {
        return 'var(--performance-excellent)';
      } else if ((dutValue >= 0.9 * refValue && dutValue <= 1.1 * refValue) || dutValue < 10) {
        return 'var(--performance-pass)';
      } else if (dutValue > 1.1 * refValue && dutValue <= 1.2 * refValue) {
        return 'var(--performance-marginal-fail)';
      } else if (dutValue > 1.2 * refValue) {
        return 'var(--performance-fail)';
      }
      break;
    case 'PingLatency':
      if (dutValue < 0.9 * refValue) {
        return 'var(--performance-excellent)';
      } else if (dutValue >= 0.9 * refValue && dutValue <= 1.1 * refValue) {
        return 'var(--performance-pass)';
      } else if (dutValue > 1.1 * refValue && dutValue <= 1.20 * refValue) {
        return 'var(--performance-marginal-fail)';
      } else if (dutValue > 1.20 * refValue) {
        return 'var(--performance-fail)';
      }
      break;
    case 'ErrorRatio':
      const diff = dutValue - refValue;
      if (dutValue < refValue) {
        return 'var(--performance-excellent)';
      } else if (dutValue <= 5 || diff <= 10) {
        return 'var(--performance-pass)';
      } else if (diff > 10 && diff <= 20) {
        return 'var(--performance-marginal-fail)';
      } else if (diff > 20) {
        return 'var(--performance-fail)';
      }
      break;
case 'WebPageLoadTime':
      if (dutValue < 0.9 * refValue) {
        return 'var(--performance-excellent)';
      } else if ((dutValue >= 0.9 * refValue && dutValue <= 1.1 * refValue) || dutValue < 2) {
        return 'var(--performance-pass)';
      } else if (dutValue > 1.1 * refValue && dutValue <= 1.20 * refValue) {
        return 'var(--performance-marginal-fail)';
      } else if (dutValue > 1.20 * refValue) {
        return 'var(--performance-fail)';
      }
      break;
    default:
      return; // Default case if kpiType doesn't match
  }

};