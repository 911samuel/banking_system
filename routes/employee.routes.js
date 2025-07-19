import { Router } from 'express';
import employeeController from '../controllers/employee.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';

const router = Router();

router.post('/', authMiddleware.authenticateUser, roleMiddleware.isOrgAdmin, employeeController.addEmployee);
router.get('/', authMiddleware.authenticateUser, roleMiddleware.isSystemAdmin, employeeController.getAllEmployees);
router.get('/:id', authMiddleware.authenticateUser, employeeController.getEmployeeById);
router.patch('/:id', authMiddleware.authenticateUser, roleMiddleware.isOrgAdmin, employeeController.updateEmployee);
router.delete('/:id', authMiddleware.authenticateUser, roleMiddleware.isOrgAdmin, employeeController.deleteEmployee);

export default router;
