import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Header.scss';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { HeaderImage } from '../media/images/infographics';

export default function Header({ entity }) {
  const { t } = useTranslation();

  return (
    <div className="header">
      <div className="header-inner container">
        <div className="left">
          <div className="smart-text">
            <h1 className="pre-title green-text">{t('header.preTitle')}</h1>
            <h2 className="title">{t('header.title')}</h2>
            <h3 className="sub-title">
              {t('header.subTitle')}
              <span className="blue-text">{t('header.subTitleHighlight')}</span>
            </h3>
          </div>
          <p className="text">{t('header.text')}</p>
          {entity === 'cysec' ? null
            : (
              <>
                <p className="ready">{t('header.ready')}</p>
                <div className="cta-risk-box">
                  <Link className="green-cta arrow-cta" to="/register">
                    <span className="cta-text">{t('join')}</span>
                    <BsArrowRight className="arrow-icon" />
                  </Link>
                  <p className="risk-warning">{t('header.risk')}</p>
                </div>
              </>
            )}
        </div>
        <div className="right">
          <img src={HeaderImage} height="450" className="infographic" alt="Phone Infographic" />
        </div>
      </div>
    </div>
  );
}
