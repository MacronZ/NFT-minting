import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../../../styles/Dashboard/BrandManualAndLogos.scss';
import { useSelector } from 'react-redux';
import tradingCentralImg from '../../../../media/images/products/trading-central-logo.png';
import metatrader4Img from '../../../../media/images/products/metatrader-4.png';
import metatrader5Img from '../../../../media/images/products/metatrader-5.png';
import exclusiveImg from '../../../../media/images/products/exclusive.png';
import metatrader4ImgDark from '../../../../media/images/products/meta-dark.png';
import metatrader5ImgDark from '../../../../media/images/products/metatrader5-dark.png';
import tradingCentralImgDark from '../../../../media/images/products/trading-central-dark.png';

const Platforms = () => {
  const { t } = useTranslation();
  const getTheme = useSelector((state) => state.theme);

  const setTradingLogo = () => {
    if (getTheme === 'dark') {
      return (
        <img src={tradingCentralImgDark} alt="trading-central-dark" className="platforms-main-dark-size" />
      );
    }
    return (
      <img src={tradingCentralImg} alt="trading-central" />
    );
  };

  const setMT4Logo = () => {
    if (getTheme === 'dark') {
      return (
        <img src={metatrader4ImgDark} alt="mt4-dark" className="padding-top platforms-dark-size" />
      );
    }
    return (
      <img src={metatrader4Img} alt="mt-4" className="padding-top" />
    );
  };
  const setMT5Logo = () => {
    if (getTheme === 'dark') {
      return (
        <img src={metatrader5ImgDark} alt="mt5-dark" className="padding-top" width="20%" height="20%" />
      );
    }
    return (
      <img src={metatrader5Img} alt="mt-5" className="padding-top" />
    );
  };

  return (
    <div className="platforms">
      <div className="box">
        <img src={exclusiveImg} alt="exclusive" className="exclusive-icon" />
        {setTradingLogo()}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="title">{t('dashboard.products.sections.platforms.tradingCentral.title1')}</span>
          <span className="title">{t('dashboard.products.sections.platforms.tradingCentral.title2')}</span>
        </div>
        <ul className="empty-circles">
          <li><p className="bullet-text">{t('dashboard.products.sections.platforms.tradingCentral.bullets', { returnObjects: true })[0]}</p></li>
          <li><p className="bullet-text">{t('dashboard.products.sections.platforms.tradingCentral.bullets', { returnObjects: true })[1]}</p></li>
        </ul>
        <ul className="empty-circles">
          <li><p className="bullet-text">{t('dashboard.products.sections.platforms.tradingCentral.bullets', { returnObjects: true })[2]}</p></li>
          <li><p className="bullet-text">{t('dashboard.products.sections.platforms.tradingCentral.bullets', { returnObjects: true })[3]}</p></li>
        </ul>
      </div>
      <div className="metatrader-container">
        <div className="column left">
          {setMT4Logo()}
          <span className="title padding-top">{t('dashboard.products.sections.platforms.metaTrader4.title')}</span>
          <ul className="empty-circles">
            {t('dashboard.products.sections.platforms.metaTrader4.bullets', { returnObjects: true }).map((bullet, i) => (
              <li key={`bullet_${i}`}>
                <p className="bullet-text">{bullet}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="column right">
          {t('dashboard.products.sections.platforms.metaTrader4.paragraphs', { returnObjects: true }).map((paragraph, i) => (
            <p key={`paragraph_${i}`} className="paragraph-text">{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="metatrader-container">
        <div className="column left">
          {setMT5Logo()}
          <span className="title padding-top">{t('dashboard.products.sections.platforms.metaTrader5.title')}</span>
          <ul className="empty-circles">
            {t('dashboard.products.sections.platforms.metaTrader5.bullets', { returnObjects: true }).map((bullet, i) => (
              <li key={`bullet_${i}`}>
                <p className="bullet-text">{bullet}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="column right">
          {t('dashboard.products.sections.platforms.metaTrader5.paragraphs', { returnObjects: true }).map((paragraph, i) => (
            <p key={`paragraph_${i}`} className="paragraph-text">{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Platforms;
