const { Router } = require("express");

const userRouter = require('./user');
const blogpostRouter = require('./blogpost');
const commentRouter = require('./comment');

const apiRouter = new Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/blogpost', blogpostRouter);
apiRouter.use('/comment', commentRouter);

module.exports = apiRouter;