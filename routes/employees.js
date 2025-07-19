import { Router } from 'express';
import employeesController from '../controllers/employeesController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const { login, getEmployeeInfo } = employeesController;
const { authenticateEmployee } = authMiddleware;

const router = Router();
// Employee login
router.post('/login', login);

// Get employee info (protected)
router.get('/info', authenticateEmployee, getEmployeeInfo);

export default router;
