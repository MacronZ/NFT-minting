import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import '../styles/SupportForm.scss';
import 'react-phone-number-input/style.css';
import { userController } from '../controllers';
import Button from './Button';
import Popup from './Popup';
import InputField from './InputField';

export default function SupportForm({
  userAuthorized, showPopup, closeForm, entity,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const { i18n, t } = useTranslation();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [supportData, setSupportData] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupportData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitLoading(true);

    try {
      if (userAuthorized) {
        const user = await JSON.parse(localStorage.getItem('user'));
        await userController.request({ uuid: user.uuid, supportData, requestType: 'IB_SUPPORT' });
      } else {
        await userController.request({ emailData: { ...supportData, language: i18n.language, entity }, requestType: 'EMAIL_SUPPORT' });
      }
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
    await setSupportData({
      firstname: '', lastName: '', email: '', message: '',
    });
    closeForm();
  };

  return (
    <div className="support-form-box">
      <Popup showPopup={showPopup} closePopup={closeForm}>
        <h2 className="title">{t('supportForm.title')}</h2>
        <p className="subtitle">{t('supportForm.subTitle')}</p>
        <form className="support-form" onSubmit={onSubmit}>
          {!userAuthorized && (
            <>
              <div className="split-field">
                <InputField name="firstName" type="text" required label={t('supportForm.firstName')} value={supportData?.firstName} handleChange={handleChange} />
                <InputField name="lastName" type="text" required label={t('supportForm.lastName')} value={supportData?.lastName} handleChange={handleChange} />
              </div>
              <InputField name="email" type="email" required label={t('supportForm.email')} value={supportData?.email} handleChange={handleChange} />
            </>
          )}
          <InputField name="message" textarea rows={4} required label={t('supportForm.message')} value={supportData?.message} handleChange={handleChange} />
          <Button secondaryColor loading={submitLoading} formButton text={t('submit')} />
        </form>
      </Popup>
    </div>
  );
}
