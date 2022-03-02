import React, { useEffect, useState } from 'react';
import '../../../styles/Dashboard/Widgets.scss';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PageLoader } from '../..';
import { tradingCentralController } from '../../../controllers';

const tradingCentralUrlLightMode = process.env.REACT_APP_TRADING_CENTRAL_LIGHT_MODE_URL;
const tradingCentralUrlDarkMode = process.env.REACT_APP_TRADING_CENTRAL_DARK_MODE_URL;

const TCIFrame = ({ name, page }) => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();
  const getTheme = useSelector((state) => state.theme);
  const tradingCentralUrl = getTheme === 'dark' ? tradingCentralUrlDarkMode : tradingCentralUrlLightMode;

  const setLanguageCode = (lang) => {
    switch (lang) {
      case 'gr': return 'el';
      case 'cn': return 'ct';
      default: return lang;
    }
  };

  useEffect(async () => {
    const user = await JSON.parse(localStorage.getItem('user'));
    setToken(await tradingCentralController.getToken(page, user.uuid, setLanguageCode(i18n.language)));
  }, [name, page, i18n.language]);

  return (
    <div className="nd-widget-container">
      {loading && <PageLoader />}
      <iframe
        title={name}
        className={`frame ${loading && 'd-none'}`}
        onLoad={() => setLoading(false)}
        src={`${tradingCentralUrl}?tkn=${
          token
        }`}
      />
    </div>
  );
};

export default TCIFrame;
