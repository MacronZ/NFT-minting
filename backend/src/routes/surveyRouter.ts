import express from 'express';
import { surveyController } from '../controllers';

const router = express.Router();

router.get('/get-surveys', surveyController.getSurveys);
router.post('/create-survey', surveyController.createSurvey);

export = router;
