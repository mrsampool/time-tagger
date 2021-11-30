const { Pool } = require('pg');
require('dotenv').config();
const { dbConfig } = require('./config');

const herokuConnection = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

module.exports.pool = new Pool(
  process.env.NODE_ENV === 'production'
    ? herokuConnection
    : dbConfig,
);
