import moment from 'moment';
import qs from 'qs';
import { tradingCentralAPI } from '../api';
import { errorHelper, parsingHelper, encryptionHelper } from '../helpers';

async function getTradingMarkets(amount) {
  try {
    const fetchedFeed = await tradingCentralAPI.getFeed();
    const parsedFeed = await parsingHelper.parseMarketFeed(fetchedFeed);
    let dataMarkets;

    dataMarkets = parsedFeed.items.article.map((market) => {
      const watch = {};
      market.analysis.content.header.option.watch.forEach((w) => {
        watch[w.type] = w.value;
      });
      return {
        ...market.analysis.content,
        id: market.id,
        status: market.status,
        header: {
          ...market.analysis.content.header,
          date: market.analysis.content.header.date.toString(),
          option: {
            ...market.analysis.content.header.option,
            watch,
          },
        },
      };
    });

    dataMarkets = dataMarkets.slice(0, amount < 100 ? amount * 2 : amount * 1.2);

    dataMarkets = dataMarkets.filter((newsArticle, index, self) => index === self.findIndex((t) => (
      t.story.keywords === newsArticle.story.keywords
      && t.story.summary === newsArticle.story.summary
      && t.story.title === newsArticle.story.title
    )));

    return dataMarkets.slice(0, amount);
  } catch (error) {
    throw new errorHelper.CodeError(
      'We encountered an error, please try again later.',
      error.status,
    );
  }
}

async function getToken(page, uuid, language) {
  const request = {
    page,
    usi: uuid,
    lang: language || 'en',
    aci: moment.utc(new Date()).format('YYYYMMDDHHmmss'),
  };
  return encodeURIComponent(
    encryptionHelper.tradingCentral(qs.stringify(request)),
  );
}

export default { getTradingMarkets, getToken };
