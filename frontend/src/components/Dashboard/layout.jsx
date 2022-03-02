import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import SettingsIcon from '../../media/images/icons/settings.svg';
import LogoutIcon from '../../media/images/icons/logout.svg';
import SettingsIconDark from '../../media/images/icons/settings-dark.svg';
import LogoutIconDark from '../../media/images/icons/logout-dark.svg';
import MiniBalanceLabel from './components/MiniBalanceLabel';
import WebSideMenu from './components/WebSideMenu';
import ProfileLabel from './components/ProfileLabel';
import BurgerMenu from './components/BurgerMenu';
import SupportForm from '../SupportForm';
import LanguageSelector from '../LanguageSelector';
import { VirtualTourPopup } from './components/VirtualTour';
import DarkIcon from '../../media/images/logos/axianceDark.svg';
import { OnboardingProgress } from './components';
import { userController } from '../../controllers';

function Layout({
  children, user, entity, setUserAuthorized, locked,
}) {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const { enqueueSnackbar } = useSnackbar;
  const { i18n } = useTranslation();
  const history = useHistory();
  const getTheme = useSelector((state) => state.theme);

  function hideSupportForm() {
    setShowPopup(false);
    setShowVirtualTour(false);
  }

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
    } else {
      const userLanguage = user.language;
      localStorage.setItem('language', JSON.stringify(userLanguage));
      setSelectedLanguage(userLanguage);
      i18n.changeLanguage(userLanguage);
    }
  }, []);

  useEffect(async () => {
    if (user && !user.walkThroughCompleted) {
      setShowVirtualTour(true);
      try {
        await userController.tourCompleted(true);
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    }
  }, [user]);

  const setSelectLogo = () => {
    if (getTheme === 'dark') {
      return (
        <img src={DarkIcon} alt="close" />
      );
    }
    return (
      <img src="https://client.axiance.com/static/media/logo.5683ce9d.svg" alt="axiance" />
    );
  };

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
    <>
      <VirtualTourPopup showPopup={showVirtualTour} closePopup={hideSupportForm} />
      <SupportForm showPopup={showPopup} closeForm={hideSupportForm} entity={entity} />
      <div className="new-dashboard">
        <div className="nd-header">
          <div className="nd-left-hand-side">
            <div className="nd-logo">
              {setSelectLogo()}
            </div>

            <ProfileLabel user={user} />

            <MiniBalanceLabel locked={locked} />

          </div>
          <div className="nd-right-hand-side">
            <div className="vertical-separator" id="language-selector-box">
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
        </div>
        {locked && <OnboardingProgress user={user} />}
        <div className="nd-mobile-header">
          <div className="nd-burger-menu-trigger">
            <BurgerMenu user={user} setUserAuthorized={setUserAuthorized} locked={locked} />
          </div>
          <div className="nd-logo">
            {setSelectLogo()}
          </div>
          <MiniBalanceLabel locked={locked} />
        </div>
        <div className="nd-container">
          <WebSideMenu locked={locked} />
          <div className="nd-content">
            <div className="nd-widgets-area">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
