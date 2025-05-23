const { Sequelize } = require('sequelize');
require('dotenv').config();

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

if (!DB_USERNAME || !DB_PASSWORD || !DB_HOST || !DB_NAME) {
  throw new Error('Missing required database environment variables in .env');
}

const DATABASE_URL = `postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;