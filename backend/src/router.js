const express = require('express');
const router = express.Router();

const taskRoutes = require('./routes/task');
const userRoutes = require('./routes/user');
const badgeRoutes = require('./routes/badge');


router.use( '/api/task', taskRoutes);
router.use( '/api/user', userRoutes);
router.use( '/api/badge', badgeRoutes);

module.exports = router;