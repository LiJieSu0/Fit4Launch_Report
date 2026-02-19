import React, { useState, useEffect } from 'react';
import { useReportData } from '../../Contexts/ReportContext';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const WfcRssiTimeLineChart = ({ tc, city = 'Seattle' }) => {
    const { project } = useReportData();
    const [chartData, setChartData] = useState([]);
    const [entities, setEntities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Filename format: wfc_rssi_statistics_tc151.csv
                const folderName = project?.dataFolderName ? `${encodeURIComponent(project.dataFolderName)}/` : '';
                const response = await fetch(`/AnalyzeResults/${folderName}${city}/wfc_rssi_linechart_data/wfc_rssi_statistics_${tc.toLowerCase()}.csv`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const csvText = await response.text();

                // Parse CSV manually
                const lines = csvText.trim().split('\n');
                if (lines.length < 2) {
                    throw new Error("CSV file is empty or missing data lines");
                }

                // Header: Device,MO DUT,MT DUT,MO REF,MT REF OR Device,DUT,REF
                const headers = lines[0].split(',').map(h => h.trim());
                const dataKeys = headers.filter(h => h !== 'Device');

                const processedData = lines.slice(1).map(line => {
                    const values = line.split(',');
                    const dataPoint = {};
                    headers.forEach((header, index) => {
                        const val = parseFloat(values[index]);
                        dataPoint[header] = isNaN(val) ? null : val;
                    });
                    return dataPoint;
                });

                setChartData(processedData);

                // Define colors for each potential entity
                const entityConfig = {
                    "DUT MO": { color: '#0a18e2ff' },
                    "MT DUT": { color: '#0de70dff' }, // MT DUT in CSV might be MT DUT or DUT MT
                    "DUT MT": { color: '#0de70dff' },
                    "MO DUT": { color: '#0a18e2ff' },
                    "REF MO": { color: '#e6141eff' },
                    "MO REF": { color: '#e6141eff' },
                    "MT REF": { color: '#ff39e5ff' },
                    "REF MT": { color: '#ff39e5ff' },
                    "DUT": { color: '#0a18e2ff' },
                    "REF": { color: '#e6141eff' }
                };

                const loadedEntities = dataKeys.map(key => {
                    return {
                        key: key,
                        color: entityConfig[key]?.color || '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase()
                    };
                });
                setEntities(loadedEntities);

            } catch (error) {
                console.error("Error loading CSV for WfcRssiTimeLineChart:", error);
                setChartData([]);
                setEntities([]);
            } finally {
                setLoading(false);
            }
        };

        if (tc && project) {
            loadData();
        }
    }, [tc, city, project]);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Loading RSSI timeline data...</div>;
    }

    if (chartData.length === 0) {
        return null; // Or show no data message
    }

    return (
        <div style={{ width: '100%', height: 400, marginTop: '30px', paddingBottom: '30px' }}>
            <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>RSSI Over Time ({tc})</h4>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 40,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                    <XAxis
                        dataKey="Device"
                        label={{ value: 'Time (Sequence)', position: 'insideBottom', offset: -10 }}
                        tick={{ fontSize: 11 }}
                        interval="preserveStartEnd"
                    />
                    <YAxis
                        label={{ value: 'RSSI (dBm)', angle: -90, position: 'insideLeft', offset: 10 }}
                        tick={{ fontSize: 12 }}
                        domain={['auto', 'auto']}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none' }}
                        itemStyle={{ fontSize: '12px' }}
                    />
                    <Legend verticalAlign="top" height={36} iconType="circle" />
                    {entities.map((entity) => (
                        <Line
                            key={entity.key}
                            type="monotone"
                            dataKey={entity.key}
                            stroke={entity.color}
                            strokeWidth={1.5}
                            dot={false}
                            activeDot={{ r: 4 }}
                            name={entity.key}
                            connectNulls={true}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WfcRssiTimeLineChart;
