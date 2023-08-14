const express = require('express');
const { deletUserAssignedTask, getUserAssignedTask, postUserAssignedTask, getAllUserAccomplishTask } = require('../controllers/taskControllers');
const router = express.Router();

// get all assigned user tasks
router.get('/assigned', getUserAssignedTask)

// get all assigned tasks
router.get('/accomplished', getAllUserAccomplishTask )

// POST a new task
router.post('/assign/:id', postUserAssignedTask )

// Delete a new task
router.delete('/:id',deletUserAssignedTask)

module.exports = router