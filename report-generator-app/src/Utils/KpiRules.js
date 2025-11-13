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
  }

  const thresholds = KPI_THRESHOLDS[kpiType];

  if (!thresholds) {
    return 'transparent'; // Default or unknown KPI type
  }

  // Rules for other KPIs (PingLatency, Jitter, FailureRate)
  if (dutValue <= thresholds.excellent) {
    return 'var(--performance-excellent)';
  } else if (dutValue <= thresholds.good) {
    return 'var(--performance-pass)';
  } else if (dutValue <= thresholds.acceptable) {
    return 'var(--performance-marginal-fail)';
  } else {
    return 'var(--performance-fail)';
  }
};