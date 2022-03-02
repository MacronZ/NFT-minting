import React from 'react';
import { useParams } from 'react-router-dom';
import { Menu, Footer } from '../components';
import { VerifyNewEmail } from '../components/onboarding';

export default function VerifyNewEmailPage({ entity, setUserAuthorized }) {
  const { uuid } = useParams();

  return (
    <div className="registerPage screen-box">
      <Menu setUserAuthorized={setUserAuthorized} entity={entity} />
      <VerifyNewEmail uuid={uuid} />
      <Footer entity={entity} />
    </div>
  );
}
