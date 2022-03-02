import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../../../styles/Dashboard/BrandManualAndLogos.scss';
import ManualandLogos from '../../../../media/docs/Press Kit.pdf';
import AxianceLogos from '../../../../media/docs/Axiance_logos.pdf';

function BMALCard({ path, title, content }) {
  const { t } = useTranslation();

  return (
    <div className="card-container">
      <div className="image-area">
        <img src={`/assets/dashboard/banner/${path}`} alt={path} />
      </div>
      <div className="title">{title}</div>
      <a href={content} download="GFG">
        <button className="nd-btn" type="button">{t('dashboard.marketing.sections.brand.download')}</button>
      </a>
    </div>
  );
}

const BrandManualAndLogos = () => {
  const bmalCards = [{ path: 'banner-1.png', title: 'Brand Manual & Logo', content: ManualandLogos }, { path: 'banner-2.png', title: 'Brand Manual & Logo', content: AxianceLogos }];

  return (
    <div className="brand-manual-and-logos">
      {bmalCards.map((c, idx) => (
        <BMALCard
          key={idx}
          path={c.path}
          title={c.title}
          content={c.content}
        />
      ))}
    </div>
  );
};

export default BrandManualAndLogos;
