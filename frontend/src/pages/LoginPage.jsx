import React from 'react';
import { Menu, Footer } from '../components';
import { Login } from '../components/onboarding';

export default function LoginPage({ entity, setUserAuthorized }) {
  return (
    <>
      <div className="login screen-box">
        <Menu setUserAuthorized={setUserAuthorized} entity={entity} />
        <Login setUserAuthorized={setUserAuthorized} entity={entity} />
        <Footer entity={entity} />
      </div>
    </>
  );
}
