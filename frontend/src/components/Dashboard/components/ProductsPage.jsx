import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../../styles/Dashboard/Widgets.scss';
import TabNavigation from './Widgets/TabNavigation';
import WebTrading from './Products/WebTrading';
import MobileApp from './Products/MobileApp';
import Platforms from './Products/Platforms';
import CopyTrade from './Products/CopyTrade';
import VPS from './Products/VPS';
import DashboardFooter from './DashboardFooter';

function ProductsPage({ entity }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="nd-widget-container">
        <TabNavigation
          tabs={[{
            title: t('dashboard.products.sections.webTrading.title'),
            Component: WebTrading,
            key: 'wt',
          }, {
            title: t('dashboard.products.sections.mobileApp.title'),
            Component: MobileApp,
            key: 'ma',
          }, {
            title: t('dashboard.products.sections.platforms.title'),
            Component: Platforms,
            key: 'p',
          },
          {
            title: t('dashboard.products.sections.copyTrade.title'),
            Component: CopyTrade,
            key: 'ct',
          },
          {
            title: t('dashboard.products.sections.VPS.title'),
            Component: VPS,
            key: 'vps',
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

export default ProductsPage;
