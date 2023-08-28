const express = require('express');
const router = express.Router();

const {getAllUserBadge, getUserNotValidatedBadge} = require('../controllers/badgeControllers');

// get all badge
router.get('/', getAllUserBadge);

router.get('/no-validated', getUserNotValidatedBadge);

module.exports = router