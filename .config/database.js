const Sequelize  = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'postgres',
        port: process.env.DB_PORT || 5433,
        logging: false,
    }
);

module.exports = sequelize;
