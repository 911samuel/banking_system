const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeesController');
const { authenticateEmployee } = require('../middlewares/authMiddleware');

// Employee login
router.post('/login', employeesController.login);

// Get employee info (protected)
router.get('/info', authenticateEmployee, employeesController.getEmployeeInfo);

module.exports = router;
