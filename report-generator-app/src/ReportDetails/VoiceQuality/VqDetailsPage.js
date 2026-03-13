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
      <AutoVoNREnabledAudioDelay city='Seattle' firstSection={true} />
      <AutoVoNREnabledAudioDelay city='New York' />
      <VqAmrNbVq city='Seattle' />
      <VqAmrNbVq city='New York' />
      <VqAmrWbVq city='Seattle' />
      <VqAmrWbVq city='New York' />
      <VqEvsWbVqDisabled city='Seattle' />
      <VqEvsWbVqDisabled city='New York' />
      <VqEvsWbVqEnabled city='Seattle' />
      <VqEvsWbVqEnabled city='New York' />



    </div>
  );
};

export default VqDetailsPage;