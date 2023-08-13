const express = require('express');
const router = express.Router();

const {getAllUserBadge} = require('../controllers/badgeControllers');

// get all badge
router.get('/', getAllUserBadge);

module.exports = router