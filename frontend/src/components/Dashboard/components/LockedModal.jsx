import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import '../../../styles/Dashboard/LockedModal.scss';
import Button from '../../Button';
import { LockIcon } from '../../../media/images/icons';

export default function LockedModal({ background }) {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div className="lockedModal" style={{ backgroundImage: `url(${background})` }}>
      <div className="lockedPop">
        <div className="innerLockedPop">
          <h1 className="title">{t('preActivation.modal.title')}</h1>
          <img src={LockIcon} alt="Lock" className="icon" />
          <p className="text">{t('preActivation.modal.text')}</p>
          <Button
            secondaryColor
            text={t('completeRegistration')}
            action={() => {
              document.body.classList.remove('dark-mode'); history.push('/documents');
            }}
          />
        </div>
      </div>
    </div>
  );
}
