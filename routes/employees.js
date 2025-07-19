import { Router } from 'express';
import { login, getEmployeeInfo } from '../controllers/employeesController';
import { authenticateEmployee } from '../middlewares/authMiddleware';

const router = Router();

// Employee login
router.post('/login', login);

// Get employee info (protected)
router.get('/info', authenticateEmployee, getEmployeeInfo);

export default router;
