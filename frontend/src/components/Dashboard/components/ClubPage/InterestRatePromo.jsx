import React from 'react';
import { useTranslation } from 'react-i18next';
import Standard from '../../../../media/images/icons/Promo-Clubs/standard.svg';
import Premium from '../../../../media/images/icons/Promo-Clubs/premium.svg';
import Vip from '../../../../media/images/icons/Promo-Clubs/vip.svg';
import PromoDocs from '../../../../media/docs/promos';
import '../../../../styles/Dashboard/PromoClubs.scss';

function ClubMembersSection() {
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
                {t('dashboard.promosAndClub.clubMemberSectionOne.blackBoxBonusTitleFirst')}
              </div>
            </div>
          </div>
        </div>
        <div className="club-members-boxes">
          <div className="club-content">
            <img src={Premium} className="iconStandard" alt="premium" />
            <div className="text-container">
              <div className="title-club">
                {t('dashboard.promosAndClub.clubMemberSectionOne.titlePremium')}
              </div>
              <div className="subtitle-club-black-box">
                {t('dashboard.promosAndClub.clubMemberSectionOne.blackBoxBonusTitleSecond')}
              </div>
            </div>
          </div>
        </div>
        <div className="club-members-boxes">
          <div className="club-content">
            <img src={Vip} className="iconStandard" alt="Vio" />
            <div className="text-container">
              <div className="title-club">
                {t('dashboard.promosAndClub.clubMemberSectionOne.titleVip')}
              </div>
              <div className="subtitle-club-black-box">
                {t('dashboard.promosAndClub.clubMemberSectionOne.blackBoxBonusTitleThird')}
              </div>
            </div>
          </div>
        </div>
        <div className="club-subtitle">
          {t('dashboard.promosAndClub.clubMemberSectionOne.clubSubtitle')}
        </div>
        <div>
          <ul className="empty-circles-club">
            {t('dashboard.promosAndClub.clubMemberSectionOne.bullets', { returnObjects: true }).map((bullet, i) => (
              <li key={`bullet_interest_${i}`}>
                <p className="paragraphClubText">{bullet}</p>
              </li>
            ))}
          </ul>
          <a className="terms-link-text" target="_blank" rel="noreferrer" href={PromoDocs.InterestRatePromoTCs}>
            {t('dashboard.promosAndClub.clubMemberSectionOne.termsAndConditions')}
          </a>
        </div>
      </div>
    </div>
  );
}
export default ClubMembersSection;
