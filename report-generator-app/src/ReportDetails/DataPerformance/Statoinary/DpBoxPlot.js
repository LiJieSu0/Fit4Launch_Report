
import React from 'react';
import { VictoryChart, VictoryBoxPlot, VictoryAxis, VictoryLabel } from 'victory';

const DpBoxPlot = ({ data, title, yAxisLabel, width = 600, height = 300 }) => {
    if (!data || data.length === 0) {
        return <div className="no-data-message">No Data Available for Box Plot</div>;
    }

    return (
        <div className="box-plot-container" style={{ width: '100%', height: 'auto', textAlign: 'center' }}>
            <h4>{title}</h4>
            <VictoryChart domainPadding={20} width={width} height={height}>
                <VictoryAxis
                    tickFormat={(x) => x}
                    style={{
                        tickLabels: { fontSize: 10, padding: 5 }
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    label={yAxisLabel}
                    style={{
                        axisLabel: { padding: 35, fontSize: 12 },
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
                        median: { stroke: "white", strokeWidth: 2 },
                        outliers: { stroke: "red", strokeWidth: 1, fill: "red", size: 2 } // Style for outliers
                    }}
                    // Data keys mapping
                    min="min"
                    max="max"
                    q1="q1"
                    median="median"
                    q3="q3"
                // x="x" // Not strictly needed if data has 'x' property
                // y="y" // Array of values if raw data, but we use pre-calc
                />
            </VictoryChart>
        </div>
    );
};

export default DpBoxPlot;
