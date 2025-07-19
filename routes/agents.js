const express = require('express');
const router = express.Router();
const agentsController = require('../controllers/agentsController');
const { authenticateAgent } = require('../middlewares/authMiddleware');

// Agent login
router.post('/login', agentsController.login);

// Get agent info (protected)
router.get('/info', authenticateAgent, agentsController.getAgentInfo);

module.exports = router;
