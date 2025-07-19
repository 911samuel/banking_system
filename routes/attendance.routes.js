import { Router } from 'express';
import attendanceController from '../controllers/attendance.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';

const router = Router();

router.post('/clock-in', authMiddleware.authenticateUser, attendanceController.clockIn);
router.post('/clock-out', authMiddleware.authenticateUser, attendanceController.clockOut);
router.get('/employee/:id', authMiddleware.authenticateUser, attendanceController.getAttendanceByEmployee);
router.get('/org/:orgId', authMiddleware.authenticateUser, roleMiddleware.isOrgAdmin, attendanceController.getAttendanceByOrg);

export default router;
