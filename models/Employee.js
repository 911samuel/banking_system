import { DataTypes } from 'sequelize';
import db from '../config/database.js';
const { sequelize } = db;

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
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'employees',
  timestamps: true,
});

export default Employee;
