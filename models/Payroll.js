import { DataTypes } from 'sequelize';
import db from '../config/database.js';
const { sequelize } = db;

const Payroll = sequelize.define('Payroll', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  salaryCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  employeeId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  agentId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  salaryStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  currentSalaryAmount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
  },
  weeksPaid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  transactionReference: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'payrolls',
  timestamps: true,
});

export default Payroll;
