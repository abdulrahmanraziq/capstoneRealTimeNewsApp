import express from 'express';
import sendMailController from '../controller/mailSender.js'

const router = express.Router();

router.post('/mail', sendMailController.sendEmail);
router.post('/subscriptionMail', sendMailController.subscriptionMail);
router.get('/getCount/:email', sendMailController.getMailCount);

export default router