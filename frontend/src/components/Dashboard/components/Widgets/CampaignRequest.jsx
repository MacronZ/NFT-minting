import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../../styles/Dashboard/Widgets.scss';
import {
  FaInfoCircle,
} from 'react-icons/fa';
import { MdPendingActions, MdLockOutline } from 'react-icons/md';
import { useSnackbar } from 'notistack';
import { userController } from '../../../../controllers';
import CampaignDocs from '../../../../media/docs/campaigns';
import campaignOptions from '../../../../utils/campaignsList';
import Button from '../../../Button';
import Blocker from '../../../Blocker';

function CampaignRequest({ user, locked }) {
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCampaignDescr, setSelectedCampaignDescr] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptAppendix, setAcceptAppendix] = useState(false);
  const [hasPending, setHasPending] = useState(false);
  const [customCampaignOptions, setCustomCampaignOptions] = useState(campaignOptions);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(async () => {
    if (user.status.toUpperCase() === 'ACTIVE') {
      const tempCampaignHolder = await userController.getCampaignOptions({ customCampaignOptions });
      const pendingRequests = tempCampaignHolder.filter((x) => x.pending === true);
      if (pendingRequests.length) setHasPending(true);
      await setCustomCampaignOptions(tempCampaignHolder);
    }
  }, []);

  useEffect(() => {
    const pending = customCampaignOptions.filter((x) => x.pending === true);
    if (pending.length) {
      setHasPending(true);
    } else {
      customCampaignOptions.map((option, index) => {
        if (!option.pending) {
          setSelectedCampaign(customCampaignOptions[index].id);
          setSelectedCampaignDescr(customCampaignOptions[index].description);
        }
        return option;
      });
    }
  }, [customCampaignOptions, isLoading]);

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

  const submitCampaign = async () => {
    if (locked) return;
    const customCampaignAcceptedTerms = selectedCampaign === 'custom' && acceptTerms;
    const masterCampaignAcceptedTerms = selectedCampaign === 'master' && acceptTerms && acceptAppendix;
    const standardCampaignAcceptedTerms = selectedCampaign === '4a7x8p5q' && acceptTerms && acceptAppendix;

    if (!customCampaignAcceptedTerms
      && !masterCampaignAcceptedTerms && !standardCampaignAcceptedTerms) {
      enqueueSnackbar(t('dashboard.main.createCampaign.warning'), {
        variant: 'error',
      });
    } else {
      try {
        setIsLoading(true);
        const campaignData = customCampaignOptions.find((x) => x.id === selectedCampaign);
        await userController.requestCampaign(user.uuid, campaignData, false);
        enqueueSnackbar('Campaign request sent!', {
          variant: 'success',
        });
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: 'error',
        });
      }
      const requestIndex = customCampaignOptions.findIndex(((campaign) => campaign.id === selectedCampaign));
      const tempCampaignHolder = customCampaignOptions;
      tempCampaignHolder[requestIndex].pending = true;
      setCustomCampaignOptions(tempCampaignHolder);
      setIsLoading(false);
      setAcceptTerms(false);
      setAcceptAppendix(false);
    }
  };

  return (
    <div className="widget campaign-request" id="create-new-ib-deal-box">
      <Blocker active={hasPending} title="Pending" description="You IB Deal request is pending, we will keep you updated" icon={<MdPendingActions className="icon" />} />
      <Blocker active={locked} title="Locked" description="You need to finish verification to use this feature" icon={<MdLockOutline className="icon" />} />
      <div className={`content-wrapper ${(hasPending || locked) && 'blur'}`}>
        <h1 className="title disable-blur">{t('dashboard.main.createCampaign.title')}</h1>
        <div className="selectorBox">
          <select
            variant="outlined"
            className="optionsSelector"
            value={selectedCampaign}
            onChange={(c) => {
              setSelectedCampaign(c.target.value);
              setSelectedCampaignDescr(customCampaignOptions
                .find((i) => i.id === c.target.value).description);
            }}
          >
            {customCampaignOptions.map((campaignOption, idx) => (
              <option key={idx} className={`campaign-option ${campaignOption.pending && 'pending'}`} disabled={campaignOption.pending} value={campaignOption.id}>
                {campaignOption.name}
                {campaignOption.pending && ' - PENDING'}
              </option>
            ))}
          </select>
          {selectedCampaignDescr && (
          <div className="flex-row-center-div description-container">
            <div className="div-width-5">
              <FaInfoCircle className="info-icon" />
            </div>
            <div>
              <span className="campaign-description">
                {selectedCampaignDescr}
              </span>
            </div>
          </div>
          )}
        </div>
        <div className="flex-row-center-div">
          <div className="div-width-10">
            <input type="checkbox" id="terms" className="terms-input" checked={acceptTerms} onChange={() => setAcceptTerms(!acceptTerms)} />
          </div>
          <div className="flex-row-div">
            <label htmlFor="terms" className="checkbox-label">
              <a className="terms-link" target="_blank" rel="noreferrer" href={setHrefForAgreement()}>
                <div>
                  {t('dashboard.main.createCampaign.terms')}
                </div>
              </a>
            </label>
          </div>
        </div>
        {selectedCampaign !== 'custom' && (
        <div className="flex-row-center-div">
          <div className="div-width-10">
            <input type="checkbox" id="appendix" className="terms-input" checked={acceptAppendix} onChange={() => setAcceptAppendix(!acceptAppendix)} />
          </div>
          <div className="flex-row-div">
            <label htmlFor="appendix" className="checkbox-label">
              <a className="terms-link" target="_blank" rel="noreferrer" href={setHrefForAppendix()}>
                <div>
                  {t('dashboard.main.createCampaign.appendix')}
                </div>
              </a>
            </label>
          </div>
        </div>
        )}
        <div className="submitBtnContainer urlBox">
          <Button secondaryColor loading={isLoading} text={t('submit')} action={submitCampaign} />
        </div>
      </div>
    </div>
  );
}

export default CampaignRequest;
