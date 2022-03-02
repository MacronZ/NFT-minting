import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import Cookies from 'universal-cookie';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import ThankYouModal from './ThankYouModal';
import WarningModal from './WarningModal';
import { userController } from '../../controllers';
import countries from '../../utils/IBcountries';
import CountryMultiSelectDropdown from './CountryMultiSelectDropdown';
import '../../styles/Onboarding/Questionnaire.scss';
import Button from '../Button';

const IbQuestionnaire = ({ user }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isThankModalOpen, setIsThankModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [formData, setFormData] = useState({
    servicesWebsite: '',
    otherServices: '',
    finServicesAuthority: '',
    registrationNo: '',
    regulatorName: '',
    regulatorWebsite: '',
    services: [],
    howAttractClients: [],
    modeOfCommunication: [],
    clientsCountry: [],
    httpForServicesWebsite: 'http://',
    httpForRegulatorWebsite: 'http://',
  });
  const urlStartOptions = ['http://', 'https://'];
  const yesNoOptions = ['Yes', 'No'];
  const yesSelected = yesNoOptions[0];
  const noSelected = yesNoOptions[1];
  const clientsQuestionOptions = ['0 - 5', '5 - 10', '10 - 50', '50+'];
  const modeOfCommunicationOptions = ['Email', 'Phone', 'Social Media', 'Website'];
  const servicesOptions = ['Customer support', 'Newsletters', 'Technical analysis', 'Cashbacks'];
  const howAttractClientsQuestionOptions = ['Website', 'Word of mouth', 'Personal Network', 'Social Media'];

  const setFieldValue = (key, value) => {
    formData[key] = value;
    setFormData({ ...formData });
  };

  useEffect(async () => {
    const localUser = await JSON.parse(localStorage.getItem('user'));
    if (localUser.questionnaireCompleted) {
      let otherFetchedServices;
      localUser.questionnaireData.referralsData.services.map((data) => {
        if (!servicesOptions.indexOf(data) > -1) otherFetchedServices = data;
        return otherFetchedServices;
      });

      let website = [];
      website = localUser.questionnaireData.referralsData.servicesWebsite.split('://');
      const isRegulated = localUser.questionnaireData.isFinServicesAuthRegulated ? 'Yes' : 'No';
      if (localUser.questionnaireData.isFinServicesAuthRegulated) {
        let regulatorWebsiteFetch = [];
        regulatorWebsiteFetch = localUser.questionnaireData.finServicesAuthorityData.regulatorWebsite.split('://');
        const isCriminal = localUser.questionnaireData.finServicesAuthorityData.subjectToFinancialCrime ? 'Yes' : 'No';

        setFormData({
          ...formData,
          ...localUser.questionnaireData.referralsData,
          ...localUser.questionnaireData.finServicesAuthorityData,
          finServicesRegulated: isRegulated,
          otherServices: otherFetchedServices,
          servicesWebsite: website[1],
          regulatorWebsite: regulatorWebsiteFetch[1],
          httpForServicesWebsite: `${website[0]}://`,
          httpForRegulatorWebsite: `${regulatorWebsiteFetch[0]}://`,
          finServicesAuthority: localUser.questionnaireData.finServicesAuthorityData.authorityName,
          subjectToFinancialCrime: isCriminal,
        });
      } else {
        setFormData({
          ...formData,
          ...localUser.questionnaireData.referralsData,
          ...localUser.questionnaireData.finServicesAuthorityData,
          finServicesRegulated: isRegulated,
          otherServices: otherFetchedServices,
          servicesWebsite: website[1],
          httpForServicesWebsite: `${website[0]}://`,
        });
      }

      const countryList = [];
      localUser.questionnaireData.referralsData.clientsCountry.map((country) => {
        const countryData = countries.find((c) => c.countryCode === country);
        return countryList.push({
          label: countryData.countryName,
          value: countryData.countryCode,
        });
      });
      setSelectedCountries(countryList);
    }
  }, []);

  const setSelectedCheckboxes = (key, value, checked) => {
    if (checked) {
      formData[key] = [...formData[key], value];
    } else {
      formData[key] = formData[key].filter((item) => item !== value);
    }
    setFormData({ ...formData });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const cookies = new Cookies();

    const {
      noOfClients,
      clientsCountry,
      modeOfCommunication,
      howAttractClients,
      services,
      finServicesRegulated,
      finServicesAuthority,
      registrationNo,
      regulatorName,
      regulatorWebsite,
      subjectToFinancialCrime,
    } = formData;

    const financialServicesAuthSectionIncomplete = finServicesRegulated === yesSelected
      && (!finServicesAuthority || !registrationNo
        || !regulatorName || !regulatorWebsite || !subjectToFinancialCrime);

    if (formData.subjectToFinancialCrime === yesSelected) {
      setIsWarningModalOpen(true);
    } else if (!noOfClients || !modeOfCommunication.length || !services.length
      || !howAttractClients.length || !clientsCountry.length || !finServicesRegulated) {
      enqueueSnackbar('Please answer all the questions from 1 to 7', {
        variant: 'error',
      });
    } else if (financialServicesAuthSectionIncomplete) {
      enqueueSnackbar('Please complete all the parts (1-4) under question 7', {
        variant: 'error',
      });
    } else {
      const token = cookies.get('token');

      try {
        setIsLoading(true);
        await userController.updateQuestionnaire(user.uuid,
          formData, token, yesSelected);
        setIsThankModalOpen(!isThankModalOpen);
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: 'error',
        });
      }
      setIsLoading(false);
    }
  };

  const clearStoredDataAboutFinancialService = () => {
    setFieldValue('finServicesAuthority', '');
    setFieldValue('registrationNo', '');
    setFieldValue('regulatorName', '');
    setFieldValue('regulatorWebsite', '');
    setFieldValue('subjectToFinancialCrime', '');
  };

  const setCountriesCodeSpecified = () => {
    if (selectedCountries.length) {
      formData.clientsCountry = selectedCountries.map((c) => c.value);
    } else {
      formData.clientsCountry = [];
    }
    setFormData({ ...formData });
  };

  useEffect(() => {
    if (formData.finServicesRegulated === noSelected) {
      clearStoredDataAboutFinancialService();
    }
  }, [formData.finServicesRegulated]);

  useEffect(() => {
    if (formData.subjectToFinancialCrime === yesSelected) {
      setIsWarningModalOpen(true);
    }
  }, [formData.subjectToFinancialCrime]);

  useEffect(() => {
    setCountriesCodeSpecified();
  }, [selectedCountries]);

  return (
    <div className="form">
      <WarningModal
        open={isWarningModalOpen}
        onClose={() => setIsWarningModalOpen(false)}
      />
      <ThankYouModal
        open={isThankModalOpen}
        onClose={() => setIsThankModalOpen(!isThankModalOpen)}
      />
      <div className="form-container container">
        <h2 className="title">
          {t('hello.label')}
          {' '}
          {user.firstName}
          !
        </h2>
        <form
          className="form-content"
          onSubmit={onSubmit}
        >
          <div className="flex-div">
            <div className="empty-div" />
            <div className="subtitle">
              {t('register.questionnaire.intro')}
            </div>
            <div className="empty-div" />
          </div>
          <h5 className="h5-style">
            {t('register.questionnaire.clientsQuestion')}
          </h5>
          <div className="options-container">
            {t('register.questionnaire.clientsQuestionOptions', { returnObjects: true }).map(
              (option, idx) => (
                <div className="radio" key={idx}>
                  <label className="optionLabel">
                    <input
                      type="radio"
                      value={clientsQuestionOptions[idx]}
                      checked={formData.noOfClients === clientsQuestionOptions[idx]}
                      onChange={(e) => setFieldValue('noOfClients', e.target.value)}
                      className="input"
                    />
                    {option}
                  </label>
                </div>
              ),
            )}
          </div>
          <h5 className="h5-style">
            {t('register.questionnaire.countryOperateQuestion')}
          </h5>
          <div>
            <CountryMultiSelectDropdown
              countries={countries}
              selectedCountries={selectedCountries}
              setSelectedCountries={setSelectedCountries}
            />
          </div>
          <h5 className="h5-style">
            {t('register.questionnaire.modeOfCommunication')}
          </h5>
          <div className="options-container">
            {t('register.questionnaire.modeOfCommunicationOptions', { returnObjects: true }).map(
              (option, idx) => (
                <div className="radio" key={idx}>
                  <label className="optionLabel">
                    <input
                      type="checkbox"
                      value={modeOfCommunicationOptions[idx]}
                      checked={formData.modeOfCommunication
                        .includes(modeOfCommunicationOptions[idx])}
                      onChange={(e) => setSelectedCheckboxes('modeOfCommunication', e.target.value, e.target.checked)}
                      className="input"

                    />
                    {option}
                  </label>
                </div>
              ),
            )}
          </div>
          <h5 className="h5-style">
            {t('register.questionnaire.servicesQuestion')}
          </h5>
          <div className="options-container">
            {t('register.questionnaire.servicesOptions', { returnObjects: true }).map(
              (option, idx) => (
                <div className="radio" key={idx}>
                  <label className="optionLabel">
                    <input
                      type="checkbox"
                      value={servicesOptions[idx]}
                      checked={formData.services.includes(servicesOptions[idx])}
                      onChange={(e) => setSelectedCheckboxes('services', e.target.value, e.target.checked)}
                      className="input"

                    />
                    {option}
                  </label>
                </div>
              ),
            )}
          </div>
          <h5 className="sub-text">
            {t('register.questionnaire.provideOther')}
          </h5>
          <input
            type="text"
            name="otherServices"
            className="input-fullWidth-container input-border-radius"
            onChange={(e) => {
              setFieldValue('otherServices', e.target.value);
            }}
            value={formData.otherServices}
          />
          <h5 className="h5-style">
            {t('register.questionnaire.howAttractClientsQuestion')}
          </h5>
          <div className="options-container">
            {t('register.questionnaire.howAttractClientsQuestionOptions', { returnObjects: true }).map(
              (option, idx) => (
                <div className="radio" key={idx}>
                  <label className="optionLabel">
                    <input
                      type="checkbox"
                      value={howAttractClientsQuestionOptions[idx]}
                      checked={formData.howAttractClients
                        .includes(howAttractClientsQuestionOptions[idx])}
                      onChange={(e) => setSelectedCheckboxes('howAttractClients', e.target.value, e.target.checked)}
                      className="input"

                    />
                    {option}
                  </label>
                </div>
              ),
            )}
          </div>
          <h5 className="sub-text">
            {t('register.questionnaire.websiteQuestion')}
          </h5>
          <div className="flex-div">
            <select
              id="services-website-http"
              value={formData.httpForServicesWebsite}
              onChange={(e) => setFormData((prevState) => ({
                ...prevState,
                httpForServicesWebsite: e.target.value,
              }))}
              className="http-selector"
            >
              {urlStartOptions.map(
                (option, idx) => (<option key={idx} value={option}>{option}</option>),
              )}
            </select>
            <input
              type="text"
              name="servicesWebsite"
              className="input-fullWidth-container website-border-radius"
              onChange={(e) => setFieldValue('servicesWebsite', e.target.value)}
              value={formData.servicesWebsite}
            />
          </div>
          <h5 className="h5-style">
            {t('register.questionnaire.regulatedQuestion')}
          </h5>
          <div className="yes-no-container">
            {t('register.questionnaire.yesNoOptions', { returnObjects: true }).map(
              (option, idx) => (
                <div className="radio" key={idx}>
                  <label className="optionLabel">
                    <input
                      type="radio"
                      value={yesNoOptions[idx]}
                      checked={formData.finServicesRegulated === yesNoOptions[idx]}
                      onChange={(e) => setFieldValue('finServicesRegulated', e.target.value)}
                      className="input"
                    />
                    {option}
                  </label>
                </div>
              ),
            )}
          </div>
          {
            formData.finServicesRegulated === yesSelected
            && (
            <>
              <h5 className="h5-style">
                {t('register.questionnaire.financialServicesAuthorityQuestion')}
              </h5>
              <div className="options-container">
                <input
                  type="text"
                  placeholder={t('register.questionnaire.yourFinancialServices')}
                  className="input-half-container"
                  name="finServicesAuthority"
                  onChange={(e) => setFieldValue('finServicesAuthority', e.target.value)}
                  value={formData.finServicesAuthority}
                />
                <input
                  type="text"
                  placeholder={t('register.questionnaire.yourRegistrationNumber')}
                  name="registrationNo"
                  className="input-half-container"
                  onChange={(e) => setFieldValue('registrationNo', e.target.value)}
                  value={formData.registrationNo}
                />
              </div>
              <h5 className="h5-style">
                {t('register.questionnaire.regulatorName')}
              </h5>
              <input
                type="text"
                name="regulatorName"
                className="input-fullWidth-container input-border-radius"
                onChange={(e) => setFieldValue('regulatorName', e.target.value)}
                value={formData.regulatorName}
              />
              <h5 className="h5-style">
                {t('register.questionnaire.regulatorWebsite')}
              </h5>
              <div className="flex-div">
                <select
                  id="regulator-website-http"
                  value={formData.httpForRegulatorWebsite}
                  onChange={(e) => setFormData((prevState) => ({
                    ...prevState,
                    httpForRegulatorWebsite: e.target.value,
                  }))}
                  className="http-selector"
                >
                  {urlStartOptions.map(
                    (option, idx) => (<option key={idx} value={option}>{option}</option>),
                  )}
                </select>
                <input
                  type="text"
                  name="regulatorWebsite"
                  className="input-fullWidth-container website-border-radius"
                  onChange={(e) => setFieldValue('regulatorWebsite', e.target.value)}
                  value={formData.regulatorWebsite}
                />
              </div>
              <h5 className="h5-style">
                {t('register.questionnaire.financialCrimeQuestion')}
              </h5>
              <div className="yes-no-container">
                {t('register.questionnaire.yesNoOptions', { returnObjects: true }).map(
                  (option, idx) => (
                    <div className="radio" key={idx}>
                      <label className="optionLabel">
                        <input
                          type="radio"
                          value={yesNoOptions[idx]}
                          checked={formData.subjectToFinancialCrime === yesNoOptions[idx]}
                          onChange={(e) => setFieldValue('subjectToFinancialCrime', e.target.value)}
                          className="input"
                        />
                        {option}
                      </label>
                    </div>
                  ),
                )}
              </div>
            </>
            )
          }
          <div className="action-btn-container">
            <Button secondaryColor loading={isLoading} formButton text={t('register.questionnaire.submit')} />
          </div>
          <div className="action-btn-container">
            <button
              type="button"
              className="skip-btn"
              name="questionnaire"
              onClick={() => {
                history.push('/documents');
              }}
            >
              Skip questionnaire for now
            </button>
            <FaArrowAltCircleRight />
          </div>
        </form>
      </div>
    </div>
  );
};

export default IbQuestionnaire;
