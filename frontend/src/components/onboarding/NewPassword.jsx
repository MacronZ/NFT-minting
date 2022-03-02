import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { withRouter, useHistory } from 'react-router-dom';
import '../../styles/Onboarding/Login.scss';
import { Input, IconButton, InputAdornment } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { VisibilityOff, Visibility } from '@material-ui/icons';
import { userController } from '../../controllers';
import Button from '../Button';

function NewPassword(props) {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const history = useHistory();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(async () => {
    window.scrollTo(0, 0);
    const { location: { state: { token = null } = {} } = {} } = props;

    if (token == null) {
      history.push('/login');
    }
  }, []);

  const inputShowPassword = () => (
    <InputAdornment position="end">
      <IconButton onClick={handleClickShowPassword}>
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  const onSubmit = async (event) => {
    event.preventDefault();
    const { location: { state: { token = null } = {} } = {} } = props;
    setSubmitLoading(true);
    try {
      await userController.newPassword(token, password, cPassword);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
      setSubmitLoading(false);
      return;
    }

    setSubmitLoading(false);
    enqueueSnackbar('Your password has been reset.', {
      variant: 'success',
    });
    history.push('/login');
  };

  return (
    <div className="login">
      <div className="login-inner container">
        <h2 className="title">{t('changePassword.changePassword')}</h2>
        <form className="login-form" onSubmit={onSubmit}>
          <div className="field-group">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder=" "
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="password field"
              endAdornment={inputShowPassword()}
            />
            <label htmlFor="password" className="input-label">
              {t('changePassword.newPassword')}
            </label>
          </div>

          <div className="field-group">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder=" "
              name="cPassword"
              id="cPassword"
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
              required
              className="password field"
              endAdornment={inputShowPassword()}
            />
            <label htmlFor="cPassword" className="input-label">
              {t('newPassword.confirmPassword')}
            </label>
          </div>
          <Button secondaryColor loading={submitLoading} formButton text={t('submit')} />
        </form>
      </div>
    </div>
  );
}

export default withRouter(NewPassword);
