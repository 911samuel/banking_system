import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const { sequelize } = db;

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'categories',
  timestamps: true,
});

export default Category;
