import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../../../styles/Dashboard/VirtualTour/VirtualTourPopover.scss';
import 'react-phone-number-input/style.css';
import Button from '../../../Button';
import Popup from '../../../Popup';

export default function VirtualTourPopover({ showPopup, closePopup }) {
  const { t } = useTranslation();

  return (
    <div className="virtual-tour-popover">
      <Popup showPopup={showPopup} closePopup={closePopup}>
        <h2 className="title">{t('supportForm.title')}</h2>
        <p className="subtitle">{t('supportForm.subTitle')}</p>
        <Button secondaryColor formButton text={t('submit')} />
      </Popup>
    </div>
  );
}
