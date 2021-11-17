// Libraries & Modules
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const {pool} = require('../db');
const pgSession = require('connect-pg-simple')(session);
const path = require('path');
const { apiRouter } = require('./apiRouter');
if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}
const app = express();

// Middleware
require('./authenticate')()
app.use(session({
    store: new pgSession({ pool }),
    secret: 'my secret',
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use( express.json() );
app.use( (req, res, next) => {
//  if (process.env.ENV === 'DEV'){
    console.log(`\nIncoming ${req.method} request to ${req.path}`);
    console.log(`Request Body:`)
    console.log(req.body);
    console.log(req.isAuthenticated());
    console.log(res);
    next();
//  }
});
app.use( express.static( path.join(__dirname, '..', 'client', 'build') ) );

// Serving


app.use('/api', apiRouter);

module.exports.app = app;