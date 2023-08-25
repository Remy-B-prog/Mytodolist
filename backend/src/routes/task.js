const express = require('express');
const { deletUserAssignedTask, getUserAssignedTask, postUserAssignedTask, getAllUserAccomplishTask, postUserValidateTask } = require('../controllers/taskControllers');
const router = express.Router();


// get all assigned user tasks
router.get('/assigned', getUserAssignedTask)

// get all accomplished tasks
router.get('/accomplished', getAllUserAccomplishTask )

// get all accomplished tasks
router.get('/addTask' )

// POST a new task
router.post('/assign/:id', postUserAssignedTask )

// POST a new task
router.post('/validate-task/:id', postUserValidateTask )

// Delete a new task
router.delete('/:id',deletUserAssignedTask)




module.exports = router