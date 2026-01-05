import React from 'react';
import { getKpiCellColor } from '../../Utils/KpiRules';

const PValueTable = ({ data }) => {
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
                        <td style={{ backgroundColor: getKpiCellColor('CallInitiation', data.initiation_p_value || 1, null) }}>
                            {(data.initiation_p_value || 1).toFixed(3)}
                        </td>
                    </tr>
                    <tr>
                        <td>Call Retention</td>
                        <td style={{ backgroundColor: getKpiCellColor('CallRetention', data.retention_p_value || 1, null) }}>
                            {(data.retention_p_value || 1).toFixed(3)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PValueTable;
