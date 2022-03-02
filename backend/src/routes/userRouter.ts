import express from 'express';
import { userController, lavaTeckController } from '../controllers';

const router = express.Router();
// Generic
router.post('/request', userController.sendUserRequest);

// Onboarding
router.post('/register', userController.registerUser);
router.post('/confirm-email', userController.confirmEmail);
router.post('/confirm-email-password', userController.confirmEmailPassword);
router.post('/create', userController.createUser);

// User Data
router.get('/get-user', userController.getUserByID);
router.get('/details', userController.getUserDetailsByID);
router.post('/change-password', userController.changePassword);
router.put('/update', userController.updateUser);
router.put('/update-pass', userController.updateUserPass);
router.put('/sf-pass-update', userController.sfUpdatePass);
router.post('/resend-code', userController.resendVerificationCode);
router.post('/reset-password-code', userController.resetPassword);
router.put('/update-socials', userController.updateSocials);
router.put('/questionnaire', userController.updateQuestionnaire);

// Auth
router.post('/login', userController.loginUser);
router.get('/authenticate', userController.authenticateUser);
router.get('/get-token', userController.getToken);

// Campaigns
router.post('/request-campaign', userController.requestCampaign);
router.put('/request-campaign', userController.updateCampaignRequestStatus);
router.put('/promo-campaign', userController.savePromoCampaign);

// Surveys
router.post('/survey', userController.createSurvey);
router.put('/survey', userController.updateSurveyStatus);

// Tour
router.put('/tour', userController.tourCompleted);

// Withdrawals
router.post('/withdrawal', userController.requestWithdrawal);
router.put('/withdrawal/approve/:office', userController.approveWithdrawal);
router.put('/withdrawal/reject', userController.rejectWithdrawal);
router.put('/withdrawal/cancel', userController.cancelWithdrawal);
router.put('/withdrawal/status', userController.updateWithdrawalStatus);
router.get('/withdrawal', userController.getWithdrawals);
router.post('/skrill-details', userController.saveSkrillDetails);
router.post('/neteller-details', userController.saveNetellerDetails);
router.post('/bank-details', userController.saveBankDetails);
router.post('/lavateck-migration', lavaTeckController.migrateIB);
router.post('/activate', userController.activateIB);
router.get('/trading-account', lavaTeckController.getAccountByProfileId);

export = router;
