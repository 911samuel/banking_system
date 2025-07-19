import { Router } from 'express';
import loanController from '../controllers/loan.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';

const router = Router();

router.post('/apply', authMiddleware.authenticateUser, loanController.applyLoan);
router.get('/', authMiddleware.authenticateUser, roleMiddleware.isSystemAdmin, loanController.getAllLoans);
router.get('/user/:id', authMiddleware.authenticateUser, loanController.getLoansByUser);
router.patch('/:id/status', authMiddleware.authenticateUser, roleMiddleware.isSystemAdmin, loanController.updateLoanStatus);

export default router;
