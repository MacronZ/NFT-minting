import React from 'react';
import '../../../../../styles/Dashboard/SocialMedia.scss';
import { useTranslation } from 'react-i18next';
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaSkype,
  FaTelegramPlane,
  FaWhatsapp,
} from 'react-icons/fa';
import Button from '../../../../Button';

export default function SocialMediaComponent({
  preferences,
  setPreferences,
  uploadSocials,
  extraData,
  setExtraData,
  saveLoading,
}) {
  const { t } = useTranslation();

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prevState) => ({
      ...prevState,
      contactMethod: name,
      [name]: value,
    }));
  };

  const setSelectedCommunication = (value) => {
    setPreferences((prevState) => ({
      ...prevState,
      contactMethod: value,
    }));
  };

  const handlePhoneChange = (newPhone) => {
    setExtraData((prevState) => ({
      ...prevState,
      phoneNum: newPhone,
    }));
  };

  return (
    <div className="socials-container-component">
      <div className="comm-options-form">
        <div className="social-field-wrapper">
          <div className="social-input-box">
            <input
              type="radio"
              id="facebook"
              name="facebook"
              value="facebook"
              checked={preferences.contactMethod === 'facebook'}
              onChange={(e) => setSelectedCommunication(e.target.value)}
              className="radio-button"
            />
            <div className="field-group">
              <input
                type="text"
                placeholder=" "
                id="facebook"
                name="facebook"
                value={preferences.facebook}
                onChange={handleSocialChange}
                className="field textForms"
              />
              <label htmlFor="facebook" className="input-label">
                <FaFacebookF className="social-icon" />
                Facebook
              </label>
            </div>
          </div>
          <div className="social-input-box">
            <input
              type="radio"
              id="linkedIn"
              name="linkedIn"
              value="linkedin"
              checked={preferences.contactMethod === 'linkedin'}
              onChange={(e) => setSelectedCommunication(e.target.value)}
              className="radio-button"
            />
            <div className="field-group">
              <input
                type="text"
                placeholder=" "
                name="linkedin"
                id="linkedin"
                value={preferences.linkedin}
                onChange={handleSocialChange}
                className="field"
              />
              <label htmlFor="linkedin" className="input-label">
                <FaLinkedinIn className="social-icon" />
                LinkedIn
              </label>
            </div>
          </div>
          <div className="social-input-box">
            <input
              type="radio"
              id="instagram"
              name="instagram"
              value="instagram"
              checked={preferences.contactMethod === 'instagram'}
              onChange={(e) => setSelectedCommunication(e.target.value)}
              className="radio-button"
            />
            <div className="field-group">
              <input
                type="text"
                placeholder=" "
                name="instagram"
                id="instagram"
                value={preferences.instagram}
                onChange={handleSocialChange}
                className="field"
              />
              <label htmlFor="instagram" className="input-label">
                <FaInstagram className="social-icon" />
                Instagram
              </label>
            </div>
          </div>
          <div className="social-input-box">
            <input
              type="radio"
              id="skype"
              name="skype"
              value="skype"
              checked={preferences.contactMethod === 'skype'}
              onChange={(e) => setSelectedCommunication(e.target.value)}
              className="radio-button"
            />
            <div className="field-group">
              <input
                type="text"
                placeholder=" "
                name="skype"
                id="skype"
                value={preferences.skype}
                onChange={handleSocialChange}
                className="field"
              />
              <label htmlFor="skype" className="input-label">
                <FaSkype className="social-icon" />
                Skype
              </label>
            </div>
          </div>
          <div className="social-input-box">
            <input
              type="radio"
              id="email"
              name="email"
              value="email"
              checked={preferences.contactMethod === 'email'}
              onChange={(e) => setSelectedCommunication(e.target.value)}
              className="radio-button"
            />
            <div className="field-group">
              <input
                type="text"
                placeholder=" "
                name="email"
                id="email"
                value={extraData.email}
                className="field disabled-text"
                disabled
              />
              <label htmlFor="skype" className="input-label">

                <FaEnvelope className="social-icon" />
                E-mail
              </label>
            </div>
          </div>
          <div className="social-input-box">
            <input
              type="radio"
              id="phone"
              name="phone"
              value="phone"
              checked={preferences.contactMethod === 'phone'}
              onChange={(e) => setSelectedCommunication(e.target.value)}
              className="radio-button"
            />
            <div className="field-group">
              <input
                type="text"
                placeholder=" "
                name="phone"
                id="phone"
                value={extraData.phoneNum}
                className="field"
                onChange={(v) => handlePhoneChange(v.target.value)}
              />
              <label htmlFor="skype" className="input-label">
                <FaPhone className="social-icon" />
                Phone Number
              </label>
            </div>
          </div>
          <div className="social-input-box">
            <input
              type="radio"
              id="telegram"
              name="telegram"
              value="telegram"
              checked={preferences.contactMethod === 'telegram'}
              onChange={(e) => setSelectedCommunication(e.target.value)}
              className="radio-button"
            />
            <div className="field-group">
              <input
                type="text"
                placeholder=" "
                name="telegram"
                id="telegram"
                value={extraData.phoneNum}
                className="field disabled-text"
                disabled
              />
              <label htmlFor="skype" className="input-label">
                <FaTelegramPlane className="social-icon" />
                Telegram
              </label>
            </div>
          </div>
          <div className="social-input-box">
            <input
              type="radio"
              id="whatsapp"
              name="whatsapp"
              value="whatsapp"
              checked={preferences.contactMethod === 'whatsapp'}
              onChange={(e) => setSelectedCommunication(e.target.value)}
              className="radio-button"
            />
            <div className="field-group">
              <input
                type="text"
                placeholder=" "
                name="whatsapp"
                id="whatsapp"
                value={extraData.phoneNum}
                className="field disabled-text"
                disabled
              />
              <label htmlFor="skype" className="input-label">
                <FaWhatsapp className="social-icon" />
                WhatsApp
              </label>
            </div>
          </div>
        </div>
        <Button secondaryColor loading={saveLoading} text={t('save')} action={uploadSocials} />
      </div>
    </div>
  );
}
