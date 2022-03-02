import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import CancelIcon from '../../../../media/images/icons/cancel.svg';
import { bannerHelper, parsingHelper } from '../../../../helpers';
import { userController } from '../../../../controllers';
import '../../../../styles/Dashboard/Banners.scss';

function BannerOptionsBox({
  theme, size, language, ibLink, closeForm, entity,
}) {
  const { t } = useTranslation();
  const [bannerSize, setBannerSize] = useState({ width: size.width, height: size.height });
  const [bannerLanguage, setBannerLanguage] = useState(language);
  const [bannerLoaded, setBannerLoaded] = useState(false);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [affiliateData, setAffiliateData] = useState({
    campaigns: [],
    refid: '',
    source: [],
  });
  const [campaign, setCampaign] = useState();
  const [source, setSource] = useState(null);
  const [sourceOptions, setSourceOptions] = useState([]);
  const [page, setPage] = useState('registration');
  const [campaignOptions, setCampaignOptions] = useState([]);
  const [affiliateUrl, setAffiliateUrl] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(async () => {
    const affiliateDataFetch = await JSON.parse(
      localStorage.getItem('affiliateData'),
    );

    setAffiliateData(affiliateDataFetch);
    setCampaign(Object.keys(affiliateDataFetch.campaigns)[0]);
    setCampaignOptions(Object.keys(affiliateDataFetch.campaigns));
  }, []);

  useEffect(async () => {
    const newSources = await parsingHelper.parseNPSource(affiliateData.source, campaign);
    setSourceOptions(newSources);
    setSource(null);
  }, [campaign]);

  useEffect(async () => {
    if (affiliateData) {
      try {
        const affiliateUrlFetch = await userController.generateAffiliateUrl(
          affiliateData.refid,
          campaign,
          page,
          source,
          entity,
        );
        setAffiliateUrl(affiliateUrlFetch);
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: 'error',
        });
      }
    }
  }, [campaign, page, source]);

  useEffect(() => {
    setBannerLanguage(language);
    setBannerSize({
      width: size.width,
      height: size.height,
    });
  }, [theme, size, language, ibLink]);

  useEffect(async () => {
    const themeSizeOptions = await bannerHelper.getSizeByThemeLng(theme, bannerLanguage);
    setSizeOptions(themeSizeOptions);
  }, [bannerLanguage]);

  useEffect(async () => {
    const themeLanguageOptions = await bannerHelper.getLanguageByThemeSize(theme, bannerSize);
    setLanguageOptions(themeLanguageOptions);
  }, [bannerSize]);

  useEffect(() => {
    setBannerLoaded(false);
  }, [bannerLanguage, bannerSize]);

  function copyCode(code) {
    navigator.clipboard.writeText(code);
    enqueueSnackbar('Code copied!', {
      variant: 'success',
    });
  }

  const shareLink = `<a href="${affiliateUrl}"> <img src="https://assets.axiance.com/portal/banners/${theme}/${bannerLanguage}/${bannerSize.width}x${bannerSize.height}.png" width="${bannerSize.width}" height="${bannerSize.height}" alt="Axiance Banner"/> </a>`;

  return (
    <div className="singleBannerOptions">
      <div className="singleBannerOptionsInner">
        <div
          role="button"
          onClick={closeForm}
          tabIndex="0"
          onKeyDown={closeForm}
        >
          <img
            src={CancelIcon}
            className="close-icon"
            alt="Close the form"
          />
        </div>
        <div className="imageBox">
          <img
            src={`https://assets.axiance.com/portal/banners/${theme}/${bannerLanguage}/${bannerSize.width}x${bannerSize.height}.png`}
            width={bannerSize.width}
            height={bannerSize.height}
            alt={`Banner-${theme}`}
            className={bannerLoaded ? 'bannerImage' : 'bannerImage bannerLoading'}
            onLoad={() => setTimeout(() => setBannerLoaded(true), 250)}
          />
          <div className="optionsBox">
            <div className="optionWrap">
              <label htmlFor="size" className="optionsLabel">
                {t('dashboard.marketing.sections.banners.selectors.size')}
              </label>
              <select
                className="optionsSelector"
                onChange={(value) => {
                  const sizeValue = value.target.value.split('x');
                  setBannerSize({
                    width: sizeValue[0],
                    height: sizeValue[1],
                  });
                }}
                id="size"
                value={`${bannerSize.width}x${bannerSize.height}`}
              >
                {sizeOptions.map((sizeOption) => (
                  <option data-width={sizeOption.width} data-height={sizeOption.height} value={`${sizeOption.width}x${sizeOption.height}`}>
                    {sizeOption.width}
                    x
                    {sizeOption.height}
                  </option>
                ))}
              </select>
            </div>
            <div className="optionWrap">
              <label htmlFor="language" className="optionsLabel">
                {t('dashboard.marketing.sections.banners.selectors.language')}
              </label>
              <select className="optionsSelector" id="language" onChange={(l) => setBannerLanguage(l.target.value)} value={bannerLanguage}>
                {languageOptions.map((languageOption) => (
                  <option value={languageOption.key}>{languageOption.name}</option>
                ))}
              </select>
            </div>
            <div className="optionWrap">
              <label htmlFor="campaign" className="optionsLabel">
                {t('dashboard.marketing.sections.banners.selectors.campaign')}
              </label>
              <select className="optionsSelector" id="campaign" onChange={(c) => setCampaign(c.target.value)} value={campaign}>
                {campaignOptions.map((campaignOption) => (
                  <option key={campaignOption} value={campaignOption}>
                    {affiliateData.campaigns[campaignOption].description}
                  </option>
                ))}
              </select>
            </div>
            <div className="optionWrap">
              <label htmlFor="page" className="optionsLabel">
                {t('dashboard.marketing.sections.banners.selectors.page')}
              </label>
              <select className="optionsSelector" id="page" onChange={(p) => setPage(p.target.value)} value={page}>
                <option value="registration">Registration Page</option>
                {entity === 'fsa'
                  ? <option value="home">Home Page</option>
                  : null}
              </select>
            </div>
            {sourceOptions.length
              ? (
                <div className="optionWrap">
                  <label htmlFor="source" className="optionsLabel">
                    {t('dashboard.marketing.sections.banners.selectors.source')}
                  </label>
                  <select className="optionsSelector" id="source" onChange={(s) => setSource(s.target.value)} value={source}>
                    <option value="">None</option>
                    {sourceOptions.map((s) => (
                      <option value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              )
              : null }
          </div>
        </div>
        <div className="codeBox">
          <code className="codeSnippet">
            {shareLink}
          </code>
          <button type="button" className="green-cta" onClick={() => copyCode(shareLink)}>
            {t('dashboard.marketing.sections.banners.copy')}
          </button>
        </div>

      </div>
    </div>
  );
}

export default BannerOptionsBox;
