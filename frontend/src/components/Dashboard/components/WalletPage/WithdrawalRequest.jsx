import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import '../../../../styles/Dashboard/WalletPage.scss';
import { useSnackbar } from 'notistack';
import Button from '../../../Button';
import WithdrawMethodSelector from './WithdrawMethodsSelector';
import InfoBox from './InfoBox';
import ThankYouDialog from './WithdrawSubmissionModal';
import UploadBankDetailsModal from './UploadBankDetailsModal';
import OtherMethodDetailsModal from './OtherMethodDetailsModal';
import { SKRILL, BANK_TRANSFER, NETELLER } from '../../../../constants';
import { userController, documentController } from '../../../../controllers';
import { validationHelper } from '../../../../helpers';
import skrillIcon from '../../../../media/images/icons/skrill.svg';
import netellerIcon from '../../../../media/images/icons/neteller.svg';

const WithdrawalRequest = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [externalId, setExternalId] = useState('');
  const [walletBalance, setWalletBalance] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [skrillDetailsEntered, setSkrillDetailsEntered] = useState(false);
  const [netellerDetailsEntered, setNetellerDetailsEntered] = useState(false);
  const [approvedBankDoc, setApprovedBankDoc] = useState(false);
  const [openThankYouDialog, setOpenThankYouDialog] = useState(false);
  const [missedFields, setMissedFields] = useState({
    amount: false,
    method: false,
  });
  const [formData, setFormData] = useState({
    amount: 0,
    paymentMethod: '',
  });

  const blockInvalidChar = (e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

  const paymentCurrency = 'USD';

  useEffect(async () => {
    const affiliateData = await JSON.parse(localStorage.getItem('affiliateData'));
    setExternalId(affiliateData.external_id);
    setWalletBalance(affiliateData.balance);

    const localUser = await JSON.parse(localStorage.getItem('user'));
    setSkrillDetailsEntered(!!localUser.skrillData);
    setNetellerDetailsEntered(!!localUser.netellerData);

    let userDocs;
    try {
      userDocs = await documentController.getDocuments(localUser.uuid);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
      return;
    }

    if (userDocs.length) {
      const approvedBankDocs = userDocs.filter((x) => x.documentGroup === 'ADDITIONAL_DOCUMENTS' && x.documentType === 'BANK_DETAILS' && x.documentStatus === 'Approved');
      setApprovedBankDoc(!!approvedBankDocs.length);
    }
  }, []);

  const setFieldValue = (key, value) => {
    formData[key] = value;
    setFormData({ ...formData });
  };

  const onWithdrawButton = async (e) => {
    e.preventDefault();
    // reset current validation checks
    setMissedFields({
      amount: false,
      method: false,
    });

    const {
      amount,
      paymentMethod,
    } = formData;

    if (walletBalance === 'N/A' || validationHelper.isAmountZero(walletBalance) || validationHelper.isAmountGreaterThan(amount, Number(walletBalance))) {
      enqueueSnackbar(t('dashboard.wallet.notEnoughFunds'), {
        variant: 'error',
      });
    } else if (!paymentMethod) {
      setMissedFields((prevState) => ({
        ...prevState,
        method: true,
      }));
      enqueueSnackbar(t('dashboard.wallet.missedMethodSelection'), {
        variant: 'error',
      });
    } else if (paymentMethod === BANK_TRANSFER && !approvedBankDoc) {
      enqueueSnackbar(t('dashboard.wallet.notApprovedBankDoc'), {
        variant: 'error',
      });
    } else if (paymentMethod === SKRILL && !skrillDetailsEntered) {
      enqueueSnackbar(t('dashboard.wallet.noSkrillDetailsEntered'), {
        variant: 'error',
      });
    } else if (paymentMethod === NETELLER && !netellerDetailsEntered) {
      enqueueSnackbar(t('dashboard.wallet.noNetellerDetailsEntered'), {
        variant: 'error',
      });
    } else if (!amount || amount < 100) {
      setMissedFields((prevState) => ({
        ...prevState,
        amount: true,
      }));
      enqueueSnackbar(t('dashboard.wallet.withdrawMinAmount'), {
        variant: 'error',
      });
    } else {
      try {
        setIsLoading(true);
        const user = await JSON.parse(localStorage.getItem('user'));
        const withdrawalData = {
          uuid: user.uuid,
          lavaTeckId: user.lavaTeckId,
          paymentMethod: formData.paymentMethod,
          amount: Number(formData.amount),
          pspReference: null,
          entity: user.entity,
        };
        await userController.requestWithdraw(withdrawalData);
        setOpenThankYouDialog(true);
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: 'error',
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="wallet-funds-container">
      <div className="personal-info-form">
        <div className="head-line">
          <Link to="/dashboard/wallet"><ArrowBackIcon /></Link>
          <div className="title">{t('dashboard.wallet.withdrawTitle')}</div>
        </div>
        <div className="withdraw-content">
          <p className="withdrawSubtitle">{t('dashboard.wallet.withdrawSubtitle')}</p>
          <form className="withdraw-form" onSubmit={onWithdrawButton}>
            <div className="field-group">
              <input
                id="acc"
                type="text"
                name="acc"
                value={externalId}
                className="field"
                readOnly
              />
              <label htmlFor="acc" className="input-label">
                {t('dashboard.wallet.account')}
              </label>
            </div>
            <WithdrawMethodSelector
              selectedMethod={formData.paymentMethod}
              setSelectedMethod={setFieldValue}
              missedField={missedFields.method}
            />
            <div className="split-field">
              <div className="field-group">
                <input
                  id="amount"
                  type="number"
                  name="amount"
                  onChange={(e) => setFieldValue('amount', e.target.value)}
                  onKeyDown={blockInvalidChar}
                  value={formData.amount}
                  className={missedFields.amount ? 'field-required' : 'field'}
                />
                <label htmlFor="firstName" className="input-label">
                  {t('dashboard.wallet.amount')}
                  *
                </label>
              </div>
              <div className="field-group">
                <input
                  id="currency"
                  type="text"
                  name="currency"
                  className="field"
                  readOnly
                  value={paymentCurrency}
                />
                <label htmlFor="currency" className="input-label">
                  {t('dashboard.wallet.currency')}
                </label>
              </div>
            </div>
            <div className="button-container">
              <Button secondaryColor loading={isLoading} formButton text={t('dashboard.wallet.withdraw')} />
            </div>
          </form>
        </div>
      </div>
      <div className="vertical-divider" />
      <div>
        <OtherMethodDetailsModal setDetailsEntered={setSkrillDetailsEntered} method="skrill" methodIcon={skrillIcon} saveDetailsFn={userController.saveSkrillDetails} />
        <OtherMethodDetailsModal setDetailsEntered={setNetellerDetailsEntered} method="neteller" methodIcon={netellerIcon} saveDetailsFn={userController.saveNetellerDetails} />
        <UploadBankDetailsModal />
        <InfoBox />
      </div>
      <ThankYouDialog open={openThankYouDialog} onClose={() => setOpenThankYouDialog(!openThankYouDialog)} />
    </div>
  );
};

export default WithdrawalRequest;
