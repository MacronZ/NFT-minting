import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { Radio } from '@material-ui/core';
import { RiInformationLine } from 'react-icons/ri';
import '../../styles/Onboarding/OnBoarding.scss';
import { userController } from '../../controllers';
import CampaignDocs from '../../media/docs/campaigns';
import campaignOptions from '../../utils/campaignsList';
import Button from '../Button';

export default function Campaign({ onUploadSuccess }) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [selectedCampaignDescr, setSelectedCampaignDescr] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptAppendix, setAcceptAppendix] = useState(false);

  useEffect(() => {
    setSelectedCampaign(campaignOptions[0].id);
    setSelectedCampaignDescr(campaignOptions[0].description);
  }, []);

  useEffect(() => {
    setAcceptTerms(false);
    setAcceptAppendix(false);
  }, [selectedCampaign]);

  const setHrefForAgreement = () => {
    if (selectedCampaign === 'master') {
      return CampaignDocs.MasterAgreement;
    }
    return CampaignDocs.MainAgreement;
  };

  const setHrefForAppendix = () => {
    if (selectedCampaign === '4a7x8p5q') {
      return CampaignDocs.Appendix532;
    }
    return CampaignDocs.AppendixMaster;
  };

  const submitCampaign = async (event) => {
    event.preventDefault();

    const customCampaignAcceptedTerms = selectedCampaign === 'custom' && acceptTerms;
    const masterCampaignAcceptedTerms = selectedCampaign === 'master' && acceptTerms && acceptAppendix;
    const standardCampaignAcceptedTerms = selectedCampaign === '4a7x8p5q' && acceptTerms && acceptAppendix;

    if (!customCampaignAcceptedTerms
      && !masterCampaignAcceptedTerms && !standardCampaignAcceptedTerms) {
      enqueueSnackbar(t('dashboard.main.createCampaign.warning'), {
        variant: 'error',
      });
    } else {
      const campaignData = campaignOptions.find((x) => x.id === selectedCampaign);

      try {
        setIsLoading(true);
        await userController.requestCampaign(user.uuid, campaignData, true);
      } catch (error) {
        setIsLoading(false);
        return enqueueSnackbar(error.message, {
          variant: 'error',
        });
      }

      if (onUploadSuccess) {
        onUploadSuccess();
      }
      return setIsLoading(false);
    }

    return 200;
  };

  return (
    <div className="onboarding-contract">
      <div className="onboarding-contract-inner">
        <form className="onboard" onSubmit={submitCampaign}>
          <h2 className="title">{t('documentUpload.campaignSelector')}</h2>
          <div className="doc-type">
            {campaignOptions.map((campaignOption, idx) => (
              <label key={campaignOptions.id} htmlFor={idx}>
                <Radio
                  id={idx}
                  value={campaignOption.id}
                  name="campaign-type"
                  onChange={(c) => {
                    setSelectedCampaign(c.target.value);
                    setSelectedCampaignDescr(campaignOptions
                      .find((i) => i.id === c.target.value).description);
                  }}
                  checked={selectedCampaign === campaignOption.id}
                />
                {campaignOption.name}
              </label>
            ))}
          </div>
          {selectedCampaignDescr && (
          <div className="campaign-descrption">
            <RiInformationLine className="icon" />
            <p className="text">{selectedCampaignDescr}</p>
          </div>
          )}
          <div className="campaign-terms">
            <input type="checkbox" id="terms" className="terms-input" checked={acceptTerms} onChange={() => setAcceptTerms(!acceptTerms)} />
            <label htmlFor="terms" className="checkbox-label">
              <a className="terms-link" target="_blank" rel="noreferrer" href={setHrefForAgreement()}>
                {t('dashboard.main.createCampaign.terms')}
              </a>
            </label>
          </div>
          {selectedCampaign !== 'custom' && (
          <div className="campaign-terms">
            <input type="checkbox" id="appendix" className="terms-input" checked={acceptAppendix} onChange={() => setAcceptAppendix(!acceptAppendix)} />
            <label htmlFor="appendix" className="checkbox-label">
              <a className="terms-link" target="_blank" rel="noreferrer" href={setHrefForAppendix()}>
                {t('dashboard.main.createCampaign.appendix')}
              </a>
            </label>
          </div>
          )}
          <Button secondaryColor loading={isLoading} formButton text={t('submit')} />
        </form>
      </div>
    </div>
  );
}
