const apiRouter = require('express').Router();
const controller = require('./controller');

//TODO: apiRouter.get('/users', handler);
//TODO: apiRouter.get('/users/:userId', handler);
//TODO: apiRouter.get('/users/:userId/log', handler);
apiRouter.post( '/users/:userId/log', controller.clockIn );
apiRouter.put( '/users/:userId/log', controller.clockOut );
//TODO: apiRouter.put('/users/:userId/log/:logId', handler);

module.exports.apiRouter = apiRouter;