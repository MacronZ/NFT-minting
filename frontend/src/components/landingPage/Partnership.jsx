import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/LandingPage/Partnership.scss';
import Pulse from 'react-reveal/Pulse';
import {
  EarnIcon, IntroduceIcon, MoreIcon, PromoteIcon,
} from '../../media/images/icons';

export default function Partnership() {
  const { t } = useTranslation();

  return (
    <div className="partnership">
      <div className="partnership-inner container">
        <h2 className="title">{t('partnership.title')}</h2>
        <Pulse>
          <div className="infographics">
            <div className="infographic-box">
              <img src={PromoteIcon} className="icon" alt="Refer" />
              <h5 className="title">{t('partnership.promote.title')}</h5>
              <p className="text">{t('partnership.promote.text')}</p>
            </div>
            <div className="infographic-box">
              <img src={IntroduceIcon} className="icon" alt="Partners" />
              <h5 className="title">{t('partnership.introduce.title')}</h5>
              <p className="text">{t('partnership.introduce.text')}</p>
            </div>
            <div className="infographic-box">
              <img src={EarnIcon} className="icon" alt="Trade" />
              <h5 className="title">{t('partnership.earn.title')}</h5>
              <p className="text">{t('partnership.earn.text')}</p>
            </div>
            <div className="infographic-box">
              <img src={MoreIcon} className="icon" alt="Bonus" />
              <h5 className="title">{t('partnership.more.title')}</h5>
              <p className="text">{t('partnership.more.text')}</p>
            </div>
          </div>
        </Pulse>
      </div>
    </div>
  );
}
