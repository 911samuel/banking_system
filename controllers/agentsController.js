const bcrypt = require('bcrypt');
const Agent = require('../models/Agent');
const { generateToken } = require('../utils/jwt');

const login = async (req, res) => {
  const { agentCode, password } = req.body;
  if (!agentCode || !password) {
    return res.status(400).json({ message: 'Agent code and password are required' });
  }
  try {
    const agent = await Agent.findOne({ where: { agentCode } });
    if (!agent) {
      return res.status(401).json({ message: 'Invalid agent code or password' });
    }
    const validPassword = await bcrypt.compare(password, agent.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid agent code or password' });
    }
    const token = generateToken({ id: agent.id, agentCode: agent.agentCode });
    res.json({ token });
  } catch (error) {
    console.error('Agent login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAgentInfo = async (req, res) => {
  try {
    const agent = await Agent.findByPk(req.agent.id, {
      attributes: ['agentName', 'assignedBranch', 'performanceMetrics', 'recentActivities'],
    });
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.json(agent);
  } catch (error) {
    console.error('Get agent info error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  login,
  getAgentInfo,
};
