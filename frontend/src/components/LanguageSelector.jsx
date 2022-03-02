import React, { useEffect } from 'react';
import '../styles/components/LanguageSelector.scss';
import {
  Select, MenuItem, withStyles,
} from '@material-ui/core';
import Flags from 'country-flag-icons/react/3x2';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { userController } from '../controllers';

export default function LanguageSelector({ selected, setSelected, userUuid }) {
  const { i18n } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const updateDb = async (language) => {
    try {
      if (userUuid) await userController.updateUser(userUuid, { language });
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }
  };

  useEffect(async () => {
    if (i18n.language === 'ar') document.body.dir = 'rtl';
    else document.body.dir = 'ltr';
  }, [i18n.language]);

  const changeLanguage = (event) => {
    setSelected(event.target.value);
    i18n.changeLanguage(event.target.value);
    localStorage.setItem('language', JSON.stringify(event.target.value));
    updateDb(event.target.value);
  };

  const CustomMenuItem = withStyles(() => ({
    root: {
      fontSize: '12px',
    },
  }))(MenuItem);

  const CustomSelect = withStyles(() => ({
    root: {
      fontSize: '14px',
    },
  }))(Select);

  return (
    <>
      <CustomSelect
        value={selected}
        onChange={changeLanguage}
        id="language"
        disableUnderline
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}
      >
        <CustomMenuItem value="en">
          <Flags.US title="English" className="country-flag" />
          English
        </CustomMenuItem>
        <CustomMenuItem value="gr">
          <Flags.GR title="Greek" className="country-flag" />
          Ελληνικά
        </CustomMenuItem>
        <CustomMenuItem value="es">
          <Flags.ES title="Spanish" className="country-flag" />
          Español
        </CustomMenuItem>
        <CustomMenuItem value="it">
          <Flags.IT title="Italian" className="country-flag" />
          Italiano
        </CustomMenuItem>
        <CustomMenuItem value="pl">
          <Flags.PL title="Polish" className="country-flag" />
          Polski
        </CustomMenuItem>
        <CustomMenuItem value="pt">
          <Flags.PT title="Portuguese" className="country-flag" />
          Português
        </CustomMenuItem>
        <CustomMenuItem value="ru">
          <Flags.RU title="Russian" className="country-flag" />
          Русский
        </CustomMenuItem>
        <CustomMenuItem value="cn">
          <Flags.CN title="Chinese" className="country-flag" />
          中文
        </CustomMenuItem>
        <CustomMenuItem value="ar">
          <Flags.AR title="Arabic" className="country-flag" />
          العربية
        </CustomMenuItem>
      </CustomSelect>
    </>
  );
}
