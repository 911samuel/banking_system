import { verifyToken } from '../utils/jwt.js';
import Agent from '../models/Agent.js';
import Employee from '../models/Employee.js';

const authenticateAgent = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }
  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
  try {
    const agent = await Agent.findByPk(decoded.id);
    if (!agent) {
      return res.status(401).json({ message: 'Agent not found' });
    }
    req.agent = { id: agent.id, agentCode: agent.agentCode, role: agent.role || 'agent' };
    next();
  } catch (error) {
    console.error('Agent authentication error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const authenticateEmployee = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }
  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
  try {
    const employee = await Employee.findByPk(decoded.id);
    if (!employee) {
      return res.status(401).json({ message: 'Employee not found' });
    }
    req.employee = { id: employee.id, employmentAccountNumber: employee.employmentAccountNumber };
    next();
  } catch (error) {
    console.error('Employee authentication error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const authenticateAdmin = (req, res, next) => {
  if (!req.agent || req.agent.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

export default {
  authenticateAgent,
  authenticateEmployee,
  authenticateAdmin,
};
