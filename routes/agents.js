import { Router } from 'express';
import { login, getAgentInfo } from '../controllers/agentsController';
import { authenticateAgent } from '../middlewares/authMiddleware';

const router = Router();
// Agent login
router.post('/login', login);

// Get agent info (protected)
router.get('/info', authenticateAgent, getAgentInfo);

export default router;
