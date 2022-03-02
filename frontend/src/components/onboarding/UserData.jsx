import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import '../../styles/Onboarding/UserData.scss';
import { useTranslation } from 'react-i18next';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  Select, MenuItem, FormControlLabel, Checkbox,
} from '@material-ui/core';
import {
  FaSkype,
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaRegClock,
  FaRegAddressCard,
} from 'react-icons/fa';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import {
  RiArrowRightSLine,
  RiArrowLeftSLine,
  RiArrowDownSLine,
  RiInformationLine,
} from 'react-icons/ri';
import { isEmpty } from 'lodash-es';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import faceScan from '../../media/images/icons/face.png';
import signatureIcon from '../../media/images/icons/signature.png';
import geoTag from '../../media/images/icons/geo-tag.png';
import exampleId from '../../media/images/icons/example-id.png';
import { Identity, Address, Campaign } from '../kyc';
import RejectedButtonWithReasonPopover from '../RejectedButtonWithReasonPopover';
import UploadThankYouModal from './UploadThankYouModal';
import { userController, documentController } from '../../controllers';
import { getSideAsText } from '../../utils/util-functions';
import weekDays from '../../utils/weekDays';
import Button from '../Button';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
  // eslint-disable-next-line react/jsx-props-no-spreading
})((props) => <Checkbox color="default" {...props} />);

export default function UserData({ user }) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [socialData, setSocialData] = useState({
    facebook: '',
    linkedin: '',
    instagram: '',
    skype: '',
    contactMethod: '',
    availableDays: [],
    availableFrom: new Date(2021, 4, 20, 0, 0, 0),
    availableTo: new Date(2021, 4, 20, 0, 0, 0),
  });

  const [showIdentityForm, setShowIdentityForm] = useState(false);
  const [showContractForm, setShowContractForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showIdentityHelp, setShowIdentityHelp] = useState(false);
  const [userStage, setUserStage] = useState({
    identity: null,
    address: null,
    contract: null,
  });
  const [fileDataChanged, setFileDateChanged] = useState(0);
  const [uploadThankYouPopup, showUploadThankYouPopup] = useState(false);
  const [uploadedSomething, setUploadedSomething] = useState(false);

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setSocialData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDaySelection = (e) => {
    const { name, checked } = e.target;
    setSocialData((prevState) => ({
      ...prevState,
      availableDays: checked
        ? [...socialData.availableDays, name]
        : socialData.availableDays.filter((item) => item !== name),
    }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (uploadedSomething) {
      if (
        userStage.identity === 'Pending'
        && userStage.address === 'Pending'
        && userStage.contract === 'PENDING'
      ) {
        showUploadThankYouPopup(true);
        setUploadedSomething(false);
      }
    }
  }, [userStage, uploadedSomething]);

  const uploadSocials = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    const sortedSelectedDays = weekDays.filter((value) => socialData.availableDays.includes(value));
    socialData.availableDays = sortedSelectedDays;

    try {
      await userController.uploadSocials(socialData, user.phoneNum);
    } catch (error) {
      setSubmitLoading(false);
      return enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }

    setSubmitLoading(false);
    return enqueueSnackbar('Social data updated!', {
      variant: 'success',
    });
  };

  useEffect(() => {
    (async () => {
      let uploadDocuments;
      const localUser = await JSON.parse(localStorage.getItem('user'));
      const fetchedUser = await userController.getUser(localUser.uuid);
      setSocialData(localUser.socialData);

      try {
        uploadDocuments = await documentController.getDocuments(localUser.uuid);
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: 'error',
        });
        return;
      }

      const updatedValue = userStage;

      if (fetchedUser.campaignRequests) {
        const registrationCampaign = fetchedUser.campaignRequests.filter((campaign) => campaign.onRegistration)[0];
        if (registrationCampaign) updatedValue.contract = registrationCampaign.status;
      }

      if (uploadDocuments.length) {
        const proofOfId = uploadDocuments.filter(
          (x) => x.documentGroup === 'PROOF_OF_ID',
        );
        const proofOfAddress = uploadDocuments.filter(
          (x) => x.documentGroup === 'PROOF_OF_ADDRESS',
        );
        if (proofOfId.length) {
          const rejected = proofOfId.filter(
            (x) => x.documentStatus === 'Rejected',
          );
          const pending = proofOfId.filter(
            (x) => x.documentStatus === 'Pending',
          );
          if (rejected.length) {
            updatedValue.identity = rejected[0].documentStatus;
            const rejectReason = [
              `${getSideAsText(rejected[0].documentType)}: ${rejected[0].rejectionReason
              }`,
            ];
            if (rejected[1]) {
              rejectReason.push(
                `${getSideAsText(rejected[1].documentType)}: ${rejected[1].rejectionReason
                }`,
              );
            }
            updatedValue.identityRejection = rejectReason;
          } else if (pending.length) {
            updatedValue.identity = pending[0].documentStatus;
          } else {
            updatedValue.identity = proofOfId[0].documentStatus;
          }
        }
        if (proofOfAddress.length) {
          updatedValue.address = proofOfAddress[0].documentStatus;
          if (proofOfAddress[0].documentStatus === 'Rejected') {
            updatedValue.addressRejection = `${getSideAsText(
              proofOfAddress[0].documentType,
            )}: ${proofOfAddress[0].rejectionReason}`;
          }
        }
      }

      setUserStage({
        ...userStage,
        ...updatedValue,
      });
    })();
  }, [fileDataChanged]);

  return (
    <div className="user-data">
      <UploadThankYouModal
        showPopup={uploadThankYouPopup}
        onClose={() => showUploadThankYouPopup(false)}
      />
      <div className="user-data-inner container">
        {!user.questionnaireCompleted
          && (
            <button
              type="button"
              className="questionnaire-btn"
              name="questionnaire"
              onClick={() => {
                history.push('/questionnaire');
              }}
            >
              <RiArrowLeftSLine className="arrow-icon" />
              {t('documentUpload.questionnaire')}
            </button>
          )}
        <button
          type="button"
          className="dashboard-btn"
          name="questionnaire"
          onClick={() => {
            history.push('/dashboard');
          }}
        >
          {t('documentUpload.dashboard')}
          <RiArrowRightSLine className="arrow-icon" />
        </button>
        <div className="progress-box">
          <div className="progress-step">
            {userStage.contract === 'APPROVED' ? (
              <IoCheckmarkCircleSharp className="progress-icon" />
            ) : null}
            <p className="progress-digit">
              0
              <span style={{ letterSpacing: 5 }}>1</span>
            </p>
            <p className="progress-label">{t('documentUpload.contract')}</p>
          </div>
          <hr className="splitter" />
          <div className="progress-step">
            {userStage.identity === 'Approved' ? (
              <IoCheckmarkCircleSharp className="progress-icon" />
            ) : null}
            <p className="progress-digit">
              0
              <span style={{ letterSpacing: 5 }}>2</span>
            </p>
            <p className="progress-label">{t('documentUpload.identity')}</p>
          </div>
          <hr className="splitter" />
          <div className="progress-step">
            {userStage.address === 'Approved' ? (
              <IoCheckmarkCircleSharp className="progress-icon" />
            ) : null}
            <p className="progress-digit">03</p>
            <p className="progress-label">{t('documentUpload.address')}</p>
          </div>
        </div>
        <h2 className="title">
          {t('hello.label')}
          {' '}
          {user.firstName}
          !
        </h2>
        <p className="note">{t('documentUpload.subtitle')}</p>

        <div className="links-container">
          <div
            className={`link-box ${!user.questionnaireCompleted && 'inactive'} ${showContractForm ? 'opened-contract-link' : 'closed-link'
            }`}
          >
            <button
              type="button"
              disabled={
                userStage.contract === 'APPROVED'
                || userStage.contract === 'PENDING' || !user.questionnaireCompleted
              }
              className="onboarding-link"
              onClick={() => {
                setShowContractForm((prevCheck) => !prevCheck);
              }}
            >
              <div className="icon-title">
                <img
                  src={signatureIcon}
                  className="icon"
                  height="50"
                  width="46"
                  alt="Icon"
                  style={{ marginRight: 30 }}
                />
                <h2 className="link-title with-note">
                  {t('documentUpload.contract')}
                  {!user.questionnaireCompleted && <span className="questionnaire-note">{t('documentUpload.questionnaireBlock')}</span>}
                </h2>
              </div>
              {userStage.contract === 'APPROVED' ? (
                <p className="status-text status-approved">
                  {userStage.contract}
                </p>
              ) : userStage.contract === 'PENDING' ? (
                <p className="status-text status-pending">
                  {userStage.contract}
                </p>
              ) : userStage.contract === 'REJECTED' ? (
                <RejectedButtonWithReasonPopover
                  status={userStage.contract}
                />
              ) : showContractForm ? (
                <RiArrowDownSLine className="arrow-icon" />
              ) : (
                <RiArrowRightSLine className="arrow-icon" />
              )}
            </button>
            {userStage.contract === 'APPROVED' ? null : userStage.contract
              === 'PENDING' ? null : (
                <Campaign
                  onUploadSuccess={() => {
                    setShowContractForm(false);
                    setUploadedSomething(true);
                    setUserStage({
                      ...userStage,
                      contract: 'PENDING',
                    });
                  }}
                />
              )}
          </div>

          <div
            className={`link-box ${showIdentityForm ? 'opened-identity-link' : 'closed-link'
            }`}
          >
            <button
              type="button"
              disabled={
                userStage.identity === 'Approved'
                || userStage.identity === 'Pending'
              }
              className="onboarding-link"
              onClick={() => {
                setShowIdentityForm((prevCheck) => !prevCheck);
              }}
            >
              <div className="icon-title">
                <img
                  src={faceScan}
                  className="icon"
                  height="50"
                  width="55"
                  alt="Icon"
                  style={{ marginRight: 30 }}
                />
                <h2 className="link-title">
                  {t('documentUpload.identity')}
                  <RiInformationLine
                    className={
                      showIdentityForm
                        ? 'info-icon'
                        : 'info-icon hide-info-icon'
                    }
                    onMouseEnter={() => setShowIdentityHelp(true)}
                    onMouseLeave={() => setShowIdentityHelp(false)}
                  />
                </h2>
                <div
                  className={
                    showIdentityHelp ? 'help-box' : 'help-box hide-help-box'
                  }
                >
                  <p>
                    {t('documentUpload.validGovernment')}
                    <br />
                    {' '}
                    {t('documentUpload.residencePermit')}
                  </p>
                  <img
                    src={exampleId}
                    className="icon"
                    height="100"
                    alt="Example ID"
                  />
                </div>
              </div>
              {userStage.identity === 'Approved' ? (
                <p className="status-text status-approved">
                  {userStage.identity}
                </p>
              ) : userStage.identity === 'Pending' ? (
                <p className="status-text status-pending">
                  {userStage.identity}
                </p>
              ) : userStage.identity === 'Rejected' ? (
                <RejectedButtonWithReasonPopover
                  status={userStage.identity}
                  reason={userStage.identityRejection.map((x) => (
                    <p>
                      {x}
                    </p>
                  ))}
                />
              ) : showIdentityForm ? (
                <RiArrowDownSLine className="arrow-icon" />
              ) : (
                <RiArrowRightSLine className="arrow-icon" />
              )}
            </button>
            {userStage.identity === 'Approved' ? null : userStage.identity
              === 'Pending' ? null : (
                <Identity
                  onUploadSuccess={() => {
                    setFileDateChanged(Date.now());
                    setShowIdentityForm(false);
                    setUploadedSomething(true);
                  }}
                />
              )}
          </div>
          <div
            className={`link-box ${showAddressForm ? 'opened-address-link' : 'closed-link'
            }`}
          >
            <button
              type="button"
              className="onboarding-link"
              disabled={
                userStage.address === 'Approved'
                || userStage.address === 'Pending'
              }
              onClick={() => {
                setShowAddressForm((prevCheck) => !prevCheck);
              }}
            >
              <div className="icon-title">
                <img
                  src={geoTag}
                  className="icon"
                  height="50"
                  width="40"
                  alt="Icon"
                  style={{ marginLeft: 5, marginRight: 40 }}
                />
                <h2 className="link-title">{t('documentUpload.address')}</h2>
              </div>
              {userStage.address === 'Approved' ? (
                <p className="status-text status-approved">
                  {userStage.address}
                </p>
              ) : userStage.address === 'Pending' ? (
                <p className="status-text status-pending">
                  {userStage.address}
                </p>
              ) : userStage.address === 'Rejected' ? (
                <RejectedButtonWithReasonPopover
                  status={userStage.address}
                  reason={(
                    <p>
                      {userStage.addressRejection}
                    </p>
                  )}
                />
              ) : showAddressForm ? (
                <RiArrowDownSLine className="arrow-icon" />
              ) : (
                <RiArrowRightSLine className="arrow-icon" />
              )}
            </button>
            <Address
              onUploadSuccess={() => {
                setFileDateChanged(Date.now());
                setShowAddressForm(false);
                setUploadedSomething(true);
              }}
            />
          </div>
        </div>
        <div className="socials-container">
          <p className="socials-title">{t('documentUpload.social-title')}</p>
          <form
            className="register-form"
            onSubmit={(e) => {
              uploadSocials(e);
            }}
          >
            <div className="social-input-box">
              <div className="field-group">
                <input
                  type="text"
                  placeholder=" "
                  id="facebook"
                  name="facebook"
                  value={socialData.facebook}
                  onChange={handleSocialChange}
                  className="field"
                />
                <label htmlFor="facebook" className="input-label">
                  <FaFacebookF className="social-icon" />
                  Facebook
                </label>
              </div>
            </div>
            <div className="social-input-box">
              <div className="field-group">
                <input
                  type="text"
                  placeholder=" "
                  name="linkedin"
                  id="linkedin"
                  value={socialData.linkedin}
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
              <div className="field-group">
                <input
                  type="text"
                  placeholder=" "
                  name="instagram"
                  id="instagram"
                  value={socialData.instagram}
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
              <div className="field-group">
                <input
                  type="text"
                  placeholder=" "
                  name="skype"
                  id="skype"
                  value={socialData.skype}
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
              <p className="field-top-label">
                <FaRegAddressCard className="social-icon" />
                {t('documentUpload.contactMethod')}
              </p>
              <div className="field-group">
                <Select
                  className="menu-item field"
                  onChange={handleSocialChange}
                  name="contactMethod"
                  id="contact-method"
                  value={socialData.contactMethod}
                >
                  <MenuItem value="none">
                    {t('documentUpload.pleaseSelect')}
                  </MenuItem>
                  <MenuItem
                    value="facebook"
                    disabled={isEmpty(socialData.facebook)}
                  >
                    Facebook
                  </MenuItem>
                  <MenuItem
                    value="linkedin"
                    disabled={isEmpty(socialData.linkedin)}
                  >
                    LinkedIn
                  </MenuItem>
                  <MenuItem
                    value="instagram"
                    disabled={isEmpty(socialData.instagram)}
                  >
                    Instagram
                  </MenuItem>
                  <MenuItem value="skype" disabled={isEmpty(socialData.skype)}>
                    Skype
                  </MenuItem>
                  <MenuItem value="email">{t('login.email')}</MenuItem>
                  <MenuItem value="phone">{t('documentUpload.phone')}</MenuItem>
                  <MenuItem value="whatsApp">WhatsApp</MenuItem>
                  <MenuItem value="telegram">Telegram</MenuItem>
                </Select>
              </div>
            </div>
            <div className="social-input-box">
              <p className="field-top-label">
                <FaRegClock className="social-icon" />
                {t('documentUpload.contactTime')}
              </p>
              <div className="field-group half-group">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <TimePicker
                    variant="inline"
                    minutesStep={5}
                    ampm={false}
                    value={socialData.availableFrom}
                    onChange={(val) => setSocialData((prevState) => ({
                      ...prevState,
                      availableFrom: val,
                    }))}
                    className="time"
                  />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <TimePicker
                    variant="inline"
                    minutesStep={5}
                    ampm={false}
                    value={socialData.availableTo}
                    onChange={(val) => setSocialData((prevState) => ({
                      ...prevState,
                      availableTo: val,
                    }))}
                    className="time"
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <div className="days-check-container">
              <p className="contact-days">
                {t('documentUpload.contactDays')}
              </p>
              <div className="day-options-container">
                {weekDays.map((item) => (
                  <FormControlLabel
                    key={item}
                    label={item}
                    control={(
                      <GreenCheckbox
                        name={item}
                        checked={socialData.availableDays.includes(item) || false}
                        onChange={handleDaySelection}
                      />
                    )}
                  />
                ))}
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <Button secondaryColor loading={submitLoading} formButton text={t('submit')} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
