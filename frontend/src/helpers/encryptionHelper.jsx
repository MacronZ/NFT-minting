import crypto from 'crypto';

const tradingCentralSecret = process.env.REACT_APP_TRADING_CENTRAL_SECRET;

const tradingCentral = (text) => {
  const cipher = crypto.createCipheriv('des-ede3', tradingCentralSecret, '');

  const encrypted = cipher.update(text, 'utf8', 'base64');

  return encrypted + cipher.final('base64');
};

export default { tradingCentral };
