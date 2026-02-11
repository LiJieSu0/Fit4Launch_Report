import React, { useContext, useEffect } from 'react';
import HPUECoverageTable from './HPUECoverageTable';
import CoverageLineChart from './CoverageLineChart';
import { ReportContext } from '../../Contexts/ReportContext';
import DynamicHeader from '../../CommonPage/DynamicHeader';

const HpueCoverageSection = ({ city: propCity, firstSection = false }) => {
    const { city: globalCity, projectData, loadCityData, project } = useContext(ReportContext);
    const city = propCity || globalCity;

    useEffect(() => {
        if (city) {
            loadCityData(city);
        }
    }, [city, loadCityData]);

    const reportData = projectData[city];

    const processN41HPUECoverageData = () => {
        const defaultData = {
            PC2: { distances: [0, 0, 0, 0, 0, 0], txPowers: [0, 0, 0, 0, 0, 0] },
            PC3: { distances: [0, 0, 0, 0, 0, 0], txPowers: [0, 0, 0, 0, 0, 0] }
        };

        const rootData = reportData && reportData.coveragePerformance && reportData.coveragePerformance['Coverage Performance'];

        if (!rootData || !rootData['5G n41 HPUE Coverage Test']) {
            return defaultData;
        }

        const n41Data = rootData['5G n41 HPUE Coverage Test'];
        const pc2Distances = [];
        const pc2TxPowers = [];
        const pc3Distances = [];
        const pc3TxPowers = [];

        for (let i = 1; i <= 5; i++) {
            const runKey = `Run${i}`;
            const runData = n41Data[runKey];

            if (runData && Array.isArray(runData)) {
                const pc2Entry = runData.find(item => item['Device type'] === 'PC2');
                const pc3Entry = runData.find(item => item['Device type'] === 'PC3');

                pc2Distances.push(pc2Entry ? parseFloat((pc2Entry.distance_km * 1000).toFixed(2)) : 0);
                pc2TxPowers.push(pc2Entry ? parseFloat(pc2Entry.tx_power_value.toFixed(1)) : 0);
                pc3Distances.push(pc3Entry ? parseFloat((pc3Entry.distance_km * 1000).toFixed(2)) : 0);
                pc3TxPowers.push(pc3Entry ? parseFloat(pc3Entry.tx_power_value.toFixed(1)) : 0);
            } else {
                pc2Distances.push(0);
                pc2TxPowers.push(0);
                pc3Distances.push(0);
                pc3TxPowers.push(0);
            }
        }

        // Calculate averages
        const pc2DistAvg = parseFloat((pc2Distances.reduce((a, b) => a + b, 0) / 5).toFixed(2));
        const pc2TxAvg = parseFloat((pc2TxPowers.reduce((a, b) => a + b, 0) / 5).toFixed(1));
        const pc3DistAvg = parseFloat((pc3Distances.reduce((a, b) => a + b, 0) / 5).toFixed(2));
        const pc3TxAvg = parseFloat((pc3TxPowers.reduce((a, b) => a + b, 0) / 5).toFixed(1));

        return {
            PC2: {
                distances: [...pc2Distances, pc2DistAvg],
                txPowers: [...pc2TxPowers, pc2TxAvg]
            },
            PC3: {
                distances: [...pc3Distances, pc3DistAvg],
                txPowers: [...pc3TxPowers, pc3TxAvg]
            }
        };
    };

    if (!reportData || !reportData.coveragePerformance) {
        return <div className="page-content">Loading {city} HPUE data...</div>;
    }

    const n41HPUEData = processN41HPUECoverageData();
    const projectFolderName = project ? project.dataFolderName : "";

    return (
        <>
            <div className='page-content'>
                {firstSection && <DynamicHeader level={1}>5G HPUE Coverage Test </DynamicHeader>}
                <DynamicHeader level={2}>N41 HPUE Coverage Test - {city} </DynamicHeader>
                <HPUECoverageTable n41Data={n41HPUEData} />
                <DynamicHeader level={3} hideInTOC={true}>5G n41 HPUE Coverage Test - RSRP Analysis - {city}</DynamicHeader>
                <CoverageLineChart analysisType="RSRP" run={1} city={city} projectFolderName={projectFolderName} />
                <CoverageLineChart analysisType="RSRP" run={2} city={city} projectFolderName={projectFolderName} />
            </div>
            <div className='page-content'>
                <CoverageLineChart analysisType="RSRP" run={3} city={city} projectFolderName={projectFolderName} />
                <CoverageLineChart analysisType="RSRP" run={4} city={city} projectFolderName={projectFolderName} />
            </div>
            <div className='page-content'>
                <CoverageLineChart analysisType="RSRP" run={5} city={city} projectFolderName={projectFolderName} />
            </div>
            <div className='page-content'>
                <DynamicHeader level={3} hideInTOC={true}>5G n41 HPUE Coverage Test - Tx Power Analysis - {city}</DynamicHeader>
                <CoverageLineChart analysisType="TxPower" run={1} city={city} projectFolderName={projectFolderName} />
                <CoverageLineChart analysisType="TxPower" run={2} city={city} projectFolderName={projectFolderName} />
            </div>
            <div className='page-content'>
                <CoverageLineChart analysisType="TxPower" run={3} city={city} projectFolderName={projectFolderName} />
                <CoverageLineChart analysisType="TxPower" run={4} city={city} projectFolderName={projectFolderName} />
            </div>
            <div className='page-content'>
                <CoverageLineChart analysisType="TxPower" run={5} city={city} projectFolderName={projectFolderName} />
            </div>
        </>
    );
};

export default HpueCoverageSection;
