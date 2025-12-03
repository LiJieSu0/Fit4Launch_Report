import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import voiceQualityResults from '../../DataFiles/VoiceQualityResults.json';
import VqAmrNbVq from './VqCases/VqAmrNbVq';
import VqAmrWbVq from './VqCases/VqAmrWbVq';
import VqEvsWbVqDisabled from './VqCases/VqEvsWbVqDisabled';
import VqEvsWbVqEnabled from './VqCases/VqEvsWbVqEnabled';
import AutoVoNRDisabledAudioDelay from './VqCases/AutoVoNRDisabledAudioDelay';
import AutoVoNREnabledAudioDelay from './VqCases/AutoVoNREnabledAudioDelay';


//TODO audio delay color hardcoded
const VqDetailsPage = () => {
  return (
    <div>
      <VqAmrNbVq />
      <VqAmrWbVq />
      {/* Todo Line chart data dynamic loading */}
      <VqEvsWbVqDisabled />
      <VqEvsWbVqEnabled />
      <AutoVoNRDisabledAudioDelay />
      <AutoVoNREnabledAudioDelay />

    </div>
  );
};

export default VqDetailsPage;