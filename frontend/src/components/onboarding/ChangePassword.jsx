import React, { useState } from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { IconButton, Input, InputAdornment } from '@material-ui/core';
import { useHistory, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import CancelIcon from '../../media/images/icons/cancel.svg';
import '../../styles/Onboarding/ChangePassword.scss';
import { userController } from '../../controllers';
import Button from '../Button';

function ChangePassword() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const closeChangePassword = () => {
    history.push('/login');
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitLoading(true);
    try {
      await userController.changePassword(password, oldPassword);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
      setSubmitLoading(false);
      return;
    }
    setSubmitLoading(false);
    enqueueSnackbar('Your password has been updated', {
      variant: 'success',
    });
    history.push('/login');
  };

  return (
    <div className="change-password">
      <div className="change-password-inner container">
        <div
          role="button"
          onClick={closeChangePassword}
          tabIndex="0"
          onKeyDown={closeChangePassword}
        >
          <img
            src={CancelIcon}
            className="close-icon"
            alt="Close the form"
          />
        </div>
        <h2 className="title">{t('changePassword.changePassword')}</h2>
        <form className="change-password-form" onSubmit={onSubmit}>
          <div className="field-group">
            <Input
              type={showOldPassword ? 'text' : 'password'}
              placeholder=" "
              name="oldPassword"
              id="oldPassword"
              value={oldPassword}
              onChange={(val) => setOldPassword(val.target.value)}
              required
              className="password field"
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowOldPassword}>
                    {showOldPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
                            )}
            />
            <label htmlFor="oldPassword" className="input-label">
              {t('changePassword.oldPassword')}
            </label>
          </div>

          <div className="field-group">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder=" "
              name="password"
              id="password"
              value={password}
              onChange={(val) => setPassword(val.target.value)}
              required
              className="password field"
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
                            )}
            />
            <label htmlFor="password" className="input-label">
              {t('changePassword.newPassword')}
            </label>
          </div>
          <Button secondaryColor loading={submitLoading} formButton text={t('submit')} />
        </form>
      </div>
    </div>
  );
}

export default withRouter(ChangePassword);
