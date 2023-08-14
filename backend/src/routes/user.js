const express = require('express');
const { getUserByEmailWithPasswordAndPassToNext, verifyPassword, hashPassword  } = require('../middleware/auth');
const {verifyToken} = require('../middleware/auth')
const  {addUser, userUpdateHisFirstName}  = require('../controllers/userControllers');

const router = express.Router();

// Login as user
router.post('/login', getUserByEmailWithPasswordAndPassToNext,verifyPassword)

// router.get('/login', verifyPassword)
router.post('/register', hashPassword, addUser)

// Protected routes
router.use(verifyToken);

router.patch('/update-firstname', userUpdateHisFirstName);

module.exports = router