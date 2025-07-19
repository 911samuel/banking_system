import { Router } from 'express';
import loanController from '../controllers/loan.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/role.middleware.js';

const router = Router();

router.post('/apply', authMiddleware.authenticateAgent, loanController.applyLoan);
router.get('/', authMiddleware.authenticateAgent, roleMiddleware.isSystemAdmin, loanController.getAllLoans);
router.get('/user/:id', authMiddleware.authenticateAgent, loanController.getLoansByUser);
router.patch('/:id/status', authMiddleware.authenticateAgent, roleMiddleware.isSystemAdmin, loanController.updateLoanStatus);

export default router;
