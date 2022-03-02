import React from 'react';
import { useTranslation } from 'react-i18next';
import infoIcon from '../../../../media/images/icons/info-icon.svg';

const InfoBox = () => {
  const { t } = useTranslation();

  return (
    <div className="info-box">
      <img
        src={infoIcon}
        alt="info"
        className="info-icon"
      />
      <p className="info-text">{t('dashboard.wallet.withdrawMinAmount')}</p>
      <p className="info-text">{t('dashboard.wallet.withdrawProcessedTime')}</p>
    </div>
  );
};

export default InfoBox;
