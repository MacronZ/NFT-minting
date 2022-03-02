import React from 'react';
import CancelIcon from '../media/images/icons/cancel.svg';
import '../styles/components/Popup.scss';

export default function Popup({ showPopup, closePopup, children }) {
  return (
    <div className={showPopup ? 'popup' : 'popup hide-popup'}>
      <div className="popup-inner container">
        <div
          role="button"
          onClick={closePopup}
          tabIndex="0"
          onKeyDown={closePopup}
        >
          <img
            src={CancelIcon}
            className="close-icon"
            alt="Close the form"
          />
        </div>
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
}
