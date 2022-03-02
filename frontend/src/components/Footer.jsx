import React from 'react';
import '../styles/Footer.scss';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Logo from '../media/images/logo-vertical.png';
import CySecDocs from '../media/docs/cysec';
import FSADocs from '../media/docs/fsa';

export default function Footer({ entity, isDashboardPage = false }) {
  const { t } = useTranslation();
  return (
    <div className="footer">
      <div className="footer-inner container">
        { !isDashboardPage && (
        <div className="logo-box">
          <img src={Logo} className="logo" alt="Logo" />
        </div>
        )}
        <div className="text-box">
          <p className="text green-text">{t(`footer.${entity}.authorised`)}</p>
          <p className="text">{t(`footer.${entity}.tradeName`)}</p>
          <p className="text">
            <span className="green-text">
              {t(`footer.${entity}.legal.title`)}
            </span>
            {t(`footer.${entity}.legal.subtitle`)}
          </p>
          <p className="text">{t(`footer.${entity}.legal.text`)}</p>
          <p className="text">
            <span className="green-text">
              {t(`footer.${entity}.groupLicences.title`)}
            </span>
            {t(`footer.${entity}.groupLicences.text`)}
            {t(`footer.${entity}.groupLicences.items`, { returnObjects: true }).map(
              (license, i) => (
                <span key={license.name}>
                  <a href={license.url} className="green-text">
                    {license.name}
                  </a>
                  {t(`footer.${entity}.groupLicences.items`, { returnObjects: true }).length - 1 !== i ? (
                    <span> | </span>
                  ) : null }
                </span>
              ),
            )}
          </p>
          <p className="text">
            <span className="green-text">
              {t(`footer.${entity}.notes.title`)}
            </span>
            {t(`footer.${entity}.notes.text`)}
          </p>
          {t(`footer.${entity}.notes.lines`, { returnObjects: true }).map(
            (line) => (
              <p key={line} className="text">{line}</p>
            ),
          )}
          <p className="text">
            <span className="green-text">
              {t(`footer.${entity}.riskWarning.title`)}
            </span>
            {t(`footer.${entity}.riskWarning.text`)}
            <a
              href={
                entity === 'fsa'
                  ? FSADocs.ClientAgreement
                  : CySecDocs.RiskDisclosure
              }
              download={t(`footer.${entity}.riskWarning.url`)}
              className="green-text"
            >
              {t(`footer.${entity}.riskWarning.file`)}
            </a>
          </p>
        </div>
      </div>
      <div className="copyright">
        <div className="copyright-box container">
          <div className="social-icons">
            <a
              href="https://www.facebook.com/AxianceOfficial/"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF className="icon" />
            </a>
            <a
              href="https://www.instagram.com/axiance_official/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className="icon" />
            </a>
            <a
              href="https://twitter.com/AxianceOfficial"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter className="icon" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCtHqKmmhF5z-FzW8aogqkbg"
              target="_blank"
              rel="noreferrer"
            >
              <FaYoutube className="icon" />
            </a>
            <a
              href="https://www.linkedin.com/company/axianceofficial"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn className="icon" />
            </a>
          </div>
          <p className="notice">
            {new Date().getFullYear()}
            {' '}
            {t('footer.rights')}
          </p>
          <div className="doc-links">
            <a
              className="link"
              href={
                entity === 'fsa'
                  ? FSADocs.PrivacyPolicy
                  : CySecDocs.PrivacyPolicy
              }
              download="Privacy_Policy_Axiance.pdf"
            >
              {t('footer.documents.privacy')}
            </a>
            <a
              className="link"
              href={
                entity === 'fsa'
                  ? FSADocs.CookiesPolicy
                  : CySecDocs.CookiesPolicy
              }
              download="Cookies_Axiance.pdf"
            >
              {t('footer.documents.cookies')}
            </a>
            <a
              className="link"
              href={
                entity === 'fsa'
                  ? FSADocs.RiskDisclosure
                  : CySecDocs.RiskDisclosure
              }
              download="Risk_Disclosure_Axiance.pdf"
            >
              {t('footer.documents.risk')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
