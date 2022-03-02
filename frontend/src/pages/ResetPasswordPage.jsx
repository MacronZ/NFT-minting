import React from 'react';
import { Menu, Footer } from '../components';
import { ResetPassword } from '../components/onboarding';

export default function ResetPasswordPage({ entity, setUserAuthorized }) {
  return (
    <>
      <div className="changePasswordPage screen-box">
        <Menu setUserAuthorized={setUserAuthorized} entity={entity} />
        <ResetPassword />
        <Footer entity={entity} />
      </div>
    </>
  );
}
