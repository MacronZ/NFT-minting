import React from 'react';
import '../../../../styles/Dashboard/Widgets.scss';
import { useTranslation } from 'react-i18next';
import Premium from '../../../../media/images/icons/Promo-Clubs/premium.svg';

function PremiumClub() {
  const { t } = useTranslation();

  return (
    <div className="club-boxes your-partner-link">
      <img src={Premium} className="logo" alt="Logo" />
      <h1 className="title">{t('dashboard.promosAndClub.premiumClub.title')}</h1>
      <h2 className="unitTitlePremium">{t('dashboard.promosAndClub.premiumClub.units')}</h2>
      <p className="subtitle-promos">{t('dashboard.promosAndClub.premiumClub.subtitle')}</p>
      <div className="line-width" />
      <div className="list">
        <ul className="empty-circles-Premium">
          {t('dashboard.promosAndClub.premiumClub.bullets', { returnObjects: true }).map((bullet, i) => (
            <li key={`bullet_${i}`}>
              <p className="paragraphText">{bullet}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
}

export default PremiumClub;
