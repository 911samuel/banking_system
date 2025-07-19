import { Router } from 'express';
import uploadController from '../controllers/upload.controller.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/certificate', authMiddleware.authenticateUser, uploadMiddleware.single('file'), uploadController.uploadCertificate);

export default router;
