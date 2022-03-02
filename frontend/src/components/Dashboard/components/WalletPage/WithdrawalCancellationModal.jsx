import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../../../styles/Dashboard/WalletPage.scss';
import CancelIcon from '../../../../media/images/icons/cancel.svg';
import Button from '../../../Button';

const CancelWithdrawalDialog = ({
  open, onClose, withdrawalData, handleDelete, isLoading,
}) => {
  const { t } = useTranslation();

  if (open) {
    return (
      <div className="dialog">
        <div className="dialog-content">
          <div
            role="button"
            tabIndex="0"
            onClick={onClose}
            onKeyDown={onClose}
          >
            <img
              src={CancelIcon}
              className="close-icon"
              alt="Close the form"
            />
          </div>
          <p className="question">
            {t('dashboard.wallet.cancelWithdrawal')}
          </p>
          <div className="dialog-details">
            <span className="label">
              Account:
            </span>
            <span className="details">
              {withdrawalData.account}
            </span>
            <span className="label">
              Amount:
            </span>
            <span className="details">
              {withdrawalData.amount}
            </span>
          </div>
          <Button secondaryColor loading={isLoading} text={t('yes')} action={() => handleDelete(withdrawalData.paymentId)} />
        </div>
      </div>
    );
  }

  return <></>;
};

export default CancelWithdrawalDialog;
