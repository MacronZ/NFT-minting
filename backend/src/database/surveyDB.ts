import { Survey } from '../models';
import { CodeError } from '../helpers';

async function saveSurvey(survey) {
  try {
    await survey.save();
  } catch (error) {
    if (error && error.code === 11000) throw new CodeError('This survey already exists.', 409);
    throw new CodeError('Error while saving new survey, please try again', 500);
  }
}

async function getSurveys() {
  let surveys;

  try {
    surveys = await Survey.find().exec();
  } catch (error) {
    throw new CodeError('Something went wrong, please try again', 500);
  }

  return surveys;
}

export default {
  saveSurvey,
  getSurveys,
};
