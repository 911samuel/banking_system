import { Router } from 'express';
import { getPayrollInfoByRNRS, generateSalaryCode, confirmSalaryCode, processPayment, getPaymentReceipt, automateSalaryPayments } from '../controllers/payrollController';
import { authenticateAgent, authenticateAdmin } from '../middlewares/authMiddleware';

const router = Router();

// Enter RNRS Registration ID and retrieve payroll info (protected)
router.post('/rnrs', authenticateAgent, getPayrollInfoByRNRS);

// Generate new salary code (protected)
router.post('/generate-salary-code', authenticateAgent, generateSalaryCode);

// Confirm new salary code and setup weekly payment (protected)
router.post('/confirm-salary-code', authenticateAgent, confirmSalaryCode);

// Process payment (protected)
router.post('/process-payment', authenticateAgent, processPayment);

// Get payment receipt (protected)
router.get('/receipt/:salaryCode', authenticateAgent, getPaymentReceipt);

// Automated salary payment processing (admin protected)
router.post('/automate', authenticateAgent, authenticateAdmin, automateSalaryPayments);

export default router;
