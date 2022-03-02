import React from 'react';
import { useTranslation } from 'react-i18next';
import Standard from '../../../../media/images/icons/Promo-Clubs/standard.svg';
import Premium from '../../../../media/images/icons/Promo-Clubs/premium.svg';
import Vip from '../../../../media/images/icons/Promo-Clubs/vip.svg';
import PromoDocs from '../../../../media/docs/promos';
import '../../../../styles/Dashboard/PromoClubs.scss';

function ClubMembersSectionTwo() {
  const { t } = useTranslation();

  return (
    <div className="clubs-container">
      <div className="club-members-container">
        <div className="club-members-boxes">
          <div className="club-content">
            <img src={Standard} className="iconStandard" alt="standard" />
            <div className="text-container">
              <div className="title-club">
                {t('dashboard.promosAndClub.clubMemberSectionOne.titleStandard')}
              </div>
              <div className="subtitle-club-black-box">
                {t('dashboard.promosAndClub.clubMemberSectionTwo.blackBoxBonusTitleFirst')}
              </div>
            </div>
          </div>
        </div>
        <div className="club-members-boxes">
          <div className="club-content">
            <img src={Premium} className="iconStandard" alt="Premium" />
            <div className="text-container">
              <div className="title-club">
                {t('dashboard.promosAndClub.clubMemberSectionOne.titlePremium')}
              </div>
              <div className="subtitle-club-black-box">
                {t('dashboard.promosAndClub.clubMemberSectionTwo.blackBoxBonusTitleSecond')}
              </div>
            </div>
          </div>
        </div>
        <div className="club-members-boxes">
          <div className="club-content">
            <img src={Vip} className="iconStandard" alt="Vip" />
            <div className="text-container">
              <div className="title-club">
                {t('dashboard.promosAndClub.clubMemberSectionOne.titleVip')}
              </div>
              <div className="subtitle-club-black-box">
                {t('dashboard.promosAndClub.clubMemberSectionTwo.blackBoxBonusTitleThird')}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="club-subtitle">
        {t('dashboard.promosAndClub.clubMemberSectionTwo.clubSubtitle')}
      </div>
      <div>
        <ul className="empty-circles-club">
          {t('dashboard.promosAndClub.clubMemberSectionTwo.bullets', { returnObjects: true }).map((bullet, i) => (
            <li key={`bullet_bonus_${i}`}>
              <p className="paragraphClubText">{bullet}</p>
            </li>
          ))}
        </ul>
        <a className="terms-link-text" target="_blank" rel="noreferrer" href={PromoDocs.BonusPromoTCs}>
          {t('dashboard.promosAndClub.clubMemberSectionTwo.termsAndConditions')}
        </a>
      </div>
    </div>
  );
}

export default ClubMembersSectionTwo;
