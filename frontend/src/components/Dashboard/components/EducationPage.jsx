import React from 'react';
import '../../../styles/Dashboard/TradingFrame.scss';
import TCIFrame from './TCIFrame';
import { tradingCentralEnums } from '../../../enums';
import DashboardFooter from './DashboardFooter';

function EducationPage({ entity }) {
  return (
    <>
      <div className="trading-box">
        <TCIFrame name="Education" page={tradingCentralEnums.pageNames.education} />
      </div>
      <DashboardFooter entity={entity} />
    </>
  );
}

export default EducationPage;
