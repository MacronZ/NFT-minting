import { surveyDB } from '../database';
import { surveyHelper, validationHelper } from '../helpers';

const getSurveys = async (req, res) => {
  let surveys;

  try {
    surveys = await surveyDB.getSurveys();
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send(surveys);
};

const createSurvey = async (req, res) => {
  const surveyData = req.body;
  const { token } = req.body;
  const survey = await surveyHelper.buildNewSurvey(surveyData);

  try {
    await validationHelper.checkToken(token);
    await surveyDB.saveSurvey(survey);
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send();
};

export default {
  getSurveys,
  createSurvey,
};
