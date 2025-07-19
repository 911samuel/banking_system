import { Router } from 'express';
import employeeController from '../controllers/employee.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/role.middleware.js';

const router = Router();

router.post('/', authMiddleware.authenticateAgent, roleMiddleware.isOrgAdmin, employeeController.addEmployee);
router.get('/', authMiddleware.authenticateAgent, roleMiddleware.isSystemAdmin, employeeController.getAllEmployees);
router.get('/:id', authMiddleware.authenticateAgent, employeeController.getEmployeeById);
router.patch('/:id', authMiddleware.authenticateAgent, roleMiddleware.isOrgAdmin, employeeController.updateEmployee);
router.delete('/:id', authMiddleware.authenticateAgent, roleMiddleware.isOrgAdmin, employeeController.deleteEmployee);

export default router;
