import React from 'react';
import Zoom from 'react-reveal/Zoom';
import MyProfile from './Widgets/MyProfile';
import MarketAnalysis from './Widgets/MarketAnalysis';
import MarketingCarousel from './Widgets/MarketingCarousel';
import PartnerLink from './Widgets/YourPartnerLink';
import CampaignRequest from './Widgets/CampaignRequest';
import DashboardFooter from './DashboardFooter';
import GeneralFeedbackSurvey from '../../GeneralFeedbackSurvey';

function DashboardHome({ user, entity, locked }) {
  return (
    <>
      <Zoom bottom cascade>
        <div className="nd-widget-container">
          <div className="widget-box profile-widget-box">
            <MyProfile user={user} locked={locked} />
            <CampaignRequest locked={locked} user={user} entity={entity} />
          </div>
          <div className="widget-box market-widget-box">
            <MarketAnalysis locked={locked} />
          </div>
          <div className="widget-box marketing-widget-box">
            <MarketingCarousel />
          </div>
          <div className="widget-box partner-widget-box">
            <PartnerLink locked={locked} user={user} entity={entity} />
          </div>
        </div>
      </Zoom>
      <GeneralFeedbackSurvey />
      <DashboardFooter
        entity={entity}
      />
    </>
  );
}

export default DashboardHome;
