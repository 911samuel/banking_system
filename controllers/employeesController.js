import bcrypt from 'bcrypt';
import Agent from '../models/Agent.js';
import { generateToken } from '../utils/jwt.js';

const login = async (req, res) => {
  const { employmentAccountNumber, password } = req.body;
  if (!employmentAccountNumber || !password) {
    return res.status(400).json({ message: 'Employment account number and password are required' });
  }
  try {
    const employee = await Employee.findOne({ where: { employmentAccountNumber } });
    if (!employee) {
      return res.status(401).json({ message: 'Invalid account number or password' });
    }
    const validPassword = await bcrypt.compare(password, employee.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid account number or password' });
    }
    const token = generateToken({ id: employee.id, employmentAccountNumber: employee.employmentAccountNumber });
    res.json({ token });
  } catch (error) {
    console.error('Employee login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getEmployeeInfo = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.employee.id, {
      attributes: ['employeeName', 'employmentStatus', 'currentAccountBalance', 'accountType', 'recentTransactions'],
    });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error('Get employee info error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  login,
  getEmployeeInfo,
};
