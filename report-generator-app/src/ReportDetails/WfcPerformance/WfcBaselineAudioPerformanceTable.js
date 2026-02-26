import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';

const WfcBaselineAudioPerformanceTable = () => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <table className="mini-performance-table general-table-style" style={{ width: '100%', fontSize: '12px', textAlign: 'center', margin: '0 auto' }}>
                <thead>
                    <tr>
                        <th>Audio NAT Functional</th>
                        <th>Unit</th>
                        <th>WFC</th>
                        <th>Cellular</th>
                        <th>Delta</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ textAlign: 'left' }}>p.56 active speech level</td>
                        <td>dBov</td>
                        <td>-26.31</td>
                        <td>-26.41</td>
                        <td style={{ backgroundColor: '#00FF00', color: 'black' }}>0.10</td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: 'left' }}>POLQA Attenuation</td>
                        <td>dBov</td>
                        <td>-0.24</td>
                        <td>-0.18</td>
                        <td>-0.05</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default WfcBaselineAudioPerformanceTable;
