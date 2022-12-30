const router = require('express').Router();
const userRoutes = require('./user');
const blogpostRoutes = require('./blogpost');

router.use('/users', userRoutes);
router.use('/blogposts', blogpostRoutes);

module.exports = router;
