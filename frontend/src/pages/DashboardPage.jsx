import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { PageLoader } from '../components';
import Layout from '../components/Dashboard/layout';
import '../styles/Dashboard/Dashboard.scss';
import {
  Analytics,
  MarketingDarkBlur,
  MarketingLightBlur,
  TradingToolsDarkBlur,
  TradingToolsLightBlur,
  WalletDarkBlur,
  WalletLightBlur,
} from '../media/images/infographics';
import {
  ClubPage,
  DashboardHome,
  EducationPage,
  LockedModal,
  MarketingPage,
  ProductsPage,
  TradingToolsPage,
  WalletPage,
} from '../components/Dashboard/components';
import ProfilePage from '../components/Dashboard/components/ProfilePage/index';
import EmbedPage from './EmbedPage';
import { userController } from '../controllers';

export default function DashboardPage({ entity, setUserAuthorized }) {
  const { enqueueSnackbar } = useSnackbar();
  const [dataLoading, setDataLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [locked, setLocked] = useState(false);
  const history = useHistory();
  const getTheme = useSelector((state) => state.theme);

  useEffect(async () => {
    const user = await JSON.parse(localStorage.getItem('user'));
    if (user && user.status.toUpperCase() !== 'ACTIVE') setLocked(true);
    setUserData(user);
    try {
      await userController.checkAuth({ setUserAuthorized });
      if (user.status.toUpperCase() === 'ACTIVE') await userController.getAffiliateDetails(user.uuid, entity, setUserAuthorized);
    } catch (error) {
      enqueueSnackbar('Your session has expired, please re-login.', {
        variant: 'error',
      });
      history.push('/login');
    }
    setDataLoading(false);
  }, []);

  const marketingBackgroundSelector = getTheme === 'dark' ? MarketingDarkBlur : MarketingLightBlur;
  const tradingToolsBackgroundSelector = getTheme === 'dark' ? TradingToolsDarkBlur : TradingToolsLightBlur;
  const walletBackgroundSelector = getTheme === 'dark' ? WalletDarkBlur : WalletLightBlur;

  return (
    <div className="root-dashboard">
      {dataLoading
        ? <PageLoader />
        : (

          <Layout locked={locked} entity={entity} user={userData} setUserAuthorized={setUserAuthorized}>
            <Switch>
              <Route path="/dashboard" exact component={() => <DashboardHome locked={locked} entity={entity} user={userData} />} />
              <Route path="/dashboard/education" exact component={() => <EducationPage entity={entity} />} />
              <Route path="/dashboard/products" exact component={() => <ProductsPage entity={entity} />} />
              <Route path="/dashboard/profile" component={() => <ProfilePage entity={entity} />} />
              <Route path="/dashboard/promo-clubs" exact component={() => <ClubPage entity={entity} />} />
              {locked ? (
                <>
                  <Route path="/dashboard/marketing" exact component={() => <LockedModal background={marketingBackgroundSelector} />} />
                  <Route path="/dashboard/trading-tools" exact component={() => <LockedModal background={tradingToolsBackgroundSelector} />} />
                  <Route path="/dashboard/portal" exact component={() => <LockedModal background={Analytics} />} />
                  <Route path="/dashboard/wallet" exact component={() => <LockedModal background={walletBackgroundSelector} />} />
                </>
              ) : (
                <>
                  <Route path="/dashboard/marketing" exact component={() => <MarketingPage entity={entity} />} />
                  <Route path="/dashboard/trading-tools" exact component={() => <TradingToolsPage entity={entity} />} />
                  <Route path="/dashboard/portal" exact component={() => <EmbedPage setUserAuthorized={setUserAuthorized} entity={entity} />} />
                  <Route path="/dashboard/wallet" component={() => <WalletPage entity={entity} />} />
                </>
              )}
            </Switch>
          </Layout>
        )}
    </div>
  );
}
