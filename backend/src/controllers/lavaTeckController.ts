import axios from 'axios';
import * as dotenv from 'dotenv';
import { validationHelper, lavaTeckHelper, CodeError } from '../helpers';
import { lavaTeckInterface } from '../interfaces';
import { userDB } from '../database';

dotenv.config();

const lavaTeckUrl = process.env.LAVATECK_URL;
const apiToken = process.env.LT_TOKEN;
const operators = { fsa: process.env.FSA_OPERATOR, cysec: process.env.CYSEC_OPERATOR, fsc: process.env.FSC_OPERATOR };
const operatorPassword = process.env.OPERATOR_PASSWORD;
const lavaTeckInstance:any = axios.create({ baseURL: lavaTeckUrl, headers: { 'Content-Type': 'application/json' } });
const tokenInstance:any = axios.create({ baseURL: lavaTeckUrl, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiToken}` } });

const getToken = async (entity) => {
  let token;
  try {
    token = await tokenInstance.post('/efx-ext-api/public/api/auth/operator/signin', JSON.stringify({
      brandId: entity.toLowerCase(),
      login: operators[entity.toLowerCase()],
      password: operatorPassword,
      department: 'ADMINISTRATION',
    }));
  } catch (error) {
    return error;
  }

  return token.data.token;
};

const profileRegistration = async (ibData) => {
  try {
    const ibProfile: lavaTeckInterface.IProfile = await lavaTeckHelper.buildProfile(ibData);
    const operatorToken = await getToken(ibData.entity);
    await lavaTeckInstance.post(
      '/payment/migration/ib-profile',
      JSON.stringify(ibProfile),
      { headers: { Authorization: `Bearer ${operatorToken}`, efx: true } },
    );
  } catch (error) {
    console.log('profileRegistration error: ', error);
    throw new CodeError('Profile registration failed', 500);
  }
};

const accountRegistration = async (ibData) => {
  let lavaTeckResponse;

  try {
    const ibAccount:lavaTeckInterface.IAccount = await lavaTeckHelper.buildAccount(ibData);
    const operatorToken = await getToken(ibData.entity);
    lavaTeckResponse = await lavaTeckInstance.post(
      '/mt4-connector-adapter/migration/ib-account',
      JSON.stringify(ibAccount),
      { headers: { Authorization: `Bearer ${operatorToken}`, efx: true } },
    );
  } catch (error) {
    console.log('lavaTeckResponse error: ', error);
    throw new CodeError('Account connection failed', 500);
  }

  return lavaTeckResponse.data.accountUUID;
};

const getAccountByProfileId = async (req, res) => {
  const { lavaTeckId, entity } = req.query;
  let lavaTeckResponse;

  try {
    const operatorToken = await getToken(entity);
    lavaTeckResponse = await lavaTeckInstance.get(
      '/trading-gateway/users/ib/search',
      {
        headers: { Authorization: `Bearer ${operatorToken}`, efx: true },
        params: { accountUUID: lavaTeckId },
      },
    );
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).send('Something went wrong');
  }

  return res.status(200).send(lavaTeckResponse.data);
};

const requestWithdrawal = async (withdrawalData) => {
  let response;
  try {
    const withdrawalRequest:lavaTeckInterface.IWithdrawalRequest = await lavaTeckHelper.buildWithdrawal(withdrawalData);
    const operatorToken = await getToken(withdrawalData.entity);
    response = await lavaTeckInstance.post('/payment/ib/withdraw', JSON.stringify(withdrawalRequest), { headers: { Authorization: `Bearer ${operatorToken}`, efx: true } });
  } catch (error) {
    console.log('error: ', error);
    throw new CodeError('Withdrawal request failed', 500);
  }

  return response.data;
};

const approveWithdrawal = async (paymentId, paymentMethod, entity, office) => {
  try {
    // const withdrawalRequest:lavaTeckInterface.IWithdrawalRequest = await lavaTeckHelper.buildWithdrawal(withdrawalData);
    const operatorToken = await getToken(entity);
    await lavaTeckInstance.put(`/payment/ib/approve/${office}`, JSON.stringify({ paymentId, paymentMethod }), { headers: { Authorization: `Bearer ${operatorToken}`, efx: true } });
  } catch (error) {
    console.log('error: ', error);
    throw new CodeError('Withdrawal approval failed', 500);
  }
};

const updateWithdrawalStatus = async (withdrawalData) => {
  try {
    const operatorToken = await getToken(withdrawalData.entity);
    await lavaTeckInstance.put(`/payment/${withdrawalData.paymentId}/status`, JSON.stringify({ paymentStatus: withdrawalData.status }), { headers: { Authorization: `Bearer ${operatorToken}`, efx: true } });
  } catch (error) {
    console.log('error: ', error);
    throw new CodeError('Withdrawal status update failed', 500);
  }
};

const rejectWithdrawal = async (rejectRequest) => {
  try {
    const operatorToken = await getToken(rejectRequest.entity);
    await lavaTeckInstance.put('/payment/ib/reject', JSON.stringify(rejectRequest), { headers: { Authorization: `Bearer ${operatorToken}`, efx: true } });
  } catch (error) {
    console.log('error: ', error);
    throw new CodeError('Withdrawal rejection failed', 500);
  }
};

const cancelWithdrawal = async ({ paymentId, entity }) => {
  try {
    const operatorToken = await getToken(entity);
    await lavaTeckInstance.put(`/payment/ib/${paymentId}/cancel`, {}, { headers: { Authorization: `Bearer ${operatorToken}`, efx: true } });
  } catch (error) {
    console.log('error: ', error);
    throw new CodeError('Withdrawal cancellation failed', 500);
  }
};

const getWithdrawals = async (filter) => {
  let withdrawals;
  try {
    const searchParams:lavaTeckInterface.IWithdrawalSearch = await lavaTeckHelper.buildWithdrawalFilter(filter);
    const operatorToken = await getToken(filter.entity);
    withdrawals = await lavaTeckInstance.post('/payment/search', JSON.stringify(searchParams), { headers: { Authorization: `Bearer ${operatorToken}`, efx: true } });
  } catch (error) {
    console.log('error: ', error);
    throw new CodeError('Withdrawal fetch failed', 500);
  }

  return withdrawals.data.content;
};

const migrateIB = async (req, res) => {
  let lavaTeckUuid;
  const { ibData, token } = req.body;

  try {
    await validationHelper.checkToken(token);
    await profileRegistration(ibData);
    if (ibData.tradingAccount) {
      lavaTeckUuid = await accountRegistration(ibData);
      await userDB.updateUser(
        { uuid: ibData.uuid },
        { lavaTeckId: lavaTeckUuid, tradingAccount: ibData.tradingAccount },
      );
    }
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).send(`Migration for ${ibData.uuid} failed`);
  }

  return res.status(200).send(lavaTeckUuid);
};

export default {
  migrateIB,
  profileRegistration,
  accountRegistration,
  getAccountByProfileId,
  requestWithdrawal,
  approveWithdrawal,
  updateWithdrawalStatus,
  rejectWithdrawal,
  cancelWithdrawal,
  getWithdrawals,
  getToken,
};
