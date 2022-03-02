import CodeError from './errorHelper';
import { User } from '../models';

const buildNewUser = async (userData) => new User({
  uuid: userData.uuid,
  email: userData.email.toLowerCase(),
  password: userData.password,
  firstName: userData.firstName,
  lastName: userData.lastName,
  phoneNum: userData.phoneNum,
  countryCode: userData.countryCode,
  language: userData.language,
  entity: userData.entity,
  nullPointId: null,
  lavaTeckId: null,
  emailVerified: userData.emailVerified,
  registrationTimestamp: userData.registrationTimestamp,
  socialData: {
    facebook: '',
    linkedin: '',
    instagram: '',
    skype: '',
    contactMethod: 'none',
    availableFrom: new Date(2021, 4, 20, 0, 0, 0),
    availableTo: new Date(2021, 4, 20, 0, 0, 0),
  },
  walkThroughCompleted: false,
  theme: 'light',
  migrated: false,
  status: 'NEW',
  questionnaireCompleted: false,
  parentIB: userData.parentIB,
  registeredIp: userData.registeredIp,
});

const buildFEUser = async (userData) => ({
  uuid: userData.uuid,
  email: userData.email.toLowerCase(),
  firstName: userData.firstName,
  lastName: userData.lastName,
  phoneNum: userData.phoneNum,
  countryCode: userData.countryCode,
  language: userData.language,
  nullPointId: userData.nullPointId,
  lavaTeckId: userData.lavaTeckId,
  emailVerified: userData.emailVerified,
  registrationTimestamp: userData.registrationTimestamp,
  socialData: userData.socialData,
  entity: userData.entity,
  walkThroughCompleted: userData.walkThroughCompleted,
  status: userData.status,
  theme: userData.theme,
  promoCampaign: userData.promoCampaign,
  questionnaireCompleted: userData.questionnaireCompleted,
  questionnaireData: userData.questionnaireData,
  bankData: userData.bankData,
  skrillData: userData.skrillData,
  netellerData: userData.netellerData,
  parentIB: userData.parentIB,
  campaignRequests: userData.campaignRequests,
  surveys: userData.surveys,
});

const buildGUser = async (userData) => ({
  uuid: userData.uuid,
  email: userData.email.toLowerCase(),
  firstName: userData.firstName,
  lastName: userData.lastName,
  status: userData.status,
  campaignRequests: userData.campaignRequests,
});

const buildIBankDetails = async (uuid, bankData) => ({
  uuid,
  nameOfAccount: bankData.nameOfAccount,
  bankAccountNumber: bankData.bankAccountNumber,
  branchName: bankData.branchName,
  bankCode: bankData.bankCode,
  bankName: bankData.bankName,
  bankCity: bankData.bankCity,
});

const checkUserStatus = async (user) => {
  if (user.status.toUpperCase() === 'CLOSED') throw new CodeError('Username or Password is not correct!', 401);
};

const checkQuestionnaire = async (user) => {
  if (!user.questionnaireCompleted) throw new CodeError('Questionnaire must be first completed', 400);
};

const isQuestionnaireComplete = async (user) => {
  if (user.questionnaireCompleted) throw new CodeError('Questionnaire is already filled', 400);
};

const waitPlease = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

export default {
  buildNewUser,
  buildFEUser,
  buildGUser,
  checkUserStatus,
  buildIBankDetails,
  checkQuestionnaire,
  isQuestionnaireComplete,
  waitPlease,
};
