import { Router } from 'express';
import orgController from '../controllers/org.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/role.middleware.js';

const router = Router();

router.post('/register', authMiddleware.authenticateAgent, roleMiddleware.isOrgAdmin, orgController.registerOrg);
router.get('/', authMiddleware.authenticateAgent, roleMiddleware.isSystemAdmin, orgController.getAllOrgs);
router.get('/:id', authMiddleware.authenticateAgent, orgController.getOrgById);
router.patch('/:id/status', authMiddleware.authenticateAgent, roleMiddleware.isSystemAdmin, orgController.updateOrgStatus);
router.get('/:id/employees', authMiddleware.authenticateAgent, orgController.getOrgEmployees);

export default router;
