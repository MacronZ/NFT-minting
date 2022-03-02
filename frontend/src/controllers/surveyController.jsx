import { surveyAPI } from '../api';
import { errorHelper } from '../helpers';

async function getSurveys() {
  let surveys;

  try {
    surveys = await surveyAPI.getSurveys();
  } catch (error) {
    throw new errorHelper.CodeError('We encountered an error, please try again later.', error.status);
  }

  return surveys;
}

export default {
  getSurveys,
};
