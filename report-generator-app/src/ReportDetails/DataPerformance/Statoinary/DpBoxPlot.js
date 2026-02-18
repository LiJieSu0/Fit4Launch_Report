
import React from 'react';
import { VictoryChart, VictoryBoxPlot, VictoryAxis, VictoryLabel, VictoryScatter } from 'victory';

const DpBoxPlot = ({ data, title, yAxisLabel, width = 600, height = 300 }) => {
    if (!data || data.length === 0) {
        return <div className="no-data-message">No Data Available for Box Plot</div>;
    }

    // Calculate domain to include outliers
    let minVal = Infinity;
    let maxVal = -Infinity;

    if (data && data.length > 0) {
        data.forEach(d => {
            let low = d.min;
            let high = d.max;
            if (d.outliers && Array.isArray(d.outliers) && d.outliers.length > 0) {
                low = Math.min(low, ...d.outliers);
                high = Math.max(high, ...d.outliers);
            }
            if (low < minVal) minVal = low;
            if (high > maxVal) maxVal = high;
        });
    }

    // Default domain if data is missing or weird
    if (minVal === Infinity) {
        minVal = 0;
        maxVal = 10;
    }

    // Add padding
    const padding = (maxVal - minVal) * 0.1 || 1; // fallback if max===min
    const yDomain = [minVal - padding, maxVal + padding];

    // Extract outlier data for explicit rendering
    const outlierData = [];
    if (data && data.length > 0) {
        data.forEach((d) => {
            if (d.outliers && Array.isArray(d.outliers)) {
                d.outliers.forEach((outlierVal) => {
                    outlierData.push({ x: d.x, y: outlierVal });
                });
            }
        });
    }

    return (
        <div className="box-plot-container" style={{ width: '60%', height: 'auto', textAlign: 'center' }}>
            <h4>{title}</h4>
            <VictoryChart
                domainPadding={20}
                width={width}
                height={height}
                domain={{ y: yDomain }}
                padding={{ top: 20, bottom: 50, left: 80, right: 20 }} // Increased left padding for Y-axis label
            >
                <VictoryAxis
                    crossAxis={false} // Prevent axis from moving to y=0
                    offsetY={50} // Force axis to bottom (Victory coordinates are bottom-up, this sets the baseline)
                    tickFormat={(x) => x}
                    style={{
                        tickLabels: { fontSize: 10, padding: 5 }
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    crossAxis={false} // Ensure Y-axis stays at left
                    label={yAxisLabel}
                    style={{
                        axisLabel: { padding: 45, fontSize: 12 }, // Increased padding
                        tickLabels: { fontSize: 10, padding: 5 }
                    }}
                />
                <VictoryBoxPlot
                    boxWidth={20}
                    data={data}
                    style={{
                        min: { stroke: "black", strokeWidth: 1 },
                        max: { stroke: "black", strokeWidth: 1 },
                        q1: { fill: "#FF5733", fillOpacity: 0.5 },
                        q3: { fill: "#FF5733", fillOpacity: 0.5 },
                        median: { stroke: "black", strokeWidth: 2 },
                        outliers: { stroke: "transparent" } // Hide default outliers
                    }}
                    // Use calculated props for whiskers to exclude outliers
                    max={(datum) => {
                        const iqr = datum.q3 - datum.q1;
                        if (iqr === 0) return datum.max; // fallback: show actual max when IQR=0
                        const upperFence = datum.q3 + 1.5 * iqr;
                        return Math.min(datum.max, upperFence);
                    }}
                    min={(datum) => {
                        const iqr = datum.q3 - datum.q1;
                        if (iqr === 0) return datum.min; // fallback: show actual min when IQR=0
                        const lowerFence = datum.q1 - 1.5 * iqr;
                        return Math.max(datum.min, lowerFence);
                    }}
                    q1="q1"
                    median="median"
                    q3="q3"
                // outliers="outliers" // We handle manually
                />
                {/* Manually render outliers on top */}
                {outlierData.length > 0 && (
                    <VictoryScatter
                        data={outlierData}
                        style={{
                            data: { fill: "red", stroke: "red", strokeWidth: 1 }
                        }}
                        size={2}
                    />
                )}
            </VictoryChart>
        </div>
    );
};

export default DpBoxPlot;
