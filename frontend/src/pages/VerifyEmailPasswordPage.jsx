import React from 'react';
import { Menu, Footer } from '../components';
import { VerifyEmailPassword } from '../components/onboarding';

export default function VerifyEmailPasswordPage({ entity, setUserAuthorized }) {
  return (
    <div className="registerPage screen-box">
      <Menu setUserAuthorized={setUserAuthorized} entity={entity} />
      <VerifyEmailPassword />
      <Footer entity={entity} />
    </div>
  );
}
