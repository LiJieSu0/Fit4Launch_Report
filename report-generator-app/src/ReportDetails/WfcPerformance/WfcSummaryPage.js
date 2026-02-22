import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import DynamicHeader from '../../CommonPage/DynamicHeader';
import { useReportData } from '../../Contexts/ReportContext';
import { getKpiCellColor } from '../../Utils/KpiRules';
import PageBreak from '../../CommonPage/PageBreak';

const WfcSummaryPage = () => {
  const { projectData, availableCities } = useReportData();
  const city = 'Seattle';

  const formatVal = (val) => {
    if (val === undefined || val === null || val === 'N/A') return 'N/A';
    const num = parseFloat(val);
    return isNaN(num) ? 'N/A' : num.toFixed(2);
  };

  const mapToPass = (color) => {
    if (color === 'var(--performance-excellent)') return 'var(--performance-pass)';
    return color;
  };

  const getWfcData = (tc) => projectData[city]?.wfcPerformance?.['WFC']?.[tc];

  // ---- Section 1: Baseline ----
  const baselineTcs = [
    { tc: 'TC150', label: 'Cellular Baseline', anchor: '#section-cellular-call-performance-and-audio-quality-baseline' },
    { tc: 'TC151', label: 'LinkSys Hydra Pro 6E', anchor: '#section-cellular-call-performance-and-audio-quality-baseline-linksys-hydra-pro-6e' },
  ];

  // ---- Section 2: WFC Call Performance ----
  const callPerfApConfig = [
    {
      apName: 'LinkSys Hydra Pro 6E',
      anchor: '#section-linksys-hydra-pro-6e',
      tcs: [
        { tc: 'TC153', label: 'ETSI-B' },
        { tc: 'TC154', label: 'NSD-A' },
        { tc: 'TC155', label: 'NSD-C' },
      ],
    },
    {
      apName: 'Google Nest AP AC2200',
      anchor: '#section-google-nest-ap-ac2200',
      tcs: [
        { tc: 'TC159', label: 'ETSI-B' },
        { tc: 'TC160', label: 'NSD-A' },
        { tc: 'TC161', label: 'NSD-C' },
      ],
    },
    {
      apName: 'ASUS RT-AC68U',
      anchor: '#section-asus-rt-ac68u',
      tcs: [
        { tc: 'TC156', label: 'ETSI-B' },
        { tc: 'TC157', label: 'NSD-A' },
        { tc: 'TC158', label: 'NSD-C' },
      ],
    },
  ];

  // ---- Section 3: Multi Handovers ----
  const handoverApConfig = [
    {
      apName: 'T-Mobile HINT Gateway',
      anchor: '#multihandover-section-t-mobile-hint-gateway',
      tcs: [
        { tc: 'TC162', label: 'Profile 1' },
        { tc: 'TC163', label: 'Profile 2' },
        { tc: 'TC164', label: 'Profile 3' },
      ],
    },
    {
      apName: 'ASUS RT-AC68U',
      anchor: '#multihandover-section-asus-rt-ac68u',
      tcs: [
        { tc: 'TC165', label: 'Profile 1' },
        { tc: 'TC166', label: 'Profile 2' },
        { tc: 'TC167', label: 'Profile 3' },
      ],
    },
    {
      apName: 'LinkSys Hydra Pro 6E',
      anchor: '#multihandover-section-linksys-hydra-pro-6e',
      tcs: [
        { tc: 'TC168', label: 'Profile 1' },
        { tc: 'TC169', label: 'Profile 2' },
        { tc: 'TC170', label: 'Profile 3' },
      ],
    },
  ];

  // ---- Section 4: IP Impairments ----
  const ipImpApConfig = [
    {
      apName: 'ASUS RT-AC68U',
      anchor: '#section-asus-rt-ac68u',
      tcs: [
        { tc: 'TC171', label: 'IWLAN→NR' },
        { tc: 'TC174', label: 'NR→IWLAN' },
      ],
    },
    {
      apName: 'LinkSys Hydra Pro 6E',
      anchor: '#section-linksys-hydra-pro-6e',
      tcs: [
        { tc: 'TC172', label: 'IWLAN→NR' },
        { tc: 'TC175', label: 'NR→IWLAN' },
      ],
    },
    {
      apName: 'T-Mobile HINT Gateway',
      anchor: '#section-t-mobile-hint-gateway',
      tcs: [
        { tc: 'TC173', label: 'IWLAN→NR' },
        { tc: 'TC176', label: 'NR→IWLAN' },
      ],
    },
  ];

  // ---- Section 5: WFC Coverage ----
  const coverageApConfig = [
    {
      apName: 'ASUS RT-AC68U',
      anchor: '#coverage-section-asus-rt-ac68u',
      tcs: [
        { tc: 'TC177', label: 'Walk In (P5)' },
        { tc: 'TC174', label: 'Walk Out (P6)' },
      ],
    },
    {
      apName: 'LinkSys Hydra Pro 6E',
      anchor: '#coverage-section-linksys-hydra-pro-6e',
      tcs: [
        { tc: 'TC178', label: 'Walk In (P5)' },
        { tc: 'TC175', label: 'Walk Out (P6)' },
      ],
    },
    {
      apName: 'T-Mobile HINT Gateway',
      anchor: '#coverage-section-t-mobile-hint-gateway',
      tcs: [
        { tc: 'TC179', label: 'Walk In (P5)' },
        { tc: 'TC176', label: 'Walk Out (P6)' },
      ],
    },
  ];

  // ---- Helper renderers ----
  const renderCallPerfRows = (apConfig) => {
    return apConfig.map((ap, apIdx) =>
      ap.tcs.map((tcEntry, tcIdx) => {
        const tcData = getWfcData(tcEntry.tc);
        const dutMo = tcData?.['DUT MO'] || tcData?.['DUT'];
        const refMo = tcData?.['REF MO'] || tcData?.['REF'];
        const dutMt = tcData?.['DUT MT'] || tcData?.['DUT'];
        const refMt = tcData?.['REF MT'] || tcData?.['REF'];

        const initRate = dutMo?.total_mo_attempts > 0 ? (dutMo?.total_initiation_failures || 0) / dutMo.total_mo_attempts : 0;
        const retRate = dutMo?.total_mo_attempts > 0 ? (dutMo?.total_retention_failures || 0) / dutMo.total_mo_attempts : 0;

        const setupColor = mapToPass(getKpiCellColor('CallSetupTime', dutMo?.mean_setup_time, refMo?.mean_setup_time));
        const initPval = tcData?.initiation_p_value ?? 1;
        const retPval = tcData?.retention_p_value ?? 1;
        const initColor = mapToPass(getKpiCellColor('WfcCallCriteria', initPval, initRate));
        const retColor = mapToPass(getKpiCellColor('WfcCallCriteria', retPval, retRate));
        const moMosColor = mapToPass(getKpiCellColor('WfcMOS', dutMo?.mos_average, refMo?.mos_average));
        const mtMosColor = mapToPass(getKpiCellColor('WfcMOS', dutMt?.mos_average, refMt?.mos_average));

        return (
          <tr key={`${ap.apName}-${tcEntry.tc}`}>
            {tcIdx === 0 && (
              <td rowSpan={ap.tcs.length}>
                <a href={ap.anchor} style={{ color: 'inherit', textDecoration: 'underline' }}>{ap.apName}</a>
              </td>
            )}
            <td>{tcEntry.label}</td>
            <td style={{ backgroundColor: setupColor }}>{formatVal(dutMo?.mean_setup_time)}</td>
            <td style={{ backgroundColor: initColor }}>{tcData && ((initRate * 100).toFixed(1) + '%')}</td>
            <td style={{ backgroundColor: retColor }}>{tcData && ((retRate * 100).toFixed(1) + '%')}</td>
            <td style={{ backgroundColor: moMosColor }}>{formatVal(dutMo?.mos_average)}</td>
            <td style={{ backgroundColor: mtMosColor }}>{formatVal(dutMt?.mos_average)}</td>
          </tr>
        );
      })
    );
  };

  const renderHandoverRows = (apConfig) => {
    return apConfig.map((ap, apIdx) =>
      ap.tcs.map((tcEntry, tcIdx) => {
        const tcData = getWfcData(tcEntry.tc);
        const dutData = tcData?.['DUT'];
        const refData = tcData?.['REF'];

        const mosColor = mapToPass(getKpiCellColor('WfcMOS', dutData?.mos_average, refData?.mos_average));
        const handoverColor = getKpiCellColor('MinimumHandovers', dutData?.minimum_handover);

        return (
          <tr key={`${ap.apName}-${tcEntry.tc}`}>
            {tcIdx === 0 && (
              <td rowSpan={ap.tcs.length}>
                <a href={ap.anchor} style={{ color: 'inherit', textDecoration: 'underline' }}>{ap.apName}</a>
              </td>
            )}
            <td>{tcEntry.label}</td>
            <td style={{ backgroundColor: mosColor }}>{formatVal(dutData?.mos_average)}</td>
            <td style={{ backgroundColor: handoverColor }}>{dutData?.minimum_handover ?? 'N/A'}</td>
            <td>{dutData?.total_retention_failures ?? 'N/A'}</td>
          </tr>
        );
      })
    );
  };

  const renderIpImpRows = (apConfig) => {
    return apConfig.map((ap, apIdx) =>
      ap.tcs.map((tcEntry, tcIdx) => {
        const tcData = getWfcData(tcEntry.tc);
        const dutData = tcData?.['DUT'];
        const refData = tcData?.['REF'];

        const mosBeforeColor = mapToPass(getKpiCellColor('IpImpairmentMOS', dutData?.mos_before_handover_average, refData?.mos_before_handover_average));
        const mosAfterColor = mapToPass(getKpiCellColor('IpImpairmentMOS', dutData?.mos_after_handover_average, refData?.mos_after_handover_average));
        const dropsColor = mapToPass(getKpiCellColor('IpImpairmentCallDrops', dutData?.total_retention_failures));

        return (
          <tr key={`${ap.apName}-${tcEntry.tc}`}>
            {tcIdx === 0 && (
              <td rowSpan={ap.tcs.length}>
                <a href={ap.anchor} style={{ color: 'inherit', textDecoration: 'underline' }}>{ap.apName}</a>
              </td>
            )}
            <td>{tcEntry.label}</td>
            <td style={{ backgroundColor: mosBeforeColor }}>{formatVal(dutData?.mos_before_handover_average)}</td>
            <td style={{ backgroundColor: mosAfterColor }}>{formatVal(dutData?.mos_after_handover_average)}</td>
            <td style={{ backgroundColor: dropsColor }}>{dutData?.total_retention_failures ?? 'N/A'}</td>
          </tr>
        );
      })
    );
  };

  const renderCoverageRows = (apConfig) => {
    return apConfig.map((ap, apIdx) =>
      ap.tcs.map((tcEntry, tcIdx) => {
        const tcData = getWfcData(tcEntry.tc);
        const dutData = tcData?.['DUT'];
        const refData = tcData?.['REF'];

        const mosBeforeColor = mapToPass(getKpiCellColor('IpImpairmentMOS', dutData?.mos_before_handover_average, refData?.mos_before_handover_average));
        const mosAfterColor = mapToPass(getKpiCellColor('IpImpairmentMOS', dutData?.mos_after_handover_average, refData?.mos_after_handover_average));
        const dropsColor = mapToPass(getKpiCellColor('IpImpairmentCallDrops', dutData?.total_retention_failures));

        return (
          <tr key={`${ap.apName}-${tcEntry.tc}`}>
            {tcIdx === 0 && (
              <td rowSpan={ap.tcs.length}>
                <a href={ap.anchor} style={{ color: 'inherit', textDecoration: 'underline' }}>{ap.apName}</a>
              </td>
            )}
            <td>{tcEntry.label}</td>
            <td style={{ backgroundColor: mosBeforeColor }}>{formatVal(dutData?.mos_before_handover_average)}</td>
            <td style={{ backgroundColor: mosAfterColor }}>{formatVal(dutData?.mos_after_handover_average)}</td>
            <td>{formatVal(dutData?.rssi_average)}</td>
            <td style={{ backgroundColor: dropsColor }}>{dutData?.total_retention_failures ?? 'N/A'}</td>
          </tr>
        );
      })
    );
  };

  const thStyle = { whiteSpace: 'normal', wordWrap: 'break-word', fontSize: '11px' };
  const sectionHeaderStyle = { marginTop: '18px', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', borderBottom: '1px solid #ccc', paddingBottom: '3px' };

  return (
    <>
      <PageBreak id="summary-page">
        <DynamicHeader level={1}>WFC Performance Test Summary</DynamicHeader>

        {/* ---- Baseline ---- */}
        <div style={sectionHeaderStyle}>1. Baseline Cellular &amp; WFC Call Performance</div>
        <table className="mini-performance-table general-table-style" style={{ width: '100%', fontSize: '11px', textAlign: 'center' }}>
          <thead>
            <tr>
              <th style={thStyle}>AP / Config</th>
              <th style={thStyle}>Setup Time (s)</th>
              <th style={thStyle}>Init Failure</th>
              <th style={thStyle}>Ret Failure</th>
              <th style={thStyle}>MO MOS</th>
              <th style={thStyle}>MT MOS</th>
            </tr>
          </thead>
          <tbody>
            {baselineTcs.map(({ tc, label, anchor }) => {
              const tcData = getWfcData(tc);
              const dutMo = tcData?.['DUT MO'] || tcData?.['DUT'];
              const refMo = tcData?.['REF MO'] || tcData?.['REF'];
              const dutMt = tcData?.['DUT MT'] || tcData?.['DUT'];
              const refMt = tcData?.['REF MT'] || tcData?.['REF'];

              const initRate = dutMo?.total_mo_attempts > 0 ? (dutMo?.total_initiation_failures || 0) / dutMo.total_mo_attempts : 0;
              const retRate = dutMo?.total_mo_attempts > 0 ? (dutMo?.total_retention_failures || 0) / dutMo.total_mo_attempts : 0;

              const setupColor = mapToPass(getKpiCellColor('CallSetupTime', dutMo?.mean_setup_time, refMo?.mean_setup_time));
              const initColor = mapToPass(getKpiCellColor('WfcCallCriteria', tcData?.initiation_p_value ?? 1, initRate));
              const retColor = mapToPass(getKpiCellColor('WfcCallCriteria', tcData?.retention_p_value ?? 1, retRate));
              const moMosColor = mapToPass(getKpiCellColor('WfcMOS', dutMo?.mos_average, refMo?.mos_average));
              const mtMosColor = mapToPass(getKpiCellColor('WfcMOS', dutMt?.mos_average, refMt?.mos_average));

              return (
                <tr key={tc}>
                  <td><a href={anchor} style={{ color: 'inherit', textDecoration: 'underline' }}>{label}</a></td>
                  <td style={{ backgroundColor: setupColor }}>{formatVal(dutMo?.mean_setup_time)}</td>
                  <td style={{ backgroundColor: initColor }}>{(initRate * 100).toFixed(1)}%</td>
                  <td style={{ backgroundColor: retColor }}>{(retRate * 100).toFixed(1)}%</td>
                  <td style={{ backgroundColor: moMosColor }}>{formatVal(dutMo?.mos_average)}</td>
                  <td style={{ backgroundColor: mtMosColor }}>{formatVal(dutMt?.mos_average)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* ---- Call Performance ---- */}
        <div style={sectionHeaderStyle}>2. WiFi Call Performance</div>
        <table className="mini-performance-table general-table-style" style={{ width: '100%', fontSize: '11px', textAlign: 'center' }}>
          <thead>
            <tr>
              <th style={thStyle}>AP Name</th>
              <th style={thStyle}>Profile</th>
              <th style={thStyle}>Setup Time (s)</th>
              <th style={thStyle}>Init Failure</th>
              <th style={thStyle}>Ret Failure</th>
              <th style={thStyle}>MO MOS</th>
              <th style={thStyle}>MT MOS</th>
            </tr>
          </thead>
          <tbody>{renderCallPerfRows(callPerfApConfig)}</tbody>
        </table>

        {/* ---- Multi Handovers ---- */}
        <div style={sectionHeaderStyle}>3. Multi Handovers</div>
        <table className="mini-performance-table general-table-style" style={{ width: '100%', fontSize: '11px', textAlign: 'center' }}>
          <thead>
            <tr>
              <th style={thStyle}>AP Name</th>
              <th style={thStyle}>Profile</th>
              <th style={thStyle}>Avg MOS</th>
              <th style={thStyle}>Handovers</th>
              <th style={thStyle}>Call Drops</th>
            </tr>
          </thead>
          <tbody>{renderHandoverRows(handoverApConfig)}</tbody>
        </table>
      </PageBreak>

      <PageBreak>
        {/* ---- IP Impairments ---- */}
        <div style={sectionHeaderStyle}>4. IP Impairments</div>
        <table className="mini-performance-table general-table-style" style={{ width: '100%', fontSize: '11px', textAlign: 'center' }}>
          <thead>
            <tr>
              <th style={thStyle}>AP Name</th>
              <th style={thStyle}>Transition</th>
              <th style={thStyle}>MOS Before HO</th>
              <th style={thStyle}>MOS During/After HO</th>
              <th style={thStyle}>Call Drops</th>
            </tr>
          </thead>
          <tbody>{renderIpImpRows(ipImpApConfig)}</tbody>
        </table>

        {/* ---- Walk In/Out WFC Coverage ---- */}
        <div style={{ ...sectionHeaderStyle, marginTop: '28px' }}>5. Walk In / Out of WFC Coverage</div>
        <table className="mini-performance-table general-table-style" style={{ width: '100%', fontSize: '11px', textAlign: 'center' }}>
          <thead>
            <tr>
              <th style={thStyle}>AP Name</th>
              <th style={thStyle}>Profile</th>
              <th style={thStyle}>MOS Before HO</th>
              <th style={thStyle}>MOS During/After HO</th>
              <th style={thStyle}>RSSI (dBm)</th>
              <th style={thStyle}>Call Drops</th>
            </tr>
          </thead>
          <tbody>{renderCoverageRows(coverageApConfig)}</tbody>
        </table>
      </PageBreak>
    </>
  );
};

export default WfcSummaryPage;