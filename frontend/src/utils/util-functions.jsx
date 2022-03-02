export const clearStorage = ({ setUserAuthorized }) => {
  const KEYS_NOT_CLEAR = ['cookieAccepted'];
  const keyHolder = {};
  KEYS_NOT_CLEAR.forEach((key) => {
    keyHolder[key] = localStorage.getItem(key);
  });
  localStorage.clear();
  setUserAuthorized(false);
  KEYS_NOT_CLEAR.forEach((key) => {
    localStorage.setItem(key, keyHolder[key]);
  });
};

export const getSideAsText = (type) => {
  switch (type) {
    case 'IDENTITY_CARD_FRONT':
      return 'ID Front side';
    case 'IDENTITY_CARD_BACK':
      return 'ID Back side';
    case 'PASSPORT_FRONT':
      return 'Passport';
    case 'DRIVING_LICENSE_FRONT':
      return 'Driving License front side';
    case 'DRIVING_LICENSE_BACK':
      return 'Driving License back side';
    case 'BANK_STATEMENT':
      return 'Bank Statement';
    case 'UTILITY_BILL':
      return 'Utility Bill';
    case 'RENTAL_AGREEMENT':
      return 'Rental Agreement';
    case 'TAX_BILL':
      return 'Tax Bill';
    case 'INSURANCE':
      return 'Insurance';
    default:
      return '';
  }
};
