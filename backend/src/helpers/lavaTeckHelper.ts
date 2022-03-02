import { lavaTeckInterface } from '../interfaces';

const buildProfile = async (ibData) => ({
  uuid: ibData.uuid,
  firstName: ibData.firstName,
  lastName: ibData.lastName,
  email: ibData.email,
  phone: ibData.phoneNum,
  brandId: ibData.entity,
  status: 'ACTIVE',
  languageCode: ibData.language,
});

const buildAccount = async (ibData) => ({
  profileUUID: ibData.uuid,
  serverId: '0',
  login: ibData.tradingAccount,
});

const buildWithdrawal = async (withdrawalData) => ({
  amount: withdrawalData.amount,
  accountUUID: withdrawalData.lavaTeckId,
  paymentMethod: withdrawalData.paymentMethod,
  profileUUID: withdrawalData.uuid,
  pspReference: withdrawalData.pspReference,
});

const buildWithdrawalFilter = async (filter) => {
  const filtered:lavaTeckInterface.IWithdrawalSearch = {
    page: {
      from: 0,
      size: 10000,
      sorts: [
        {
          column: 'creationTime',
          direction: 'DESC',
        },
      ],
    },
    profileId: filter.uuid,
    paymentTypes: ['WITHDRAW'],
    platformType: 'MT4',
    paymentMethods: ['BANKTRANSFER', 'SKRILL', 'NETELLER'],
    creationTimeFrom: filter.dateFrom || null,
    creationTimeTo: filter.dateTo || null,
    ibPayment: true,
  };

  if (filter.status) filtered.statuses = [filter.status];
  if (filter.searchParam) filtered.searchParam = filter.searchParam;
  if (filter.tradingAccount) filtered.accountLogin = filter.tradingAccount;
  return filtered;
};

export default {
  buildProfile,
  buildAccount,
  buildWithdrawal,
  buildWithdrawalFilter,
};
