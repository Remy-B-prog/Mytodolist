const express = require('express');
const getUserAssignedTask = require('../controllers/taskUserControllers');
const router = express.Router();

// get all task
router.get('/', (req, res) => {
    res.json({mssg: 'GET all task'})
})
// get all assigned user tasks
router.get('/assigned', getUserAssignedTask)

// Get a single task
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single task'})
})

// POST a new task
router.post('/assign', (req, res) => {
    res.json({mssg: 'POST a new task'})
})

// Delete a new task
router.delete('/:id', (req, res) => {
    res.json({mssg: 'delete a task'})
})

// Delete a new task
router.patch('/:id', (req, res) => {
    res.json({mssg: 'update a task'})
})

module.exports = router