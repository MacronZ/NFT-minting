import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../../../styles/Dashboard/Products.scss';
import { useSelector } from 'react-redux';
import webTradingImg from '../../../../media/images/products/axiance-web-trading.png';
import webTradingImgDark from '../../../../media/images/products/webTradingImg-dark.png';

const WebTrading = () => {
  const { t } = useTranslation();
  const getTheme = useSelector((state) => state.theme);

  const setSelectLogo = () => {
    if (getTheme === 'dark') {
      return (
        <img src={webTradingImgDark} alt="web-trading-dark" width="70%" height="70%" />
      );
    }
    return (
      <img src={webTradingImg} alt="web-trading" />
    );
  };
  return (
    <div className="web-trading">
      {setSelectLogo()}
      <div>
        <span className="web-trading-text-bold">{t('dashboard.products.sections.webTrading.subtitle')}</span>
        <span className="web-trading-text">{t('dashboard.products.sections.webTrading.description')}</span>
      </div>
    </div>
  );
};

export default WebTrading;
