import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../styles/Dashboard/MiniBalanceLabel.scss';
import ArrowDown from '../../../media/images/icons/arrow-down.svg';
import ArrowUp from '../../../media/images/icons/arrow-up.svg';
import Popover from './CustomPopover';
import BalanceProfile from './BalanceProfile';

const MiniBalanceLabel = ({ locked }) => {
  const [open, setOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const { t } = useTranslation();

  useEffect(async () => {
    if (!locked) {
      const affiliateData = await JSON.parse(localStorage.getItem('affiliateData'));
      setBalance(affiliateData.balance);
    }
  }, []);

  return (
    <div className="nd-mini-acc-balance" id="wallet-balance-box">
      <div className="nd-title">{t('dashboard.menu.profile.wallet.title')}</div>
      <Popover
        showArrow
        triggerNode={(
          <div className="nd-value">
            $
            {balance}
            {open ? (
              <img
                src={ArrowUp}
                className="nd-arrow-icon"
                alt="close"
              />
            ) : (
              <img
                src={ArrowDown}
                className="nd-arrow-icon"
                alt="open"
              />
            )}
          </div>
        )}
        trigger="click"
        onChange={(x) => setOpen(!x)}
      >
        <BalanceProfile locked={locked} />
      </Popover>
    </div>
  );
};

export default MiniBalanceLabel;
