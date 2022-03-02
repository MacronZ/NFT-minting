import React from 'react';
import { useTranslation } from 'react-i18next';
import { DisableIcon } from '../../media/images/icons';

const WarningModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const warningImage = () => (
    <img
      src={DisableIcon}
      className="icon"
      height="100"
      width="100"
      alt="warning"
    />
  );

  const modalContent = (
    <>
      {warningImage()}
      <h2 className="title">{t('PopUpModal.illegal.illegalTitle')}</h2>
      <p className="subtitle">{t('PopUpModal.illegal.illegalSubtitle')}</p>
    </>
  );

  return (
    <div className={open ? 'support' : 'support hide-support'}>
      <div className="support-inner container">
        {modalContent}
        <div className="support-form">
          <button type="submit" className="submit" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
