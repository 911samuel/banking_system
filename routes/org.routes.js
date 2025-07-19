import { Router } from 'express';
import orgController from '../controllers/org.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';

const router = Router();

router.post('/register', authMiddleware.authenticateUser, roleMiddleware.isOrgAdmin, orgController.registerOrg);
router.get('/', authMiddleware.authenticateUser, roleMiddleware.isSystemAdmin, orgController.getAllOrgs);
router.get('/:id', authMiddleware.authenticateUser, orgController.getOrgById);
router.patch('/:id/status', authMiddleware.authenticateUser, roleMiddleware.isSystemAdmin, orgController.updateOrgStatus);
router.get('/:id/employees', authMiddleware.authenticateUser, orgController.getOrgEmployees);

export default router;
