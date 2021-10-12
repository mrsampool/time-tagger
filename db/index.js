const { Pool } = require('pg');
const { dbConfig } = require('./config');
module.exports.pool = new Pool(dbConfig);
