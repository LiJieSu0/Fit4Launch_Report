
import React from 'react';
import { VictoryChart, VictoryBoxPlot, VictoryAxis, VictoryLabel, VictoryScatter } from 'victory';

const DpBoxPlot = ({ data: rawData, title, yAxisLabel, width = 600, height = 300 }) => {
    if (!rawData || rawData.length === 0) {
        return <div className="no-data-message">No Data Available for Box Plot</div>;
    }

    // Process data to add "Overall" if it doesn't exist
    const data = [...rawData];
    const hasOverall = data.some(d => d.x.includes('Overall'));

    if (!hasOverall) {
        const dutPoints = data.filter(d => d.x.includes('(DUT)'));
        const refPoints = data.filter(d => d.x.includes('(REF)'));

        const calculateOverall = (points, label) => {
            if (points.length === 0) return null;
            const validPoints = points.filter(p => p.min !== undefined && p.max !== undefined);
            if (validPoints.length === 0) return null;

            return {
                x: label,
                min: Math.min(...validPoints.map(p => p.min)),
                max: Math.max(...validPoints.map(p => p.max)),
                q1: validPoints.reduce((acc, p) => acc + p.q1, 0) / validPoints.length,
                median: validPoints.reduce((acc, p) => acc + p.median, 0) / validPoints.length,
                q3: validPoints.reduce((acc, p) => acc + p.q3, 0) / validPoints.length,
                outliers: validPoints.flatMap(p => p.outliers || [])
            };
        };

        const overallDut = calculateOverall(dutPoints, 'Overall (DUT)');
        const overallRef = calculateOverall(refPoints, 'Overall (REF)');

        if (overallDut) data.push(overallDut);
        if (overallRef) data.push(overallRef);
    }

    // Calculate domain to include outliers
    let minVal = Infinity;
    let maxVal = -Infinity;

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
    data.forEach((d) => {
        if (d.outliers && Array.isArray(d.outliers)) {
            const iqr = d.q3 - d.q1;
            const lowerFence = iqr === 0 ? d.min : d.q1 - 1.5 * iqr;
            const upperFence = iqr === 0 ? d.max : d.q3 + 1.5 * iqr;

            d.outliers.forEach((outlierVal) => {
                // Only include if it's actually outside the whisker range
                if (outlierVal < lowerFence || outlierVal > upperFence) {
                    outlierData.push({ x: d.x, y: outlierVal });
                }
            });
        }
    });

    // Dynamic sizing: scale width with number of entries
    const dynamicWidth = Math.min(width, Math.max(300, data.length * 100 + 120));
    const dynamicDomainPadding = Math.max(15, Math.min(40, 120 / data.length));

    return (
        <div className="box-plot-container" style={{ width: `${dynamicWidth}px`, height: 'auto', textAlign: 'center' }}>
            <h4>{title}</h4>
            <VictoryChart
                domainPadding={dynamicDomainPadding}
                width={dynamicWidth}
                height={height}
                domain={{ y: yDomain }}
                padding={{ top: 20, bottom: 60, left: 80, right: 20 }} // Increased bottom padding for X-axis labels
            >
                <VictoryAxis
                    crossAxis={false} // Prevent axis from moving to y=0
                    offsetY={50} // Force axis to bottom
                    tickFormat={(x) => x}
                    style={{
                        tickLabels: { fontSize: 8, padding: 5, angle: -25, textAnchor: 'end' } // Smaller font and rotated for space
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    crossAxis={false} // Ensure Y-axis stays at left
                    label={yAxisLabel}
                    style={{
                        axisLabel: { padding: 55, fontSize: 12 }, // Increased padding
                        tickLabels: { fontSize: 10, padding: 5 }
                    }}
                />
                <VictoryBoxPlot
                    boxWidth={15} // Slightly narrower boxes
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
