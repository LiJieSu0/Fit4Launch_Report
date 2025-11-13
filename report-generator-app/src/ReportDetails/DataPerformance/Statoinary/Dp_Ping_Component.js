import React from 'react';
import DpPingTableLoc3 from './Table/DpPingTableLoc3';
import DpPingOverallTable from './Table/DpPingOverallTable';
import DpHistogramComponent from '../DpHistogramComponent';
import PingData from '../../../DataFiles/SA/DpStationaryResults/Ping.json';
import { CHART_COLOR_DUT, CHART_COLOR_REF } from '../../../Constants/ChartColors';

function Dp_Ping_Component() {
    const Dp_Ping_Data = PingData;

    const processedPingData = {
        average: { DUT: {}, REF: {} },
        std_dev: { DUT: {}, REF: {} },
        max: { DUT: {}, REF: {} },
        min: { DUT: {}, REF: {} }
    };

    const locations = ["Good", "Moderate", "Poor"];
    const deviceTypes = ["DUT", "REF"];

    locations.forEach(location => {
        const pingCategory = Dp_Ping_Data[location]["25x64 bytes PING"];
        for (const key in pingCategory) {
            if (pingCategory.hasOwnProperty(key)) {
                const deviceData = pingCategory[key];
                const deviceType = deviceData["Device Type"];
                const pingRTT = deviceData["Ping RTT"];

                if (deviceType === "DUT") {
                    processedPingData.average.DUT[location] = pingRTT.avg.toFixed(2);
                    processedPingData.std_dev.DUT[location] = pingRTT.std_dev.toFixed(2);
                    processedPingData.max.DUT[location] = pingRTT.max.toFixed(2);
                    processedPingData.min.DUT[location] = pingRTT.min.toFixed(2);
                } else if (deviceType === "REF") {
                    processedPingData.average.REF[location] = pingRTT.avg.toFixed(2);
                    processedPingData.std_dev.REF[location] = pingRTT.std_dev.toFixed(2);
                    processedPingData.max.REF[location] = pingRTT.max.toFixed(2);
                    processedPingData.min.REF[location] = pingRTT.min.toFixed(2);
                }
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
        DUT: parseFloat(processedPingData.average.DUT[location]),
        REF: parseFloat(processedPingData.average.REF[location]),
    }));

    const barKeys = [
        { key: 'DUT', fill: CHART_COLOR_DUT },
        { key: 'REF', fill: CHART_COLOR_REF },
    ];
 
    return(
        <div>
            <div className='page-content'>
                <h2>PING test - 5G NR</h2>
                <DpPingOverallTable data={processedPingData} />
                <DpPingTableLoc3 data={processedPingData} />
                <DpHistogramComponent
                    data={pingHistogramData}
                    title="Average Ping RTT by Location"
                    yAxisLabel="Ping RTT (ms)"
                    barKeys={barKeys}
                />
            </div>
        </div>
    )
};

export default Dp_Ping_Component;
