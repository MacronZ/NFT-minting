import jwt from 'jsonwebtoken';
import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import { requestInterface, UserInterface } from '../interfaces';
import sfController from './sfController';
import { CodeError, userHelper, validationHelper } from '../helpers';
import { surveyDB, userDB } from '../database';
import { checkMasterStatus } from './nullPointController';
import lavaTeckController from './lavaTeckController';

const SAME_IP_TIMESTAMP_GAP = 60000; // one minute

const validateRegistrationRequest = async (body) => {
  const recaptchaToken = body.recaptcha;
  if (recaptchaToken) {
    try {
      console.log(recaptchaToken);
      const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', qs.stringify({
        secret: process.env.RECAPTCHA_SECRET,
        response: recaptchaToken,
      })) as AxiosResponse<{ success: boolean }>;

      if (response && response.data) {
        console.log('recaptha validation', response.data);
        return { validation: response.data.success };
      }
      return { validation: false };
    } catch (e) {
      return { validation: false };
    }
  } else {
    try {
      const previousRequest = await userDB.getUsers({ registeredIp: body.registeredIp });
      if (previousRequest) {
        const previousTimeStamp = new Date(previousRequest.registrationTimestamp);
        if (previousTimeStamp.getTime() + SAME_IP_TIMESTAMP_GAP > new Date(body.registrationTimestamp).getTime()) {
          return { validation: false };
        }
      }
      return { validation: true };
    } catch (e) {
      return { validation: true };
    }
  }
};

export const registerUser = async (req, res) => {
  const user = await userHelper.buildNewUser(req.body);

  const { validation } = await validateRegistrationRequest(req.body);

  if (!validation) {
    return res.status(400);
  }

  try {
    if (user.parentIB) await checkMasterStatus(user.parentIB, user.entity);
    await sfController.register(user);
    await lavaTeckController.profileRegistration(user);
    await userDB.saveUser(user);
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  const token = await validationHelper.generateToken(user.email);
  const FEUser: UserInterface.IFEUser = await userHelper.buildFEUser(user);

  return res.status(200).send({ user: FEUser, token });
};

export const activateIB = async (req, res) => {
  const { ibData } = req.body;
  let lavaTeckId;

  try {
    lavaTeckId = await lavaTeckController.accountRegistration(ibData);
    await userDB.updateUser({ uuid: ibData.uuid }, { lavaTeckId, tradingAccount: ibData.tradingAccount });
  } catch (error) {
    console.log('activateIB error: ', error);
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send(lavaTeckId);
};

export const getUserDetailsByID = async (req, res) => {
  const { uuid } = req.query;
  let user;

  try {
    user = await userDB.getUser({ uuid });
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  const FEUser: UserInterface.IFEUser = await userHelper.buildFEUser(user);
  return res.status(200).send(FEUser);
};

export const getUserByID = async (req, res) => {
  const { uuid } = req.query;
  let user;

  try {
    user = await userDB.getUser({ uuid });
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  const GUser: UserInterface.IGUser = await userHelper.buildGUser(user);
  return res.status(200).send(GUser);
};

const handleUserSurveys = async (user) => {
  let mongoSurveys;
  let userSurveys;

  // --- do this only if the user is active ---
  if (user.status.toUpperCase() === 'ACTIVE') {
    userSurveys = user.surveys;
    // Check 1: add to the counter if survey not opened yet
    if (userSurveys.length) {
      userSurveys.forEach(async (item) => {
        if (!item.opened) {
          try {
            await userDB.updateSurveyLoginCount(user.uuid, item.uuid, item.count + 1);
          } catch (error) {
            throw new CodeError(error.message, error.code);
          }
        }
      });
    }

    try {
      mongoSurveys = await surveyDB.getSurveys();
    } catch (error) {
      throw new CodeError(error.message, error.code);
    }
    const surveysToAdd = mongoSurveys.filter(
      ({ uuid: id1 }) => !userSurveys.some(({ uuid: id2 }) => id2 === id1),
    );

    // Check 2: add the surveys missing from the user surveys array
    if (surveysToAdd.length) {
      surveysToAdd.forEach(async (item) => {
        const surveyData = {
          uuid: item.uuid,
          name: item.surveyName,
          count: 1,
          opened: false,
        };
        try {
          await userDB.createSurvey(user.uuid, surveyData);
        } catch (error) {
          throw new CodeError(error.message, error.code);
        }
      });
    }
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let user;

  try {
    user = await userDB.getUser({ email: email.toLowerCase() });
    await userHelper.checkUserStatus(user);
    await user.isCorrectPassword(user, password);
    handleUserSurveys(user);
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  const token = await validationHelper.generateToken(user.email);
  const FEUser: UserInterface.IFEUser = await userHelper.buildFEUser(user);

  return res.status(200).send({ user: FEUser, token });
};

export const tourCompleted = async (req, res) => {
  const { uuid, completed } = req.body;

  try {
    return await userDB.updateUser({ uuid }, { walkThroughCompleted: completed });
  } catch (error) {
    return res.status(error.code).send(error.message);
  }
};

export const confirmEmail = async (req, res) => {
  const { uuid, email, pinCode } = req.body;

  try {
    await sfController.verifyEmailCode(uuid, email, pinCode);
    await userDB.userExists({ uuid });
    await userDB.updateUser({ uuid }, { emailVerified: true });
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send('Email verified');
};

export const confirmEmailPassword = async (req, res) => {
  const { email, pinCode } = req.body;
  let user;
  let token;

  try {
    user = await userDB.getUser({ email: email.toLowerCase() });
    await sfController.verifyEmailPasswordCode(user.uuid, email, pinCode);
    await userDB.updateUser({ uuid: user.uuid }, { emailVerified: true });
    token = await validationHelper.generateToken(email);
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send(token);
};

export const authenticateUser = async (req, res) => {
  const { token } = req.query;
  let user;

  if (!token) return res.status(401).send('Unauthorized: No token provided');

  try {
    const { email } = await validationHelper.checkToken(token);
    if (!email) throw new CodeError("User with this email, doesn't exist", 404);
    user = await userDB.getUser({ email: email.toLowerCase() });
    await userHelper.checkUserStatus(user);
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  const FEUser: UserInterface.IFEUser = await userHelper.buildFEUser(user);

  return res.status(200).send({ user: FEUser });
};

export const updateUser = async (req, res) => {
  const { uuid, token, updateData } = req.body;

  try {
    await validationHelper.checkToken(token);
    await userDB.userExists({ uuid });
    await userDB.updateUser({ uuid }, updateData);
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send();
};

export const sfUpdatePass = async (req, res) => {
  const { uuid, updateData, token } = req.body;

  try {
    await validationHelper.checkToken(token);
    await userDB.userExists({ uuid });
    await userDB.updateUser({ uuid }, { password: updateData.password, migrated: false });
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send();
};

export const updateUserPass = async (req, res) => {
  const { updateData, token } = req.body;

  try {
    const { email } = await validationHelper.checkToken(token);
    await userDB.userExists({ email: email.toLowerCase() });
    await userDB.updateUser({ email }, { password: updateData.password, migrated: false });
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send();
};

export const getToken = async (req, res) => {
  const payload = { secret: req.params.secret };
  const token = jwt.sign(payload, process.env.USER_SECRET!, { expiresIn: '1m' });
  res.status(200).send(token);
};

export const changePassword = async (req, res) => {
  const { token, password, oldPassword } = req.body;
  let user;

  if (!token) return res.status(401).send('Unauthorized: No token provided');

  try {
    const { email } = await validationHelper.checkToken(token);
    if (!email) throw new CodeError("User with this email, doesn't exist", 404);
    user = await userDB.getUser({ email: email.toLowerCase() });
    await user.isCorrectPassword(user, oldPassword);
    await userDB.updateUser({ uuid: user.uuid }, { password, migrated: false });
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send();
};

export const resetPassword = async (req, res) => {
  const { email, token } = req.body;
  let user;

  if (!token) {
    return res.status(400);
  }
  try {
    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', qs.stringify({
      secret: process.env.RECAPTCHA_SECRET,
      response: token,
    })) as AxiosResponse<{ success: boolean }>;

    if (!(response && response.data && response.data.success)) {
      return res.status(400).send('re-captchar failed validation');
    }
  } catch (e) {
    return res.status(400).send('unable to validate re-captchar');
  }

  try {
    user = await userDB.getUser({ email: email.toLowerCase() });
    await sfController.resetPasswordCode(user.uuid);
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send();
};

export const updateSocials = async (req, res) => {
  const {
    uuid, token, socialData, phoneNum,
  } = req.body;
  if (!token) return res.status(401).send('Unauthorized: No token provided');

  try {
    const { email } = await validationHelper.checkToken(token);
    await sfController.updateSocialData(uuid, { socialData, phoneNum });
    await userDB.userExists({ email: email.toLowerCase() });
    await userDB.updateUser({ email: email.toLowerCase() }, { socialData, phoneNum });
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send();
};

export const sendUserRequest = async (req, res) => {
  const { requestData }: { requestData: requestInterface.IRequest } = req.body;
  console.log(requestData);
  try {
    await sfController.sendUserRequest(requestData);
  } catch (error) {
    return res.status(500).send(error.message);
  }

  return res.status(200).send();
};

export const createUser = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).send('Unauthorized: No token provided');
  const user = await userHelper.buildNewUser(req.body);

  try {
    await validationHelper.checkToken(token);
    await userDB.saveUser(user);
    await lavaTeckController.profileRegistration(user);
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send(user);
};

export const updateQuestionnaire = async (req, res) => {
  const { uuid, token, updateData } = req.body;

  try {
    await validationHelper.checkToken(token);
    const user = await userDB.getUser({ uuid });
    await userHelper.isQuestionnaireComplete(user);
    await sfController.updateQuestionnaire(uuid, updateData);
    await userDB.updateUser({ uuid }, {
      questionnaireCompleted: updateData.questionnaireCompleted,
      questionnaireData: updateData.questionnaireData,
    });
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send();
};

export const requestCampaign = async (req, res) => {
  const { uuid, campaignRequest, token } = req.body;
  try {
    await validationHelper.checkToken(token);
    const user = await userDB.getUser({ uuid });
    await userHelper.checkQuestionnaire(user);
    await sfController.requestCampaign(uuid, campaignRequest.onRegistration, campaignRequest);
    await userDB.requestNewCampaign(uuid, campaignRequest);
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send('Success');
};

export const updateCampaignRequestStatus = async (req, res) => {
  const {
    uuid, campaignRequestId, status, token,
  } = req.body;

  try {
    await validationHelper.checkToken(token);
    await userDB.updateCampaignRequestStatus(uuid, campaignRequestId, status);
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send('Success');
};

export const createSurvey = async (req, res) => {
  const { uuid, surveyData, token } = req.body;

  try {
    await validationHelper.checkToken(token);
    await userDB.createSurvey(uuid, surveyData);
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send('Success');
};

export const updateSurveyStatus = async (req, res) => {
  const {
    uuid, surveyId, token,
  } = req.body;

  try {
    await validationHelper.checkToken(token);
    await userDB.updateSurveyStatus(uuid, surveyId);
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send('Success');
};

export const requestWithdrawal = async (req, res) => {
  const { withdrawRequest, fromSF, token } = req.body;
  let withdrawResponse;
  let withdrawInfo;

  try {
    await validationHelper.checkToken(token);
    withdrawResponse = await lavaTeckController.requestWithdrawal(withdrawRequest);
    await userHelper.waitPlease(1000);
    withdrawInfo = await lavaTeckController.getWithdrawals({ ...withdrawRequest, searchParam: withdrawResponse.paymentId });
    if (!fromSF) await sfController.requestWithdrawal(withdrawInfo);
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send(withdrawInfo);
};

export const approveWithdrawal = async (req, res) => {
  const {
    paymentId, paymentMethod, entity, token,
  } = req.body;
  const { office } = req.params;

  try {
    await validationHelper.checkToken(token);
    await lavaTeckController.approveWithdrawal(paymentId, paymentMethod, entity, office);
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send('Success');
};

export const rejectWithdrawal = async (req, res) => {
  const {
    paymentId, declineReason, entity, token,
  } = req.body;
  try {
    await validationHelper.checkToken(token);
    await lavaTeckController.rejectWithdrawal({ paymentId, declineReason, entity });
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send('Success');
};

export const updateWithdrawalStatus = async (req, res) => {
  const {
    paymentId, status, entity, token,
  } = req.body;
  try {
    await validationHelper.checkToken(token);
    await lavaTeckController.updateWithdrawalStatus({ paymentId, status, entity });
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send('Success');
};

export const cancelWithdrawal = async (req, res) => {
  const { withdrawData, fromSF, token } = req.body;
  try {
    await validationHelper.checkToken(token);
    await lavaTeckController.cancelWithdrawal(withdrawData);
    if (!fromSF) {
      withdrawData.status = 'PAYMENT_CANCELED';
      withdrawData.withdrawStatus = 'CANCELED';
      // withdrawData.statusChangedAt = new Date();
      await sfController.updateWithdrawal(withdrawData);
    }
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send('Success');
};

export const getWithdrawals = async (req, res) => {
  const filter = req.query;
  const { token } = req.query;
  let withdrawals;

  try {
    await validationHelper.checkToken(token);
    const { entity, tradingAccount } = await userDB.getUser({ uuid: filter.uuid });
    withdrawals = await lavaTeckController.getWithdrawals({ ...filter, entity, tradingAccount });
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send(withdrawals);
};

export const resendVerificationCode = async (req, res) => {
  const { email } = req.body;
  try {
    await sfController.resendVerificationCode(email);
  } catch (error) {
    return res.status(500).send('We encountered an error, please try again later');
  }

  return res.status(200).send('Code sent!');
};

export const savePromoCampaign = async (req, res) => {
  const { uuid, campaign, token } = req.body;

  try {
    await validationHelper.checkToken(token);
    await userDB.updateUser({ uuid }, { promoCampaign: campaign });
    await sfController.savePromoCampaign(uuid, campaign);
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send('Success');
};

export const saveBankDetails = async (req, res) => {
  const { uuid, token, bankData } = req.body;

  try {
    await validationHelper.checkToken(token);
    await userDB.userExists({ uuid });
    await sfController.saveBankDetails(uuid, bankData);
    await userDB.updateUser({ uuid }, {
      bankData,
    });
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send('Success');
};

export const saveSkrillDetails = async (req, res) => {
  const { uuid, token, skrillData } = req.body;

  try {
    await validationHelper.checkToken(token);
    await userDB.userExists({ uuid });
    await sfController.saveSkrillDetails(uuid, skrillData);
    await userDB.updateUser(
      { uuid },
      {
        skrillData,
      },
    );
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send('Success');
};

export const saveNetellerDetails = async (req, res) => {
  const { uuid, token, netellerData } = req.body;

  try {
    await validationHelper.checkToken(token);
    await userDB.userExists({ uuid });
    await sfController.saveNetellerDetails(uuid, netellerData);
    await userDB.updateUser(
      { uuid },
      {
        netellerData,
      },
    );
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send('Success');
};
