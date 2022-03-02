import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { Menu, Footer } from '../components';
import { UserData } from '../components/onboarding';
import { routerHelper } from '../helpers';
import { userController } from '../controllers';

function DocumentVerificationPage({ entity, setUserAuthorized }) {
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(async () => {
    window.scrollTo(0, 0);

    try {
      await userController.checkAuth({ setUserAuthorized });
    } catch (error) {
      await history.push('/login');
      return;
    }

    const reroute = await routerHelper.reroute();
    if (reroute !== null) {
      await history.push(reroute);
    } else {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  return (
    <div className="screen-box">
      <Menu setUserAuthorized={setUserAuthorized} entity={entity} />
      <UserData user={user} />
      <Footer entity={entity} />
    </div>
  );
}

export default withRouter(DocumentVerificationPage);
