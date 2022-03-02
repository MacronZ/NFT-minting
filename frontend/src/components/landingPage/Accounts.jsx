import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../../styles/LandingPage/Accounts.scss';
import { BsArrowRight } from 'react-icons/bs';
import { FreedomImage } from '../../media/images/infographics';

export default function Accounts() {
  const { t } = useTranslation();

  return (
    <div className="accounts">
      <div className="accounts-inner container">
        <div className="left">
          <img
            src={FreedomImage}
            className="infographic"
            alt="Mobile Phone Infographic"
          />
        </div>
        <div className="right">
          <h2 className="title">{t('accounts.title')}</h2>
          <p className="text">{t('accounts.text')}</p>
          <p className="text">{t('accounts.registerText')}</p>
          <div className="cta-risk-box">
            <Link className="green-cta arrow-cta" to="/register">
              <span className="cta-text">{t('join')}</span>
              <BsArrowRight className="arrow-icon" />
            </Link>
            <p className="risk-warning">{t('risk')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
