import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { elastic as Burger } from 'react-burger-menu';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
import { useSelector } from 'react-redux';
import SettingsIcon from '../../../media/images/icons/settings.svg';
import LogoutIcon from '../../../media/images/icons/logout.svg';
import '../../../styles/Dashboard/BurgerMenu.scss';
import LanguageSelector from '../../LanguageSelector';
import ThemeChanger from '../../../ThemeChanger';
import SettingsIconDark from '../../../media/images/icons/settings-dark.svg';
import LogoutIconDark from '../../../media/images/icons/logout-dark.svg';

const BurgerMenuItem = ({
  svg, name, path, click, locked,
}) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  const getTheme = useSelector((state) => state.theme);
  const isItDark = getTheme === 'dark' ? '-dark' : '';

  return (
    <Link className={`nd-burger-menu-item ${isActive ? 'active' : ''}`} to={path} role="button" tabIndex={0} onClick={click}>
      {locked ? (
        <img src="/assets/dashboard/locked-icon.svg" id={name} alt={svg} />
      ) : (
        <img src={`/assets/dashboard/${svg}-icon${isActive ? '-active' : isItDark}.svg`} id={name} alt={svg} />
      )}
      <span className="nd-name">{name}</span>
    </Link>
  );
};

const BurgerMenu = ({ user, setUserAuthorized, locked }) => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const { i18n } = useTranslation();
  const getTheme = useSelector((state) => state.theme);
  const history = useHistory();
  const onMenuClick = () => {
    setMenuOpen(false);
  };

  function logOutUser(event) {
    const cookies = new Cookies();
    event.preventDefault();
    localStorage.clear();
    document.body.classList.remove('dark-mode');
    setUserAuthorized(false);
    cookies.remove('token', { path: '/' });
    history.push('/login');
  }

  useEffect(async () => {
    const storedLanguage = await JSON.parse(localStorage.getItem('language'));
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  const setSelectSettingsIcon = () => {
    if (getTheme === 'dark') {
      return (
        <img src={SettingsIconDark} alt="settings-dark" id="settings-selector-box" />
      );
    }
    return (
      <img
        id="settings-selector-box"
        src={SettingsIcon}
        alt="settings"
      />
    );
  };

  const setSelectLogoutIcon = () => {
    if (getTheme === 'dark') {
      return (
        <img
          src={LogoutIconDark}
          className="logout-icon"
          alt="logout-dark"
          title="Log out"
        />
      );
    }
    return (
      <img
        src={LogoutIcon}
        className="logout-icon"
        alt="logout"
        title="Log out"
      />
    );
  };

  return (
    <div className="nd-burger-menu">
      <Burger isOpen={menuOpen} onClose={() => setMenuOpen(false)} onOpen={() => setMenuOpen(true)}>
        <BurgerMenuItem name={t('dashboard.sideMenu.dashboard')} svg="dashboard" path="/dashboard/" click={onMenuClick} />
        <BurgerMenuItem name={t('dashboard.sideMenu.wallet')} svg="wallet" path="/dashboard/wallet" locked={locked} click={onMenuClick} />
        <BurgerMenuItem name={t('dashboard.sideMenu.marketing')} svg="promo" path="/dashboard/marketing" locked={locked} click={onMenuClick} />
        <BurgerMenuItem name={t('dashboard.sideMenu.tradingTools')} svg="trading-tools" path="/dashboard/trading-tools" locked={locked} click={onMenuClick} />
        <BurgerMenuItem name={t('dashboard.sideMenu.education')} svg="education" path="/dashboard/education" click={onMenuClick} />
        <BurgerMenuItem name={t('dashboard.sideMenu.analytics')} svg="portal" path="/dashboard/portal" locked={locked} click={onMenuClick} />
        <BurgerMenuItem name={t('dashboard.sideMenu.products')} svg="products" path="/dashboard/products" click={onMenuClick} />
        <BurgerMenuItem name={t('dashboard.sideMenu.promo&clubs')} svg="club" path="/dashboard/promo-clubs" click={onMenuClick} />
        <div className="side-menu-toggle">
          <ThemeChanger />
        </div>
        <div className="tools-section">
          <div className="vertical-separator">
            <LanguageSelector selected={selectedLanguage} setSelected={setSelectedLanguage} userUuid={user.uuid} />
          </div>
          <div className="vertical-separator">
            <Link to="/dashboard/profile" className="nd-setting-icon">
              {setSelectSettingsIcon()}
            </Link>
          </div>
          <div
            onClick={logOutUser}
            onKeyDown={logOutUser}
            role="button"
            tabIndex="0"
          >
            {setSelectLogoutIcon()}
          </div>
        </div>
      </Burger>
    </div>
  );
};

export default BurgerMenu;
