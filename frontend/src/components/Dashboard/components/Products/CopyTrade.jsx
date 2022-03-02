import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../../../styles/Dashboard/BrandManualAndLogos.scss';
import { useSelector } from 'react-redux';
import copyTradeImg1 from '../../../../media/images/products/copy-trade-1.png';
import copyTradeImg2 from '../../../../media/images/products/copy-trade-2.png';
import copyTradeImg1Dark from '../../../../media/images/products/copy-trade-1-dark.png';
import copyTrade2Dark from '../../../../media/images/products/copyTrade2Dark.png';

const CopyTrade = () => {
  const { t } = useTranslation();
  const getTheme = useSelector((state) => state.theme);

  const setCopyTradeLogo = () => {
    if (getTheme === 'dark') {
      return (
        <img src={copyTradeImg1Dark} alt="copy-trade-top-dark" className="copy-trade-dark-size" />
      );
    }
    return (
      <img src={copyTradeImg1} alt="copy-trade-top" />
    );
  };
  const setCopyTradeSecondLogo = () => {
    if (getTheme === 'dark') {
      return (
        <img src={copyTrade2Dark} alt="copy-trade-top-dark" className="copy-trade-dark-size" />
      );
    }
    return (
      <img src={copyTradeImg2} alt="copy-trade" />
    );
  };

  return (
    <div className="copy-trade">
      {setCopyTradeLogo()}
      <div className="copy-trade-text-container">
        <span className="copy-trade-text">{t('dashboard.products.sections.copyTrade.description1')}</span>
        <span className="copy-trade-text-bold">{t('dashboard.products.sections.copyTrade.subtitle')}</span>
        <span className="copy-trade-text">{t('dashboard.products.sections.copyTrade.description2')}</span>
      </div>
      {setCopyTradeSecondLogo()}
    </div>
  );
};

export default CopyTrade;
