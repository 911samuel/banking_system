const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME || 'banking_system', process.env.DB_USER || 'postgres', process.env.DB_PASSWORD || 'password', {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };
