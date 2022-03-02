import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import CancelIcon from '../media/images/icons/cancel.svg';
import '../styles/SurveyForm.scss';
import { userController } from '../controllers';

const FEEDBACK_SURVEY_LINK = process.env.REACT_APP_GENERAL_FEEDBACK_SURVEY_URL;
const SURVEY_NAME = 'GENERAL_FEEDBACK';

const GeneralFeedbackSurvey = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isFeedBackSurveyOpen, setFeedBackSurveyOpen] = useState(false);

  const closeSurveyPopUp = () => {
    setFeedBackSurveyOpen(false);
  };

  const updateSurveyStatus = async (userUuid, surveyId) => {
    try {
      await userController.updateSurveyStatus(userUuid, surveyId);
      setFeedBackSurveyOpen(true);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }
  };

  useEffect(async () => {
    const user = await JSON.parse(localStorage.getItem('user'));
    const userSurveys = user.surveys;
    const currentSurvey = userSurveys?.find(
      (s) => s.name === SURVEY_NAME,
    );

    if (currentSurvey && currentSurvey.count === 2 && !currentSurvey.opened) {
      await updateSurveyStatus(user.uuid, currentSurvey.uuid);
    }
  }, []);

  if (isFeedBackSurveyOpen) {
    return (
      <div className="dialog-iframe">
        <div className="dialog-iframe-content">
          <div
            role="button"
            tabIndex="0"
            onClick={closeSurveyPopUp}
            onKeyDown={closeSurveyPopUp}
          >
            <img
              src={CancelIcon}
              className="close-icon"
              alt="close survey"
            />
          </div>
          <iframe
            title="feedbackSurvey"
            height="600px"
            width="1000px"
            frameBorder="0"
            marginWidth="0"
            marginHeight="0"
            // style={{ border: 'none', maxWidth: '100%', maxHeight: '100vh' }}
            src={FEEDBACK_SURVEY_LINK}
          />
        </div>
      </div>
    );
  }

  return <></>;
};

export default GeneralFeedbackSurvey;
