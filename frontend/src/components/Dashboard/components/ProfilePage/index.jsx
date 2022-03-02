import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../../../styles/Dashboard/ProfilePage.scss';
import { Route } from 'react-router-dom';
import PersonalInformationForm from './PersonalInformationForm';
import MyAccountForm from './MyAccountForm';
import CommunicationPreferencesForm from './CommunicationPreferencesForm';
import VerifyForm from './VerifyDocuments';
import LegalDocuments from './LegalDocuments';
import NavigationCard from '../../../NavigationCard';
import DashboardFooter from '../DashboardFooter';

function ProfilePage({ entity }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="profile-page">
        <Route exact path="/dashboard/profile">
          <div className="link-container">
            <NavigationCard title={t('dashboard.settings.personal.title')} description={t('dashboard.settings.personal.subtitle')} svg="personal-information-icon" path="profile/personal-information" />
            <NavigationCard title={t('dashboard.settings.password.title')} description={t('dashboard.settings.password.subtitle')} svg="my-account-icon" path="profile/manage" />
            <NavigationCard title={t('dashboard.settings.communication.title')} description={t('dashboard.settings.communication.subtitle')} svg="communication-icon" path="profile/communication-preferences" />
            <NavigationCard title={t('dashboard.settings.documents.title')} description={t('dashboard.settings.documents.subtitle')} svg="legal-docs-icon" path="profile/legal-documents" />
            <NavigationCard
              title={t('dashboard.settings.verificationDocuments.title')}
              description={t('dashboard.settings.verificationDocuments.subtitle')}
              svg="verification-docs-icon"
              path="profile/verify"
            />
          </div>
        </Route>

        <Route path="/dashboard/profile/personal-information" component={PersonalInformationForm} />
        <Route path="/dashboard/profile/manage" component={MyAccountForm} />
        <Route path="/dashboard/profile/communication-preferences" component={CommunicationPreferencesForm} />
        <Route path="/dashboard/profile/verify" component={VerifyForm} />
        <Route path="/dashboard/profile/legal-documents" component={LegalDocuments} />
      </div>
      <DashboardFooter
        entity={entity}
      />
    </>
  );
}

export default ProfilePage;
