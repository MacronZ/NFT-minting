import React from 'react';
import '../../../../styles/Dashboard/PromoClubs.scss';
import StandardClub from './StandardClub';
import PremiumClub from './PremiumClub';
import VipClub from './VipClub';

function Clubs() {
  return (
    <>
      <div className="club-promo-container">
        <div className="club-promo-box standard-box">
          <StandardClub />
        </div>
        <div className="club-promo-box premium-box">
          <PremiumClub />
        </div>
        <div className="club-promo-box vip-box">
          <VipClub />
        </div>
      </div>
    </>
  );
}

export default Clubs;
