import express from 'express';
const router = express.Router();
import accountsController from '../controllers/accountsController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const { authenticateAgent, authenticateEmployee } = authMiddleware;

// Create account by agent (protected)
router.post('/agent/create', authenticateAgent, accountsController.createAccountByAgent);

// Create account by employee (protected)
router.post('/employee/create', authenticateEmployee, accountsController.createAccountByEmployee);

// Get account details (protected, can be extended)
router.get('/:accountNumber', accountsController.getAccountDetails);

export default router;
