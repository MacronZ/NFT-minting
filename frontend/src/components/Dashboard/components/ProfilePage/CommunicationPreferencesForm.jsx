import React, { useState, useEffect } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { userController } from '../../../../controllers';
import { validationHelper } from '../../../../helpers';
import weekDays from '../../../../utils/weekDays';

const AvailabilityComponent = React.lazy(() => import('./CommuncationPreferences/AvailabilityComponent'));
const SocialMediaComponent = React.lazy(() => import('./CommuncationPreferences/SocialMediaComponent'));

const CommunicationPreferencesForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [availableDays, setAvailableDays] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);
  const [availableHours, setAvailableHours] = useState([7, 20]);
  const [extraData, setExtraData] = useState({
    phoneNum: '',
    email: '',
  });
  const [preferences, setPreferences] = useState({
    contactMethod: '',
    facebook: '',
    linkedin: '',
    instagram: '',
    skype: '',
  });

  const uploadSocials = async (e) => {
    e.preventDefault();
    setSaveLoading(true);

    try {
      await validationHelper.validatePhone(extraData.phoneNum);
    } catch (error) {
      setSaveLoading(false);
      return enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }

    const formattedDates = {
      from: new Date(),
      to: new Date(),
    };

    formattedDates.from.setHours(availableHours[0], 0, 0);
    formattedDates.to.setHours(availableHours[1], 0, 0);

    const sortedSelectedDays = weekDays.filter((value) => availableDays.includes(value));

    const payload = {
      ...preferences,
      availableDays: sortedSelectedDays,
      availableFrom: formattedDates.from,
      availableTo: formattedDates.to,
    };

    try {
      await userController.uploadSocials(payload, extraData.phoneNum);
      enqueueSnackbar('Communication preferences has been updated', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
      setSaveLoading(false);
    }

    setSaveLoading(false);
    return 200;
  };

  useEffect(() => {
    (async () => {
      const { socialData, phoneNum, email } = await JSON.parse(
        localStorage.getItem('user'),
      );
      if (socialData) {
        setPreferences(socialData);
      }

      setExtraData({ phoneNum, email });
      if (socialData?.availableDays) {
        setAvailableDays(socialData.availableDays);
      }
      if (socialData?.availableFrom && socialData?.availableTo) {
        setAvailableHours([
          new Date(socialData.availableFrom).getHours(),
          new Date(socialData.availableTo).getHours(),
        ]);
      }
    })();
  }, []);

  return (
    <div className="com-preferences">
      <div className="head-line">
        <Link to="/dashboard/profile">
          <ArrowBackIcon />
        </Link>
        <div className="title">
          {t('dashboard.settings.communication.title')}
        </div>
      </div>
      <div className="sub-title">
        {t('dashboard.settings.communication.subtitle')}
      </div>

      <form className="com-form">
        <AvailabilityComponent
          availableDays={availableDays}
          setAvailableDays={setAvailableDays}
          availableHours={availableHours}
          setAvailableHours={setAvailableHours}
        />
        <div className="section switch-list">
          <h4>{t('dashboard.settings.communication.preferred')}</h4>
          <SocialMediaComponent
            preferences={preferences}
            setPreferences={setPreferences}
            extraData={extraData}
            setExtraData={setExtraData}
            uploadSocials={uploadSocials}
            saveLoading={saveLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default CommunicationPreferencesForm;
