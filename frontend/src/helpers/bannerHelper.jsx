import { bannerList, languageOptions } from '../utils/bannerOptions';

const ibLink = 'https://google.com';

async function getAllBanners(size) {
  const banners = [];

  bannerList.map((themedBanner) => Object.keys(themedBanner.size).map((themeLanguage) => {
    if (
      themedBanner.size[themeLanguage].some(
        (bannerSize) => bannerSize.height === size.height && bannerSize.width === size.width,
      )
    ) {
      banners.push({
        ibLink,
        language: themeLanguage,
        size,
        theme: themedBanner.theme.key,
      });
    }

    return banners;
  }));

  return banners;
}

async function getAllLanguageBanners(size, theme) {
  const banners = [];
  const bannerThemeInfo = bannerList.find((x) => x.theme.key === theme);

  Object.keys(bannerThemeInfo.size).map((themeLanguage) => {
    if (
      bannerThemeInfo.size[themeLanguage].some(
        (bannerSize) => bannerSize.height === size.height && bannerSize.width === size.width,
      )
    ) {
      banners.push({
        ibLink,
        language: themeLanguage,
        size,
        theme,
      });
    }

    return banners;
  });

  return banners;
}

async function getAllThemeBanners(size, language) {
  const banners = [];

  bannerList.map((themedBanner) => {
    if (
      themedBanner.size[language].some(
        (bannerSize) => bannerSize.height === size.height && bannerSize.width === size.width,
      )
    ) {
      banners.push({
        ibLink,
        language,
        size,
        theme: themedBanner.theme.key,
      });
    }

    return banners;
  });

  return banners;
}

async function getOneBanner(size, language, theme) {
  const banners = [];
  const bannerThemeInfo = bannerList.find((x) => x.theme.key === theme);

  if (
    bannerThemeInfo.size[language].some(
      (bannerSize) => bannerSize.height === size.height && bannerSize.width === size.width,
    )
  ) {
    banners.push({
      ibLink,
      language,
      size,
      theme,
    });
  }

  return banners;
}

async function getSizeByThemeLng(theme, language) {
  const sizeOptions = [];
  const bannerThemeInfo = bannerList.find((x) => x.theme.key === theme);

  bannerThemeInfo.size[language].map((size) => sizeOptions.push(size));

  return sizeOptions;
}

async function getLanguageByThemeSize(theme, size) {
  const themeLanguageOptions = [];
  const bannerThemeInfo = bannerList.find((x) => x.theme.key === theme);

  Object.keys(bannerThemeInfo.size).map((themeLanguage) => {
    if (
      bannerThemeInfo.size[themeLanguage].some(
        (bannerSize) => bannerSize.height === size.height && bannerSize.width === size.width,
      )
    ) {
      const filteredLanguageOption = languageOptions.filter((obj) => obj.key === themeLanguage);
      themeLanguageOptions.push(filteredLanguageOption[0]);
    }

    return themeLanguageOptions;
  });

  return themeLanguageOptions;
}

export default {
  getAllBanners,
  getAllLanguageBanners,
  getAllThemeBanners,
  getOneBanner,
  getSizeByThemeLng,
  getLanguageByThemeSize,
};
