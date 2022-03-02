import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  ChangePasswordPage,
  DocumentVerificationPage,
  EmbedPage,
  LandingPage,
  LoginPage,
  NewPasswordPage,
  RegisterPage,
  ResetPasswordPage,
  VerifyEmailPage,
  VerifyNewEmailPage,
  VerifyEmailPasswordPage,
  CreatePasswordPage,
  SignOutPage,
  QuestionnairePage,
} from '../pages';

const ENTITY = 'fsc';

const GlobalPage = () => (
  <Switch>
    <Route path="/" exact component={() => <LandingPage entity={ENTITY} />} />
    <Route
      path="/login"
      exact
      component={() => <LoginPage entity={ENTITY} />}
    />
    <Route
      path="/register"
      exact
      component={() => <RegisterPage entity={ENTITY} />}
    />
    <Route
      path="/questionnaire"
      exact
      component={() => <QuestionnairePage entity={ENTITY} />}
    />
    <Route
      path="/documents"
      exact
      component={() => <DocumentVerificationPage entity={ENTITY} />}
    />
    <Route
      path="/portal"
      exact
      component={() => <EmbedPage entity={ENTITY} />}
    />
    <Route
      path="/change-password"
      exact
      component={() => <ChangePasswordPage entity={ENTITY} />}
    />
    <Route
      path="/verify-email"
      exact
      component={() => <VerifyEmailPage entity={ENTITY} />}
    />
    <Route
      path="/verify-new-email/:uuid"
      exact
      component={() => <VerifyNewEmailPage entity={ENTITY} />}
    />
    <Route
      path="/password-reset"
      exact
      component={() => <ResetPasswordPage entity={ENTITY} />}
    />
    <Route
      path="/create-password"
      exact
      component={() => <CreatePasswordPage entity={ENTITY} />}
    />
    <Route
      path="/verify-email-password"
      exact
      component={() => <VerifyEmailPasswordPage entity={ENTITY} />}
    />
    <Route
      path="/new-password"
      exact
      component={() => <NewPasswordPage entity={ENTITY} />}
    />
    <Route
      path="/sign-out"
      exact
      component={() => <SignOutPage entity={ENTITY} />}
    />
  </Switch>
);

export default GlobalPage;
