import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../../../styles/Dashboard/WalletPage.scss';
import { useSelector } from 'react-redux';
import skrillIcon from '../../../../media/images/icons/skrill.svg';
import bankWireIcon from '../../../../media/images/icons/bankwire.svg';
import netellerIcon from '../../../../media/images/icons/neteller.svg';
import tickIcon from '../../../../media/images/icons/tick.svg';
import { BANK_TRANSFER, NETELLER, SKRILL } from '../../../../constants';

const WithdrawMethodSelector = ({ selectedMethod, setSelectedMethod, missedField }) => {
  const { t } = useTranslation();
  const getTheme = useSelector((state) => state.theme);

  const percentage0 = (
    <div className="div-width-20">
      <span className="method-details">0%</span>
    </div>
  );

  const processingTime = (text) => (
    <div className="div-width-40">
      <span className="method-details">{text}</span>
    </div>
  );

  const setStyleOfSelectedMethod = (method) => {
    if (method === selectedMethod) {
      if (getTheme === 'dark') {
        return { backgroundColor: '#000000', border: '1px solid #BFD3DE' };
      }

      return { backgroundColor: '#eaeff3', border: '1px solid #BFD3DE' };
    }
    return undefined;
  };

  const showGreenTick = (method) => (
    <div style={{ width: '5%' }}>
      {selectedMethod === method && (
      <img
        src={tickIcon}
        alt="selected"
      />
      )}
    </div>
  );

  const renderWithdrawMethod = (method, icon, iconClassName, processingTimeValue) => (
    <div className="row-div">
      <div
        role="button"
        tabIndex="0"
        className="method-div"
        onClick={() => setSelectedMethod('paymentMethod', method)}
        onKeyDown={() => setSelectedMethod('paymentMethod', method)}
        style={setStyleOfSelectedMethod(method)}
      >
        <div className="div-width-40">
          <img
            className={iconClassName}
            src={icon}
            alt={method}
          />
        </div>
        {percentage0}
        {processingTime(processingTimeValue)}
        {showGreenTick(method)}
      </div>
    </div>
  );

  return (
    <>
      <p className="section-title">{t('dashboard.wallet.chooseMethod')}</p>
      <div className={missedField ? 'outer-div-red' : 'outer-div'}>
        <div className="column-div">
          <div>
            <div className="labels-div">
              <div className="div-width-35">
                <span className="column-title">{t('dashboard.wallet.transferMethod')}</span>
              </div>
              <div className="div-width-20">
                <span className="column-title">{t('dashboard.wallet.fees')}</span>
              </div>
              <div className="div-width-35">
                <span className="column-title">{t('dashboard.wallet.processingTime')}</span>
              </div>
            </div>
            {renderWithdrawMethod(SKRILL, skrillIcon, 'img-style-skrill', t('dashboard.wallet.realTime'))}
            {renderWithdrawMethod(NETELLER, netellerIcon, 'img-style-neteller', t('dashboard.wallet.realTime'))}
            {renderWithdrawMethod(BANK_TRANSFER, bankWireIcon, 'img-style-transfer', t('dashboard.wallet.businessDays'))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WithdrawMethodSelector;
