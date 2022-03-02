import React from 'react';
import { useHistory } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import '../../../../styles/Dashboard/WalletPage.scss';
import { ThumbsIcon } from '../../../../media/images/icons';

const ThankYouDialog = ({ open, onClose }) => {
  // const { t } = useTranslation();
  const history = useHistory();
  // TODO: move final texts in translation files

  if (open) {
    return (
      <div className="dialog">
        <div className="dialog-content">
          <img
            src={ThumbsIcon}
            className="icon"
            width={120}
            alt="thumbs"
          />
          <p style={{ fontSize: 18, fontWeight: 'bold' }}>Thank you !</p>
          <p style={{ fontSize: 14, marginBottom: '30px' }}>Your request has been submitted.</p>
          <button
            type="submit"
            className="ok-btn"
            onClick={() => {
              onClose();
              history.push('/dashboard/wallet');
            }}
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  return <></>;
};

export default ThankYouDialog;
