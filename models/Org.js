import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const { sequelize } = db;

const Org = sequelize.define('Org', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orgName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orgCode: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
  contactEmail: {
    type: DataTypes.STRING,
  },
  contactPhone: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'orgs',
  timestamps: true,
});

export default Org;
