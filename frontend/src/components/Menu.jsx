import React, { useState, useEffect } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { elastic as Burger } from 'react-burger-menu';
import { Select, MenuItem, InputLabel } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Settings, Help, ExitToApp } from '@material-ui/icons';
import Cookies from 'universal-cookie';
import LanguageSelector from './LanguageSelector';
import SupportForm from './SupportForm';
import Logo from '../media/images/logo.png';
import '../styles/Menu.scss';

function Menu({ entity, setUserAuthorized }) {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { i18n, t } = useTranslation();
  const history = useHistory();

  function hideSupportForm() {
    setShowPopup(false);
  }

  function logoutUser(event) {
    const cookies = new Cookies();
    event.preventDefault();
    localStorage.clear();
    document.body.classList.remove('dark-mode');
    setUserAuthorized(false);
    cookies.remove('token', { path: '/' });
    history.push('/login');
  }

  useEffect(() => {
    if (localStorage && localStorage.getItem('isLoggedIn')) {
      setIsLoggedIn(JSON.parse(localStorage.getItem('isLoggedIn')));
    }
  }, [i18n.language]);

  useEffect(async () => {
    const storedLanguage = await JSON.parse(localStorage.getItem('language'));
    setSelectedLanguage(storedLanguage || 'en');
    i18n.changeLanguage(storedLanguage || 'en');
  }, []);

  if (isMobile) {
    return (
      <div className="menu">
        <SupportForm showPopup={showPopup} closeForm={hideSupportForm} entity={entity} />
        <div className="menu-inner container">
          {isLoggedIn ? (
            <Link className="menu-item" to="/">
              <img
                src={Logo}
                className="logo"
                width="200"
                height="52"
                alt="Logo"
              />
            </Link>
          ) : (
            <Link className="menu-item" to="/">
              <img
                src={Logo}
                width="150"
                height="40"
                className="logo"
                alt="Logo"
              />
            </Link>
          )}

          <Burger outerContainerId="root" right>
            <div className="mobile-menu-items">
              <img
                src={Logo}
                width="150"
                height="40"
                className="logo"
                alt="Logo"
              />
              {isLoggedIn ? (null) : (
                <>
                  <Link className="menu-item white-cta" to="/login">
                    {t('menu.signIn')}
                  </Link>
                  {entity === 'cysec'
                    ? null : (
                      <Link className="menu-item green-cta" to="/register">
                        {t('menu.register')}
                      </Link>
                    )}
                </>
              )}
              <div className="icons-box">
                <LanguageSelector selected={selectedLanguage} setSelected={setSelectedLanguage} />
                {isLoggedIn ? (
                  <>
                    <InputLabel className="settings-label" id="settings">
                      <Settings className="settings-icon" />
                    </InputLabel>
                    <Select labelId="settings" value="" className="menu-selector" id="select">
                      <MenuItem>
                        <Link className="settings-link" to="/change-password">
                          {t('menu.changePassword')}
                        </Link>
                      </MenuItem>
                    </Select>
                  </>
                ) : (null)}

                <button
                  type="button"
                  className="help"
                  name="support"
                  onClick={() => {
                    setShowPopup(!showPopup);
                  }}
                >
                  <Help className="help-icon" />
                </button>
                {isLoggedIn ? (
                  <button type="button" className="logout" onClick={logoutUser}>
                    <ExitToApp className="exit-icon" />
                  </button>
                ) : (
                  ''
                )}
              </div>
            </div>
          </Burger>
        </div>
      </div>
    );
  }
  return (
    <div>
      <SupportForm showPopup={showPopup} closeForm={hideSupportForm} entity={entity} />
      <div className="menu">

        {isLoggedIn ? (
          <div className="menu-inner container">
            <Link className="menu-item" to="/">
              <img src={Logo} className="logo" width="200" height="52" alt="Logo" />
            </Link>
            <div className="menu-items">
              <LanguageSelector selected={selectedLanguage} setSelected={setSelectedLanguage} />
              <InputLabel className="settings-label" id="settings">
                <Settings className="menu-item" />
              </InputLabel>
              <Select labelId="settings" value="" className="menu-selector" id="select">
                <MenuItem>
                  <Link className="settings-link" to="/change-password">{t('menu.changePassword')}</Link>
                </MenuItem>
              </Select>
              <button type="button" className="help" name="support" onClick={() => { setShowPopup(!showPopup); }}>
                <Help className="help-icon" />
              </button>
              <button type="button" className="logout" onClick={logoutUser}>
                <ExitToApp />
              </button>
            </div>
          </div>

        ) : (
          <div className="menu-inner container">
            <Link className="menu-item" to="/">
              <img src={Logo} className="logo" width="200" height="52" alt="Logo" />
            </Link>
            <div className="menu-items">
              <Link className="menu-item white-cta" to="/login">
                {t('menu.signIn')}
              </Link>
              {entity === 'cysec'
                ? null : (
                  <Link className="menu-item green-cta" to="/register">
                    {t('menu.register')}
                  </Link>
                )}
              <LanguageSelector selected={selectedLanguage} setSelected={setSelectedLanguage} />
              <button type="button" className="help" name="support" onClick={() => { setShowPopup(!showPopup); }}>
                <Help className="help-icon" />
              </button>
            </div>
          </div>

        )}

      </div>
    </div>
  );
}
export default withRouter(Menu);
