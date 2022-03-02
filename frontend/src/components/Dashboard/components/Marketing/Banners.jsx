import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../../styles/Dashboard/Banners.scss';
import SingleBanner from './SingleBanner';
import BannerOptionsBox from './BannerOptionsBox';
import { bannerList, languageOptions, sizeOptions } from '../../../../utils/bannerOptions';
import { bannerHelper } from '../../../../helpers';

const Banners = ({ entity }) => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState('all');
  const [size, setSize] = useState({ width: '300', height: '250' });
  const [theme, setTheme] = useState('all');
  const [showPopupOptions, setShowPopupOptions] = useState(false);
  const [popupOptions, setPopupOptions] = useState({});
  const [banners, setBanners] = useState([{
    language,
    size,
    theme,
  }]);

  useEffect(async () => {
    if (language === 'all' && theme === 'all') {
      const newBanners = await bannerHelper.getAllBanners(size);
      setBanners(newBanners);
    } else if (language === 'all') {
      const newBanners = await bannerHelper.getAllLanguageBanners(size, theme);
      setBanners(newBanners);
    } else if (theme === 'all') {
      const newBanners = await bannerHelper.getAllThemeBanners(size, language);
      setBanners(newBanners);
    } else {
      const newBanners = await bannerHelper.getOneBanner(size, language, theme);
      setBanners(newBanners);
    }
  }, [language, size, theme]);

  function showBannerOptions(options) {
    setShowPopupOptions(true);
    setPopupOptions(options);
  }

  return (
    <div className="banners">
      {showPopupOptions ? (
        <BannerOptionsBox
          closeForm={() => setShowPopupOptions(false)}
          theme={popupOptions.theme}
          size={popupOptions.size}
          language={popupOptions.language}
          entity={entity}
        />
      ) : null}
      <div className="bannerSelectors">
        <div className="selector">
          <label htmlFor="language" className="optionsLabel">
            {t('dashboard.marketing.sections.banners.selectors.language')}
          </label>
          <select
            className="optionsSelector"
            id="language"
            onChange={(l) => setLanguage(l.target.value)}
            value={language}
          >
            <option value="all">All</option>
            {languageOptions.map((languageOption) => (
              <option value={languageOption.key}>{languageOption.name}</option>
            ))}
          </select>
        </div>

        <div className="selector">
          <label htmlFor="size" className="optionsLabel">
            {t('dashboard.marketing.sections.banners.selectors.size')}
          </label>
          <select
            className="optionsSelector"
            id="size"
            onChange={(s) => {
              const sizeValue = s.target.value.split('x');
              setSize({ width: sizeValue[0], height: sizeValue[1] });
            }}
            value={`${size.width}x${size.height}`}
          >
            {sizeOptions.map((sizeOption) => (
              <option
                data-width={sizeOption.width}
                data-height={sizeOption.height}
                value={`${sizeOption.width}x${sizeOption.height}`}
              >
                {sizeOption.width}
                x
                {sizeOption.height}
              </option>
            ))}
          </select>
        </div>
        <div className="selector">
          <label htmlFor="theme" className="optionsLabel">
            {t('dashboard.marketing.sections.banners.selectors.theme')}
          </label>
          <select
            className="optionsSelector"
            id="theme"
            onChange={(l) => setTheme(l.target.value)}
            value={theme}
          >
            <option value="all">All</option>
            {bannerList.map((themeOption) => (
              <option value={themeOption.theme.key}>{themeOption.theme.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="bannersBox">
        {banners.length > 0 ? banners.map((options) => (
          <div
            className="singleBannerBox"
            key={options.theme + options.size.height + options.size.width + options.language}
            role="button"
            tabIndex="0"
            onClick={() => showBannerOptions(options)}
            onKeyDown={() => showBannerOptions(options)}
          >
            <SingleBanner
              theme={options.theme}
              size={options.size}
              language={options.language}
            />
          </div>
        ))
          : <h1 className="noResult">{t('dashboard.marketing.sections.banners.noResult')}</h1>}
      </div>
    </div>
  );
};

export default Banners;
