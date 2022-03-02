import React from 'react';
import '../../../../styles/Dashboard/PromoClubs.scss';
import InterestRatePromo from './InterestRatePromo';
import BonusPromo from './BonusPromo';

function Promotions() {
  return (
    <>
      <div className="club-promo-box vip-box">
        <InterestRatePromo />
      </div>
      <div className="club-promo-box vip-box">
        <BonusPromo />
      </div>
    </>
  );
}

export default Promotions;
