import { User } from '../models';
import { CodeError } from '../helpers';

async function saveUser(user) {
  try {
    await user.save();
  } catch (error) {
    if (error && error.code === 11000) throw new CodeError('This user already exists.', 409);
    throw new CodeError('Error registering new user, please try again', 500);
  }
}

async function getUser(searchParam) {
  let user;
  try {
    user = await User.findOne(searchParam).exec();
  } catch (error) {
    throw new CodeError('Something went wrong, please try again', 500);
  }

  if (!user) throw new CodeError('User not found', 404);
  return user;
}

async function getUsers(searchParam) {
  return User.findOne(searchParam).sort('-registrationTimestamp').exec();
}

async function updateUser(searchParam, pushUpdate) {
  try {
    await User.findOneAndUpdate(searchParam, pushUpdate, { new: true }).exec();
  } catch (error) {
    throw new CodeError('Something went wrong, please try again', 500);
  }
}

async function requestNewCampaign(uuid, campaignRequest) {
  try {
    const user = await User.findOne({ uuid }).exec();
    if (campaignRequest.onRegistration && user?.campaignRequests.some((request) => request.onRegistration)) {
      await User.findOneAndUpdate({ uuid, 'campaignRequests.onRegistration': true }, { $set: { 'campaignRequests.$': campaignRequest } }).exec();
    } else await User.findOneAndUpdate({ uuid }, { $push: { campaignRequests: campaignRequest } }, { new: true }).exec();
  } catch (error) {
    throw new CodeError('Something went wrong, please try again', 500);
  }
}

async function updateCampaignRequestStatus(uuid, campaignRequestId, status) {
  try {
    await User.findOneAndUpdate({ uuid, 'campaignRequests.uuid': campaignRequestId }, { $set: { 'campaignRequests.$.status': status } }).exec();
  } catch (error) {
    throw new CodeError('Something went wrong, please try again', 500);
  }
}

async function createSurvey(uuid, surveyData) {
  try {
    await User.findOneAndUpdate(
      { uuid },
      { $push: { surveys: surveyData } },
      { new: true },
    ).exec();
  } catch (error) {
    throw new CodeError('Something went wrong, please try again', 500);
  }
}

async function updateSurveyStatus(uuid, surveyId) {
  try {
    await User.findOneAndUpdate(
      { uuid, 'surveys.uuid': surveyId },
      { $set: { 'surveys.$.opened': true } },
    ).exec();
  } catch (error) {
    throw new CodeError('Something went wrong, please try again', 500);
  }
}

async function updateSurveyLoginCount(uuid, surveyId, newCount) {
  try {
    await User.findOneAndUpdate(
      { uuid, 'surveys.uuid': surveyId },
      { $set: { 'surveys.$.count': newCount } },
    ).exec();
  } catch (error) {
    console.log(error);
    throw new CodeError('Something went wrong, please try again', 500);
  }
}

async function userExists(searchParam) {
  const user = await User.exists(searchParam);

  if (!user) throw new CodeError("User doesn't exist", 404);
  else return user;
}

export default {
  saveUser,
  getUser,
  updateUser,
  requestNewCampaign,
  updateCampaignRequestStatus,
  createSurvey,
  updateSurveyLoginCount,
  updateSurveyStatus,
  userExists,
  getUsers,
};
