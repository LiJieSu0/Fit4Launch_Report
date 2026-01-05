import React from 'react';

const processRatDistributionCounts = (ratDistribution) => {
    const safeRatDistribution = ratDistribution || {};
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
    const total = Object.values(categories).reduce((sum, value) => sum + value, 0);
    return { ...categories, Total: total };
};

const CallCategoriesTable = ({ data }) => {
    const dutCounts = processRatDistributionCounts(data.DUT?.rat_distribution);
    const refCounts = processRatDistributionCounts(data.REF?.rat_distribution);

    const categoryOrder = ['VoLTE', '5G SA', 'EPSFB', 'Unknown', 'Total'];

    return (
        <div className="call-categories-table-container">
            <table className="general-table-style">
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

export default CallCategoriesTable;
