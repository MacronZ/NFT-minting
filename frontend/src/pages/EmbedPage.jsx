import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import '../styles/Embed.scss';
import { useSelector } from 'react-redux';
import { DashboardFooter } from '../components/Dashboard/components';
import { PageLoader } from '../components';
import { userController } from '../controllers';

function EmbedPage({ entity, setUserAuthorized }) {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [url, setUrl] = useState('');
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const appTheme = useSelector((state) => state.theme);

  useEffect(async () => {
    try {
      await userController.checkAuth({ setUserAuthorized });
    } catch (error) {
      history.push('/login');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const currentLanguage = i18n.language;
    try {
      setUrl(await userController.npAutoLogin(user.nullPointId, entity, currentLanguage, appTheme));
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }
  }, [i18n.language]);

  return (
    <>
      {loading && <PageLoader />}
      <iframe className={`frame ${loading && 'd-none'}`} onLoad={() => setLoading(false)} src={url} title="Null Point embed" />
      <DashboardFooter entity={entity} />
    </>
  );
}

export default withRouter(EmbedPage);
