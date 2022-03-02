import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../../styles/Dashboard/WebSideMenu.scss';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ThemeChanger from '../../../ThemeChanger';

const SideMenuItem = ({
  svg, name, path, id, locked,
}) => {
  const location = useLocation();
  const isActive = location.pathname === path || (path !== '/dashboard' && location.pathname.indexOf(path) !== -1);
  const getTheme = useSelector((state) => state.theme);
  const isItDark = getTheme === 'dark' ? '-dark' : '';

  return (
    <Link className={`nd-side-menu-item ${isActive ? 'active' : ''}`} to={path} role="button" tabIndex={0}>
      {locked ? (
        <img src="/assets/dashboard/locked-icon.svg" id={id} alt={svg} />
      ) : (
        <img src={`/assets/dashboard/${svg}-icon${isActive ? '-active' : isItDark}.svg`} id={id} alt={svg} />
      )}
      <span className={`nd-name-side-menu ${isActive ? 'active' : ''}`}>{name}</span>
    </Link>
  );
};

const WebSideMenu = ({ locked }) => {
  const { t } = useTranslation();

  return (
    <div className="nd-side-menu">
      <SideMenuItem name={t('dashboard.sideMenu.dashboard')} svg="dashboard" id="home-side-menu" path="/dashboard" />
      <SideMenuItem name={t('dashboard.sideMenu.wallet')} locked={locked} svg="wallet" id="wallet-side-menu" path="/dashboard/wallet" />
      <SideMenuItem name={t('dashboard.sideMenu.marketing')} locked={locked} svg="promo" id="marketing-side-menu" path="/dashboard/marketing" />
      <SideMenuItem name={t('dashboard.sideMenu.tradingTools')} locked={locked} svg="trading-tools" id="tools-side-menu" path="/dashboard/trading-tools" />
      <SideMenuItem name={t('dashboard.sideMenu.education')} svg="education" id="education-side-menu" path="/dashboard/education" />
      <SideMenuItem name={t('dashboard.sideMenu.analytics')} locked={locked} svg="portal" id="analytics-side-menu" path="/dashboard/portal" />
      <SideMenuItem name={t('dashboard.sideMenu.products')} svg="products" id="products-side-menu" path="/dashboard/products" />
      <SideMenuItem name={t('dashboard.sideMenu.promo&clubs')} svg="club" id="promo-side-menu" path="/dashboard/promo-clubs" />
      <div className="side-menu-toggle">
        <ThemeChanger />
      </div>
    </div>
  );
};

export default WebSideMenu;
