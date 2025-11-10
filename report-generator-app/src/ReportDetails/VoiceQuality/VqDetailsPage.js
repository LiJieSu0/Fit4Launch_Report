import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import voiceQualityResults from '../../DataFiles/VoiceQualityResults.json';
import VqAmrNbVq from './VqCases/VqAmrNbVq';
import VqAmrWbVq from './VqCases/VqAmrWbVq';
import VqEvsWbVqDisabled from './VqCases/VqEvsWbVqDisabled';
import VqEvsWbVqEnabled from './VqCases/VqEvsWbVqEnabled';
import VqKpiAudioDelay from './VqCases/VqKpiAudioDelay';
import VqAutoVonrAudioDelay from './VqCases/VqAutoVonrAudioDelay';
import VqLineChart from './VqCases/VqLineChart';

const VqDetailsPage = () => {
  return (
    <div>
      <VqAmrNbVq />
      <VqAmrWbVq />
      <VqEvsWbVqDisabled />
      <VqEvsWbVqEnabled />
      <VqKpiAudioDelay />
      <VqAutoVonrAudioDelay />
      <VqLineChart/>
    </div>
  );
};

export default VqDetailsPage;