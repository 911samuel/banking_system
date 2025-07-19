import { Router } from 'express';
import categoryController from '../controllers/category.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/role.middleware.js';

const router = Router();

router.post('/', authMiddleware.authenticateAgent, roleMiddleware.isOrgAdmin, categoryController.createCategory);
router.get('/org/:id', authMiddleware.authenticateAgent, categoryController.getCategoriesByOrg);
router.get('/:id', authMiddleware.authenticateAgent, categoryController.getCategoryById);
router.patch('/:id', authMiddleware.authenticateAgent, roleMiddleware.isOrgAdmin, categoryController.updateCategory);
router.delete('/:id', authMiddleware.authenticateAgent, roleMiddleware.isOrgAdmin, categoryController.deleteCategory);

export default router;
