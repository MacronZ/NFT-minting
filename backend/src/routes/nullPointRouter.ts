import express from 'express';
import { nullPointController } from '../controllers';

const router = express.Router();

router.post('/auto-login', nullPointController.generateAutoLoginUrl);

router.get('/user-details', nullPointController.getUserDetails);

export = router;
