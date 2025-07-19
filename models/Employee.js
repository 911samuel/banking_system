const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database').default;

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  employmentAccountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  employeeName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employmentStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  currentAccountBalance: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  accountType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  recentTransactions: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'employees',
  timestamps: true,
});

module.exports = Employee;
