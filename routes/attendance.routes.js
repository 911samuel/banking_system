import { Router } from 'express';
import attendanceController from '../controllers/attendance.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/role.middleware.js';

const router = Router();

router.post('/clock-in', authMiddleware.authenticateAgent, attendanceController.clockIn);
router.post('/clock-out', authMiddleware.authenticateAgent, attendanceController.clockOut);
router.get('/employee/:id', authMiddleware.authenticateAgent, attendanceController.getAttendanceByEmployee);
router.get('/org/:orgId', authMiddleware.authenticateAgent, roleMiddleware.isOrgAdmin, attendanceController.getAttendanceByOrg);

export default router;
