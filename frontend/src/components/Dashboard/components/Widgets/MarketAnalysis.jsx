import React, { useEffect, useState } from 'react';
import '../../../../styles/Dashboard/Widgets.scss';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { tradingCentralController } from '../../../../controllers';

const Row = ({
  style, header, date, text,
}) => (
  <div className="grid-row" style={style}>
    <div className="title">
      <div className="unit">{header}</div>
      <div className="time">{date}</div>
    </div>
    <div className="text">{text}</div>
  </div>
);

function MarketAnalysis({ locked }) {
  const [marketList, setMarketList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  useEffect(async () => {
    try {
      setMarketList(await tradingCentralController.getTradingMarkets(10));
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }

    setIsLoading(false);
  }, []);

  return (
    <div className="market-analysis widget">
      <h3 className="name">{t('dashboard.main.marketAnalysis.title')}</h3>

      <div className="list">
        {isLoading ? (
          <div className="spinner">
            <ScaleLoader color="#50B848" loading={isLoading} size={300} />
          </div>
        ) : (
          marketList.map((market, marketIndex) => (
            <Row key={`News-${marketIndex}`} header={market.header.name} date={market.header.hour} text={market.story.summary} />
          ))
        )}
      </div>

      {!locked && <Link to="/dashboard/trading-tools" className="green-cta" type="button">{t('dashboard.main.marketAnalysis.readMore')}</Link>}
    </div>
  );
}

export default MarketAnalysis;
