const express = require('express');
const { getUserByEmailWithPasswordAndPassToNext, verifyPassword, hashPassword  } = require('../middleware/auth');
const  addUser  = require('../controllers/userControllers');

const router = express.Router();

// Login as user
router.post('/login', getUserByEmailWithPasswordAndPassToNext,verifyPassword)

router.post('/register', hashPassword, addUser)
// router.get('/login', verifyPassword)


module.exports = router