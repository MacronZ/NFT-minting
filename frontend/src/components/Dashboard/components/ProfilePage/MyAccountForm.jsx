import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  TextField,
  IconButton,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { userController } from '../../../../controllers';
import Button from '../../../Button';
import '../../../../styles/Dashboard/ProfileLabel.scss';

const MyAccountForm = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setOldPassword('');
    setPassword('');
    setPasswordConfirm('');
    try {
      if (password !== passwordConfirm) {
        enqueueSnackbar('The new password and confirmation password do not match', { variant: 'error' });
        return;
      }
      await userController.changePassword(password, oldPassword);
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(error.message, { variant: 'error' });
      return;
    }

    setLoading(false);
    enqueueSnackbar('Your password has been changed!', {
      variant: 'success',
    });
  };

  return (
    <div className="my-account-form">
      <div className="head-line">
        <Link to="/dashboard/profile"><ArrowBackIcon /></Link>
        <div className="title">{t('dashboard.settings.password.title')}</div>
      </div>
      <div className="profile-section-content">
        <form noValidate autoComplete="off" className="form" onSubmit={onSubmit}>
          <TextField
            type={showOldPassword ? 'text' : 'password'}
            id="currentPassword"
            name="currentPassword"
            label="Current Password"
            required
            value={oldPassword}
            variant="outlined"
            onChange={(val) => setOldPassword(val.target.value)}
            InputLabelProps={{ style: { fontSize: 14 } }}
            InputProps={{
              endAdornment:
  <IconButton onClick={handleClickShowOldPassword}>
    {showOldPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
  </IconButton>,
            }}
          />

          <TextField
            type={showPassword ? 'text' : 'password'}
            id="newPassword"
            label="New Password"
            required
            value={password}
            variant="outlined"
            onChange={(val) => setPassword(val.target.value)}
            InputLabelProps={{ style: { fontSize: 14 } }}
            InputProps={{
              endAdornment:
  <IconButton onClick={handleClickShowPassword}>
    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
  </IconButton>,
            }}
          />

          <TextField
            id="confirmPassword"
            label="Confirm New Password"
            type={showConfirmPassword ? 'text' : 'password'}
            required
            value={passwordConfirm}
            variant="outlined"
            onChange={(val) => setPasswordConfirm(val.target.value)}
            InputLabelProps={{ style: { fontSize: 14 } }}
            InputProps={{
              endAdornment:
  <IconButton onClick={handleClickShowConfirmPassword}>
    {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
  </IconButton>,
            }}
          />
          <Button secondaryColor loading={loading} formButton text={t('submit')} />
        </form>
      </div>
    </div>
  );
};

export default MyAccountForm;
