import React from 'react';
import callPerformanceData from '../../DataFiles/CallPerformanceResults.json';
import CpCaseTable from './CpCaseTable'; // Import the new component
import '../../StyleScript/Restricted_Report_Style.css'; // Import the restricted report style
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

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

    const CallSummaryChart = ({ title, data }) => {
        const chartData = {
            labels: ['DUT', 'REF'],
            datasets: [
                {
                    label: 'Total Calls',
                    data: [data.DUT.total_attempts, data.REF.total_attempts],
                    backgroundColor: 'rgba(0, 0, 255, 0.6)', // Blue for Total Calls
                    borderColor: 'rgba(0, 0, 255, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Successful Calls',
                    data: [data.DUT.total_initiation_successes, data.REF.total_initiation_successes],
                    backgroundColor: 'rgba(0, 128, 0, 0.6)', // Green for Successful Calls
                    borderColor: 'rgba(0, 128, 0, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Init Failures Calls',
                    data: [data.DUT.total_initiation_failures, data.REF.total_initiation_failures],
                    backgroundColor: 'rgba(255, 0, 0, 1)', // Red for Init Failures
                    borderColor: 'rgba(255, 0, 0, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Dropped Calls',
                    data: [data.DUT.call_result_distribution.Drop || 0, data.REF.call_result_distribution.Drop || 0],
                    backgroundColor: 'rgba(255, 255, 0, 0.6)', // Yellow for Dropped Calls
                    borderColor: 'rgba(255, 255, 0, 1)',
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right', // Position legend to the bottom
                    align: 'center', // Align legend items to the start (left)
                    labels: {
                        font: {
                            size: 12, // Set legend font size to 12
                        },
                    },
                },

            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Device',
                        font: {
                            size: 18, // Increase x-axis title font size by 50%
                        },
                    },
                    ticks: {
                        font: {
                            size: 18, // Increase x-axis tick font size by 50%
                        },
                    },
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Calls',
                        font: {
                            size: 18, // Increase y-axis title font size by 50%
                        },
                    },
                    ticks: {
                        font: {
                            size: 18, // Increase y-axis tick font size by 50%
                        },
                    },
                },
            },
        };

        return (
            <div className="chart-container">
                <Bar data={chartData} options={options} />
            </div>
        );
    };

   const PValueTable = ({ data }) => {
       return (
           <div className="p-value-table-container">
               <h3>P-Value Table</h3>
               <table className="device-info-table">
                   <thead>
                       <tr>
                           <th>Metrics</th>
                           <th>P-Value</th>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                           <td>Call Initiation</td>
                           <td>{data.initiation_p_value.toFixed(3)}</td>
                       </tr>
                       <tr>
                           <td>Call Retention</td>
                           <td>{data.retention_p_value.toFixed(3)}</td>
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
                         <CallSummaryChart title={title} data={data} /> 
                         <PValueTable data={data} />
                         <CallCategoriesChart title={title} data={data} />
                         <CallCategoriesTable data={data} />
                     </div>
                 </React.Fragment>
             ))}
         </div>
     );
};

export default CallPerformanceDetails;