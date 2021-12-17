const apiRouter = require('express').Router();
const passport = require('passport');
const controller = require('./controller');
const users = require('./db/models/users_model');

// TODO: apiRouter.get('/users', handler);
// TODO: apiRouter.get('/users/:userId', handler);
apiRouter.get('/users/:userId/log', controller.getUserLog);
apiRouter.post('/users/:userId/log', controller.clockIn);
apiRouter.put('/users/:userId/log', controller.clockOut);
apiRouter.put('/users/:userId/log/:logId', controller.editEntry);
apiRouter.post('/users', controller.createUser);
apiRouter.get('/users/current', (req, res, next) => {
  if (req.user) {
    console.log(req.user);
    users.find(req.user.email).then((dbUser) => res.json({ user: dbUser }));
    // res.json({ user: req.user });
  } else {
    res.status(200).send();
  }
});
apiRouter.post(
  '/login',
  passport.authenticate('local', {}),
  (req, res) => {
    delete req.user.password;
    res.send({ user: req.user });
  },
);
apiRouter.get('/logout', controller.logOut);
// TODO: apiRouter.put('/users/:userId/log/:logId', handler);

module.exports.apiRouter = apiRouter;
