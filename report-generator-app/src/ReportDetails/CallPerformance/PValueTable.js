import React from 'react';
import { getKpiCellColor } from '../../Utils/KpiRules';

const PValueTable = ({ data, kpiType, initFailureRate = null, retFailureRate = null }) => {
    const initiationKpi = kpiType || 'CallInitiation';
    const retentionKpi = kpiType || 'CallRetention';

    return (
        <div className="p-value-table-container">
            <h4>P-Value Table</h4>
            <table className="general-table-style">
                <thead>
                    <tr>
                        <th style={{ width: '50%' }}>Metrics</th>
                        <th style={{ width: '50%' }}>P-Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Call Initiation</td>
                        <td style={{ backgroundColor: getKpiCellColor(initiationKpi, data.initiation_p_value || 1, initFailureRate) }}>
                            {(data.initiation_p_value || 1).toFixed(3)}
                        </td>
                    </tr>
                    <tr>
                        <td>Call Retention</td>
                        <td style={{ backgroundColor: getKpiCellColor(retentionKpi, data.retention_p_value || 1, retFailureRate) }}>
                            {(data.retention_p_value || 1).toFixed(3)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PValueTable;
