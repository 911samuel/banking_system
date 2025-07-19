import { Router } from 'express';
import uploadController from '../controllers/upload.controller.js';
import uploadMiddleware from '../middleware/uploadMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/certificate', authMiddleware.authenticateAgent, uploadMiddleware.single('file'), uploadController.uploadCertificate);

export default router;
