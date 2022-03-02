import React from 'react';
import { Menu, Footer } from '../components';
import { Register } from '../components/onboarding';

export default function RegisterPage({ entity, setUserAuthorized }) {
  return (
    <>
      <div className="registerPage screen-box">
        <Menu setUserAuthorized={setUserAuthorized} entity={entity} />
        <Register setUserAuthorized={setUserAuthorized} entity={entity} />
        <Footer entity={entity} />
      </div>
    </>
  );
}
