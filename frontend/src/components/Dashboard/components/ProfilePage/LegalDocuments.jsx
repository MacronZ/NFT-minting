import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegFilePdf } from 'react-icons/fa';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CySecDocs from '../../../../media/docs/cysec';
import FSADocs from '../../../../media/docs/fsa';
import darkPdf from '../../../../media/images/icons/darkPDF.svg';

const DocLink = ({ title, path }) => {
  const getTheme = useSelector((state) => state.theme);

  const setPdfIcon = () => {
    if (getTheme === 'dark') {
      return (
        <img src={darkPdf} height="15" width="15" alt="darkPDF" />
      );
    }
    return (
      <FaRegFilePdf />
    );
  };

  return (
    <a className="doc-link-Legal" target="_blank" rel="noreferrer" href={path}>
      <div className="title-dark">{title}</div>
      {setPdfIcon()}
    </a>
  );
};

function LegalDocuments() {
  const [entity, setEntity] = useState();
  const { t } = useTranslation();

  useEffect(async () => {
    const user = await JSON.parse(localStorage.getItem('user'));
    setEntity(user.entity);
  }, []);

  return (
    <div className="legal-docs">
      <div className="head-line">
        <Link to="/dashboard/profile"><ArrowBackIcon /></Link>
        <div className="title">{t('dashboard.settings.documents.title')}</div>
      </div>

      <div className="content">
        {[{ title: 'Cookies Policy', path: entity === 'fsa' ? FSADocs.CookiesPolicy : CySecDocs.CookiesPolicy },
          { title: 'Client Agreement', path: entity === 'fsa' ? FSADocs.ClientAgreement : CySecDocs.ClientAgreement },
          { title: 'Privacy Policy', path: entity === 'fsa' ? FSADocs.PrivacyPolicy : CySecDocs.PrivacyPolicy },
          { title: 'Risk Disclosure Notice', path: entity === 'fsa' ? FSADocs.RiskDisclosure : CySecDocs.RiskDisclosure },
        ].map(({ title, path }) => <DocLink title={title} path={path} />)}
      </div>
    </div>
  );
}

export default LegalDocuments;
