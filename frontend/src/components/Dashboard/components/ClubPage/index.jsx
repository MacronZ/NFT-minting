import React from 'react';
import '../../../../styles/Dashboard/PromoClubs.scss';
import { useTranslation } from 'react-i18next';
import DashboardFooter from '../DashboardFooter';
import Clubs from './Clubs';
import Promotions from './Promotions';
import TabNavigation from '../Widgets/TabNavigation';

function ClubPage({ entity }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="nd-widget-container">
        <TabNavigation
          tabs={[{
            title: t('dashboard.promosAndClub.clubMain.title'),
            Component: Clubs,
            key: 'c',
          }, {
            title: t('dashboard.promosAndClub.clubMain.titleSectionTwo'),
            Component: Promotions,
            key: 'p',
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

export default ClubPage;
