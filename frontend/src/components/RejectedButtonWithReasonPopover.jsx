import React from 'react';
import Typography from '@material-ui/core/Typography';
import '../styles/Onboarding/UserData.scss';

const RejectedButtonWithReasonPopover = ({ reason, status }) => (
  <div className="status-container">
    <Typography aria-haspopup="true" className="status-text status-rejected">
      {status}
    </Typography>
    {reason
      && <Typography className="reason-text">{reason}</Typography>}
  </div>
);

export default RejectedButtonWithReasonPopover;
