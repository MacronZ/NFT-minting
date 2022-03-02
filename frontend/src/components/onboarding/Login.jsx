import React, { useEffect, useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import '../../styles/Onboarding/Login.scss';
import { IconButton, Input, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { userController } from '../../controllers';
import { routerHelper } from '../../helpers';
import Button from '../Button';

function Login({ entity, setUserAuthorized }) {
  const { t } = useTranslation();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      await userController.login(email, password, entity, setUserAuthorized);
    } catch (error) {
      setSubmitLoading(false);
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
      return;
    }

    setSubmitLoading(false);
    history.push('/verify-email');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(async () => {
    window.scrollTo(0, 0);
    const reroute = await routerHelper.reroute();
    if (reroute !== null) {
      history.push(reroute);
    }
  }, []);

  return (
    <div className="login">
      <div className="login-inner container">
        <h2 className="title">{t('login.signin')}</h2>
        {entity === 'cysec' ? null
          : (
            <p>
              {t('login.haveAccount')}
              <br />
              <Link to="/register" className="sign-up-link">
                {t('login.signup')}
              </Link>
            </p>
          )}
        <form className="login-form" onSubmit={onSubmit}>
          <div className="field-group">
            <input
              id="email"
              placeholder=" "
              type="email"
              name="email"
              value={email}
              onChange={(val) => setEmail(val.target.value)}
              required
              className="email field test12"
            />
            <label htmlFor="email" className="input-label">
              {t('login.email')}
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
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
                            )}
            />
            <label htmlFor="password" className="input-label">
              {t('login.password')}
            </label>
          </div>
          <Link to="/password-reset" className="password-reset-link">
            {t('login.forgotPassword')}
          </Link>
          <Button secondaryColor loading={submitLoading} formButton text={t('login.signin')} />
        </form>
      </div>
    </div>
  );
}

export default withRouter(Login);
