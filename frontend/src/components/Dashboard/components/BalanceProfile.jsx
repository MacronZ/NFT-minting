import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../styles/Dashboard/BalanceProfile.scss';

const BalanceProfile = ({ locked }) => {
  const [affiliateData, setAffiliateData] = useState({
    paid_comm: 0,
    unpaid_comm: 0,
    clients_count: 0,
    client_deposits: 0,
    client_withdrawals: 0,
  });
  const { t } = useTranslation();

  useEffect(async () => {
    if (locked) return;
    const affiliateDataFetch = await JSON.parse(localStorage.getItem('affiliateData'));
    setAffiliateData(affiliateDataFetch);
  }, []);

  return (
    <div className="balance-profile">
      <div className="balance-info">
        <div className="details">
          <div className="row">
            <div className="title">
              {t('dashboard.menu.profile.wallet.dropdown.pCommission')}
              :
            </div>
            <div className="value">
              $
              {Number(affiliateData.paid_comm).toLocaleString()}
            </div>
          </div>
          <div className="row">
            <div className="title">
              {t('dashboard.menu.profile.wallet.dropdown.uCommission')}
              :
            </div>
            <div className="value">
              $
              {Number(affiliateData.unpaid_comm).toLocaleString()}
            </div>
          </div>
          <hr className="splitter" />
          <div className="row">
            <div className="title">
              {t('dashboard.menu.profile.wallet.dropdown.cCount')}
              :
            </div>
            <div className="value">{affiliateData.clients_count}</div>
          </div>
          <div className="row">
            <div className="title">
              {t('dashboard.menu.profile.wallet.dropdown.cDeposits')}
              :
            </div>
            <div className="value">
              $
              {Number(affiliateData.client_deposits).toLocaleString()}
            </div>
          </div>
          <div className="row">
            <div className="title">
              {t('dashboard.menu.profile.wallet.dropdown.cWithdrawals')}
              :
            </div>
            <div className="value">
              $
              {Number(affiliateData.client_withdrawals).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceProfile;
