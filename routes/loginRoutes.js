import express from 'express';
import { loginUser, requestPasswordReset, resetPassword } from '../controllers/LoginController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

export default router;
