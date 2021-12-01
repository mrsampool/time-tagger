const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const users = require('./db/models/users_model');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      (email, password, done) => {
        users
          .find(email)
          .then((user) => {
            if (!user) {
              return done(null, false);
            }
            bcrypt
              .compare(password, user.password)
              .then((result) => {
                if (result) {
                  done(null, user);
                } else {
                  done(null, false);
                }
              })
              .catch(() => done(null, false));
          })
          .catch((err) => done(err));
      },
    ),
  );
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
