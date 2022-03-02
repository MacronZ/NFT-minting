import React, { useState } from 'react';
import { VirtualTourPopup } from '../components/Dashboard/components/VirtualTour';

async function virtualTour() {
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  return (
    <VirtualTourPopup showPopup={showVirtualTour} closePopup={setShowVirtualTour(false)} />
  );
}

export default { virtualTour };
