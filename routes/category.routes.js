import { Router } from 'express';
import categoryController from '../controllers/category.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';

const router = Router();

router.post('/', authMiddleware.authenticateUser, roleMiddleware.isOrgAdmin, categoryController.createCategory);
router.get('/org/:id', authMiddleware.authenticateUser, categoryController.getCategoriesByOrg);
router.get('/:id', authMiddleware.authenticateUser, categoryController.getCategoryById);
router.patch('/:id', authMiddleware.authenticateUser, roleMiddleware.isOrgAdmin, categoryController.updateCategory);
router.delete('/:id', authMiddleware.authenticateUser, roleMiddleware.isOrgAdmin, categoryController.deleteCategory);

export default router;
