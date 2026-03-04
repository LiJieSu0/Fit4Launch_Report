import React from 'react';
import DpPingTableLoc3 from './Table/DpPingTableLoc3';
import DpPingOverallTable from './Table/DpPingOverallTable';
import DpHistogramComponent from '../DpHistogramComponent';
import { ReportContext } from '../../../Contexts/ReportContext';
import { useContext } from 'react';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../Constants/ChartColors';
import DynamicHeader from '../../../CommonPage/DynamicHeader';
import PageBreak from '../../../CommonPage/PageBreak';

import { useEffect } from 'react';

function Dp_Ping_Component({ city: propCity }) {
    const { city: globalCity, projectData, loadCityData } = useContext(ReportContext);
    const city = propCity || globalCity;

    useEffect(() => {
        if (city) {
            loadCityData(city);
        }
    }, [city, loadCityData]);

    const reportData = projectData[city];

    if (!reportData) {
        return <PageBreak>Loading {city} data...</PageBreak>;
    }

    if (reportData.dataPerformance === null) {
        return null; // Hide if data is missing
    }

    // Update to use dataPerformance from the fetched JSON
    // Path: ["Data Performance"]["5G AUTO DP"]["Ping"]
    const Dp_Ping_Data = reportData.dataPerformance?.["Data Performance"]?.["5G AUTO DP"]?.["Ping"];

    if (!Dp_Ping_Data) {
        return (
            <PageBreak>
                <h4>Ping Test - 5G Auto</h4>
                <p>No Ping data available for {city}.</p>
            </PageBreak>
        );
    }


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
                processedPingData.average.DUT[location] = pingRTT.Mean !== undefined ? pingRTT.Mean.toFixed(2) : "N/A";
                processedPingData.std_dev.DUT[location] = pingRTT["Standard Deviation"] !== undefined ? pingRTT["Standard Deviation"].toFixed(2) : "N/A";
                processedPingData.max.DUT[location] = pingRTT.Maximum !== undefined ? pingRTT.Maximum.toFixed(2) : "N/A";
                processedPingData.min.DUT[location] = pingRTT.Minimum !== undefined ? pingRTT.Minimum.toFixed(2) : "N/A";
            }

            // REF Data
            if (Dp_Ping_Data[location].REF && Dp_Ping_Data[location].REF["Ping RTT"]) {
                const pingRTT = Dp_Ping_Data[location].REF["Ping RTT"];
                processedPingData.average.REF[location] = pingRTT.Mean !== undefined ? pingRTT.Mean.toFixed(2) : "N/A";
                processedPingData.std_dev.REF[location] = pingRTT["Standard Deviation"] !== undefined ? pingRTT["Standard Deviation"].toFixed(2) : "N/A";
                processedPingData.max.REF[location] = pingRTT.Maximum !== undefined ? pingRTT.Maximum.toFixed(2) : "N/A";
                processedPingData.min.REF[location] = pingRTT.Minimum !== undefined ? pingRTT.Minimum.toFixed(2) : "N/A";
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

        const calculateOverall = (vals) => {
            const numericVals = vals.filter(v => v !== "N/A" && !isNaN(parseFloat(v)));
            return numericVals.length > 0 ? (numericVals.reduce((a, b) => a + parseFloat(b), 0) / numericVals.length).toFixed(2) : "N/A";
        };

        if (count > 0) {
            processedPingData.average[deviceType].Overall = calculateOverall(locations.map(loc => processedPingData.average[deviceType][loc]));
            processedPingData.std_dev[deviceType].Overall = calculateOverall(locations.map(loc => processedPingData.std_dev[deviceType][loc]));
            processedPingData.max[deviceType].Overall = calculateOverall(locations.map(loc => processedPingData.max[deviceType][loc]));
            processedPingData.min[deviceType].Overall = calculateOverall(locations.map(loc => processedPingData.min[deviceType][loc]));
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
            <PageBreak>
                <DynamicHeader level={2}>Ping Test - 5G Auto - {city}</DynamicHeader>
                <h4>Ping Test Overview</h4>
                <DpPingOverallTable data={processedPingData} />
            </PageBreak>
            <PageBreak>
                <h4>Ping Test Details</h4>
                <DpPingTableLoc3 data={processedPingData} />
                <DpHistogramComponent
                    data={pingHistogramData}
                    title="Average Ping RTT by Location"
                    yAxisLabel="Ping RTT (ms)"
                    barKeys={barKeys}
                />
            </PageBreak>
        </>

    )
};

export default Dp_Ping_Component;
