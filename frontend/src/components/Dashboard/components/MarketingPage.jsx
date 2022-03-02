import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../../styles/Dashboard/Widgets.scss';
import TabNavigation from './Widgets/TabNavigation';
import BrandManualAndLogos from './Marketing/BrandManualAndLogos';
import Banners from './Marketing/Banners';
import MarketingVideo from './Widgets/MarketingVideo';
import DashboardFooter from './DashboardFooter';

function MarketingPage({ entity }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="nd-widget-container">
        <TabNavigation
          tabs={[{
            title: t('dashboard.marketing.sections.brand.title'),
            Component: BrandManualAndLogos,
            key: 'bml',
          }, {
            title: t('dashboard.marketing.sections.banners.title'),
            Component: Banners,
            key: 'b',
            props: { entity },
          }, {
            title: t('dashboard.marketing.sections.videos.title'),
            Component: MarketingVideo,
            key: 'v',
          },
          ]}
        />
      </div>
      <DashboardFooter
        entity={entity}
      />
    </>
  );
}

export default MarketingPage;
