import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThankYouIcon } from '../../media/images/icons';

const ThankYouModal = ({ open, onClose }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const thankYouImage = () => (
    <img
      src={ThankYouIcon}
      className="icon"
      height="100"
      width="100"
      alt="thankyou"
    />
  );
  return (
    <div className={open ? 'support' : 'support hide-support'}>
      <div className="support-inner container">
        {thankYouImage()}
        <h1>{t('PopUpModal.thankYouPageQuestionnaire.thankYouTitle')}</h1>
        <p style={{ textAlign: 'center', margin: '10px' }}>{t('PopUpModal.thankYouPageQuestionnaire.thankYouSubtitle')}</p>
        <div className="support-form">
          <button
            type="submit"
            className="submit"
            onClick={() => {
              onClose();
              history.push('/documents');
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouModal;
