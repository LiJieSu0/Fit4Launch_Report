import React from 'react';
import DpPingTableLoc3 from './Table/DpPingTableLoc3';
import DpPingOverallTable from './Table/DpPingOverallTable';
import DpHistogramComponent from '../DpHistogramComponent';
import { ReportContext } from '../../../Contexts/ReportContext';
import { useContext } from 'react';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../Constants/ChartColors';
import DynamicHeader from '../../../CommonPage/DynamicHeader';

import { useEffect } from 'react';

function Dp_Ping_Component({ city: propCity }) {
    const { city: globalCity, allReportData, loadCityData } = useContext(ReportContext);
    const city = propCity || globalCity;

    useEffect(() => {
        if (city) {
            loadCityData(city);
        }
    }, [city, loadCityData]);

    const reportData = allReportData[city];

    if (!reportData) {
        return <div className="page-content">Loading {city} data...</div>;
    }

    if (reportData.dataPerformance === null) {
        return null; // Hide if data is missing
    }

    // Update to use dataPerformance from the fetched JSON
    // Path: ["Data Performance"]["5G AUTO DP"]["Ping"]
    const Dp_Ping_Data = reportData.dataPerformance["Data Performance"]["5G AUTO DP"]["Ping"];


    const processedPingData = {
        average: { DUT: {}, REF: {} },
        std_dev: { DUT: {}, REF: {} },
        max: { DUT: {}, REF: {} },
        min: { DUT: {}, REF: {} }
    };

    const locations = ["Good", "Moderate", "Poor"];
    const deviceTypes = ["DUT", "REF"];

    locations.forEach(location => {
        // Direct access to nested structure: Location -> Device Type -> Ping RTT
        if (Dp_Ping_Data[location]) {
            // DUT Data
            if (Dp_Ping_Data[location].DUT && Dp_Ping_Data[location].DUT["Ping RTT"]) {
                const pingRTT = Dp_Ping_Data[location].DUT["Ping RTT"];
                processedPingData.average.DUT[location] = pingRTT.avg.toFixed(2);
                processedPingData.std_dev.DUT[location] = pingRTT.std_dev.toFixed(2);
                processedPingData.max.DUT[location] = pingRTT.max.toFixed(2);
                processedPingData.min.DUT[location] = pingRTT.min.toFixed(2);
            }

            // REF Data
            if (Dp_Ping_Data[location].REF && Dp_Ping_Data[location].REF["Ping RTT"]) {
                const pingRTT = Dp_Ping_Data[location].REF["Ping RTT"];
                processedPingData.average.REF[location] = pingRTT.avg.toFixed(2);
                processedPingData.std_dev.REF[location] = pingRTT.std_dev.toFixed(2);
                processedPingData.max.REF[location] = pingRTT.max.toFixed(2);
                processedPingData.min.REF[location] = pingRTT.min.toFixed(2);
            }
        }
    });

    deviceTypes.forEach(deviceType => {
        let avgSum = 0;
        let stdDevSum = 0;
        let maxSum = 0;
        let minSum = 0;
        let count = 0;

        locations.forEach(location => {
            if (processedPingData.average[deviceType][location] !== undefined) {
                avgSum += parseFloat(processedPingData.average[deviceType][location]);
                stdDevSum += parseFloat(processedPingData.std_dev[deviceType][location]);
                maxSum += parseFloat(processedPingData.max[deviceType][location]);
                minSum += parseFloat(processedPingData.min[deviceType][location]);
                count++;
            }
        });

        if (count > 0) {
            processedPingData.average[deviceType].Overall = (avgSum / count).toFixed(2);
            processedPingData.std_dev[deviceType].Overall = (stdDevSum / count).toFixed(2);
            processedPingData.max[deviceType].Overall = (maxSum / count).toFixed(2);
            processedPingData.min[deviceType].Overall = (minSum / count).toFixed(2);
        }
    });

    const pingHistogramData = [...locations, "Overall"].map(location => ({
        name: location,
        DUT: parseFloat(processedPingData.average.DUT[location] || 0),
        REF: parseFloat(processedPingData.average.REF[location] || 0),
    }));

    const barKeys = [
        { key: 'DUT', fill: CHART_COLOR_DUT },
        { key: 'REF', fill: CHART_COLOR_REF },
    ];

    return (
        <>
            <div className='page-content'>
                <DynamicHeader level={2}>Ping Test - 5G Auto - {city}</DynamicHeader>
                <h4>Ping Test Overview</h4>
                <DpPingOverallTable data={processedPingData} />
            </div>
            <div className='page-content'>
                <h4>Ping Test Details</h4>
                <DpPingTableLoc3 data={processedPingData} />
                <DpHistogramComponent
                    data={pingHistogramData}
                    title="Average Ping RTT by Location"
                    yAxisLabel="Ping RTT (ms)"
                    barKeys={barKeys}
                />
            </div>
        </>

    )
};

export default Dp_Ping_Component;
