import React, { useContext } from 'react';
import CoverageTestTable from './CoverageTestTable';
import HPUECoverageTable from './HPUECoverageTable';
import '../../StyleScript/Restricted_Report_Style.css';
import { ReportContext } from '../../Contexts/ReportContext';

function CoverageDetails() {
  const { reportData } = useContext(ReportContext);

  const processVoNRCoverageData = (band, metric) => {
    const defaultRows = [
      { device: 'DUT', run1: 0, run2: 0, run3: 0, run4: 0, run5: 0, average: 0 },
      { device: 'REF', run1: 0, run2: 0, run3: 0, run4: 0, run5: 0, average: 0 },
      "N/A"
    ];

    // Check deep nested structure: reportData -> coveragePerformance (file) -> "Coverage Performance" (key) -> "5G VoNR Coverage Test"
    const rootData = reportData && reportData.coveragePerformance && reportData.coveragePerformance['Coverage Performance'];

    if (!rootData || !rootData['5G VoNR Coverage Test']) {
      return defaultRows;
    }

    const bandData = rootData['5G VoNR Coverage Test'][band];
    if (!bandData) {
      return defaultRows;
    }

    const rows = ['DUT', 'REF'].map(device => {
      const deviceRuns = bandData[device] || {};
      const runData = { device };
      let sum = 0;
      let count = 0;

      for (let i = 1; i <= 5; i++) {
        const runKey = `Run${i}`;
        const runInfo = deviceRuns[runKey];
        let val = 0;
        // Access nested metric and then distance_km
        if (runInfo && runInfo[metric] && typeof runInfo[metric].distance_km === 'number') {
          val = runInfo[metric].distance_km;
        }

        runData[`run${i}`] = val > 0 ? parseFloat(val.toFixed(2)) : 0;

        if (val > 0) {
          sum += val;
          count++;
        }
      }

      runData.average = count > 0 ? parseFloat((sum / count).toFixed(2)) : 0;
      return runData;
    });

    const dutAvg = rows[0].average;
    const refAvg = rows[1].average;
    // Pass if DUT average is greater than or equal to 0.95 * REF average (CoverageDistance KPI)
    const status = dutAvg >= 0.95 * refAvg ? "Pass" : "Fail";

    return [...rows, status];
  };

  const processN41HPUECoverageData = () => {
    const defaultData = {
      PC2: { distances: [0, 0, 0, 0, 0, 0], txPowers: [0, 0, 0, 0, 0, 0] },
      PC3: { distances: [0, 0, 0, 0, 0, 0], txPowers: [0, 0, 0, 0, 0, 0] }
    };

    const rootData = reportData && reportData.coveragePerformance && reportData.coveragePerformance['Coverage Performance'];

    if (!rootData || !rootData['5G n41 HPUE Coverage Test']) {
      return defaultData;
    }

    const n41Data = rootData['5G n41 HPUE Coverage Test'];
    const pc2Distances = [];
    const pc2TxPowers = [];
    const pc3Distances = [];
    const pc3TxPowers = [];

    for (let i = 1; i <= 5; i++) {
      const runKey = `Run${i}`;
      const runData = n41Data[runKey];

      if (runData && Array.isArray(runData)) {
        const pc2Entry = runData.find(item => item['Device type'] === 'PC2');
        const pc3Entry = runData.find(item => item['Device type'] === 'PC3');

        pc2Distances.push(pc2Entry ? parseFloat(pc2Entry.distance_km.toFixed(2)) : 0);
        pc2TxPowers.push(pc2Entry ? parseFloat(pc2Entry.tx_power_value.toFixed(1)) : 0);
        pc3Distances.push(pc3Entry ? parseFloat(pc3Entry.distance_km.toFixed(2)) : 0);
        pc3TxPowers.push(pc3Entry ? parseFloat(pc3Entry.tx_power_value.toFixed(1)) : 0);
      } else {
        pc2Distances.push(0);
        pc2TxPowers.push(0);
        pc3Distances.push(0);
        pc3TxPowers.push(0);
      }
    }

    // Calculate averages
    const pc2DistAvg = parseFloat((pc2Distances.reduce((a, b) => a + b, 0) / 5).toFixed(2));
    const pc2TxAvg = parseFloat((pc2TxPowers.reduce((a, b) => a + b, 0) / 5).toFixed(1));
    const pc3DistAvg = parseFloat((pc3Distances.reduce((a, b) => a + b, 0) / 5).toFixed(2));
    const pc3TxAvg = parseFloat((pc3TxPowers.reduce((a, b) => a + b, 0) / 5).toFixed(1));

    return {
      PC2: {
        distances: [...pc2Distances, pc2DistAvg],
        txPowers: [...pc2TxPowers, pc2TxAvg]
      },
      PC3: {
        distances: [...pc3Distances, pc3DistAvg],
        txPowers: [...pc3TxPowers, pc3TxAvg]
      }
    };
  };

  const n41HPUEData = processN41HPUECoverageData();

  const NR25_DL = processVoNRCoverageData('n25', 'first_dl_tp_gt_1');
  const NR25_UL = processVoNRCoverageData('n25', 'first_ul_tp_gt_1');
  const NR25_MOS = processVoNRCoverageData('n25', 'mos_before_drop');
  const NR25_Audio = processVoNRCoverageData('n25', 'call_drop');

  const NR41_DL = processVoNRCoverageData('n41', 'first_dl_tp_gt_1');
  const NR41_UL = processVoNRCoverageData('n41', 'first_ul_tp_gt_1');
  const NR41_MOS = processVoNRCoverageData('n41', 'mos_before_drop');
  const NR41_Audio = processVoNRCoverageData('n41', 'call_drop');

  const NR71_DL = processVoNRCoverageData('n71', 'first_dl_tp_gt_1');
  const NR71_UL = processVoNRCoverageData('n71', 'first_ul_tp_gt_1');
  const NR71_MOS = processVoNRCoverageData('n71', 'mos_before_drop');
  const NR71_Audio = processVoNRCoverageData('n71', 'call_drop');

  const n25SecondaryKpiData = [
    {
      run: 'RUN 1',
      segments: [
        { segment: 'First 30%', bler: 2.66, mcs: 9.48, cqi: 11.17 },
        { segment: 'Middle 40%', bler: 1.96, mcs: 16.60, cqi: 13.05 },
        { segment: 'Last 30%', bler: 1.81, mcs: 15.98, cqi: 11.99 },
      ],
    },
    {
      run: 'RUN 2',
      segments: [
        { segment: 'First 30%', bler: 2.39, mcs: 13.23, cqi: 11.80 },
        { segment: 'Middle 40%', bler: 1.95, mcs: 14.05, cqi: 12.50 },
        { segment: 'Last 30%', bler: 2.01, mcs: 9.92, cqi: 9.96 },
      ],
    },
    {
      run: 'RUN 3',
      segments: [
        { segment: 'First 30%', bler: 2.50, mcs: 9.37, cqi: 11.27 },
        { segment: 'Middle 40%', bler: 2.28, mcs: 14.85, cqi: 12.64 },
        { segment: 'Last 30%', bler: 2.86, mcs: 7.96, cqi: 8.51 },
      ],
    },
    {
      run: 'RUN 4',
      segments: [
        { segment: 'First 30%', bler: 2.85, mcs: 9.54, cqi: 11.48 },
        { segment: 'Middle 40%', bler: 2.15, mcs: 16.20, cqi: 13.14 },
        { segment: 'Last 30%', bler: 2.44, mcs: 7.07, cqi: 7.79 },
      ],
    },
    {
      run: 'RUN 5',
      segments: [
        { segment: 'First 30%', bler: 2.17, mcs: 12.45, cqi: 11.60 },
        { segment: 'Middle 40%', bler: 1.90, mcs: 14.62, cqi: 12.27 },
        { segment: 'Last 30%', bler: 1.85, mcs: 11.70, cqi: 10.01 },
      ],
    },
  ];

  const n41SecondaryKpiData = [
    {
      run: 'RUN 1',
      segments: [
        { segment: 'First 30%', bler: 2.294686067, mcs: 5.382022472, cqi: 10.349 },
        { segment: 'Middle 40%', bler: 2.076082898, mcs: 6.515923567, cqi: 11.465 },
        { segment: 'Last 30%', bler: 39.12799513, mcs: 1.761904762, cqi: 5.8759 },
      ],
    },
    {
      run: 'RUN 2',
      segments: [
        { segment: 'First 30%', bler: 1.45510707, mcs: 6.434782609, cqi: 11.1654 },
        { segment: 'Middle 40%', bler: 3.254273595, mcs: 5.045801527, cqi: 10.7183 },
        { segment: 'Last 30%', bler: 35.16159218, mcs: 1.594594595, cqi: 5.76757 },
      ],
    },
    {
      run: 'RUN 3',
      segments: [
        { segment: 'First 30%', bler: 2.090231161, mcs: 7.482352941, cqi: 10.6865 },
        { segment: 'Middle 40%', bler: 2.197929952, mcs: 8.301369863, cqi: 11.6589 },
        { segment: 'Last 30%', bler: 46.1069859, mcs: 1.16, cqi: 5.86486 },
      ],
    },
    {
      run: 'RUN 4',
      segments: [
        { segment: 'First 30%', bler: 2.016925881, mcs: 3.850746269, cqi: 11.394 },
        { segment: 'Middle 40%', bler: 1.933122928, mcs: 8.416, cqi: 12.3864 },
        { segment: 'Last 30%', bler: 27.69401441, mcs: 1.898305085, cqi: 6.08448 },
      ],
    },
    {
      run: 'RUN 5',
      segments: [
        { segment: 'First 30%', bler: 3.55, mcs: 13.70, cqi: 11.26 },
        { segment: 'Middle 40%', bler: 6.78, mcs: 8.15, cqi: 10.88 },
        { segment: 'Last 30%', bler: 29.43, mcs: 5.50, cqi: 8.62 },
      ],
    },
  ];

  const n71SecondaryKpiData = [
    {
      run: 'RUN 1',
      segments: [
        { segment: 'First 30%', bler: 2.277494571, mcs: 12.95238085, cqi: 12.00145 },
        { segment: 'Middle 40%', bler: 1.644078059, mcs: 14.70588235, cqi: 11.34202 },
        { segment: 'Last 30%', bler: 3.112151692, mcs: 8.923076923, cqi: 8.593846 },
      ],
    },
    {
      run: 'RUN 2',
      segments: [
        { segment: 'First 30%', bler: 2.316072977, mcs: 12.75, cqi: 11.74 },
        { segment: 'Middle 40%', bler: 1.872247871, mcs: 13.06451613, cqi: 11.07312 },
        { segment: 'Last 30%', bler: 3.114783792, mcs: 8.3125, cqi: 7.19375 },
      ],
    },
    {
      run: 'RUN 3',
      segments: [
        { segment: 'First 30%', bler: 1.840999091, mcs: 13.69767442, cqi: 12.41429 },
        { segment: 'Middle 40%', bler: 1.745570495, mcs: 15.31868132, cqi: 11.23297 },
        { segment: 'Last 30%', bler: 7.84314896, mcs: 6.8, cqi: 6.592 },
      ],
    },
    {
      run: 'RUN 4',
      segments: [
        { segment: 'First 30%', bler: 2.983172346, mcs: 11.11764706, cqi: 11.55294 },
        { segment: 'Middle 40%', bler: 1.41624571, mcs: 13.10280374, cqi: 10.55794 },
        { segment: 'Last 30%', bler: 16.15227547, mcs: 2.735849057, cqi: 5.326415 },
      ],
    },
    {
      run: 'RUN 5',
      segments: [
        { segment: 'First 30%', bler: 3.402677235, mcs: 12.54901961, cqi: 11.83396 },
        { segment: 'Middle 40%', bler: 1.767312972, mcs: 12.90654206, cqi: 10.93645 },
        { segment: 'Last 30%', bler: 4.350459538, mcs: 10.46153846, cqi: 8.288462 },
      ],
    },
  ];

  return (
    <div>
      <div className='page-content'>
        <h1>2. Coverage Test - Seattle</h1>
        <h2>2.1 5G VoNR Coverage Test - N25, N41, N71</h2>
        <div id='2.1DL'></div>
        {/* ------NR25 */}
        <h3>5G VoNR Coverage Test NR25- DL Throughput &lt; 1Mbps Distance (km)</h3>
        {/* NR25 DL table */}
        <CoverageTestTable tableData={NR25_DL.slice(0, -1)} status={NR25_DL[NR25_Audio.length - 1]} />
        {/* map picture */}
        <div style={{ marginBottom: 10, textAlign: 'center' }}></div>
        <img src="/CoverageMap/NR25_DL_MAP.png" alt="Coverage Map" style={{ maxWidth: '70%', height: '70%', display: 'block', margin: '0 auto' }} />
      </div>
      <div className='page-content'>
        <h3>5G VoNR Coverage Test NR25- UL Throughput &lt; 1Mbps Distance (km)</h3>
        <div id='2.1UL'></div>

        {/* NR25 UL table */}
        <CoverageTestTable tableData={NR25_UL.slice(0, -1)} status={NR25_UL[NR25_Audio.length - 1]} />
        <img src="/CoverageMap/NR25_UL_MAP.png" alt="Coverage Map" style={{ maxWidth: '70%', height: '70%', display: 'block', margin: '0 auto' }} />

      </div>
      <div className='page-content'>
        <h3>5G VoNR Coverage Test NR25- Last MOS Before Silence Distance (km)</h3>
        <div id='2.1MOS'></div>
        {/* NR25 MOS table */}
        <CoverageTestTable tableData={NR25_MOS.slice(0, -1)} status={NR25_MOS[NR25_Audio.length - 1]} />
        <img src="/CoverageMap/NR25_MOS_MAP.png" alt="Coverage Map" style={{ maxWidth: '70%', height: '70%', display: 'block', margin: '0 auto' }} />

      </div>
      <div className='page-content'>
        <h3>5G VoNR Coverage Test NR25- Audio Call Drop Distance (km)</h3>
        <div id='2.1Call'></div>
        {/* NR25 Audio table */}
        <CoverageTestTable tableData={NR25_Audio.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <img src="/CoverageMap/NR25_Audio_MAP.png" alt="Coverage Map" style={{ maxWidth: '70%', height: '70%', display: 'block', margin: '0 auto' }} />
      </div>
      <div className='page-content'>
        <h3>5G VoNR Coverage Test NR25 - Secondary KPI</h3>
        {/* n25 secondary kpi table */}
        <table className="general-table-style">
          <thead>
            <tr>
              <th>Run</th>
              <th>Segment</th>
              <th>AVG BLER</th>
              <th>AVG MCS</th>
              <th>AVG CQI</th>
            </tr>
          </thead>
          <tbody>
            {n25SecondaryKpiData.map((runData, runIndex) => (
              <React.Fragment key={runIndex}>
                {runData.segments.map((segmentData, segmentIndex) => (
                  <tr key={`${runIndex}-${segmentIndex}`}>
                    {segmentIndex === 0 && (
                      <td rowSpan={runData.segments.length}>{runData.run}</td>
                    )}
                    <td>{segmentData.segment}</td>
                    <td>{segmentData.bler.toFixed(2)}</td>
                    <td>{segmentData.mcs.toFixed(2)}</td>
                    <td>{segmentData.cqi.toFixed(2)}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status below are minor bug, no time to deal with it */}

      {/* ------NR41 */}
      <div className='page-content'>
        <h3>5G VoNR Coverage Test NR41- DL Throughput &lt; 1Mbps Distance (km)</h3>
        <div id='2.2DL'></div>
        {/* NR41 DL table */}
        <CoverageTestTable tableData={NR41_DL.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <img src="/CoverageMap/NR41_DL_MAP.png" alt="Coverage Map" style={{ maxWidth: '70%', height: '70%', display: 'block', margin: '0 auto' }} />

      </div>
      <div className='page-content'>
        <h3>5G VoNR Coverage Test NR41- UL Throughput &lt; 1Mbps Distance (km)</h3>
        <div id='2.2UL'></div>
        {/* NR41 UL table */}
        <CoverageTestTable tableData={NR41_UL.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <img src="/CoverageMap/NR41_UL_MAP.png" alt="Coverage Map" style={{ maxWidth: '70%', height: '70%', display: 'block', margin: '0 auto' }} />

      </div>
      <div className='page-content'>
        <h3>5G VoNR Coverage Test NR41- Last MOS Before Silence Distance (km)</h3>
        <div id='2.2MOS'></div>
        {/* NR41 MOS table */}
        <CoverageTestTable tableData={NR41_MOS.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <img src="/CoverageMap/NR41_MOS_MAP.png" alt="Coverage Map" style={{ maxWidth: '70%', height: '70%', display: 'block', margin: '0 auto' }} />

      </div>
      <div className='page-content'>
        <h3>5G VoNR Coverage Test NR41- Audio Call Drop Distance (km)</h3>
        <div id='2.2Call'></div>
        {/* NR41 Audio table */}
        <CoverageTestTable tableData={NR41_Audio.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <img src="/CoverageMap/NR41_Audio_MAP.png" alt="Coverage Map" style={{ maxWidth: '70%', height: '70%', display: 'block', margin: '0 auto' }} />
      </div>
      <div className='page-content'>
        <h3>5G VoNR Coverage Test NR41- Secondary KPI</h3>
        {/* n41 Secondary KPI table */}
        <table className="general-table-style">
          <thead>
            <tr>
              <th>Run</th>
              <th>Segment</th>
              <th>AVG BLER</th>
              <th>AVG MCS</th>
              <th>AVG CQI</th>
            </tr>
          </thead>
          <tbody>
            {n41SecondaryKpiData.map((runData, runIndex) => (
              <React.Fragment key={runIndex}>
                {runData.segments.map((segmentData, segmentIndex) => (
                  <tr key={`${runIndex}-${segmentIndex}`}>
                    {segmentIndex === 0 && (
                      <td rowSpan={runData.segments.length}>{runData.run}</td>
                    )}
                    <td>{segmentData.segment}</td>
                    <td>{segmentData.bler.toFixed(2)}</td>
                    <td>{segmentData.mcs.toFixed(2)}</td>
                    <td>{segmentData.cqi.toFixed(2)}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {/* ------NR71 */}
      <div className='page-content'>
        <h3>5G VoNR Coverage Test NR71- DL Throughput &lt; 1Mbps Distance (km)</h3>
        <div id='2.3DL'></div>
        {/* NR71 DL table */}
        <CoverageTestTable tableData={NR71_DL.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <img src="/CoverageMap/NR71_DL_MAP.png" alt="Coverage Map" style={{ maxWidth: '70%', height: '70%', display: 'block', margin: '0 auto' }} />

      </div>
      <div className='page-content'>
        <h3>5G VoNR Coverage Test NR71- UL Throughput &lt; 1Mbps Distance (km)</h3>
        <div id='2.3UL'></div>
        {/* NR71 UL table */}
        <CoverageTestTable tableData={NR71_UL.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <img src="/CoverageMap/NR71_UL_MAP.png" alt="Coverage Map" style={{ maxWidth: '70%', height: '70%', display: 'block', margin: '0 auto' }} />

      </div>
      <div className='page-content'>
        <h3>5G VoNR Coverage Test NR71- Last MOS Before Silence Distance (km)</h3>
        <div id='2.3MOS'></div>
        {/* NR71 MOS table */}
        <CoverageTestTable tableData={NR71_MOS.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <img src="/CoverageMap/NR71_MOS_MAP.png" alt="Coverage Map" style={{ maxWidth: '70%', height: '70%', display: 'block', margin: '0 auto' }} />

      </div>
      <div className='page-content'>
        <h3>5G VoNR Coverage Test NR71- Audio Call Drop Distance (km)</h3>
        <div id='2.3Call'></div>
        {/* NR71 Audio table */}
        <CoverageTestTable tableData={NR71_Audio.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <img src="/CoverageMap/NR71_Audio_MAP.png" alt="Coverage Map" style={{ maxWidth: '70%', height: '70%', display: 'block', margin: '0 auto' }} />
      </div>
      <div className='page-content'>
        <h3>NR71 Secondary KPI</h3>
        <table className="general-table-style">
          <thead>
            <tr>
              <th>Run</th>
              <th>Segment</th>
              <th>AVG BLER</th>
              <th>AVG MCS</th>
              <th>AVG CQI</th>
            </tr>
          </thead>
          <tbody>
            {n71SecondaryKpiData.map((runData, runIndex) => (
              <React.Fragment key={runIndex}>
                {runData.segments.map((segmentData, segmentIndex) => (
                  <tr key={`${runIndex}-${segmentIndex}`}>
                    {segmentIndex === 0 && (
                      <td rowSpan={runData.segments.length}>{runData.run}</td>
                    )}
                    <td>{segmentData.segment}</td>
                    <td>{segmentData.bler.toFixed(2)}</td>
                    <td>{segmentData.mcs.toFixed(2)}</td>
                    <td>{segmentData.cqi.toFixed(2)}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <HPUECoverageTable n41Data={n41HPUEData} />
      <div className='page-content'>
        <h2>2.2.1 5G n41 HPUE Coverage Test-RSRP Analysis</h2>
        <div style={{ textAlign: 'center' }}>
          <img src="/CoverageRSRPChart/RSRP_R1.png" alt="R1" style={{ maxWidth: '100%', height: '50%', display: 'block', margin: '0 auto' }} />
          <img src="/CoverageRSRPChart/RSRP_R2.png" alt="R1" style={{ maxWidth: '100%', height: '50%', display: 'block', margin: '0 auto' }} />
          <img src="/CoverageRSRPChart/RSRP_R3.png" alt="R1" style={{ maxWidth: '100%', height: '50%', display: 'block', margin: '0 auto' }} />
        </div>
      </div>
      <div className='page-content'>
        <img src="/CoverageRSRPChart/RSRP_R4.png" alt="R1" style={{ maxWidth: '100%', height: '50%', marginTop: 40, display: 'block', margin: '0 auto' }} />
        <img src="/CoverageRSRPChart/RSRP_R5.png" alt="R1" style={{ maxWidth: '100%', height: '50%', display: 'block', margin: '0 auto' }} />
      </div>
      <div className='page-content'>
        <h2>2.2.2 5G n41 HPUE Coverage Test-Tx Power Analysis</h2>
        <div style={{ textAlign: 'center' }}>
          <img src="/CoverageTxChart/Tx_R1.png" alt="R1" style={{ maxWidth: '100%', height: '50%', display: 'block', margin: '0 auto' }} />
          <img src="/CoverageTxChart/Tx_R2.png" alt="R1" style={{ maxWidth: '100%', height: '50%', display: 'block', margin: '0 auto' }} />
          <img src="/CoverageTxChart/Tx_R3.png" alt="R1" style={{ maxWidth: '100%', height: '50%', display: 'block', margin: '0 auto' }} />

        </div>
      </div>
      <div className='page-content'>
        <img src="/CoverageTxChart/Tx_R4.png" alt="R1" style={{ maxWidth: '100%', height: '50%', marginTop: 40, display: 'block', margin: '0 auto' }} />
        <img src="/CoverageTxChart/Tx_R5.png" alt="R1" style={{ maxWidth: '100%', height: '50%', display: 'block', margin: '0 auto' }} />
      </div>
    </div>
  );
}
export default CoverageDetails;