import React from 'react';
import '../../../../styles/Dashboard/Widgets.scss';
import { useTranslation } from 'react-i18next';
import Standard from '../../../../media/images/icons/Promo-Clubs/standard.svg';

function StandardClub() {
  const { t } = useTranslation();

  return (
    <div className="club-boxes your-partner-link">
      <img src={Standard} className="logo" alt="standard" />
      <h1 className="title">{t('dashboard.promosAndClub.standardClub.title')}</h1>
      <h2 className="unitTitleStandard">{t('dashboard.promosAndClub.standardClub.units')}</h2>
      <p className="subtitle-promos">{t('dashboard.promosAndClub.standardClub.subtitle')}</p>
      <div className="line-width" />
      <div className="list">
        <ul className="empty-circles-Standard">
          {t('dashboard.promosAndClub.standardClub.bullets', { returnObjects: true }).map((bullet, i) => (
            <li key={`bullet_${i}`}>
              <p className="paragraphText">{bullet}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
}

export default StandardClub;
