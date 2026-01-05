import React from 'react';
import { useReportData } from '../../Contexts/ReportContext';
import '../../StyleScript/Restricted_Report_Style.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import CpScenarioSection from './CpScenarioSection';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const CallPerformanceDetails = () => {
    // We no longer need to load city data here if we specify it in the sections below
    // However, if we want to "map" over scenarios, we still need to know which city's scenarios to use as a template.
    // For this example, I'll show how to call them manually with different cities.

    return (
        <div>
            <CpScenarioSection
                title="5G Auto VoNR Disabled CP MO Drive"
                city="Seattle"
                isFirst={true}
            />
            <CpScenarioSection
                title="5G Auto VoNR Disabled CP MT Drive"
                city="Seattle"
                isFirst={false}
            />

            <CpScenarioSection
                title="5G Auto VoNR Enabled CP MO Drive"
                city="Seattle"
                isFirst={false}
            />

            <CpScenarioSection
                title="5G Auto VoNR Enabled CP MT Drive"
                city="Seattle"
                isFirst={false}
            />
        </div>
    );
};

export default CallPerformanceDetails;