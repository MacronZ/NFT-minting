import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/LandingPage/CookiePopup.scss';

export default function CookiePopup() {
  const { t } = useTranslation();
  const cookieAccepted = JSON.parse(localStorage.getItem('cookieAccepted'));
  const [showCookie, setshowCookie] = useState(!cookieAccepted);

  const handleClick = () => {
    setshowCookie(false);
    localStorage.setItem('cookieAccepted', 'true');
  };

  return showCookie ? (
    <div className="cookie-box">
      <div className="cookie-popup">
        <div className="text-box">
          <p className="title">
            {t('cookieWarning.cookieWarningTitle')}
          </p>
          <p className="text">
            {t('cookieWarning.cookieWarningMessage')}
          </p>
        </div>
        <button type="button" className="green-cta" onClick={handleClick}>
          {t('cookieWarning.cookieButtonAccept')}
        </button>
      </div>
    </div>
  ) : null;
}
