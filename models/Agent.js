import DataTypes from 'sequelize';
import sequelize from '../config/database';

const Agent = sequelize.define('Agent', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  agentCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  agentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assignedBranch: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  performanceMetrics: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  recentActivities: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
}, {
  tableName: 'agents',
  timestamps: true,
});

module.exports = Agent;
