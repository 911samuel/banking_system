import DataTypes from 'sequelize';
import db from '../config/database.js';
const { sequelize } = db;

const SalaryPayment = sequelize.define('SalaryPayment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  salaryCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employeeId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  agentId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  amountPaid: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
  },
  taxDeductions: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
    defaultValue: 0,
  },
  netAmountPaid: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
  },
  transactionReference: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'success',
  },
  errorMessage: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'salary_payments',
  timestamps: true,
});

export default SalaryPayment;
