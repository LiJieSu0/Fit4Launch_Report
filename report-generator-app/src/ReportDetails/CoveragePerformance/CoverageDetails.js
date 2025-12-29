import React, { useContext } from 'react';
import CoverageTestTable from './CoverageTestTable';
import HPUECoverageTable from './HPUECoverageTable';
import '../../StyleScript/Restricted_Report_Style.css';
import CoverageMap from './CoverageMap';
import CoverageLineChart from './CoverageLineChart';
import { ReportContext } from '../../Contexts/ReportContext';
import DynamicHeader from '../../CommonPage/DynamicHeader';

function CoverageDetails() {
  const { reportData } = useContext(ReportContext);
  const BASE_STATION_COORDS = {
    "latitude": 47.128234
    ,
    "longitude": -122.356792
  }
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

  const processSecondaryKpiData = (band) => {
    const defaultData = Array.from({ length: 5 }, (_, i) => ({
      run: `RUN ${i + 1}`,
      segments: [
        { segment: 'First 30%', DUT: { bler: 0, mcs: 0, cqi: 0 }, REF: { bler: 0, mcs: 0, cqi: 0 } },
        { segment: 'Middle 40%', DUT: { bler: 0, mcs: 0, cqi: 0 }, REF: { bler: 0, mcs: 0, cqi: 0 } },
        { segment: 'Last 30%', DUT: { bler: 0, mcs: 0, cqi: 0 }, REF: { bler: 0, mcs: 0, cqi: 0 } },
      ]
    }));

    const rootData = reportData && reportData.coveragePerformance && reportData.coveragePerformance['Coverage Performance'];
    if (!rootData || !rootData['5G VoNR Coverage Test'] || !rootData['5G VoNR Coverage Test'][band]) {
      return defaultData;
    }

    const bandData = rootData['5G VoNR Coverage Test'][band];
    const segments = ['First 30%', 'Middle 40%', 'Last 30%'];

    return Array.from({ length: 5 }, (_, i) => {
      const runKey = `Run${i + 1}`;
      return {
        run: `RUN ${i + 1}`,
        segments: segments.map(seg => {
          const dutStats = bandData['DUT']?.[runKey]?.['secondary_kpi']?.[seg] || {};
          const refStats = bandData['REF']?.[runKey]?.['secondary_kpi']?.[seg] || {};
          return {
            segment: seg,
            DUT: {
              bler: dutStats['AVG BLER'] || 0,
              mcs: dutStats['AVG MCS'] || 0,
              cqi: dutStats['AVG CQI'] || 0
            },
            REF: {
              bler: refStats['AVG BLER'] || 0,
              mcs: refStats['AVG MCS'] || 0,
              cqi: refStats['AVG CQI'] || 0
            }
          };
        })
      };
    });
  };

  const n25SecondaryKpi = processSecondaryKpiData('n25');
  const n41SecondaryKpi = processSecondaryKpiData('n41');
  const n71SecondaryKpi = processSecondaryKpiData('n71');

  const SecondaryKpiTable = ({ data }) => (
    <table className="general-table-style">
      <thead>
        <tr>
          <th rowSpan="2">Run</th>
          <th rowSpan="2">Segment</th>
          <th colSpan="2">AVG BLER</th>
          <th colSpan="2">AVG MCS</th>
          <th colSpan="2">AVG CQI</th>
        </tr>
        <tr>
          <th>DUT</th>
          <th>REF</th>
          <th>DUT</th>
          <th>REF</th>
          <th>DUT</th>
          <th>REF</th>
        </tr>
      </thead>
      <tbody>
        {data.map((runData, runIndex) => (
          <React.Fragment key={runIndex}>
            {runData.segments.map((segmentData, segmentIndex) => (
              <tr key={`${runIndex}-${segmentIndex}`}>
                {segmentIndex === 0 && (
                  <td rowSpan={runData.segments.length}>{runData.run}</td>
                )}
                <td>{segmentData.segment}</td>
                <td>{segmentData.DUT.bler.toFixed(2)}</td>
                <td>{segmentData.REF.bler.toFixed(2)}</td>
                <td>{segmentData.DUT.mcs.toFixed(2)}</td>
                <td>{segmentData.REF.mcs.toFixed(2)}</td>
                <td>{segmentData.DUT.cqi.toFixed(2)}</td>
                <td>{segmentData.REF.cqi.toFixed(2)}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <div className='page-content'>
        <DynamicHeader level={1}>Coverage Test - Seattle</DynamicHeader>
        <DynamicHeader level={2}>5G VoNR Coverage Test - N25, N41, N71</DynamicHeader>
        {/* ------NR25 */}
        <h4>5G VoNR Coverage Test NR25- DL Throughput &lt; 1Mbps Distance (km)</h4>
        {/* NR25 DL table */}
        <CoverageTestTable tableData={NR25_DL.slice(0, -1)} status={NR25_DL[NR25_Audio.length - 1]} />
        {/* map picture */}
        <div style={{ marginBottom: 10, textAlign: 'center' }}></div>
        <CoverageMap
          bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['5G VoNR Coverage Test']?.n25}
          metric="first_dl_tp_gt_1"
          baseStation={[BASE_STATION_COORDS.latitude, BASE_STATION_COORDS.longitude]}
        />
      </div>
      <div className='page-content'>
        <h4>5G VoNR Coverage Test NR25- UL Throughput &lt; 1Mbps Distance (km)</h4>

        {/* NR25 UL table */}
        <CoverageTestTable tableData={NR25_UL.slice(0, -1)} status={NR25_UL[NR25_Audio.length - 1]} />
        <CoverageMap
          bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['5G VoNR Coverage Test']?.n25}
          metric="first_ul_tp_gt_1"
          baseStation={[BASE_STATION_COORDS.latitude, BASE_STATION_COORDS.longitude]}
        />

      </div>
      <div className='page-content'>
        <h4>5G VoNR Coverage Test NR25- Last MOS Before Silence Distance (km)</h4>
        {/* NR25 MOS table */}
        <CoverageTestTable tableData={NR25_MOS.slice(0, -1)} status={NR25_MOS[NR25_Audio.length - 1]} />
        <CoverageMap
          bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['5G VoNR Coverage Test']?.n25}
          metric="mos_before_drop"
          baseStation={[BASE_STATION_COORDS.latitude, BASE_STATION_COORDS.longitude]}
        />
      </div>
      <div className='page-content'>
        <h4>5G VoNR Coverage Test NR25- Audio Call Drop Distance (km)</h4>
        {/* NR25 Audio table */}
        <CoverageTestTable tableData={NR25_Audio.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <CoverageMap
          bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['5G VoNR Coverage Test']?.n25}
          metric="call_drop"
          baseStation={[BASE_STATION_COORDS.latitude, BASE_STATION_COORDS.longitude]}
        />
      </div>
      <div className='page-content'>
        <h4>5G VoNR Coverage Test NR25 - Secondary KPI</h4>
        <SecondaryKpiTable data={n25SecondaryKpi} />
      </div>

      {/* Status below are minor bug, no time to deal with it */}

      {/* ------NR41 */}
      <div className='page-content'>
        <h4>5G VoNR Coverage Test NR41- DL Throughput &lt; 1Mbps Distance (km)</h4>
        {/* NR41 DL table */}
        <CoverageTestTable tableData={NR41_DL.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <CoverageMap
          bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['5G VoNR Coverage Test']?.n41}
          metric="first_dl_tp_gt_1"
          baseStation={[BASE_STATION_COORDS.latitude, BASE_STATION_COORDS.longitude]}
        />

      </div>
      <div className='page-content'>
        <h4>5G VoNR Coverage Test NR41- UL Throughput &lt; 1Mbps Distance (km)</h4>
        {/* NR41 UL table */}
        <CoverageTestTable tableData={NR41_UL.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <CoverageMap
          bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['5G VoNR Coverage Test']?.n41}
          metric="first_ul_tp_gt_1"
          baseStation={[BASE_STATION_COORDS.latitude, BASE_STATION_COORDS.longitude]}
        />

      </div>
      <div className='page-content'>
        <h4>5G VoNR Coverage Test NR41- Last MOS Before Silence Distance (km)</h4>
        {/* NR41 MOS table */}
        <CoverageTestTable tableData={NR41_MOS.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <CoverageMap
          bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['5G VoNR Coverage Test']?.n41}
          metric="mos_before_drop"
          baseStation={[BASE_STATION_COORDS.latitude, BASE_STATION_COORDS.longitude]}
        />

      </div>
      <div className='page-content'>
        <h4>5G VoNR Coverage Test NR41- Audio Call Drop Distance (km)</h4>
        {/* NR41 Audio table */}
        <CoverageTestTable tableData={NR41_Audio.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <CoverageMap
          bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['5G VoNR Coverage Test']?.n41}
          metric="call_drop"
          baseStation={[BASE_STATION_COORDS.latitude, BASE_STATION_COORDS.longitude]}
        />
      </div>
      <div className='page-content'>
        <h4>5G VoNR Coverage Test NR41- Secondary KPI</h4>
        <SecondaryKpiTable data={n41SecondaryKpi} />
      </div>
      {/* ------NR71 */}
      <div className='page-content'>
        <h4>5G VoNR Coverage Test NR71- DL Throughput &lt; 1Mbps Distance (km)</h4>
        {/* NR71 DL table */}
        <CoverageTestTable tableData={NR71_DL.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <CoverageMap
          bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['5G VoNR Coverage Test']?.n71}
          metric="first_dl_tp_gt_1"
          baseStation={[BASE_STATION_COORDS.latitude, BASE_STATION_COORDS.longitude]}
        />

      </div>
      <div className='page-content'>
        <h4>5G VoNR Coverage Test NR71- UL Throughput &lt; 1Mbps Distance (km)</h4>
        {/* NR71 UL table */}
        <CoverageTestTable tableData={NR71_UL.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <CoverageMap
          bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['5G VoNR Coverage Test']?.n71}
          metric="first_ul_tp_gt_1"
          baseStation={[BASE_STATION_COORDS.latitude, BASE_STATION_COORDS.longitude]}
        />

      </div>
      <div className='page-content'>
        <h4>5G VoNR Coverage Test NR71- Last MOS Before Silence Distance (km)</h4>
        {/* NR71 MOS table */}
        <CoverageTestTable tableData={NR71_MOS.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <CoverageMap
          bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['5G VoNR Coverage Test']?.n71}
          metric="mos_before_drop"
          baseStation={[BASE_STATION_COORDS.latitude, BASE_STATION_COORDS.longitude]}
        />

      </div>
      <div className='page-content'>
        <h4>5G VoNR Coverage Test NR71- Audio Call Drop Distance (km)</h4>
        {/* NR71 Audio table */}
        <CoverageTestTable tableData={NR71_Audio.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <CoverageMap
          bandData={reportData?.coveragePerformance?.['Coverage Performance']?.['5G VoNR Coverage Test']?.n71}
          metric="call_drop"
          baseStation={[BASE_STATION_COORDS.latitude, BASE_STATION_COORDS.longitude]}
        />
      </div>
      <div className='page-content'>
        <h4>NR71 Secondary KPI</h4>
        <SecondaryKpiTable data={n71SecondaryKpi} />
      </div>
      <HPUECoverageTable n41Data={n41HPUEData} />
      <div className='page-content'>
        <DynamicHeader level={3}>5G n41 HPUE Coverage Test-RSRP Analysis</DynamicHeader>
        <CoverageLineChart analysisType="RSRP" run={1} />
        <CoverageLineChart analysisType="RSRP" run={2} />
      </div>
      <div className='page-content'>
        <CoverageLineChart analysisType="RSRP" run={3} />
        <CoverageLineChart analysisType="RSRP" run={4} />
      </div>
      <div className='page-content'>
        <CoverageLineChart analysisType="RSRP" run={5} />
      </div>
      <div className='page-content'>
        <DynamicHeader level={3}>5G n41 HPUE Coverage Test-Tx Power Analysis</DynamicHeader>
        <CoverageLineChart analysisType="TxPower" run={1} />
        <CoverageLineChart analysisType="TxPower" run={2} />
      </div>
      <div className='page-content'>
        <CoverageLineChart analysisType="TxPower" run={3} />
        <CoverageLineChart analysisType="TxPower" run={4} />
      </div>
      <div className='page-content'>
        <CoverageLineChart analysisType="TxPower" run={5} />
      </div>
    </div>
  );
}
export default CoverageDetails;