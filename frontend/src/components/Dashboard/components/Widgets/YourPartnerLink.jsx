import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { useTranslation } from 'react-i18next';
import { MdLockOutline } from 'react-icons/md';
import { userController } from '../../../../controllers';
import Popover from '../CustomPopover';
import { parsingHelper } from '../../../../helpers';
import Button from '../../../Button';
import ibLanguages from '../../../../utils/ibLanguages';
import '../../../../styles/Dashboard/Widgets.scss';
import PartnerLinkQRCodeModal from './PartnerLinkQRCodeModal';
import Blocker from '../../../Blocker';

function YourPartnerLink({ entity, locked, user }) {
  const { enqueueSnackbar } = useSnackbar();
  const [affiliateUrl, setAffiliateUrl] = useState('');
  const [campaign, setCampaign] = useState();
  const [pageLanguage, setPageLanguage] = useState();
  const [promoCampaign, setPromoCampaign] = useState();
  const [source, setSource] = useState(null);
  const [campaignOptions, setCampaignOptions] = useState([]);
  const [sourceOptions, setSourceOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [affiliateData, setAffiliateData] = useState({
    campaigns: [],
    refid: '',
    source: [],
  });
  const [options, setOptions] = useState();
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = useState('registration');
  const { t, i18n } = useTranslation();

  useEffect(async () => {
    if (locked) return;
    const affiliateDataFetch = await JSON.parse(localStorage.getItem('affiliateData'));
    if (user.promoCampaign) setPromoCampaign(user.promoCampaign);
    else setPromoCampaign(Object.keys(affiliateDataFetch.campaigns)[0]);
    setAffiliateData(affiliateDataFetch);
    setPageLanguage(ibLanguages.mainWebLanguages[0].value);
    setCampaign(Object.keys(affiliateDataFetch.campaigns)[0]);
    setCampaignOptions(Object.keys(affiliateDataFetch.campaigns));
  }, []);

  useEffect(async () => {
    if (locked) return;
    const newSources = await parsingHelper.parseNPSource(affiliateData.source, campaign);
    setSourceOptions(newSources);
    setSource(null);
  }, [campaign]);

  useEffect(async () => {
    if (locked) return;
    if (affiliateData) {
      try {
        const affiliateUrlFetch = await userController.generateAffiliateUrl(
          affiliateData.refid,
          campaign,
          page,
          source,
          entity,
          pageLanguage,
        );
        setAffiliateUrl(affiliateUrlFetch);
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: 'error',
        });
      }
    }
  }, [campaign, page, source, pageLanguage]);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  function generateQRCode() {
    setOptions({
      ecLevel: 'M',
      enableCORS: false,
      size: 250,
      quietZone: 10,
      bgColor: '#FFFFFF',
      fgColor: '#000000',
      logoWidth: 180,
      logoHeight: 40,
      logoOpacity: 1,
      qrStyle: 'squares',
      eyeRadius: 2,
    });
    handleOpen(true);
  }

  function copyCode(code) {
    navigator.clipboard.writeText(code);
    enqueueSnackbar('Code copied!', {
      variant: 'success',
    });
  }

  async function savePromoCampaign() {
    setLoading(true);

    try {
      await userController.savePromoCampaign(user.uuid, promoCampaign);
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(error.message, { variant: 'error' });
      return;
    }

    setLoading(false);
    enqueueSnackbar('Campaign saved!', { variant: 'success' });
  }

  return (
    <div className="widget your-partner-link" id="your-partner-link-box">
      <Blocker active={locked} title="Locked" description="You need to finish verification to use this feature" icon={<MdLockOutline className="icon" />} />
      <div className={`content-wrapper ${locked && 'blur'}`}>
        <h1 className="title disable-blur">{t('dashboard.main.partner.title')}</h1>
        <div className="selectorBox">
          {page !== 'ib'
            && (
              <>
                <label htmlFor="campaign" className="optionsLabel">
                  {t('dashboard.main.partner.campaign')}
                </label>
                <select
                  variant="outlined"
                  id="campaign"
                  className="optionsSelector"
                  value={campaign}
                  onChange={(c) => setCampaign(c.target.value)}
                >
                  {campaignOptions.map((campaignOption) => (
                    <option key={campaignOption} value={campaignOption}>
                      {affiliateData.campaigns[campaignOption].description}
                    </option>
                  ))}
                </select>
              </>
            )}
          <div className="pageLangSplitter">
            <div className="splitterInnerBox firstBox">
              <label htmlFor="page" className="optionsLabel">
                {t('dashboard.main.partner.page')}
              </label>
              <select
                variant="outlined"
                id="page"
                value={page}
                className="optionsSelector"
                onChange={(p) => setPage(p.target.value)}
              >
                <option value="registration">Registration Page</option>
                {entity === 'fsa'
                  ? <option value="home">Home Page</option>
                  : null}
                {affiliateData.master_ib === '1'
                  && <option value="ib">Sub IB Registration</option>}
              </select>
            </div>
            {page === 'home'
              && (
                <div className="splitterInnerBox secondBox">
                  <label htmlFor="pageLanguage" className="optionsLabel">
                    {t('dashboard.main.partner.pageLanguage')}
                  </label>
                  <select
                    variant="outlined"
                    id="pageLanguage"
                    value={pageLanguage}
                    className="optionsSelector"
                    onChange={(p) => setPageLanguage(p.target.value)}
                  >
                    {ibLanguages.mainWebLanguages.map((language) => (
                      <option key={language.code} value={language.value}>
                        {language.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
          </div>
          {sourceOptions.length
            ? (
              <>
                <label htmlFor="source" className="optionsLabel">
                  {t('dashboard.main.partner.source')}
                </label>
                <select
                  variant="outlined"
                  id="source"
                  value={source}
                  className="optionsSelector"
                  onChange={(s) => setSource(s.target.value)}
                >
                  <option value="">None</option>
                  {sourceOptions.map((s) => (
                    <option value={s}>{s}</option>
                  ))}
                </select>
              </>
            )
            : null}
          {page !== 'ib'
            && (
              <>
                <span className="sign-up-link">
                  <p className="text">{t('dashboard.main.partner.promoCampaign')}</p>
                  <Popover
                    className="warning-popover"
                    showArrow
                    triggerNode={<ErrorOutlineIcon />}
                    trigger="click"
                  >
                    <div className="campaign-name-popover">
                      <p>{t('dashboard.main.partner.promoCampaignPopup')}</p>
                    </div>
                  </Popover>
                </span>
                <div className="promoCampaignCtaBox">
                  <select
                    variant="outlined"
                    id="promoCampaign"
                    className="optionsSelector"
                    value={promoCampaign}
                    onChange={(pc) => setPromoCampaign(pc.target.value)}
                  >
                    {campaignOptions.map((campaignOption) => (
                      <option key={campaignOption} value={campaignOption}>
                        {affiliateData.campaigns[campaignOption].description}
                      </option>
                    ))}
                  </select>
                  <Button secondaryColor loading={loading} action={() => savePromoCampaign(affiliateUrl)} text={t('save')} />
                </div>
              </>
            )}
        </div>
        <span className="sign-up-link">
          <p className="text">{t('dashboard.main.partner.link')}</p>
          <Popover
            className="warning-popover"
            showArrow
            triggerNode={<ErrorOutlineIcon />}
            trigger="click"
          >
            <div className="campaign-name-popover">
              <p>{t('dashboard.main.partner.popup')}</p>
            </div>
          </Popover>
        </span>
        <div className="urlBox">
          <code className="urlSnippet">
            {affiliateUrl}
          </code>
          <div className="buttons-container">
            {i18n.language === 'gr' ? (
              <button type="button" className="green-cta-quick-fix" onClick={() => copyCode(affiliateUrl)}>
                {t('dashboard.main.partner.copy')}
              </button>
            ) : <Button secondaryColor action={() => copyCode(affiliateUrl)} text={t('dashboard.main.partner.copy')} />}

            <div className="button-new-container">
              <Button secondaryColor text="QR Code" action={generateQRCode} />
              <span className="new-text-indicator">new</span>
            </div>
            <PartnerLinkQRCodeModal handleClose={handleClose} affiliateUrl={affiliateUrl} open={open} options={options} />
          </div>
          <div className="ctaPromoBox">
            <div className="promoBox">
              <p className="text">Promo Code</p>
              <p className="code">{affiliateData.refid}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default YourPartnerLink;
