import axios from 'axios';
import qs from 'qs';
import * as dotenv from 'dotenv';
import { CodeError } from '../helpers';
import { requestInterface } from '../interfaces';

dotenv.config();

const sFTokenUrl = process.env.SF_TOKEN_URL;
const sFUrl = process.env.SF_URL;
const sfInstance:any = axios.create({ baseURL: sFUrl, headers: { 'Content-Type': 'application/json' } });
const tokenInstance:any = axios.create({ baseURL: sFTokenUrl, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

const getToken = async () => {
  let token;

  try {
    token = await tokenInstance.post('/token', qs.stringify({
      grant_type: 'password',
      client_id: process.env.SF_ID,
      client_secret: process.env.SF_SECRET,
      username: process.env.SF_USER,
      password: process.env.SF_PASS,
    }));
  } catch (error) {
    throw new CodeError(error.response.data, error.response.status);
  }

  return token.data.access_token;
};

const register = async (userData) => {
  try {
    const token = await getToken();
    await sfInstance.post('/users/ib', JSON.stringify({
      uuid: userData.uuid,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email.toLowerCase(),
      phone: userData.phoneNum,
      countryCode: userData.countryCode,
      language: userData.language,
      entity: userData.entity,
      parentIB: userData.parentIB,
    }),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new CodeError(error.response.data, error.response.status);
  }
};

const uploadDocument = async (documentData) => {
  try {
    const token = await getToken();
    await sfInstance.post('/user/ib/documents', JSON.stringify(documentData), { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    throw new CodeError(error.response.data, error.response.status);
  }
};

const verifyEmailCode = async (uuid, email, pinCode) => {
  try {
    const token = await getToken();
    await sfInstance.post('/users/ib/verify-email', JSON.stringify({ uuid, email: email.toLowerCase(), pinCode }), { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    throw new CodeError('Invalid Code, please try again', error.response.status);
  }
};

const verifyEmailPasswordCode = async (uuid, email, pinCode) => {
  try {
    const token = await getToken();
    await sfInstance.post(
      '/users/ib/verify-password',
      JSON.stringify({ uuid, email: email.toLowerCase(), pinCode }),
      { headers: { Authorization: `Bearer ${token}` } },
    );
  } catch (error) {
    throw new CodeError('Invalid Code, please try again', error.response.status);
  }
};

const resendVerificationCode = async (email) => {
  try {
    const token = await getToken();
    await sfInstance.post(
      '/users/ib/registration/resend-code',
      JSON.stringify({ email: email.toLowerCase() }),
      { headers: { Authorization: `Bearer ${token}` } },
    );
  } catch (error) {
    throw new CodeError(error.response.data, error.response.status);
  }
};

const resetPasswordCode = async (uuid) => {
  try {
    const token = await getToken();
    await sfInstance.post('/user/ib/reset-password', JSON.stringify({ uuid }), { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    throw new CodeError(error.response.data, error.response.status);
  }
};

const updateSocialData = async (uuid, updateData) => {
  try {
    const token = await getToken();
    await sfInstance.put('/users/ib', JSON.stringify({ uuid, socialData: updateData.socialData, phone: updateData.phoneNum }), { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    throw new CodeError(error.response.data, error.response.status);
  }
};

const sendUserRequest = async (requestData: requestInterface.IRequest) => {
  try {
    const token = await getToken();
    await sfInstance.post('/user/ib/requests', JSON.stringify(requestData), { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    console.log(error);
    throw new CodeError(error.response.data, error.response.status);
  }
};

const requestCampaign = async (uuid, onRegistration, campaignRequest) => {
  try {
    const token = await getToken();
    await sfInstance.post('/user/ib/campaigns', JSON.stringify({ uuid, onRegistration, campaignRequest }), { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    throw new CodeError(error.response.data, error.response.status);
  }
};

const requestWithdrawal = async (withdrawRequest) => {
  try {
    const token = await getToken();
    await sfInstance.post(
      '/users/ib/withdrawals',
      JSON.stringify(withdrawRequest[0]),
      { headers: { Authorization: `Bearer ${token}` } },
    );
  } catch (error) {
    console.log(error);
    throw new CodeError(error.response.data, error.response.status);
  }
};

const updateWithdrawal = async (updateData) => {
  try {
    const token = await getToken();
    await sfInstance.put('/users/ib/withdrawals', JSON.stringify(updateData), { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    throw new CodeError(error.response.data, error.response.status);
  }
};

const savePromoCampaign = async (uuid, campaign) => {
  try {
    const token = await getToken();
    await sfInstance.put('/user/ib/promocode', JSON.stringify({ uuid, campaign }), { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    throw new CodeError(error.response.data, error.response.status);
  }
};

const updateQuestionnaire = async (uuid, updateData) => {
  try {
    const token = await getToken();
    await sfInstance.put('/user/ib/questions', JSON.stringify({
      uuid,
      questionnaireData: {
        questionnaireCompleted: updateData.questionnaireCompleted,
        questionnaireData: updateData.questionnaireData,
      },
    }), { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    throw new CodeError(error.response.data, error.response.status);
  }
};

const deleteDocument = async (documentData) => {
  try {
    const token = await getToken();
    await sfInstance.delete('/user/ib/documents', { headers: { Authorization: `Bearer ${token}` }, data: JSON.stringify(documentData) });
  } catch (error) {
    throw new CodeError('Deleting document failed, please try again later', error.response.status);
  }
};

const saveBankDetails = async (uuid, bankData) => {
  try {
    const token = await getToken();
    await sfInstance.post('/user/ib/bank/details', JSON.stringify({
      uuid,
      bankData,
    }),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new CodeError(error.response.data, error.response.status);
  }
};

const saveSkrillDetails = async (uuid, skrillData) => {
  try {
    const token = await getToken();
    await sfInstance.post(
      '/user/ib/skrill/details',
      JSON.stringify({
        uuid,
        skrillData,
      }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    throw new CodeError(error.response.data, error.response.status);
  }
};

const saveNetellerDetails = async (uuid, netellerData) => {
  try {
    const token = await getToken();
    await sfInstance.post(
      '/user/ib/neteller/details',
      JSON.stringify({
        uuid,
        netellerData,
      }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    throw new CodeError(error.response.data, error.response.status);
  }
};

export default {
  getToken,
  register,
  uploadDocument,
  verifyEmailCode,
  verifyEmailPasswordCode,
  resendVerificationCode,
  resetPasswordCode,
  updateSocialData,
  sendUserRequest,
  requestCampaign,
  requestWithdrawal,
  savePromoCampaign,
  updateQuestionnaire,
  deleteDocument,
  updateWithdrawal,
  saveBankDetails,
  saveSkrillDetails,
  saveNetellerDetails,
};
