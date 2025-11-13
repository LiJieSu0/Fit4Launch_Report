// KpiRules.js

export const getKpiCellColor = (kpiType, dutValue, refValue = null) => {
  if (kpiType === 'Throughput' && refValue !== null) {
    // Throughput rules based on DUT vs REF
    if (dutValue > 1.1 * refValue) {
      return 'var(--performance-excellent)';
    } else if (dutValue >= 0.9 * refValue && dutValue <= 1.1 * refValue) {
      return 'var(--performance-pass)';
    } else if (dutValue >= 0.8 * refValue && dutValue < 0.9 * refValue) {
      return 'var(--performance-marginal-fail)';
    } else if (dutValue < 0.8 * refValue) {
      return 'var(--performance-fail)';
    }
  } else if (kpiType === 'Jitter' && refValue !== null) {
    // Jitter rules based on DUT vs REF
    if (dutValue < 0.9 * refValue) {
      return 'var(--performance-excellent)';
    } else if ((dutValue >= 0.9 * refValue && dutValue <= 1.1 * refValue) || dutValue < 10) {
      return 'var(--performance-pass)';
    } else if (dutValue > 1.1 * refValue && dutValue <= 1.2 * refValue) {
      return 'var(--performance-marginal-fail)';
    } else if (dutValue > 1.2 * refValue) {
      return 'var(--performance-fail)';
    }
  } else if (kpiType === 'PingLatency' && refValue !== null) {
    // PingLatency rules based on DUT vs REF
    if (dutValue < 0.9 * refValue) {
      return 'var(--performance-excellent)';
    } else if (dutValue >= 0.9 * refValue && dutValue <= 1.1 * refValue) {
      return 'var(--performance-pass)';
    } else if (dutValue > 1.1 * refValue && dutValue <= 1.20 * refValue) {
      return 'var(--performance-marginal-fail)';
    } else if (dutValue > 1.20 * refValue) {
      return 'var(--performance-fail)';
    }
  } else if (kpiType === 'ErrorRatio' && refValue !== null) {
    // ErrorRatio rules based on Packet Loss
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
  } else if (kpiType === 'WebpageLoadTime' && refValue !== null) {
    // WebpageLoadTime rules based on DUT vs REF
    if (dutValue < 0.9 * refValue) {
      return 'var(--performance-excellent)';
    } else if ((dutValue >= 0.9 * refValue && dutValue <= 1.1 * refValue) || dutValue < 2) {
      return 'var(--performance-pass)';
    } else if (dutValue > 1.1 * refValue && dutValue <= 1.20 * refValue) {
      return 'var(--performance-marginal-fail)';
    } else if (dutValue > 1.20 * refValue) {
      return 'var(--performance-fail)';
    }
  }

};