import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  ChangePasswordPage,
  DashboardPage,
  EmbedPage,
  LandingPage,
  LoginPage,
  NewPasswordPage,
  ResetPasswordPage,
  VerifyEmailPage,
  VerifyNewEmailPage,
  VerifyEmailPasswordPage,
  CreatePasswordPage,
  SignOutPage,
} from '../pages';
import { SupportBar } from '../components';

const entity = 'cysec';

const EuPage = ({ setUserAuthorized, userAuthorized }) => (
  <>
    <SupportBar setUserAuthorized={setUserAuthorized} userAuthorized={userAuthorized} entity={entity} />
    <Switch>
      <Route path="/" exact component={() => <LandingPage setUserAuthorized={setUserAuthorized} entity={entity} />} />
      <Route
        path="/login"
        exact
        component={() => <LoginPage setUserAuthorized={setUserAuthorized} entity={entity} />}
      />
      <Route
        path="/dashboard"
        component={() => <DashboardPage setUserAuthorized={setUserAuthorized} entity={entity} />}
      />
      <Route
        path="/portal"
        exact
        component={() => <EmbedPage setUserAuthorized={setUserAuthorized} entity={entity} />}
      />
      <Route
        path="/change-password"
        exact
        component={() => <ChangePasswordPage setUserAuthorized={setUserAuthorized} entity={entity} />}
      />
      <Route
        path="/verify-email"
        exact
        component={() => <VerifyEmailPage setUserAuthorized={setUserAuthorized} entity={entity} />}
      />
      <Route
        path="/verify-new-email/:uuid"
        exact
        component={() => <VerifyNewEmailPage setUserAuthorized={setUserAuthorized} entity={entity} />}
      />
      <Route
        path="/password-reset"
        exact
        component={() => <ResetPasswordPage setUserAuthorized={setUserAuthorized} entity={entity} />}
      />
      <Route
        path="/create-password"
        exact
        component={() => <CreatePasswordPage setUserAuthorized={setUserAuthorized} entity={entity} />}
      />
      <Route
        path="/verify-email-password"
        exact
        component={() => <VerifyEmailPasswordPage setUserAuthorized={setUserAuthorized} entity={entity} />}
      />
      <Route
        path="/new-password"
        exact
        component={() => <NewPasswordPage setUserAuthorized={setUserAuthorized} entity={entity} />}
      />
      <Route
        path="/sign-out"
        exact
        component={() => <SignOutPage setUserAuthorized={setUserAuthorized} entity={entity} />}
      />
    </Switch>
  </>
);

export default EuPage;
