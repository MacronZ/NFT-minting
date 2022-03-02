import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../../../styles/Dashboard/BrandManualAndLogos.scss';
import { useSelector } from 'react-redux';
import vpsDiagram from '../../../../media/images/products/vps-diagram.png';
import vpsLogo from '../../../../media/images/products/vps-logo.png';
import vpsDiagramDark from '../../../../media/images/products/vps-diagram-dark.png';
import vpsLogoDark from '../../../../media/images/products/vps-logo-dark.png';

const VPS = () => {
  const { t } = useTranslation();
  const getTheme = useSelector((state) => state.theme);

  const setVpsLogo = () => {
    if (getTheme === 'dark') {
      return (
        <img src={vpsLogoDark} alt="vps-icon-dark" className="vps-icon vps-dark-size" />
      );
    }
    return (
      <img src={vpsLogo} alt="vps-logo" className="vps-icon" />
    );
  };

  const setVpsDiagramLogo = () => {
    if (getTheme === 'dark') {
      return (
        <img src={vpsDiagramDark} alt="vps-diagram-dark" className="vps-dark-diagram-size" />
      );
    }
    return (
      <img src={vpsDiagram} alt="vps-diagram" />
    );
  };
  return (
    <div className="vps">
      {setVpsLogo()}
      <span className="vps-title">
        {t('dashboard.products.sections.VPS.subtitle')}
      </span>
      <div className="vps-content-container">
        <ul className="empty-circles">
          {t('dashboard.products.sections.VPS.bullets', { returnObjects: true }).map((bullet, i) => (
            <li key={`bullet${i}`} className="vps-bullet"><p className="bullet-text">{bullet}</p></li>
          ))}
        </ul>
        {setVpsDiagramLogo()}
      </div>
    </div>
  );
};

export default VPS;
