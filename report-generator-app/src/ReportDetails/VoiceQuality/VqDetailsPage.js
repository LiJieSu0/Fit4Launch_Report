import React from 'react';
import '../../StyleScript/Restricted_Report_Style.css';
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
      <VqAmrNbVq city='Seattle' />
      <VqAmrWbVq city='Seattle' />
      <VqEvsWbVqDisabled city='Seattle' />
      <VqEvsWbVqEnabled city='Seattle' />
      <div className='page-content'>
        <AutoVoNRDisabledAudioDelay city='Seattle' />
        <AutoVoNREnabledAudioDelay city='Seattle' />
      </div>

    </div>
  );
};

export default VqDetailsPage;