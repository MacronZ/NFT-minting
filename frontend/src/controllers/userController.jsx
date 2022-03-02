import { v4 as uuidGenerator } from 'uuid';
import Cookies from 'universal-cookie';
import { isEmpty } from 'lodash-es';
import { userAPI } from '../api';
import { errorHelper, validationHelper } from '../helpers';
import { clearStorage } from '../utils/util-functions';
import campaignOptions from '../utils/campaignsList';

const cookies = new Cookies();
const portalUrl = process.env.REACT_APP_PORTAL_URL;

async function getUser(uuid) {
  let user;

  try {
    user = await userAPI.getUser(uuid);
    return user;
  } catch (error) {
    throw new errorHelper.CodeError(error.message, error.code);
  }
}

async function getUserDetails(uuid) {
  let user;

  try {
    user = await userAPI.getUserDetails(uuid);
    return user;
  } catch (error) {
    throw new errorHelper.CodeError(error.message, error.code);
  }
}

async function login(email, password, entity, setUserAuthorized) {
  let res;

  try {
    res = await userAPI.login(email, password);
  } catch (error) {
    throw new errorHelper.CodeError(error.message, error.code);
  }

  if (res.user.entity !== entity) {
    throw new errorHelper.CodeError('Username or Password is not correct!', 401);
  }

  cookies.set('token', res.token, {
    path: '/',
  });
  localStorage.setItem('user', JSON.stringify(res.user));
  localStorage.setItem('isLoggedIn', true);
  setUserAuthorized(true);
  localStorage.setItem('nullPointId', JSON.stringify(res.user.nullPointId));
  localStorage.setItem('emailVerified', JSON.stringify(res.user.emailVerified));
  localStorage.setItem('questionnaireCompleted', JSON.stringify(res.user.questionnaireCompleted));
  localStorage.setItem('language', JSON.stringify(res.user.language));
  return true;
}

async function register(userData, language, entity, setUserAuthorized, ip, token = '') {
  let res;

  try {
    await validationHelper.validatePassword(userData.password, userData.cPassword);
    await validationHelper.validatePhone(userData.phoneNum);
    res = await userAPI.register(userData, language, entity, ip, token);
  } catch (error) {
    throw new errorHelper.CodeError(error.message, error.code);
  }

  cookies.set('token', res.token, { path: '/' });
  localStorage.setItem('user', JSON.stringify(res.user));
  localStorage.setItem('isLoggedIn', true);
  setUserAuthorized(true);
  localStorage.setItem('emailVerified', false);
  localStorage.setItem('questionnaireCompleted', false);

  return true;
}

async function updateQuestionnaire(uuid, formData, token, yesSelected) {
  try {
    await userAPI.updateQuestionnaire(uuid, formData, token, yesSelected);
  } catch (error) {
    throw new errorHelper.CodeError(error.message, error.code);
  }

  localStorage.setItem('questionnaireCompleted', true);
  return true;
}

async function updateUser(uuid, updateData) {
  try {
    const token = await cookies.get('token');
    await userAPI.updateUser(uuid, updateData, token);
  } catch (error) {
    throw new errorHelper.CodeError(error.message, error.code);
  }
}

async function checkAuth({ setUserAuthorized }) {
  let res;

  if (cookies.get('token')) {
    try {
      const token = await cookies.get('token');
      res = await userAPI.checkAuth(token);
    } catch (error) {
      cookies.remove('token', { path: '/' });
      await clearStorage({ setUserAuthorized });
      throw new errorHelper.CodeError('Token is invalid', 401);
    }
    localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('nullPointId', JSON.stringify(res.data.user.nullPointId));
    localStorage.setItem('emailVerified', JSON.stringify(res.data.user.emailVerified));
    localStorage.setItem('questionnaireCompleted', JSON.stringify(res.data.user.questionnaireCompleted));
    localStorage.setItem('isLoggedIn', true);
    setUserAuthorized(true);
  } else {
    await clearStorage({ setUserAuthorized });
    throw new errorHelper.CodeError('Token is invalid', 401);
  }
}

async function changePassword(password, oldPassword) {
  const token = cookies.get('token');

  try {
    await validationHelper.validatePassword(password);
    await userAPI.changePassword(password, oldPassword, token);
  } catch (error) {
    throw new errorHelper.CodeError(error.message, error.code);
  }
}

async function resetPasswordCode(email, token) {
  try {
    await userAPI.resetPasswordCode(email, token);
  } catch (error) {
    throw new errorHelper.CodeError(error.message, error.code);
  }
}

async function newPassword(token, password, cPassword) {
  try {
    await validationHelper.validatePassword(password, cPassword);
    await userAPI.updatePassword(password, token);
  } catch (error) {
    throw new errorHelper.CodeError(error.message, error.code);
  }
}

async function confirmEmail(uuid, email, pinCode) {
  try {
    await userAPI.confirmEmail(uuid, email, pinCode);
  } catch (error) {
    throw new errorHelper.CodeError(error.message, error.code);
  }

  localStorage.setItem('emailVerified', true);
}

async function confirmEmailPassword(email, pinCode) {
  try {
    const token = await userAPI.confirmEmailPassword(email, pinCode);
    return token;
  } catch (error) {
    throw new errorHelper.CodeError(error.message, error.code);
  }
}

async function resendCode(email) {
  try {
    await userAPI.resendCode(email);
  } catch (error) {
    throw new errorHelper.CodeError(error.message, error.code);
  }
}

async function request(requestData) {
  try {
    await userAPI.request(requestData);
  } catch (error) {
    throw new errorHelper.CodeError(error.message, error.code);
  }
}

async function npAutoLogin(uuid, entity, language, theme) {
  try {
    return await userAPI.npAutoLogin({
      uuid, entity, language, theme,
    });
  } catch (error) {
    throw new errorHelper.CodeError(error.message, error.code);
  }
}

async function getAffiliateDetails(uuid, entity, setUserAuthorized) {
  try {
    const affiliateData = await userAPI.getAffiliateDetails(uuid, entity);
    await localStorage.setItem('affiliateData', JSON.stringify(affiliateData.data.aff_data[0]));
  } catch (error) {
    await clearStorage({ setUserAuthorized });
    setUserAuthorized(false);
    throw new errorHelper.CodeError(error.message, error.code);
  }
}

async function getCampaignOptions({ customCampaignOptions }) {
  const affiliateData = await JSON.parse(localStorage.getItem('affiliateData'));
  const user = await JSON.parse(localStorage.getItem('user'));
  const userCR = user.campaignRequests;

  let tempCampaignHolder = customCampaignOptions;
  if (affiliateData.master_ib === '1') tempCampaignHolder = tempCampaignHolder.filter((campaign) => campaign.type !== 'master');
  campaignOptions.map((option) => {
    if (option.type === 'standard' && affiliateData.campaigns && Object.prototype.hasOwnProperty.call(affiliateData.campaigns, option.id)) {
      tempCampaignHolder = tempCampaignHolder.filter((campaign) => campaign.id !== option.id);
    }
    return tempCampaignHolder;
  });

  userCR.map((campaignRequest) => {
    if (campaignRequest.status === 'PENDING') {
      const requestIndex = tempCampaignHolder.findIndex(((campaign) => campaign.id === campaignRequest.id));
      tempCampaignHolder[requestIndex].pending = true;
    }
    return tempCampaignHolder;
  });

  return tempCampaignHolder;
}

async function tourCompleted(completed) {
  const user = await JSON.parse(localStorage.getItem('user'));

  try {
    userAPI.tourCompleted(user.uuid, completed);
  } catch (error) {
    throw new errorHelper.CodeError('Tour update failed', 500);
  }
}

async function generateAffiliateUrl(externalId, campaignId, page, source, entity, pageLanguage) {
  let affiliateUrl;

  if (entity === 'fsa') {
    if (page === 'registration') {
      affiliateUrl = `https://client.axiance.com/int/sign-up/live?fxbl=axianceint&fxsrc=np&fxaffid=${externalId}&fxcid=${campaignId}&referral=${externalId}${source ? (`&fxsource=${source}`) : ''}`;
    } else if (page === 'home') {
      affiliateUrl = `https://axiance.com/int/${pageLanguage}/?fxbl=axianceint&fxsrc=np&fxaffid=${externalId}&fxcid=${campaignId}&referral=${externalId}${source ? (`&fxsource=${source}`) : ''}`;
    } else if (page === 'ib') {
      affiliateUrl = `${portalUrl}/int/register?parent=${externalId}`;
    }
  } else if (entity === 'cysec') {
    if (page === 'registration') {
      affiliateUrl = `https://client.axianceeu.com/sign-up/live?fxbl=axianceeu&fxsrc=np&fxaffid=${externalId}&fxcid=${campaignId}&referral=${externalId}${source ? (`&fxsource=${source}`) : ''}`;
    }
  }

  if (!affiliateUrl) {
    throw new errorHelper.CodeError('Something went wrong!', 500);
  }

  return affiliateUrl;
}

async function uploadSocials(socialData, phoneNum) {
  if (socialData.contactMethod === 'none') {
    throw new errorHelper.CodeError('You have to select a contact method', 400);
  } else if (
    socialData.contactMethod !== 'email'
      && socialData.contactMethod !== 'phone' && socialData.contactMethod !== 'telegram' && socialData.contactMethod !== 'whatsapp'
      && isEmpty(socialData[socialData.contactMethod])
  ) {
    throw new errorHelper.CodeError('Selected contact method is empty', 400);
  }

  try {
    const localUser = await JSON.parse(localStorage.getItem('user'));
    const { uuid } = localUser;
    const token = cookies.get('token');

    const payload = {
      socialData,
      uuid,
      token,
      phoneNum,
    };
    await userAPI.uploadSocials(payload);

    const updatedUser = { ...localUser, socialData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function requestCampaign(uuid, campaignData, onRegistration) {
  if (campaignData.pending) throw new errorHelper.CodeError('This campaign request is already pending', 400);
  const campaignRequest = campaignData;
  campaignRequest.uuid = uuidGenerator();
  campaignRequest.status = 'PENDING';
  campaignRequest.onRegistration = onRegistration;

  try {
    await userAPI.requestCampaign(uuid, campaignRequest);
  } catch (error) {
    throw new errorHelper.CodeError(error.message, error.code);
  }
}

async function requestWithdraw(withdrawalData) {
  try {
    await userAPI.requestWithdraw(withdrawalData);
  } catch (error) {
    throw new errorHelper.CodeError(error.message, error.code);
  }
}

async function cancelWithdrawal(withdrawData) {
  try {
    await userAPI.cancelWithdrawal(withdrawData);
  } catch (error) {
    throw new errorHelper.CodeError(error.message, error.code);
  }
}

async function getWithdrawals(filter) {
  try {
    return await userAPI.getWithdrawals(filter);
  } catch (error) {
    throw new errorHelper.CodeError(error.message, error.code);
  }
}

async function savePromoCampaign(uuid, campaign) {
  try {
    await userAPI.savePromoCampaign(uuid, campaign);
  } catch (error) {
    throw new errorHelper.CodeError(error.message, error.code);
  }
}

async function createSurvey(uuid, surveyData) {
  try {
    await userAPI.createSurvey(uuid, surveyData);
  } catch (error) {
    throw new errorHelper.CodeError(error.message, error.code);
  }
}

async function updateSurveyStatus(uuid, surveyId) {
  try {
    await userAPI.updateSurveyStatus(uuid, surveyId);
  } catch (error) {
    throw new errorHelper.CodeError(error.message, error.code);
  }
}

async function saveBankDetails(uuid, bankData) {
  try {
    await userAPI.saveBankDetails(uuid, bankData);
  } catch (error) {
    throw new errorHelper.CodeError(error.message, error.code);
  }
}

async function saveSkrillDetails(uuid, skrillData) {
  try {
    await userAPI.saveSkrillDetails(uuid, skrillData);
  } catch (error) {
    throw new errorHelper.CodeError(error.message, error.code);
  }
}

async function saveNetellerDetails(uuid, netellerData) {
  try {
    await userAPI.saveNetellerDetails(uuid, netellerData);
  } catch (error) {
    throw new errorHelper.CodeError(error.message, error.code);
  }
}

export default {
  getUser,
  getUserDetails,
  login,
  register,
  checkAuth,
  changePassword,
  resetPasswordCode,
  newPassword,
  confirmEmail,
  confirmEmailPassword,
  resendCode,
  request,
  npAutoLogin,
  getAffiliateDetails,
  getCampaignOptions,
  tourCompleted,
  generateAffiliateUrl,
  uploadSocials,
  updateQuestionnaire,
  updateUser,
  requestCampaign,
  savePromoCampaign,
  requestWithdraw,
  saveBankDetails,
  saveSkrillDetails,
  saveNetellerDetails,
  cancelWithdrawal,
  getWithdrawals,
  createSurvey,
  updateSurveyStatus,
};
