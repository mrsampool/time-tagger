const { Pool } = require('pg');
const { dbConfig } = require('./config');
if (process.env.ENV !== 'PROD'){
  require('dotenv').config();
}
module.exports.pool = new Pool(process.env.ENV === 'DEV' ? dbConfig : process.env.DATABASE_URL);
