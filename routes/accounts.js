import express from 'express';
import router from 'express.router';
import accountsController from '../controllers/accountsController';
import { authenticateAgent, authenticateEmployee } from '../middlewares/authMiddleware';

// Create account by agent (protected)
router.post('/agent/create', authenticateAgent, accountsController.createAccountByAgent);

// Create account by employee (protected)
router.post('/employee/create', authenticateEmployee, accountsController.createAccountByEmployee);

// Get account details (protected, can be extended)
router.get('/:accountNumber', accountsController.getAccountDetails);

module.exports = router;
