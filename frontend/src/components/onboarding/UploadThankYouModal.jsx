import React from 'react';
import { useTranslation } from 'react-i18next';
import { ThankYouIcon } from '../../media/images/icons';

const UploadThankYouModal = ({ showPopup, onClose }) => {
  const { t } = useTranslation();
  const thankYouImage = () => (
    <img
      src={ThankYouIcon}
      className="icon"
      height="100"
      width="100"
      alt="thankyou"
      style={{ marginRight: 30 }}
    />
  );
  return (
    <div className={showPopup ? 'support' : 'support hide-support'}>
      <div className="support-inner container">
        {thankYouImage()}
        <h1>{t('PopUpModal.thankYouPageUpload.thankYouTitleUpload')}</h1>
        <p style={{ paddingLeft: 50, paddingRight: 50 }}>
          {t('PopUpModal.thankYouPageUpload.thankYouSubtitleUpload')}
        </p>
        <div className="support-form">
          <button
            type="submit"
            className="submit"
            onClick={() => {
              onClose();
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadThankYouModal;
