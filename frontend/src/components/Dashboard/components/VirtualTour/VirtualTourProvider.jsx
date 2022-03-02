import React from 'react';
import { TourProvider, components } from '@reactour/tour';
import tourSteps from '../../../../utils/tourSteps';

function Arrow({ children }) {
  return (
    <components.Arrow
      styles={{ arrow: (base) => ({ ...base, backgroundColor: 'red' }) }}
    >
      {children}
    </components.Arrow>
  );
}

function VirtualTourProvider({ children }) {
  return (
    <TourProvider
      steps={tourSteps}
      padding={{ mask: 3, popover: [1, 5] }}
      showBadge={false}
      components={Arrow}
      styles={{
        popover: (base) => ({
          ...base,
          borderRadius: 5,
        }),
      }}
    >
      {children}
    </TourProvider>
  );
}

export default VirtualTourProvider;
