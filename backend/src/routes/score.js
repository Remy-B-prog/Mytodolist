const express = require('express');
const router = express.Router();

const {getUserScoreController} = require('../controllers/scoreControllers');

// get all badge
router.get('/',getUserScoreController);


module.exports = router