const {Router} = require("express");

const pathRouter = require('./pathRouter');
const apiRouter = require("./api");

const allRouter = new Router();

allRouter.use('/', pathRouter);
allRouter.use('/api', apiRouter);

module.exports = allRouter;