import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../styles/LandingPage/Partner.scss';
import { BsArrowRight } from 'react-icons/bs';
import { PartnerImage } from '../../media/images/infographics';

export default function Partner() {
  const [showIBBenefits, setShowIBBenefits] = useState(true);
  const { t } = useTranslation();
  const showHidden1 = (event) => {
    event.preventDefault();
    const hidden1 = document.getElementsByClassName('m-hide');
    for (let i = 0; i < hidden1.length; i += 1) {
      hidden1[i].style.display = 'list-item';
    }
    document.getElementById('unhide-1').style.display = 'none';
  };

  const showHidden2 = (event) => {
    event.preventDefault();
    const hidden2 = document.getElementsByClassName('m-hide-2');
    for (let i = 0; i < hidden2.length; i += 1) {
      hidden2[i].style.display = 'list-item';
    }
    document.getElementById('unhide-2').style.display = 'none';
  };

  return (
    <div className="partner">
      <div className="partner-inner container">
        <h2 className="title">{t('partner.title')}</h2>
        <p className="text">
          {t('partner.subTitle')}
        </p>
        <div className="partner-split">
          <div className="left">
            <img
              src={PartnerImage}
              className="infographic"
              height="70"
              width="75"
              alt="Icon"
            />
            <div className="cta-risk-box">
              <Link className="green-cta arrow-cta" to="/register">
                <span className="cta-text">{t('join')}</span>
                <BsArrowRight className="arrow-icon" />
              </Link>
              <p className="risk-warning">
                {t('risk')}
              </p>
            </div>
          </div>
          <div className="right">
            <div className="selector-box">
              <button
                type="button"
                onClick={() => setShowIBBenefits(true)}
                className={showIBBenefits ? 'selector chosen' : 'selector'}
              >
                {t('partner.ib.title')}
              </button>
              <button
                type="button"
                onClick={() => setShowIBBenefits(false)}
                className={showIBBenefits ? 'selector' : 'selector chosen'}
              >
                {t('partner.client.title')}
              </button>
            </div>
            <div className="partner-boxes">
              {showIBBenefits ? (
                <div className="partner-box">
                  <ul className="benefits">
                    {t('partner.ib.benefits', { returnObjects: true }).map((benefit, i) => (
                      <li key={`benefit_${Math.random()}`} className={i < 3 ? 'benefit' : 'benefit m-hide'}>
                        {benefit}
                      </li>
                    ))}
                    <button type="button" className="more" id="unhide-1" onClick={showHidden1}>
                      {t('partner.more')}
                    </button>
                  </ul>
                </div>
              ) : (
                <div className="partner-box">
                  <ul className="benefits">
                    {t('partner.client.benefits', { returnObjects: true }).map((benefit, i) => (
                      <li key={`benefit_${Math.random()}`} className={i < 3 ? 'benefit' : 'benefit m-hide'}>
                        {benefit}
                      </li>
                    ))}
                    <button type="button" id="unhide-2" onClick={showHidden2}>
                      {t('partner.more')}
                    </button>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
