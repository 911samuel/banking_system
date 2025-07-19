import { DataTypes } from 'sequelize';
import db from '../config/database.js';
const { sequelize } = db;

const Jobseeker = sequelize.define('Jobseeker', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  resumeUrl: {
    type: DataTypes.STRING,
  },
  appliedPosition: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
}, {
  tableName: 'jobseekers',
  timestamps: true,
});

export default Jobseeker;
