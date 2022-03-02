import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import '../../../../styles/Dashboard/BrandManualAndLogos.scss';
import mobileAppImg from '../../../../media/images/products/axiance-mobile-app.png';
import mobileAppImgDark from '../../../../media/images/products/mobile-app-dark.png';

const MobileApp = () => {
  const { t } = useTranslation();
  const getTheme = useSelector((state) => state.theme);

  const setMobileAppLogo = () => {
    if (getTheme === 'dark') {
      return (
        <img src={mobileAppImgDark} alt="mobile-app-dark" className="mobile-dark-size" />
      );
    }
    return (
      <img src={mobileAppImg} alt="mobile-app" />
    );
  };
  return (
    <div className="mobile-app">
      {setMobileAppLogo()}
      <div>
        <div>
          <span className="mob-app-text-bold">{t('dashboard.products.sections.mobileApp.subtitle')}</span>
          <span className="mob-app-text">{t('dashboard.products.sections.mobileApp.description')}</span>
        </div>
        <div className="row-container">
          <ul className="empty-circles">
            <li><p className="bullet-text">{t('dashboard.products.sections.mobileApp.bullets', { returnObjects: true })[0]}</p></li>
            <li><p className="bullet-text">{t('dashboard.products.sections.mobileApp.bullets', { returnObjects: true })[1]}</p></li>
          </ul>
          <ul className="empty-circles">
            <li><p className="bullet-text">{t('dashboard.products.sections.mobileApp.bullets', { returnObjects: true })[2]}</p></li>
            <li><p className="bullet-text">{t('dashboard.products.sections.mobileApp.bullets', { returnObjects: true })[3]}</p></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileApp;
