const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountsController');
const { authenticateAgent, authenticateEmployee } = require('../middlewares/authMiddleware');

// Create account by agent (protected)
router.post('/agent/create', authenticateAgent, accountsController.createAccountByAgent);

// Create account by employee (protected)
router.post('/employee/create', authenticateEmployee, accountsController.createAccountByEmployee);

// Get account details (protected, can be extended)
router.get('/:accountNumber', accountsController.getAccountDetails);

module.exports = router;
