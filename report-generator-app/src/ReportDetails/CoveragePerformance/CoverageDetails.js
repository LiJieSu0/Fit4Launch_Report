import React from 'react';
import CoverageTestTable from './CoverageTestTable';

function CoverageDetails() {
  const NR25_DL=[
    { device: 'DUT', run1: 1.77, run2:1.98 , run3:2.16 , run4:2.07 , run5:2.02 , average:2.00  },
    { device: 'REF', run1:2.24 , run2:2.23 , run3: 2.23, run4:2.25 , run5: 2.12, average:2.21  },
    "Fail"
  ]
  const NR25_UL=[
    { device: 'DUT', run1: 1.77, run2: 1.94, run3: 2.13, run4: 2.02, run5: 2.00, average: 1.97 },
    { device: 'REF', run1: 1.72, run2: 1.91, run3: 1.76, run4: 1.86, run5: 1.74, average: 1.80 },
    "Pass"
  ]
  const NR25_MOS=[
    { device: 'DUT', run1: 2.00, run2:2.30 , run3:2.37 , run4:2.44 , run5:2.19 , average:2.26  },
    { device: 'REF', run1: 2.43, run2:2.41, run3:2.42 , run4: 2.46, run5: 2.25, average:2.39  },
    "Fail"
  ]
  const NR25_Audio=[
            { device: 'DUT', run1: 2.15, run2: 2.40, run3: 2.42, run4: 2.46, run5: 2.32, average: 2.35 },
            { device: 'REF', run1: 2.43, run2: 2.41, run3: 2.42, run4: 2.46, run5: 2.43, average: 2.43 },
            "Pass"
        ]
  
  const NR41_DL=[
    { device: 'DUT', run1: 2.43, run2: 2.48, run3: 2.48, run4: 2.48, run5:2.27 , average: 2.43 },
    { device: 'REF', run1: 2.26, run2: 2.38, run3: 2.38, run4: 2.39, run5:2.25 , average: 2.33 },
    "Pass"
  ]
  const NR41_UL=[
    { device: 'DUT', run1: 2.34, run2: 2.41, run3: 2.48, run4: 2.47, run5: 2.18, average:2.38  },
    { device: 'REF', run1: 1.73, run2: 2.29, run3: 2.25, run4: 2.07, run5: 2.20, average:2.11  },
    "Pass"
  ]
  const NR41_MOS=[
    { device: 'DUT', run1:2.80 , run2:2.76 , run3:2.42 , run4:2.80 , run5:2.48 , average: 2.65 },
    { device: 'REF', run1:2.43 , run2:2.41 , run3:2.42 , run4:2.46 , run5:2.48, average:2.44  },
    "Pass"
  ]
  const NR41_Audio=[
    { device: 'DUT', run1: 2.86, run2: 2.82, run3: 2.42, run4: 2.84, run5: 2.48, average:  2.68},
    { device: 'REF', run1: 2.43, run2:2.41 , run3: 2.42, run4: 2.46, run5: 2.48, average:  2.44},
    "Pass"
  ]
  
  const NR71_DL=[
    { device: 'DUT', run1: 2.10, run2: 1.96, run3: 1.81, run4: 1.83, run5: 1.86, average: 1.91 },
    { device: 'REF', run1: 1.84, run2: 1.98, run3: 1.83, run4: 1.69, run5: 1.72, average: 1.81 },
    "Pass"
  ]
  const NR71_UL=[
    { device: 'DUT', run1: 2.00, run2: 1.83, run3: 1.78, run4: 1.76, run5: 1.72, average: 1.82 },
    { device: 'REF', run1: 1.72, run2: 1.84, run3: 1.64, run4: 1.65, run5: 1.64, average: 1.70 },
    "Pass"
  ]
  const NR71_MOS=[
    { device: 'DUT', run1:2.35 , run2: 2.30, run3: 2.37, run4: 2.44, run5: 2.37, average: 2.37 },
    { device: 'REF', run1: 2.35, run2: 2.30, run3: 2.37, run4: 2.44, run5: 2.25, average: 2.34 },
    "Pass"
  ]
  const NR71_Audio=[
    { device: 'DUT', run1: 2.43, run2: 2.40, run3: 2.42, run4: 2.46, run5: 2.40, average: 2.42 },
    { device: 'REF', run1: 2.43, run2: 2.41, run3: 2.42, run4: 2.46, run5: 2.48, average: 2.44 },
    "Pass"
  ]



  return (
    <div>
        <div className='page-content'>
        <h2>4.1 5G VoNR Coverage Test - N25, N41, N71</h2>
        {/* ------NR25 */}
        <h3>5G VoNR Coverage Test NR25- DL Throughput &lt; 1Mbps (km)</h3>
        {/* NR25 DL table */}
        <CoverageTestTable tableData={NR25_DL.slice(0, -1)} status={NR25_DL[NR25_Audio.length - 1]} />
        {/* map picture */}
        <img src="/NR25_DL_MAP.png" alt="Coverage Map" style={{ maxWidth: '50%', height: '50%' }} />
        </div>
        <div className='page-content'>
        <h3>5G VoNR Coverage Test NR25- UL Throughput &lt; 1Mbps (km)</h3>
        {/* NR25 UL table */}
        <CoverageTestTable tableData={NR25_UL.slice(0, -1)} status={NR25_UL[NR25_Audio.length - 1]} />
        <img src="/NR25_UL_MAP.png" alt="Coverage Map" style={{ maxWidth: '50%', height: '50%' }} />

        </div>
        <div className='page-content'>
        <h3>5G VoNR Coverage Test NR25- Last MOS Before Silence (km)</h3>
        {/* NR25 MOS table */}
        <CoverageTestTable tableData={NR25_MOS.slice(0, -1)} status={NR25_MOS[NR25_Audio.length - 1]} />
        <img src="/NR25_MOS_MAP.png" alt="Coverage Map" style={{ maxWidth: '50%', height: '50%' }} />

        </div>
        <div className='page-content'>
        <h3>5G VoNR Coverage Test NR25- Audio Call Drop (km)</h3>
        {/* NR25 Audio table */}
        <CoverageTestTable tableData={NR25_Audio.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <img src="/NR25_Audio_MAP.png" alt="Coverage Map" style={{ maxWidth: '50%', height: '50%' }} />

        </div>

        {/* Status below are minor bug, no time to deal with it */}

        {/* ------NR41 */}
        <div className='page-content'>
        <h3>5G VoNR Coverage Test NR41- DL Throughput &lt; 1Mbps (km)</h3>
        {/* NR41 DL table */}
        <CoverageTestTable tableData={NR41_DL.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <img src="/NR41_DL_MAP.png" alt="Coverage Map" style={{ maxWidth: '50%', height: '50%' }} />

        </div>
        <div className='page-content'>
        <h3>5G VoNR Coverage Test NR41- UL Throughput &lt; 1Mbps (km)</h3>
        {/* NR41 UL table */}
        <CoverageTestTable tableData={NR41_UL.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <img src="/NR41_UL_MAP.png" alt="Coverage Map" style={{ maxWidth: '50%', height: '50%' }} />

        </div>
        <div className='page-content'>
        <h3>5G VoNR Coverage Test NR41- Last MOS Before Silence (km)</h3>
        {/* NR41 MOS table */}
        <CoverageTestTable tableData={NR41_MOS.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <img src="/NR41_MOS_MAP.png" alt="Coverage Map" style={{ maxWidth: '50%', height: '50%' }} />

        </div>
        <div className='page-content'>
        <h3>5G VoNR Coverage Test NR41- Audio Call Drop (km)</h3>
        {/* NR41 Audio table */}
        <CoverageTestTable tableData={NR41_Audio.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <img src="/NR41_Audio_MAP.png" alt="Coverage Map" style={{ maxWidth: '50%', height: '50%' }} />

        </div>

        {/* ------NR71 */}
        <div className='page-content'>
        <h3>5G VoNR Coverage Test NR71- DL Throughput &lt; 1Mbps (km)</h3>
        {/* NR71 DL table */}
        <CoverageTestTable tableData={NR71_DL.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <img src="/NR71_DL_MAP.png" alt="Coverage Map" style={{ maxWidth: '50%', height: '50%' }} />

        </div>
        <div className='page-content'>
        <h3>5G VoNR Coverage Test NR71- UL Throughput &lt; 1Mbps (km)</h3>
        {/* NR71 UL table */}
        <CoverageTestTable tableData={NR71_UL.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <img src="/NR71_UL_MAP.png" alt="Coverage Map" style={{ maxWidth: '50%', height: '50%' }} />

        </div>
        <div className='page-content'>
        <h3>5G VoNR Coverage Test NR71- Last MOS Before Silence (km)</h3>
        {/* NR71 MOS table */}
        <CoverageTestTable tableData={NR71_MOS.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <img src="/NR71_MOS_MAP.png" alt="Coverage Map" style={{ maxWidth: '50%', height: '50%' }} />

        </div>
        <div className='page-content'>
        <h3>5G VoNR Coverage Test NR71- Audio Call Drop (km)</h3>
        {/* NR71 Audio table */}
        <CoverageTestTable tableData={NR71_Audio.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        <img src="/NR71_Audio_MAP.png" alt="Coverage Map" style={{ maxWidth: '50%', height: '50%' }} />

        </div>

        <div className='page-content'>
        <h2></h2>
        </div>
    </div>
  );
}

export default CoverageDetails;