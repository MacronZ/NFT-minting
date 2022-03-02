import React from 'react';
import '../../../../styles/Dashboard/Widgets.scss';
import { useTranslation } from 'react-i18next';
import Vip from '../../../../media/images/icons/Promo-Clubs/vip.svg';

function VipClub() {
  const { t } = useTranslation();

  return (
    <div className="club-boxes your-partner-link">
      <img src={Vip} className="logo" alt="Logo" />
      <h1 className="title">{t('dashboard.promosAndClub.vipClub.title')}</h1>
      <h2 className="unitTitleVip">{t('dashboard.promosAndClub.vipClub.units')}</h2>
      <p className="subtitle-promos">{t('dashboard.promosAndClub.vipClub.subtitle')}</p>
      <div className="line-width" />
      <div className="list">
        <ul className="empty-circles-Vip">
          {t('dashboard.promosAndClub.vipClub.bullets', { returnObjects: true }).map((bullet, i) => (
            <li key={`bullet_${i}`}>
              <p className="paragraphText">{bullet}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default VipClub;
