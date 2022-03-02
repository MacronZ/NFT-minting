import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../../../styles/Dashboard/WalletPage.scss';
import { Route } from 'react-router-dom';
import TransactionHistory from './TransactionHistory';
import WithdrawalRequest from './WithdrawalRequest';
import NavigationCard from '../../../NavigationCard';
import DashboardFooter from '../DashboardFooter';

function WalletPage({ entity }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="wallet-index-container">
        <Route exact path="/dashboard/wallet">
          <div className="wallet-index-content">
            <NavigationCard title={t('dashboard.wallet.withdrawals.title')} description={t('dashboard.wallet.withdrawals.subtitle')} svg="withdraw-icon" path="wallet/withdraw" />
            <div className="transactions-container">
              <TransactionHistory />
            </div>
          </div>
        </Route>
        <Route path="/dashboard/wallet/withdraw" component={WithdrawalRequest} />
      </div>
      <DashboardFooter
        entity={entity}
      />
    </>
  );
}

export default WalletPage;
