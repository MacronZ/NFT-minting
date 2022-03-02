import { model } from 'mongoose';
import { SurveyInterface } from '../interfaces';
import { SurveySchema } from '../schemas';

const Survey = model<SurveyInterface.ISurvey>('Survey', SurveySchema);

export default Survey;
