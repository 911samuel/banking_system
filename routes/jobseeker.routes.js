import { Router } from 'express';
import jobseekerController from '../controllers/jobseeker.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';

const router = Router();

router.post('/', jobseekerController.submitApplication);
router.get('/', authMiddleware.authenticateUser, roleMiddleware.isAdmin, jobseekerController.getAllApplications);
router.get('/:id', authMiddleware.authenticateUser, roleMiddleware.isAdmin, jobseekerController.getApplicationById);

export default router;
