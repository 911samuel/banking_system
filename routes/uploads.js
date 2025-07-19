import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import uploadsController from '../controllers/uploadsController.js';
import { authenticateAgent, authenticateEmployee } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Upload identity documents by agent (protected)
router.post('/agent', authenticateAgent, upload.fields([
  { name: 'nationalId', maxCount: 1 },
  { name: 'passport', maxCount: 1 },
  { name: 'employerContract', maxCount: 1 },
  { name: 'businessRegistration', maxCount: 1 },
  { name: 'shortPhoto', maxCount: 1 },
  { name: 'workPhotos', maxCount: 5 },
]), uploadsController.uploadByAgent);

// Upload identity documents by employee (protected)
router.post('/employee', authenticateEmployee, upload.fields([
  { name: 'driverLicense', maxCount: 1 },
  { name: 'employeeId', maxCount: 1 },
]), uploadsController.uploadByEmployee);

module.exports = router;
