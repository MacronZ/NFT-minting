import React, { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { Menu, Footer } from '../components';
import { VerifyEmail } from '../components/onboarding';
import { userController } from '../controllers';

function VerifyEmailPage({ entity, setUserAuthorized }) {
  const history = useHistory();

  useEffect(async () => {
    try {
      await userController.checkAuth({ setUserAuthorized });
    } catch (error) {
      history.push('/login');
    }
  }, []);

  return (
    <div className="registerPage screen-box">
      <Menu setUserAuthorized={setUserAuthorized} entity={entity} />
      <VerifyEmail />
      <Footer entity={entity} />
    </div>
  );
}

export default withRouter(VerifyEmailPage);
