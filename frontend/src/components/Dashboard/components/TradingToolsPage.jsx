import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../../styles/Dashboard/TradingFrame.scss';
import TabNavigation from './Widgets/TabNavigation';
import TCIFrame from './TCIFrame';
import { tradingCentralEnums } from '../../../enums';
import DashboardFooter from './DashboardFooter';

function TradingToolsPage({ entity }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="trading-box">
        <div className="text-box">
          <p className="text">{t('dashboard.tradingTools.text')}</p>
        </div>
        <TabNavigation
          tabs={[
            {
              title: t('dashboard.tradingTools.tabs.analyst'),
              Component: TCIFrame,
              key: 'av',
              props: {
                name: 'Analyst Views',
                page: tradingCentralEnums.pageNames.analystViews,
              },
            },
            {
              title: t('dashboard.tradingTools.tabs.ideas'),
              Component: TCIFrame,
              key: 'fi',
              props: {
                name: 'Featured Ideas',
                page: tradingCentralEnums.pageNames.featuredIdeas,
              },
            },
          ]}
        />
      </div>
      <DashboardFooter entity={entity} />
    </>
  );
}

export default TradingToolsPage;
