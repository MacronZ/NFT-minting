import React, { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { Menu, Header, Footer } from '../components';
import {
  Partner, Slider, Partnership, Accounts, LogoBar,
} from '../components/landingPage';
import { routerHelper } from '../helpers';

function LandingPage({ entity, setUserAuthorized }) {
  const history = useHistory();

  useEffect(async () => {
    window.scrollTo(0, 0);
    const reroute = await routerHelper.reroute();
    if (reroute !== null) {
      history.push(reroute);
    }
  }, []);

  return (
    <>
      <div className="home landing-screen-box">
        <Menu setUserAuthorized={setUserAuthorized} entity={entity} />
        <Header entity={entity} />
        {entity === 'cysec' ? null
          : <Partner />}
        <Slider />
        <Partnership />
        {entity === 'cysec' ? null
          : <Accounts />}
        <LogoBar />
        <Footer entity={entity} />
      </div>
    </>
  );
}

export default withRouter(LandingPage);
