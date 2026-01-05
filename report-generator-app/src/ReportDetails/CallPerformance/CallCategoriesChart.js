import React from 'react';

const processRatDistribution = (ratDistribution) => {
    const safeRatDistribution = ratDistribution || {};
    const total = Object.values(safeRatDistribution).reduce((sum, value) => sum + value, 0);
    const categories = {
        VoLTE: 0,
        '5G SA': 0,
        EPSFB: 0,
        Unknown: 0,
    };

    for (const [rat, count] of Object.entries(safeRatDistribution)) {
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

const CallCategoriesChart = ({ data }) => {
    const dutPercentages = processRatDistribution(data.DUT?.rat_distribution);
    const refPercentages = processRatDistribution(data.REF?.rat_distribution);

    const categoryOrder = ['VoLTE', '5G SA', 'EPSFB', 'Unknown'];
    const categoryColors = {
        VoLTE: '#3f51b5',
        '5G SA': '#64b5f6',
        EPSFB: '#4caf50',
        Unknown: '#9e9e9e',
    };

    const renderBar = (label, percentages) => (
        <div className="chart-row">
            <div className="chart-label">{label}</div>
            <div className="chart-bar-wrapper">
                {categoryOrder.map(category => {
                    const percentage = percentages[category];
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
    );

    return (
        <div className="call-categories-chart-container">
            <h4>Call Categories</h4>
            <div className="chart-legend">
                {categoryOrder.map(category => (
                    <div key={category} className="legend-item">
                        <span className="legend-color-box" style={{ backgroundColor: categoryColors[category] }}></span>
                        {category}
                    </div>
                ))}
            </div>
            {renderBar('DUT', dutPercentages)}
            {renderBar('REF', refPercentages)}
        </div>
    );
};

export default CallCategoriesChart;
