const apiRouter = require('express').Router();
const passport = require('passport');
const controller = require('./controller');

// TODO: apiRouter.get('/users', handler);
// TODO: apiRouter.get('/users/:userId', handler);
apiRouter.get('/users/:userId/log', controller.getUserLog);
apiRouter.post('/users/:userId/log', controller.clockIn);
apiRouter.put('/users/:userId/log', controller.clockOut);
apiRouter.post('/users', controller.createUser);
apiRouter.get('/users/current', (req, res, next) => {
  if (req.user) {
    res.json({ user: req.user });
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
