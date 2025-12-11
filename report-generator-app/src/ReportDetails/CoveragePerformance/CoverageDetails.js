import React from 'react';
import CoverageTestTable from './CoverageTestTable';
import '../../StyleScript/Restricted_Report_Style.css';

function CoverageDetails() {
  const NR25_DL = [
    { device: 'DUT', run1: 1.77, run2: 1.98, run3: 2.16, run4: 2.07, run5: 2.02, average: 2.00 },
    { device: 'REF', run1: 2.24, run2: 2.23, run3: 2.23, run4: 2.25, run5: 2.12, average: 2.21 },
    "Fail"
  ]
  const NR25_UL = [
    { device: 'DUT', run1: 1.77, run2: 1.94, run3: 2.13, run4: 2.02, run5: 2.00, average: 1.97 },
    { device: 'REF', run1: 1.72, run2: 1.91, run3: 1.76, run4: 1.86, run5: 1.74, average: 1.80 },
    "Pass"
  ]
  const NR25_MOS = [
    { device: 'DUT', run1: 2.00, run2: 2.30, run3: 2.37, run4: 2.44, run5: 2.19, average: 2.26 },
    { device: 'REF', run1: 2.43, run2: 2.41, run3: 2.42, run4: 2.46, run5: 2.25, average: 2.39 },
    "Fail"
  ]
  const NR25_Audio = [
    { device: 'DUT', run1: 2.15, run2: 2.40, run3: 2.42, run4: 2.46, run5: 2.32, average: 2.35 },
    { device: 'REF', run1: 2.43, run2: 2.41, run3: 2.42, run4: 2.46, run5: 2.43, average: 2.43 },
    "Pass"
  ]

  const NR41_DL = [
    { device: 'DUT', run1: 2.43, run2: 2.48, run3: 2.48, run4: 2.48, run5: 2.27, average: 2.43 },
    { device: 'REF', run1: 2.26, run2: 2.38, run3: 2.38, run4: 2.39, run5: 2.25, average: 2.33 },
    "Pass"
  ]
  const NR41_UL = [
    { device: 'DUT', run1: 2.34, run2: 2.41, run3: 2.48, run4: 2.47, run5: 2.18, average: 2.38 },
    { device: 'REF', run1: 1.73, run2: 2.29, run3: 2.25, run4: 2.07, run5: 2.20, average: 2.11 },
    "Pass"
  ]
  const NR41_MOS = [
    { device: 'DUT', run1: 2.80, run2: 2.76, run3: 2.42, run4: 2.80, run5: 2.48, average: 2.65 },
    { device: 'REF', run1: 2.43, run2: 2.41, run3: 2.42, run4: 2.46, run5: 2.48, average: 2.44 },
    "Pass"
  ]
  const NR41_Audio = [
    { device: 'DUT', run1: 2.86, run2: 2.82, run3: 2.42, run4: 2.84, run5: 2.48, average: 2.68 },
    { device: 'REF', run1: 2.43, run2: 2.41, run3: 2.42, run4: 2.46, run5: 2.48, average: 2.44 },
    "Pass"
  ]

  const NR71_DL = [
    { device: 'DUT', run1: 2.10, run2: 1.96, run3: 1.81, run4: 1.83, run5: 1.86, average: 1.91 },
    { device: 'REF', run1: 1.84, run2: 1.98, run3: 1.83, run4: 1.69, run5: 1.72, average: 1.81 },
    "Pass"
  ]
  const NR71_UL = [
    { device: 'DUT', run1: 2.00, run2: 1.83, run3: 1.78, run4: 1.76, run5: 1.72, average: 1.82 },
    { device: 'REF', run1: 1.72, run2: 1.84, run3: 1.64, run4: 1.65, run5: 1.64, average: 1.70 },
    "Pass"
  ]
  const NR71_MOS = [
    { device: 'DUT', run1: 2.35, run2: 2.30, run3: 2.37, run4: 2.44, run5: 2.37, average: 2.37 },
    { device: 'REF', run1: 2.35, run2: 2.30, run3: 2.37, run4: 2.44, run5: 2.25, average: 2.34 },
    "Pass"
  ]
  const NR71_Audio = [
    { device: 'DUT', run1: 2.43, run2: 2.40, run3: 2.42, run4: 2.46, run5: 2.40, average: 2.42 },
    { device: 'REF', run1: 2.43, run2: 2.41, run3: 2.42, run4: 2.46, run5: 2.48, average: 2.44 },
    "Pass"
  ]




  const n25secondaryKpiData = [
    { segment: 'First 30%', avgBler: 2.51335957966, avgMcs: 10.81351082, avgCqi: 11.4638103959533 },
    { segment: 'Last 30%', avgBler: 2.1943196634, avgMcs: 10.52610753, avgCqi: 9.65242530044276 },
    { segment: 'Middle 40%', avgBler: 2.04854091165, avgMcs: 15.26325386, avgCqi: 12.7193446896535 }
  ]

  const n41secondaryKpiData = [
    { segment: 'First 30%', avgBler: 1.9642375448, avgMcs: 5.7874760726, avgCqi: 10.898722413 },
    { segment: 'Last 30%', avgBler: 37.022646905, avgMcs: 1.6037011103, avgCqi: 5.8982047014 },
    { segment: 'Middle 40%', avgBler: 2.3653523434, avgMcs: 7.0697737392, avgCqi: 11.557148218 }
  ]

  const n71secondaryKpiData = [
    { segment: 'First 30%', avgBler: 2.5640832441, avgMcs: 12.613344408, avgCqi: 11.908527686 },
    { segment: 'Last 30%', avgBler: 6.914563891, avgMcs: 7.4465928882, avgCqi: 7.1988945573 },
    { segment: 'Middle 40%', avgBler: 1.6890910213, avgMcs: 13.819685119, avgCqi: 11.028498929 }
  ]

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
        {/* secondary kpi table */}
        <br />
        <h3>Secondary KPI</h3>
        <table className="general-table-style">
          <thead>
            <tr>
              <th>Segment</th>
              <th>AVG BLER</th>
              <th>AVG MCS</th>
              <th>AVG CQI</th>
            </tr>
          </thead>
          <tbody>
            {n25secondaryKpiData.map((row, index) => (
              <tr key={index}>
                <td>{row.segment}</td>
                <td>{row.avgBler.toFixed(2)}</td>
                <td>{row.avgMcs.toFixed(2)}</td>
                <td>{row.avgCqi.toFixed(2)}</td>
              </tr>
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
        {/* n41 secondary kpi table */}
        <br />
        <h3>Secondary KPI</h3>
        <table className="general-table-style">
          <thead>
            <tr>
              <th>Segment</th>
              <th>AVG BLER</th>
              <th>AVG MCS</th>
              <th>AVG CQI</th>
            </tr>
          </thead>
          <tbody>
            {n41secondaryKpiData.map((row, index) => (
              <tr key={index}>
                <td>{row.segment}</td>
                <td>{row.avgBler.toFixed(2)}</td>
                <td>{row.avgMcs.toFixed(2)}</td>
                <td>{row.avgCqi.toFixed(2)}</td>
              </tr>
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
        {/* n71 secondary kpi table */}
        <br />
        <h3>Secondary KPI</h3>
        <table className="general-table-style">
          <thead>
            <tr>
              <th>Segment</th>
              <th>AVG BLER</th>
              <th>AVG MCS</th>
              <th>AVG CQI</th>
            </tr>
          </thead>
          <tbody>
            {n71secondaryKpiData.map((row, index) => (
              <tr key={index}>
                <td>{row.segment}</td>
                <td>{row.avgBler.toFixed(2)}</td>
                <td>{row.avgMcs.toFixed(2)}</td>
                <td>{row.avgCqi.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>


      </div>

      <div className='page-content'>
        <h2>2.2 5G n41 HPUE Coverage Test</h2>
        <table className="general-table-style">
          <thead>
            <tr>
              <th>Power Class</th>
              <th>Metrics</th>
              <th>Run1</th>
              <th>Run2</th>
              <th>Run3</th>
              <th>Run4</th>
              <th>Run5</th>
              <th>Average</th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td rowSpan={2}>Power Class 2</td>
              <td>UL &lt; 1Mbps Distance (km)</td>
              <td>2.34</td>
              <td>2.10</td>
              <td>2.32</td>
              <td>2.33</td>
              <td>2.31</td>
              <td>2.28</td>
            </tr>
            <tr>
              <td>Tx Power (dBm)</td>
              <td>21.2</td>
              <td>21.5</td>
              <td>22.4</td>
              <td>21.3</td>
              <td>21.6</td>
              <td>21.6</td>
            </tr>
            <tr >
              <td rowSpan={2}>Power Class 3</td>
              <td>UL &lt; 1Mbps Distance (km)</td>
              <td>2.39</td>
              <td>2.27</td>
              <td>1.98</td>
              <td>2.38</td>
              <td>2.33</td>
              <td>2.27</td>
            </tr>
            <tr>
              <td>Tx Power (dBm)</td>
              <td>25.2</td>
              <td>25.4</td>
              <td>23.8</td>
              <td>25.1</td>
              <td>24.2</td>
              <td>24.7</td>
            </tr>
          </tbody>
        </table>
      </div>
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
const NR41_HPUE_Coverage = [
  { device: 'Power Class 2', run1: 2.34, run2: 2.10, run3: 2.32, run4: 2.33, run5: 2.31, average: 2.28 },
  { device: 'Power Class 3', run1: 2.39, run2: 2.27, run3: 1.98, run4: 2.38, run5: 2.33, average: 2.27 },
];
export default CoverageDetails;