import React from 'react';
import callPerformanceData from '../../DataFiles/CallPerformanceResults.json';
import CpCaseTable from './CpCaseTable'; // Import the new component
import '../../StyleScript/Restricted_Report_Style.css'; // Import the restricted report style

const CallPerformanceDetails = () => {

    const processRatDistribution = (ratDistribution) => {
        const total = Object.values(ratDistribution).reduce((sum, value) => sum + value, 0);
        const categories = {
            VoLTE: 0,
            '5G SA': 0,
            EPSFB: 0,
            Unknown: 0,
        };

        for (const [rat, count] of Object.entries(ratDistribution)) {
            if (rat === 'VoLTE') {
                categories.VoLTE += count;
            } else if (rat === 'VoNR' || rat === 'VoNR-VoLTE') {
                categories['5G SA'] += count;
            } else if (rat === 'EPSFB') {
                categories.EPSFB += count;
            } else {
                categories.Unknown += count;
            }
        }

        const percentages = {};
        for (const [category, count] of Object.entries(categories)) {
            percentages[category] = total > 0 ? (count / total) * 100 : 0;
        }
        return percentages;
    };

    const CallCategoriesChart = ({ title, data }) => {
        const dutPercentages = processRatDistribution(data.DUT.rat_distribution);
        const refPercentages = processRatDistribution(data.REF.rat_distribution);

        const categoryOrder = ['VoLTE', '5G SA', 'EPSFB', 'Unknown'];
        const categoryColors = {
            VoLTE: '#3f51b5', // Dark blue
            '5G SA': '#64b5f6', // Light blue
            EPSFB: '#4caf50', // Green
            Unknown: '#9e9e9e', // Grey
        };

        return (
            <div className="call-categories-chart-container">
                <h3>Call Categories</h3>
                <div className="chart-legend">
                    {categoryOrder.map(category => (
                        <div key={category} className="legend-item">
                            <span className="legend-color-box" style={{ backgroundColor: categoryColors[category] }}></span>
                            {category}
                        </div>
                    ))}
                </div>
                <div className="chart-row">
                    <div className="chart-label">DUT</div>
                    <div className="chart-bar-wrapper">
                        {categoryOrder.map(category => {
                            const percentage = dutPercentages[category];
                            return percentage > 0 ? (
                                <div
                                    key={category}
                                    className="chart-bar"
                                    style={{ width: `${percentage}%`, backgroundColor: categoryColors[category] }}
                                >
                                    {percentage > 5 && `${percentage.toFixed(1)}%`}
                                </div>
                            ) : null;
                        })}
                    </div>
                </div>
                <div className="chart-row">
                    <div className="chart-label">REF</div>
                    <div className="chart-bar-wrapper">
                        {categoryOrder.map(category => {
                            const percentage = refPercentages[category];
                            return percentage > 0 ? (
                                <div
                                    key={category}
                                    className="chart-bar"
                                    style={{ width: `${percentage}%`, backgroundColor: categoryColors[category] }}
                                >
                                    {percentage > 5 && `${percentage.toFixed(1)}%`}
                                </div>
                            ) : null;
                        })}
                    </div>
                </div>
            </div>
        );
    };

    const processRatDistributionCounts = (ratDistribution) => {
        const categories = {
            VoLTE: 0,
            '5G SA': 0,
            EPSFB: 0,
            Unknown: 0,
        };

        for (const [rat, count] of Object.entries(ratDistribution)) {
            if (rat === 'VoLTE') {
                categories.VoLTE += count;
            } else if (rat === 'VoNR' || rat === 'VoNR-VoLTE') {
                categories['5G SA'] += count;
            } else if (rat === 'EPSFB') {
                categories.EPSFB += count;
            } else {
                categories.Unknown += count;
            }
        }
        const total = Object.values(categories).reduce((sum, value) => sum + value, 0);
        return { ...categories, Total: total };
    };

    const CallCategoriesTable = ({ data }) => {
        const dutCounts = processRatDistributionCounts(data.DUT.rat_distribution);
        const refCounts = processRatDistributionCounts(data.REF.rat_distribution);

        const categoryOrder = ['VoLTE', '5G SA', 'EPSFB', 'Unknown', 'Total'];

        return (
            <div className="call-categories-table-container">
                <table className="device-info-table">
                    <thead>
                        <tr>
                            <th>Device</th>
                            {categoryOrder.map(category => (
                                <th key={category}>{category}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>DUT</td>
                            {categoryOrder.map(category => (
                                <td key={`dut-${category}`}>{dutCounts[category]}</td>
                            ))}
                        </tr>
                        <tr>
                            <td>REF</td>
                            {categoryOrder.map(category => (
                                <td key={`ref-${category}`}>{refCounts[category]}</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };
 
     return (
         <div>
             {Object.entries(callPerformanceData).map(([title, data], index) => (
                 <React.Fragment key={index}>
                     <div className='page-content'>
                         <CpCaseTable title={title} data={data} />
                         <CallCategoriesChart title={title} data={data} />
                         <CallCategoriesTable data={data} />
                     </div>
                 </React.Fragment>
             ))}
         </div>
     );
};

export default CallPerformanceDetails;