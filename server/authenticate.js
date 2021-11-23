const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const users = require("./db/models/users_model");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      (email, password, done) => {
        console.log("auth...");
        users
          .find(email)
          .then((user) => {
            if (!user) {
              return done(null, false);
            }
            bcrypt
              .compare(password, user.password)
              .then(() => {
                return done(null, user);
              })
              .catch((err) => {
                return done(null, false);
              });
          })
          .catch((err) => done(err));
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
};
