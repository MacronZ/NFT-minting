import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { BsPersonCheck } from 'react-icons/bs';
import { AiOutlineFileDone, AiOutlineFileSearch, AiOutlineAudit } from 'react-icons/ai';
import { documentController } from '../../../controllers';
import { AlertIcon } from '../../../media/images/icons';
import '../../../styles/Dashboard/OnboardingProgress.scss';

const OnboardingProgress = ({ user }) => {
  const { t } = useTranslation();
  const [steps, setSteps] = useState([
    {
      code: 'reg',
      label: t('preActivation.banner.steps.register'),
      completed: true,
      icon: <BsPersonCheck />,
    },
    {
      code: 'question',
      label: t('preActivation.banner.steps.questionnaire'),
      completed: true,
      link: '/questionnaire',
      icon: <AiOutlineFileSearch />,
    },
    {
      code: 'deal',
      label: t('preActivation.banner.steps.deal'),
      completed: true,
      link: '/documents',
      icon: <AiOutlineAudit />,
    },
    {
      code: 'doc',
      label: t('preActivation.banner.steps.documents'),
      completed: true,
      link: '/documents',
      icon: <AiOutlineFileDone />,
    },
  ]);

  const [allDone, setAllDone] = useState(false);
  const [link, setLink] = useState('');
  const history = useHistory();

  useEffect(async () => {
    let linkIndex;
    let ibDealStatus = false;
    const arrHolder = steps;
    const docStatus = await documentController.checkDocumentStatus(user.uuid);
    if (!docStatus) {
      linkIndex = arrHolder.findIndex(((step) => step.code === 'doc'));
      arrHolder[linkIndex].completed = false;
    }
    if (!user.campaignRequests) {
      linkIndex = arrHolder.findIndex(((step) => step.code === 'deal'));
      arrHolder[linkIndex].completed = false;
    } else {
      const registrationCampaign = user.campaignRequests.filter((campaign) => campaign.onRegistration)[0];
      linkIndex = arrHolder.findIndex(((step) => step.code === 'deal'));
      if (!registrationCampaign || registrationCampaign.status !== 'APPROVED') arrHolder[linkIndex].completed = false;
      else ibDealStatus = true;
    }
    if (!user.questionnaireCompleted) {
      linkIndex = arrHolder.findIndex(((step) => step.code === 'question'));
      arrHolder[linkIndex].completed = false;
    }

    if (docStatus && user.questionnaireCompleted && ibDealStatus) return setAllDone(true);
    setLink(arrHolder[linkIndex].link);
    return setSteps(arrHolder);
  }, []);

  return (
    <>
      <div className="onboardingProgress">
        <div className="widgetsWrapper">
          <div className="warning">
            <img src={AlertIcon} className="alert" alt="Alert" />
            {allDone ? (
              <p className="note">{t('preActivation.banner.post')}</p>
            ) : (
              <p className="note">{t('preActivation.banner.pre')}</p>
            )}
          </div>
          <div className="stepContainer">
            <div className="progress-box">
              {steps.map((step, index) => (
                <>
                  <div className="progress-step">
                    <div className="step-icon">
                      {step.completed ? (
                        <IoCheckmarkCircleSharp className="progress-icon" />
                      ) : null}
                      {step.icon}
                    </div>
                    <span className="progress-label">{step.label}</span>
                  </div>
                  {index < steps.length - 1 && <hr className="splitter" />}
                </>
              ))}
            </div>
          </div>
          {!allDone && (
            <div className="verifyWrapper">
              <button type="button" className="verify-button" onClick={() => { document.body.classList.remove('dark-mode'); history.push(link); }}>
                {t('completeRegistration')}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OnboardingProgress;
