import { Survey } from '../models';

const buildNewSurvey = async (surveyData) => new Survey(surveyData);

export default { buildNewSurvey };
