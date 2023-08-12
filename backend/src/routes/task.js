const express = require('express');
const { deletUserAssignedTask, getUserAssignedTask, postUserAssignedTask, getAllUserAccomplishTask } = require('../controllers/taskControllers');
const router = express.Router();

// get all assigned user tasks
router.get('/assigned', getUserAssignedTask)

router.get('/accomplished', getAllUserAccomplishTask )

// Get a single task
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single task'})
})

// POST a new task
router.post('/assign', postUserAssignedTask )

// Delete a new task
router.delete('/:id',deletUserAssignedTask)

// Delete a new task
router.patch('/assigned-task/:id', (req, res) => {
    res.json({mssg: 'update a task'})
})

module.exports = router