const express = require('express');
const { getUserByEmailWithPasswordAndPassToNext, verifyPassword, hashPassword  } = require('../middleware/auth');
const  addUser  = require('../controllers/userControllers');

const router = express.Router();

// Login as user
router.post('/login', getUserByEmailWithPasswordAndPassToNext,verifyPassword)

router.post('/register', hashPassword, addUser)
// router.get('/login', verifyPassword)

// Delete a new user
router.delete('/:id', (req, res) => {
    res.json({mssg: 'delete a user'})
})

// Delete a new user
router.patch('/:id', (req, res) => {
    res.json({mssg: 'update a user'})
})

module.exports = router