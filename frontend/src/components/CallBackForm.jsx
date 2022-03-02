import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import timeList from '../utils/timeList';
import callBackLanguages from '../utils/callBackLanguages';
// import daysList from '../utils/daysList';
import { validationHelper } from '../helpers';
import CancelIcon from '../media/images/icons/cancel.svg';
import '../styles/CallBackForm.scss';
import { userController } from '../controllers';
import Button from './Button';

export default function CallBackForm({ showPopup, closeForm, entity }) {
  const { enqueueSnackbar } = useSnackbar();
  const { i18n, t } = useTranslation();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [callBackData, setCallBackData] = useState({
    firstName: '',
    lastName: '',
    phoneNum: '',
    countryCode: '',
    phoneCountryCode: '',
    timeFrom: '00:00',
    timeTo: '00:00',
    // contactDays: [],
    language: i18n.language,
    entity,
  });
  // const [availableDays, setAvailableDays] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCallBackData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleDayChange = async (checkbox) => {
  //   if (checkbox.target.checked) {
  //     await setAvailableDays((oldDays) => [...oldDays, checkbox.target.id]);
  //   } else {
  //     const dayIndex = availableDays.indexOf(checkbox.target.id);
  //     if (dayIndex !== -1) {
  //       if (availableDays.length > 1) {
  //         const newDays = availableDays;
  //         newDays.splice(dayIndex, 1);
  //         await setAvailableDays(newDays);
  //       } else {
  //         await setAvailableDays([]);
  //       }
  //     }
  //   }
  // };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitLoading(true);
    // if (!availableDays.length) {
    //   enqueueSnackbar('Please select which days you will be available', {
    //     variant: 'error',
    //   });
    //   return;
    // }
    try {
      await validationHelper.validatePhone(callBackData.phoneNum);
      await validationHelper.validateTime(callBackData.timeFrom, callBackData.timeTo);
      const user = await JSON.parse(localStorage.getItem('user'));
      await userController.request({ uuid: user.uuid, callBackData, requestType: 'CALLBACK' });
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
      setSubmitLoading(false);
      return;
    }

    setSubmitLoading(false);
    enqueueSnackbar('Your message has been sent', {
      variant: 'success',
    });
    setCallBackData({
      firstName: '',
      lastName: '',
      phoneNum: '',
      countryCode: '',
      phoneCountryCode: '',
      timeFrom: '',
      timeTo: '',
      language: i18n.language,
      entity,
    });
    closeForm();
  };

  return (
    <div className={showPopup ? 'callback' : 'callback hide-callback'}>
      <div className="callback-inner container">
        <div
          role="button"
          onClick={closeForm}
          tabIndex="0"
          onKeyDown={closeForm}
        >
          <img
            src={CancelIcon}
            className="close-icon"
            alt="Close the form"
          />
        </div>
        <h2 className="title">{t('callBackForm.title')}</h2>
        <form className="callback-form" onSubmit={onSubmit}>
          <div className="split-field">
            <div className="field-group">
              <input
                type="text"
                placeholder=" "
                name="firstName"
                id="firstName"
                value={callBackData.firstName}
                onChange={handleChange}
                required
                className="firstName field"
              />
              <label htmlFor="firstName" className="input-label">{t('supportForm.firstName')}</label>
            </div>

            <div className="field-group">
              <input
                type="text"
                placeholder=" "
                name="lastName"
                id="lastName"
                value={callBackData.lastName}
                onChange={handleChange}
                required
                className="lastName field"
              />
              <label htmlFor="lastName" className="input-label">{t('supportForm.lastName')}</label>
            </div>
          </div>

          <div className="field-group phone-group">
            <PhoneInput
              defaultCountry={callBackData.phoneCountryCode}
              placeholder="Phone Number"
              name="phoneNum"
              value={callBackData.phoneNum}
              international
              limitMaxLength
              id="phoneNum"
              required
              onChange={(phoneNum) => {
                setCallBackData((prevState) => ({
                  ...prevState,
                  phoneNum,
                }));
              }}
            />
          </div>

          <div className="field-group">
            <label htmlFor="language" className="field-label">
              Preferred Language*
            </label>
            <select
              className="selector field-group"
              id="language"
              value={callBackData.language}
              onChange={(l) => {
                setCallBackData((prevState) => ({
                  ...prevState,
                  language: l.target.value,
                }));
              }}
            >
              {callBackLanguages.map((language) => (
                <option key={language.code} value={language.code}>{language.name}</option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="from" className="field-label">
              Available hours*
            </label>
            <div className="split-field">
              <select
                className="selector field-group"
                id="from"
                value={callBackData.timeFrom}
                onChange={(time) => {
                  setCallBackData((prevState) => ({
                    ...prevState,
                    timeFrom: time.target.value,
                  }));
                }}
              >
                {timeList.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              <select
                className="selector field-group"
                id="to"
                value={callBackData.timeTo}
                onChange={(time) => {
                  setCallBackData((prevState) => ({
                    ...prevState,
                    timeTo: time.target.value,
                  }));
                }}
              >
                {timeList.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          {/* <div className="field-group">
            <label htmlFor="from" className="field-label">
              Available days*
            </label>
            <div className="days-container">
              {daysList.map((day) => (
                <div className="day-box">
                  <input
                    type="checkbox"
                    id={day}
                    name={day}
                    onChange={(c) => handleDayChange(c)}
                  />
                  <label className="day-label" htmlFor={day}>{day}</label>
                </div>
              ))}
            </div>
          </div> */}

          <Button secondaryColor loading={submitLoading} formButton text={t('submit')} />
        </form>
      </div>
    </div>
  );
}
