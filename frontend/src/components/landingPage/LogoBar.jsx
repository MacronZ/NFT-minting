import React from 'react';
import '../../styles/LandingPage/LogoBar.scss';
import Zoom from 'react-reveal/Zoom';
import {
  Visa, Mastercard, Bank, Skrill, Sofort, Trustly,
} from '../../media/images/logos';

export default function LogoBar() {
  return (
    <div className="logo-bar">
      <Zoom bottom cascade>
        <div className="logo-bar-inner container">
          <img src={Visa} className="logo" alt="VISA" />
          <img src={Mastercard} className="logo" alt="Mastercard" />
          <img src={Bank} className="logo" alt="Bank" />
          <img src={Skrill} className="logo" alt="Skrill" />
          <img src={Sofort} className="logo" alt="Sofort" />
          <img src={Trustly} className="logo" alt="Trustly" />
        </div>
      </Zoom>
    </div>
  );
}
