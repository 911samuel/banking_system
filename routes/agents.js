import { Router } from 'express';
import agentsController from '../controllers/agentsController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const { authenticateAgent } = authMiddleware;
const { login, getAgentInfo } = agentsController;

const router = Router();
// Agent login
router.post('/login', login);

// Get agent info (protected)
router.get('/info', authenticateAgent, getAgentInfo);

export default router;
