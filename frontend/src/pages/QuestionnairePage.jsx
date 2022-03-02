import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { Footer, Menu } from '../components';
import { Questionnaire } from '../components/onboarding';
import { routerHelper } from '../helpers';
import { userController } from '../controllers';

function QuestionnairePage({ entity, setUserAuthorized }) {
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(async () => {
    try {
      await userController.checkAuth({ setUserAuthorized });
    } catch (error) {
      history.push('/login');
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
      <Questionnaire user={user} />
      <Footer entity={entity} />
    </div>
  );
}

export default withRouter(QuestionnairePage);
