const express = require('express');

const router = express.Router();

// get all badge
router.get('/', (req, res) => {
    res.json({mssg: 'GET all badge'})
})

// Get a single badge
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single badge'})
})

// POST a new badge
router.post('/', (req, res) => {
    res.json({mssg: 'POST a new badge'})
})

// Delete a new badge
router.delete('/:id', (req, res) => {
    res.json({mssg: 'delete a badge'})
})

// Delete a new badge
router.patch('/:id', (req, res) => {
    res.json({mssg: 'update a badge'})
})

module.exports = router