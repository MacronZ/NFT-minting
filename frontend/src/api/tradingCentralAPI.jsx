import axios from 'axios';
import { errorHelper } from '../helpers';

const tradingCentralFeedUrl = process.env.REACT_APP_TRADING_CENTRAL_FEED_URL;
const tradingCentralFeedToken = process.env.REACT_APP_TRADING_CENTRAL_FEED_TOKEN;

const instance = axios.create({
  baseURL: tradingCentralFeedUrl,
  headers: { 'Content-Type': 'application/json' },
});

async function getFeed() {
  try {
    const feed = await instance.get('/GetFeed', {
      params: {
        culture: 'en-US',
        type_product: 'forex',
        product: 'null',
        term: 'null',
        days: '1',
        last_ta: 'false',
        partner: '1606',
        token: tradingCentralFeedToken,
      },
    });
    return feed.data;
  } catch (error) {
    throw new errorHelper.CodeError('We encountered an error, please try again later.', 500);
  }
}

export default { getFeed };
