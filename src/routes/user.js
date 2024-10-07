import express from 'express';
import userController from '../controller/user.js'
const router = express.Router();


router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/forgotPassword', userController.forgotPassword);
router.post('/resetPassword', userController.resetPassword);
export default router;