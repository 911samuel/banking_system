const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payrollController');
const { authenticateAgent, authenticateAdmin } = require('../middlewares/authMiddleware');

// Enter RNRS Registration ID and retrieve payroll info (protected)
router.post('/rnrs', authenticateAgent, payrollController.getPayrollInfoByRNRS);

// Generate new salary code (protected)
router.post('/generate-salary-code', authenticateAgent, payrollController.generateSalaryCode);

// Confirm new salary code and setup weekly payment (protected)
router.post('/confirm-salary-code', authenticateAgent, payrollController.confirmSalaryCode);

// Process payment (protected)
router.post('/process-payment', authenticateAgent, payrollController.processPayment);

// Get payment receipt (protected)
router.get('/receipt/:salaryCode', authenticateAgent, payrollController.getPaymentReceipt);

// Automated salary payment processing (admin protected)
router.post('/automate', authenticateAgent, authenticateAdmin, payrollController.automateSalaryPayments);

module.exports = router;
