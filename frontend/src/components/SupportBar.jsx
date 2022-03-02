import React, { useState } from 'react';
import '../styles/SupportBar.scss';
import { useLocation } from 'react-router-dom';
import {
  CallIcon, ChatIcon, EmailIcon, FaqIcon, VirtualTour,
} from '../media/images/icons';
import SupportForm from './SupportForm';
import CallBackForm from './CallBackForm';
import { VirtualTourPopup } from './Dashboard/components/VirtualTour';

export default function SupportBar({ entity, userAuthorized }) {
  const [showSupport, setShowSupport] = useState(false);
  const [showCall, setShowCall] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const location = useLocation();
  const isOnDashboardPage = location.pathname.indexOf('/dashboard') !== -1;

  function hideForms() {
    setShowSupport(false);
    setShowCall(false);
    setShowVirtualTour(false);
  }

  function openFAQ() {
    if (entity === 'fsa') {
      window.open('https://axiance.com/int/en-us/faq/');
    } else if (entity === 'cysec') {
      window.open('https://axianceeu.com/en-us/faq/');
    }
  }

  function handleOpenChat() {
    const chatID = entity === 'fsa' ? 'jcl04cia' : 'g1ecn7x8';
    const activeChatButton = document.querySelector(`[id^=b_${chatID}]`);
    if (activeChatButton) activeChatButton.click();
  }

  return (
    <>
      <SupportForm userAuthorized={userAuthorized} showPopup={showSupport} closeForm={hideForms} entity={entity} />
      <CallBackForm showPopup={showCall} closeForm={hideForms} entity={entity} />
      <VirtualTourPopup showPopup={showVirtualTour} closePopup={hideForms} />
      <div className="supportBar">
        {userAuthorized ? (
          <>
            {isOnDashboardPage && (
            <div tabIndex="0" role="button" onKeyDown={() => setShowVirtualTour(!showVirtualTour)} onClick={() => setShowVirtualTour(!showVirtualTour)} className="supportBox">
              <img src={VirtualTour} className="icon invertColor" alt="Virtual Tour" />
            </div>
            )}
            <div tabIndex="0" role="button" onKeyDown={() => setShowSupport(!showSupport)} onClick={() => setShowSupport(!showSupport)} className="supportBox">
              <img src={EmailIcon} className="icon" alt="Call" />
            </div>
            <div tabIndex="0" role="button" onKeyDown={() => setShowCall(!showCall)} onClick={() => setShowCall(!showCall)} className="supportBox">
              <img src={CallIcon} className="icon" alt="Call" />
            </div>
          </>
        ) : (
          <div tabIndex="0" role="button" onKeyDown={() => setShowSupport(!showSupport)} onClick={() => setShowSupport(!showSupport)} className="supportBox">
            <img src={EmailIcon} className="icon" alt="Email" />
          </div>
        )}
        <div tabIndex="0" role="button" onKeyDown={() => handleOpenChat()} onClick={() => handleOpenChat()} className="supportBox">
          <img src={ChatIcon} className="icon" alt="Chat" />
        </div>
        <div tabIndex="0" role="button" onKeyDown={() => openFAQ()} onClick={() => openFAQ()} className="supportBox">
          <img src={FaqIcon} className="icon" alt="FAQ" />
        </div>
      </div>
    </>
  );
}
