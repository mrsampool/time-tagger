const apiRouter = require('express').Router();
const controller = require('./controller');
const passport = require("passport");

//TODO: apiRouter.get('/users', handler);
//TODO: apiRouter.get('/users/:userId', handler);
apiRouter.get('/users/:userId/log', controller.getUserLog);
apiRouter.post('/users/:userId/log', controller.clockIn);
apiRouter.put('/users/:userId/log', controller.clockOut );
apiRouter.post('/users', controller.createUser);
apiRouter.get('/users/current',
    (req,res, next)=>{
    if (req.user){
        res.json({ user: req.user });
    } else {
        res.status(200).send();
    }
})
apiRouter.post('/login', passport.authenticate('local', {}),
    (req, res, next) => {
    res.send({user: req.user});
});
//TODO: apiRouter.put('/users/:userId/log/:logId', handler);

module.exports.apiRouter = apiRouter;