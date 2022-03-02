import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { countries } from 'country-data';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const PersonalInformationForm = () => {
  const [userData, setUserData] = useState({});
  const [parsedCountry, setParsedCountry] = useState('');
  const { t } = useTranslation();

  useEffect(async () => {
    const user = await JSON.parse(localStorage.getItem('user'));
    setParsedCountry(countries[user.countryCode].name);
    setUserData(user);
  }, []);

  function renderInfoElement(name, label, value) {
    return (
      <div className="info-container">
        <label htmlFor={name} className="label">{label}</label>
        <input
          type="text"
          name={name}
          id={name}
          value={value || 'N/A'}
          readOnly
          className="input"
        />
      </div>
    );
  }

  return (
    <div className="personal-info-form">
      <div className="head-line">
        <Link to="/dashboard/profile"><ArrowBackIcon /></Link>
        <div className="title">{t('dashboard.settings.personal.inner.title')}</div>
      </div>
      <div className="profile-section-content">
        <form noValidate autoComplete="off" className="form">
          {renderInfoElement('firstName', t('dashboard.settings.personal.inner.fName'), userData.firstName)}
          {renderInfoElement('lastName', t('dashboard.settings.personal.inner.lName'), userData.lastName)}
          {renderInfoElement('email', t('dashboard.settings.personal.inner.email'), userData.email)}
          {renderInfoElement('country', t('dashboard.settings.personal.inner.country'), parsedCountry)}
          {renderInfoElement('phone', t('dashboard.settings.personal.inner.phone'), userData.phoneNum)}
        </form>
      </div>
    </div>
  );
};

export default PersonalInformationForm;
