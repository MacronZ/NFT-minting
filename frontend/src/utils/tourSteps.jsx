export const genericStyles = {
  maskArea: (base) => ({ ...base, rx: '5' }),
  popover: (base) => ({
    ...base,
    borderRadius: 5,
  }),
  close: (base) => ({ ...base, height: 12, outline: 'none' }),
};

export const genericStylesDark = {
  maskArea: (base) => ({ ...base, rx: '5' }),
  popover: (base) => ({
    ...base,
    borderRadius: 5,
    backgroundColor: '#272727',
  }),
  close: (base) => ({ ...base, height: 12, outline: 'none' }),
};

export const sideMenuStyles = {
  maskArea: (base) => ({ ...base, rx: '50' }),
  popover: (base) => ({
    ...base,
    borderRadius: 5,
  }),
  close: (base) => ({ ...base, height: 12, outline: 'none' }),
};

export const sideMenuStylesDark = {
  maskArea: (base) => ({ ...base, rx: '50' }),
  popover: (base) => ({
    ...base,
    borderRadius: 5,
    backgroundColor: '#272727',
  }),
  close: (base) => ({ ...base, height: 12, outline: 'none' }),
};

const tourSteps = [
  {
    selector: '#home-side-menu',
    content: "Check what's new, create new deals and partner links from your personal dashboard.",
    styles: sideMenuStyles,
  },
  {
    selector: '#wallet-side-menu',
    content: 'Get a full spectrum view of your transaction history and cash in your earnings with zero fees.',
    styles: sideMenuStyles,
  },
  {
    selector: '#marketing-side-menu',
    content: "Get free access to our rich marketing and advertising resources. Need something we don't have? Send us a request and we will sort it out for  you.",
    styles: sideMenuStyles,
  },
  {
    selector: '#tools-side-menu',
    content: 'Both beginners and advanced traders can get more from their online trading with our powerful trading tools and advanced analytics.',
    styles: sideMenuStyles,
  },
  {
    selector: '#education-side-menu',
    content: 'Your clients can kickstart their  trading journey with tailored courses, video tutorials and online quizzes!',
    styles: sideMenuStyles,
  },
  {
    selector: '#analytics-side-menu',
    content: 'Monitor performance and identify areas of improvement to meet your short and long-term goals.',
    styles: sideMenuStyles,
  },
  {
    selector: '#products-side-menu',
    content: 'Axiance clients have access to the highest quality products and service available.',
    styles: sideMenuStyles,
  },
  {
    selector: '#promo-side-menu',
    content: "Discover the bonus schemes, promotions and clubs your clients' have access to.",
    styles: sideMenuStyles,
  },
  {
    selector: '#create-new-ib-deal-box',
    content: 'Create a new deal and maximise your profits in just a few minutes.',
    styles: genericStyles,
  },
  {
    selector: '#wallet-balance-box',
    content: "Review the balance of your paid or unpaid commissions and your clients' deposits and withdrawals.",
    styles: genericStyles,
  },
  {
    selector: '#your-partner-link-box',
    content: 'Generate your unique partner links and track where conversions come from.',
    styles: genericStyles,
  },
  {
    selector: '#language-selector-box',
    content: 'Use the language bar to switch between languages.',
    styles: genericStyles,
  },
  {
    selector: '#settings-selector-box',
    content: 'Manage your account information, communication preferences and personal information in one place.',
    styles: genericStyles,
  },
];

export default tourSteps;
