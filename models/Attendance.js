import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const { sequelize } = db;

const Attendance = sequelize.define('Attendance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clockInTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  clockOutTime: {
    type: DataTypes.DATE,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  tableName: 'attendances',
  timestamps: true,
});

export default Attendance;
