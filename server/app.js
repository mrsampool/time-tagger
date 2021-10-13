// Libraries & Modules
const express = require('express');
const path = require('path');
require('dotenv').config();
const { apiRouter } = require('./apiRouter');

// Server Config
const app = express();
module.exports.app = app;
app.use( express.json() );

// Serving
app.use( (req, res, next) => {
  if (process.env.ENV === 'DEV'){
    console.log(`\nIncoming ${req.method} request to ${req.path}`);
    console.log(`Request Body:`)
    console.log(req.body);
    next();
  }
});
app.use( express.static( path.join(__dirname, '..', 'client', 'build') ) );
app.use('/api', apiRouter);