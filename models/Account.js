const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Account = sequelize.define('Account', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  accountType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountHolderName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  socialSecurityNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  homeAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdByAgentId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  createdByEmployeeId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
  },
}, {
  tableName: 'accounts',
  timestamps: true,
});

module.exports = Account;
