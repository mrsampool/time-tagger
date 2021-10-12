const express = require('express');
const { apiRouter } = require('./apiRouter');
const app = express();
require('dotenv').config();

app.use( express.json() );

app.use( (req, res, next) => {
  if (process.env.ENV === 'DEV'){
    console.log(`\nIncoming ${req.method} request to ${req.path}`);
    console.log(`Request Body:`)
    console.log(req.body);
    next();
  }
});

app.use('/api', apiRouter);

module.exports.app = app;
