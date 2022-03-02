import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTour } from '@reactour/tour';
import '../../../../styles/Dashboard/VirtualTour/VirtualTourPopup.scss';
import 'react-phone-number-input/style.css';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StartTour } from '../../../../media/images/icons';
import Button from '../../../Button';
import Popup from '../../../Popup';
import {
  genericStyles,
  genericStylesDark,
  sideMenuStyles,
  sideMenuStylesDark,
} from '../../../../utils/tourSteps';

export default function VirtualTourPopup({ showPopup, closePopup }) {
  const { t } = useTranslation();
  const { setIsOpen, setCurrentStep, setSteps } = useTour();
  const history = useHistory();
  const getTheme = useSelector((state) => state.theme);

  const sideMenuStylesToApply = getTheme === 'dark' ? sideMenuStylesDark : sideMenuStyles;
  const genericStylesToApply = getTheme === 'dark' ? genericStylesDark : genericStyles;

  const tourSteps = [
    {
      selector: '#home-side-menu',
      content: t('virtualTour.steps.dashboard'),
      styles: sideMenuStylesToApply,
    },
    {
      selector: '#wallet-side-menu',
      content: t('virtualTour.steps.wallet'),
      styles: sideMenuStylesToApply,
    },
    {
      selector: '#marketing-side-menu',
      content: t('virtualTour.steps.marketing'),
      styles: sideMenuStylesToApply,
    },
    {
      selector: '#tools-side-menu',
      content: t('virtualTour.steps.tradingTools'),
      styles: sideMenuStylesToApply,
    },
    {
      selector: '#education-side-menu',
      content: t('virtualTour.steps.education'),
      styles: sideMenuStylesToApply,
    },
    {
      selector: '#analytics-side-menu',
      content: t('virtualTour.steps.analytics'),
      styles: sideMenuStylesToApply,
    },
    {
      selector: '#products-side-menu',
      content: t('virtualTour.steps.products'),
      styles: sideMenuStylesToApply,
    },
    {
      selector: '#promo-side-menu',
      content: t('virtualTour.steps.promos'),
      styles: sideMenuStylesToApply,
    },
    {
      selector: '#create-new-ib-deal-box',
      content: t('virtualTour.steps.createDeal'),
      styles: genericStylesToApply,
    },
    {
      selector: '#wallet-balance-box',
      content: t('virtualTour.steps.balance'),
      styles: genericStylesToApply,
    },
    {
      selector: '#your-partner-link-box',
      content: t('virtualTour.steps.partnerLinks'),
      styles: genericStylesToApply,
    },
    {
      selector: '#language-selector-box',
      content: t('virtualTour.steps.language'),
      styles: genericStylesToApply,
    },
    {
      selector: '#settings-selector-box',
      content: t('virtualTour.steps.settings'),
      styles: genericStylesToApply,
    },
  ];

  const startTour = () => {
    history.push('/dashboard');
    closePopup();
    setCurrentStep(0);
    setSteps(tourSteps);
    setIsOpen(true);
  };

  return (
    <div className="virtual-tour-popup">
      <Popup showPopup={showPopup} closePopup={closePopup}>
        <img src={StartTour} className="icon" alt="Goggles" />
        <h2 className="title">{t('virtualTour.title')}</h2>
        <p className="subtitle">{t('virtualTour.subTitle')}</p>
        <Button secondaryColor loading={false} text={t('Start')} action={() => startTour()} />
      </Popup>
    </div>
  );
}
