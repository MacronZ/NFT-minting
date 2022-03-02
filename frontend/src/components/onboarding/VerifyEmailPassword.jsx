/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import 'react-phone-number-input/style.css';
import { withRouter, useHistory } from 'react-router-dom';
import ReactCodeInput from 'react-code-input';
import { userController } from '../../controllers';
import '../../styles/Onboarding/VerifyEmail.scss';
import Button from '../Button';

function VerifyEmailPassword(props) {
  const [pinCode, setPinCode] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  useEffect(() => {
    if (!props.location.state.email) history.push('/');
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitLoading(true);
    let token;
    try {
      token = await userController.confirmEmailPassword(props.location.state.email, pinCode);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
      setSubmitLoading(false);
      return;
    }

    setSubmitLoading(false);
    history.push({
      pathname: '/new-password',
      state: { token },
    });
  };

  const resendCode = async () => {
    try {
      await userController.resetPasswordCode(props.location.state.email);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
      return;
    }

    enqueueSnackbar('Verification code has been sent', {
      variant: 'success',
    });
  };

  return (
    <div className="verify-email">
      <div className="verify-email-inner container">
        <h2 className="title">{t('verifyPassword.resetPassword')}</h2>
        <p className="subtitle">{t('verifyEmail.digitCode')}</p>
        <form className="verify-email-form" onSubmit={onSubmit}>
          <ReactCodeInput
            type="text"
            value={pinCode}
            fields={6}
            name="pinCode"
            onChange={(code) => setPinCode(code)}
          />
          <button type="button" className="resend" onClick={resendCode}>
            {t('verifyEmail.resendCode')}
          </button>
          <Button secondaryColor loading={submitLoading} formButton text={t('verifyEmail.verifyButton')} />
        </form>
      </div>
    </div>
  );
}

export default withRouter(VerifyEmailPassword);
