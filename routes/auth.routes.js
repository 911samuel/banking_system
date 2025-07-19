import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authMiddleware.authenticateUser, authController.getCurrentUser);

export default router;
