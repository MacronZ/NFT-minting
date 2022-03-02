import axios from 'axios';
import { v4 as uuidGenerator } from 'uuid';
import Cookies from 'universal-cookie';
import { errorHelper } from '../helpers';

const backendURL = process.env.REACT_APP_BACKEND_URL;

const instance = axios.create({
  baseURL: backendURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const headlessInstance = axios.create({
  baseURL: backendURL,
  withCredentials: true,
});

async function getUser(uuid) {
  try {
    const user = await headlessInstance.get('/users/get-user', {
      params: { uuid },
    });
    return user.data;
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function getUserDetails(uuid) {
  try {
    const user = await headlessInstance.get('/users/details', {
      params: { uuid },
    });
    return user.data;
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function login(email, password) {
  try {
    const user = await instance.post(
      '/users/login',
      JSON.stringify({ email, password }),
    );
    return user.data;
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function register(userData, language, entity, ip, token) {
  try {
    const user = await instance.post(
      '/users/register',
      JSON.stringify({
        uuid: uuidGenerator(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNum: userData.phoneNum,
        password: userData.password,
        countryCode: userData.countryCode,
        language,
        entity,
        emailVerified: false,
        registrationTimestamp: new Date(),
        parentIB: userData.parentIB,
        registeredIp: ip,
        recaptcha: token,
      }),
    );
    return user.data;
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function checkAuth(token) {
  try {
    const tokenCheck = await headlessInstance.get('/users/authenticate', {
      params: { token },
    });
    return tokenCheck;
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function tourCompleted(uuid, completed) {
  try {
    await instance.put('/users/tour', JSON.stringify({ uuid, completed }));
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function changePassword(password, oldPassword, token) {
  try {
    await instance.post('/users/change-password', JSON.stringify({ token, password, oldPassword }));
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function resetPasswordCode(email, token) {
  try {
    await instance.post(
      '/users/reset-password-code',
      JSON.stringify({ email, token }),
    );
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function updatePassword(password, token) {
  try {
    await instance.put(
      '/users/update-pass',
      JSON.stringify({
        updateData: {
          password,
        },
        token,
      }),
    );
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function updateUser(uuid, updateData, token) {
  try {
    await instance.put(
      '/users/update',
      JSON.stringify({
        uuid,
        updateData,
        token,
      }),
    );
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function confirmEmail(uuid, email, pinCode) {
  try {
    await instance.post('/users/confirm-email', JSON.stringify({ uuid, email, pinCode }));
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function updateQuestionnaire(uuid, formData, token, yesSelected) {
  try {
    await instance.put('/users/questionnaire', JSON.stringify({
      uuid,
      updateData: {
        questionnaireCompleted: true,
        questionnaireData: {
          questionnaireTimestamp: new Date(),
          referralsData: {
            noOfClients: formData.noOfClients,
            clientsCountry: formData.clientsCountry,
            modeOfCommunication: formData.modeOfCommunication,
            services: formData.otherServices
              ? [...formData.services, formData.otherServices] : formData.services,
            howAttractClients: formData.howAttractClients,
            servicesWebsite: formData.servicesWebsite
              ? `${formData.httpForServicesWebsite}${formData.servicesWebsite}` : '',
          },
          isFinServicesAuthRegulated: formData.finServicesRegulated === yesSelected,
          finServicesAuthorityData: {
            authorityName: formData.finServicesAuthority,
            registrationNo: formData.registrationNo,
            regulatorName: formData.regulatorName,
            regulatorWebsite: formData.regulatorWebsite
              ? `${formData.httpForRegulatorWebsite}${formData.regulatorWebsite}` : '',
            subjectToFinancialCrime: formData.subjectToFinancialCrime === yesSelected,
          },
        },
      },
      token,
    }));
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function confirmEmailPassword(email, pinCode) {
  try {
    const token = await instance.post('/users/confirm-email-password', JSON.stringify({ email, pinCode }));
    return token.data;
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function resendCode(email) {
  try {
    await instance.post('/users/resend-code', JSON.stringify({ email }));
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function request(requestData) {
  try {
    const requestInfo = await instance.post(
      '/users/request',
      JSON.stringify({ requestData }),
    );
    return requestInfo.data;
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function npAutoLogin(npData) {
  let url;

  try {
    url = await instance.post('/nullpoint/auto-login', JSON.stringify({ userData: npData }));
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }

  return url.data;
}

async function getAffiliateDetails(uuid, entity) {
  try {
    const affiliateData = await headlessInstance.get('/nullpoint/user-details', {
      params: { uuid, entity },
    });

    return affiliateData.data;
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function uploadSocials(socialData) {
  try {
    await instance.put('/users/update-socials', JSON.stringify(socialData));
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function createSurvey(uuid, surveyData) {
  const cookies = new Cookies();
  const token = cookies.get('token');
  try {
    await instance.post('/users/survey', JSON.stringify({ uuid, surveyData, token }));
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function updateSurveyStatus(uuid, surveyId) {
  const cookies = new Cookies();
  const token = cookies.get('token');
  try {
    await instance.put('/users/survey', JSON.stringify({ uuid, surveyId, token }));
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function requestCampaign(uuid, campaignRequest) {
  const cookies = new Cookies();
  const token = cookies.get('token');

  try {
    await instance.post('/users/request-campaign', JSON.stringify({ uuid, campaignRequest, token }));
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function requestWithdraw(withdrawRequest) {
  const cookies = new Cookies();
  const token = cookies.get('token');

  try {
    await instance.post('/users/withdrawal', JSON.stringify({ withdrawRequest, token }));
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function cancelWithdrawal(withdrawData) {
  const cookies = new Cookies();
  const token = cookies.get('token');

  try {
    await instance.put('/users/withdrawal/cancel', JSON.stringify({ withdrawData, token }));
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function getWithdrawals(filter) {
  const cookies = new Cookies();
  const token = cookies.get('token');
  let withdrawals;

  const {
    uuid, formDate, toDate, status,
  } = filter;

  try {
    withdrawals = await instance.get('/users/withdrawal', {
      params: {
        token, uuid, formDate, toDate, status,
      },
    });
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }

  return withdrawals.data;
}

async function savePromoCampaign(uuid, campaign) {
  const cookies = new Cookies();
  const token = cookies.get('token');

  try {
    await instance.put('/users/promo-campaign', JSON.stringify({ uuid, campaign, token }));
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function saveBankDetails(uuid, bankData) {
  const cookies = new Cookies();
  const token = cookies.get('token');
  try {
    await instance.post(
      '/users/bank-details',
      JSON.stringify({
        uuid,
        bankData,
        token,
      }),
    );
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function saveSkrillDetails(uuid, skrillData) {
  const cookies = new Cookies();
  const token = cookies.get('token');

  try {
    await instance.post(
      '/users/skrill-details',
      JSON.stringify({
        uuid,
        skrillData,
        token,
      }),
    );
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

async function saveNetellerDetails(uuid, netellerData) {
  const cookies = new Cookies();
  const token = cookies.get('token');

  try {
    await instance.post(
      '/users/neteller-details',
      JSON.stringify({
        uuid,
        netellerData,
        token,
      }),
    );
  } catch (error) {
    throw new errorHelper.CodeError(error.response.data, error.response.status);
  }
}

export default {
  getUser,
  getUserDetails,
  login,
  register,
  checkAuth,
  tourCompleted,
  changePassword,
  resetPasswordCode,
  updatePassword,
  confirmEmail,
  confirmEmailPassword,
  resendCode,
  request,
  npAutoLogin,
  getAffiliateDetails,
  uploadSocials,
  updateQuestionnaire,
  updateUser,
  requestCampaign,
  savePromoCampaign,
  requestWithdraw,
  cancelWithdrawal,
  getWithdrawals,
  saveBankDetails,
  saveSkrillDetails,
  saveNetellerDetails,
  createSurvey,
  updateSurveyStatus,
};
