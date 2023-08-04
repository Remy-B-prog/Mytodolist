const express = require('express');

const router = express.Router();

// get all user
router.get('/', (req, res) => {
    res.json({mssg: 'GET all user'})
})

// Get a single user
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single user'})
})

// POST a new user
router.post('/', (req, res) => {
    res.json({mssg: 'POST a new user'})
})

// Delete a new user
router.delete('/:id', (req, res) => {
    res.json({mssg: 'delete a user'})
})

// Delete a new user
router.patch('/:id', (req, res) => {
    res.json({mssg: 'update a user'})
})

module.exports = router