import React from 'react';
import CoverageTestTable from './CoverageTestTable';

function CoverageDetails() {
  const NR25_DL=[]
  const NR25_UL=[]
  const NR25_MOS=[]
  const NR25_Audio=[
            { device: 'DUT', run1: 2.15, run2: 2.40, run3: 2.42, run4: 2.46, run5: 2.32, average: 2.35 },
            { device: 'REF', run1: 2.43, run2: 2.41, run3: 2.42, run4: 2.46, run5: 2.43, average: 2.43 },
            "Pass"
        ];
  
  const NR41_DL=[]
  const NR41_UL=[]
  const NR41_MOS=[]
  const NR41_Audio=[]
  
  const NR71_DL=[]
  const NR71_UL=[]
  const NR71_MOS=[]
  const NR71_Audio=[]



  return (
    <div>
        <div className='page-content'>
        <h2>4.1 5G VoNR Coverage Test - N25, N41, N71</h2>
        {/* ------NR25 */}
        <h3>5G VoNR Coverage Test NR25- DL Throughput &lt; 1Mbps (km)</h3>
        {/* NR25 DL table */}
        </div>
        <div className='page-content'>
        <h3>5G VoNR Coverage Test NR25- UL Throughput &lt; 1Mbps (km)</h3>
        {/* NR25 UL table */}

        </div>
        <div className='page-content'>
        <h3>5G VoNR Coverage Test NR25- Last MOS Before Silence (km)</h3>
        {/* NR25 MOS table */}

        </div>
        <div className='page-content'>
        <h3>5G VoNR Coverage Test NR25- Audio Call Drop (km)</h3>
        {/* NR25 Audio table */}
        <CoverageTestTable tableData={NR25_Audio.slice(0, -1)} status={NR25_Audio[NR25_Audio.length - 1]} />
        </div>

        {/* ------NR41 */}
        <div className='page-content'>
        <h3>5G VoNR Coverage Test NR41- DL Throughput &lt; 1Mbps (km)</h3>
        {/* NR41 DL table */}

        </div>
        <div className='page-content'>
        <h3>5G VoNR Coverage Test NR41- UL Throughput &lt; 1Mbps (km)</h3>
        {/* NR41 UL table */}

        </div>
        <div className='page-content'>
        <h3>5G VoNR Coverage Test NR41- Last MOS Before Silence (km)</h3>
        {/* NR41 MOS table */}

        </div>
        <div className='page-content'>
        <h3>5G VoNR Coverage Test NR41- Audio Call Drop (km)</h3>
        {/* NR41 Audio table */}
        </div>

        {/* ------NR71 */}
        <div className='page-content'>
        <h3>5G VoNR Coverage Test NR71- DL Throughput &lt; 1Mbps (km)</h3>
        {/* NR71 DL table */}
        </div>
        <div className='page-content'>
        <h3>5G VoNR Coverage Test NR71- UL Throughput &lt; 1Mbps (km)</h3>
        {/* NR71 UL table */}

        </div>
        <div className='page-content'>
        <h3>5G VoNR Coverage Test NR71- Last MOS Before Silence (km)</h3>
        {/* NR71 MOS table */}
        </div>
        <div className='page-content'>
        <h3>5G VoNR Coverage Test NR71- Audio Call Drop (km)</h3>
        {/* NR71 Audio table */}
        </div>


        <div className='page-content'>
        <h2></h2>
        </div>
    </div>
  );
}

export default CoverageDetails;