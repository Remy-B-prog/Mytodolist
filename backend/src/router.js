const express = require('express');
const router = express.Router();

const {verifyToken} = require('./middleware/auth')

const taskRoutes = require('./routes/task');
const userRoutes = require('./routes/user');
const badgeRoutes = require('./routes/badge');
const scoreRoutes = require('./routes/score');

// Public routes 
router.use( '/api/user', userRoutes);

// Protected routes
router.use(verifyToken);

router.use( '/api/task', taskRoutes);
router.use( '/api/badge', badgeRoutes);
router.use( '/api/score', scoreRoutes);

module.exports = router;