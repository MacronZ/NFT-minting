import React from 'react';
import { Menu, Footer } from '../components';
import { ChangePassword } from '../components/onboarding';

export default function ChangePasswordPage({ entity, setUserAuthorized }) {
  return (
    <div className="changePasswordPage screen-box">
      <Menu setUserAuthorized={setUserAuthorized} entity={entity} />
      <ChangePassword />
      <Footer entity={entity} />
    </div>
  );
}
