import { parse } from 'fast-xml-parser';
import monthsList from '../utils/monthsList';

const marketFeedOptions = {
  attributeNamePrefix: '',
  attrNodeName: false,
  textNodeName: 'value',
  ignoreAttributes: false,
  ignoreNameSpace: true,
  allowBooleanAttributes: false,
  parseNodeValue: true,
  parseAttributeValue: false,
  trimValues: true,
  cdataTagName: false,
  cdataPositionChar: '\\c',
};

async function parseMarketFeed(feed) {
  const parsedFeed = parse(feed, marketFeedOptions);

  return parsedFeed;
}

async function parseDate(date) {
  const splitDate = date.split(' ');

  const day = splitDate[0];
  const month = (monthsList.indexOf(splitDate[1]) + 1).toString();
  const year = splitDate[2];

  const parsedDate = `${day}/${month}/${year}`;

  return parsedDate;
}

async function parseNPSource(sources, campaign) {
  const newSources = [];
  Object.keys(sources).map((source) => {
    if (sources[source].campaign === campaign) newSources.push(source);
    return newSources;
  });
  return newSources;
}

export default { parseMarketFeed, parseDate, parseNPSource };
