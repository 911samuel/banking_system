import { Router } from 'express';
import jobseekerController from '../controllers/jobseeker.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/role.middleware.js';

const router = Router();

router.post('/', jobseekerController.submitApplication);
router.get('/', authMiddleware.authenticateAgent, roleMiddleware.isAdmin, jobseekerController.getAllApplications);
router.get('/:id', authMiddleware.authenticateAgent, roleMiddleware.isAdmin, jobseekerController.getApplicationById);

export default router;
