import { Schema } from 'mongoose';
import { SurveyInterface } from '../interfaces';

const SurveySchema = new Schema<SurveyInterface.ISurvey>({
  uuid: { type: String, required: true, unique: true },
  surveyName: { type: String, required: true },
});

export default SurveySchema;
