const { Pool } = require('pg');
let dbConfig, herokuConnection;
if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
  dbConfig = require('./config').dbConfig;
} else {
  herokuConnection = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
}

module.exports.pool = new Pool(process.env.NODE_ENV !== 'production' ? dbConfig : herokuConnection);
