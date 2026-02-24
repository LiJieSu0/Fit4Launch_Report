import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
import VqAmrNbVq from './VqCases/VqAmrNbVq';
import VqAmrWbVq from './VqCases/VqAmrWbVq';
import VqEvsWbVqDisabled from './VqCases/VqEvsWbVqDisabled';
import VqEvsWbVqEnabled from './VqCases/VqEvsWbVqEnabled';
import AutoVoNRDisabledAudioDelay from './VqCases/AutoVoNRDisabledAudioDelay';
import AutoVoNREnabledAudioDelay from './VqCases/AutoVoNREnabledAudioDelay';
import PageBreak from '../../CommonPage/PageBreak';


//TODO audio delay color hardcoded
const VqDetailsPage = () => {
  return (
    <div>
      <VqAmrNbVq city='Seattle' firstSection={true} />
      <VqAmrNbVq city='New York' />
      <VqAmrWbVq city='Seattle' />
      <VqAmrWbVq city='New York' />
      <VqEvsWbVqDisabled city='Seattle' />
      <VqEvsWbVqDisabled city='New York' />
      <VqEvsWbVqEnabled city='Seattle' />
      <VqEvsWbVqEnabled city='New York' />
      <AutoVoNRDisabledAudioDelay city='Seattle' />
      <AutoVoNRDisabledAudioDelay city='New York' />

      <AutoVoNREnabledAudioDelay city='Seattle' />
      <AutoVoNREnabledAudioDelay city='New York' />
    </div>
  );
};

export default VqDetailsPage;