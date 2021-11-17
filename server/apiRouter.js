const apiRouter = require('express').Router();
const controller = require('./controller');
const passport = require("passport");

//TODO: apiRouter.get('/users', handler);
//TODO: apiRouter.get('/users/:userId', handler);
apiRouter.get('/users/:userId/log', controller.getUserLog);
apiRouter.post('/users/:userId/log', controller.clockIn);
apiRouter.put('/users/:userId/log', controller.clockOut );
apiRouter.post('/users', controller.createUser);
apiRouter.post('/login', passport.authenticate('local', {

}), (req, res, next) => {
    res.send({user: req.user});
});
//TODO: apiRouter.put('/users/:userId/log/:logId', handler);

module.exports.apiRouter = apiRouter;