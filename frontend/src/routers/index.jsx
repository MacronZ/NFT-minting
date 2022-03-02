import React, { useEffect, useState } from 'react';
import {
  Route, Switch, BrowserRouter, Redirect,
} from 'react-router-dom';
import IntPage from './InternationalPage';
import { CookiePopup } from '../components/landingPage';
import EuPage from './EUPage';

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [userAuthorized, setUserAuthorized] = useState(false);

  function handleAuthChange(newState) {
    setUserAuthorized(newState);
  }

  useEffect(async () => {
    setLoading(false);
  }, []);

  return (
    <div className="App" id="app-root">
      {!loading && (
        <>
          <Switch>
            {window.location.hostname === 'portal.axiancepartnerseu.com'
              ? (
                <Route path="/">
                  <BrowserRouter basename="/">
                    <EuPage userAuthorized={userAuthorized} setUserAuthorized={handleAuthChange} />
                  </BrowserRouter>
                </Route>
              )
              : (
                <>
                  <Route exact path="/">
                    <Redirect to="/int" />
                  </Route>
                  <Route path="/int">
                    <BrowserRouter basename="/int">
                      <IntPage userAuthorized={userAuthorized} setUserAuthorized={setUserAuthorized} />
                    </BrowserRouter>
                  </Route>
                </>
              )}
          </Switch>
          <CookiePopup />
        </>
      )}
    </div>
  );
};

export default Index;
