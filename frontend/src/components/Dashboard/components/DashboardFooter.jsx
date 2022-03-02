import React from 'react';
import '../../../styles/Dashboard/FooterDashboard.scss';
import {
  FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import CySecDocs from '../../../media/docs/cysec';
import FSADocs from '../../../media/docs/fsa';

export default function DashboardFooter({ entity }) {
  const { t } = useTranslation();
  return (
    <div className="footer-dashboard">
      <div className="copyright-dashboard">
        <div className="copyright-box-dashboard container">
          <div className="social-icons-dashboard">
            <a
              href="https://www.facebook.com/AxianceOfficial/"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF className="icon-dashboard" />
            </a>
            <a
              href="https://www.instagram.com/axiance_official/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className="icon-dashboard" />
            </a>
            <a
              href="https://twitter.com/AxianceOfficial"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter className="icon-dashboard" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCtHqKmmhF5z-FzW8aogqkbg"
              target="_blank"
              rel="noreferrer"
            >
              <FaYoutube className="icon-dashboard" />
            </a>
            <a
              href="https://www.linkedin.com/company/axianceofficial"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn className="icon-dashboard" />
            </a>
          </div>
          <p className="notice-dashboard">
            {new Date().getFullYear()}
            {' '}
            {t('footer.rights')}
          </p>
          <div className="doc-links-dashboard">
            <a
              className="link-dashboard"
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
              className="link-dashboard"
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
              className="link-dashboard"
              href={entity === 'fsa' ? FSADocs.RiskDisclosure : CySecDocs.RiskDisclosure}
              download="Risk_Disclosure_Axiance.pdf"
            >
              {t('footer.documents.risk')}
            </a>
          </div>
        </div>
      </div>
      <div className="risk-warning-dashboard">
        <p className="risk-warning-para">
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
  );
}
