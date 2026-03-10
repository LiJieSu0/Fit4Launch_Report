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


    const locations = ["Good", "Moderate", "Poor"];
    const deviceTypes = ["DUT", "REF"];
    const metrics = ["average", "std_dev", "max", "min"];

    const processedPingData = {
        average: { DUT: { Overall: "N/A" }, REF: { Overall: "N/A" } },
        std_dev: { DUT: { Overall: "N/A" }, REF: { Overall: "N/A" } },
        max: { DUT: { Overall: "N/A" }, REF: { Overall: "N/A" } },
        min: { DUT: { Overall: "N/A" }, REF: { Overall: "N/A" } }
    };

    // Initialize all locations with "N/A"
    metrics.forEach(metric => {
        deviceTypes.forEach(device => {
            locations.forEach(loc => {
                processedPingData[metric][device][loc] = "N/A";
            });
        });
    });

    locations.forEach(location => {
        if (Dp_Ping_Data[location]) {
            deviceTypes.forEach(device => {
                const pingRTT = Dp_Ping_Data[location][device]?.["Ping RTT"];
                if (pingRTT) {
                    processedPingData.average[device][location] = pingRTT.Mean !== undefined ? pingRTT.Mean.toFixed(2) : "N/A";
                    processedPingData.std_dev[device][location] = pingRTT["Standard Deviation"] !== undefined ? pingRTT["Standard Deviation"].toFixed(2) : "N/A";
                    processedPingData.max[device][location] = pingRTT.Maximum !== undefined ? pingRTT.Maximum.toFixed(2) : "N/A";
                    processedPingData.min[device][location] = pingRTT.Minimum !== undefined ? pingRTT.Minimum.toFixed(2) : "N/A";
                }
            });
        }
    });

    const calculateOverall = (vals) => {
        const numericVals = vals.filter(v => v !== "N/A" && !isNaN(parseFloat(v))).map(v => parseFloat(v));
        return numericVals.length > 0 ? (numericVals.reduce((a, b) => a + b, 0) / numericVals.length).toFixed(2) : "N/A";
    };

    deviceTypes.forEach(deviceType => {
        processedPingData.average[deviceType].Overall = calculateOverall(locations.map(loc => processedPingData.average[deviceType][loc]));
        processedPingData.std_dev[deviceType].Overall = calculateOverall(locations.map(loc => processedPingData.std_dev[deviceType][loc]));
        processedPingData.max[deviceType].Overall = calculateOverall(locations.map(loc => processedPingData.max[deviceType][loc]));
        processedPingData.min[deviceType].Overall = calculateOverall(locations.map(loc => processedPingData.min[deviceType][loc]));
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
