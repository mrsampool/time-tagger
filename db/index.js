const { Pool } = require('pg');
let dbConfig;
if (process.env.ENV !== 'PROD'){
  require('dotenv').config();
  dbConfig = require('./config').dbConfig;
}
module.exports.pool = new Pool(process.env.ENV === 'DEV' ? dbConfig : process.env.DATABASE_URL);
