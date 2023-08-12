const database = require('../services/database');
const getAllUserAssignedTask = require('../models/taskModel');
const { postAssigneTask } = require('../models/taskModel');
const { getUserIdOnToken } = require('../middleware/userMiddleware');
const { getAssignedTask } = require('../models/taskModel');

// Get all user assigned task
const getUserAssignedTask = (req, res) => {
    const token = req.header('Authorization');
    const userId = getUserIdOnToken(token);
    getAllUserAssignedTask(userId)
        .then(([result]) => {
            if (result.length > 1) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ mssg: 'No task found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ mssg: 'Internal server error' });
        })
}

// Post a new task
const postUserAssignedTask = (req, res) => {
    const token = req.header('Authorization');
    const userId = getUserIdOnToken(token);
    const taskId = req.body.taskId;
    getAssignedTask(taskId, userId).then(([result]) => {
        if (!result[0]) {
            postAssigneTask(taskId, userId)
                .then(([result]) => {
                    if (result['affectedRows'] == 1) {
                        res.status(200).json({ mssg: 'Task assigned successfully' });
                    } else {
                        res.status(500).json({ mssg: 'Internal server error' });
                    }
                });

        }else{
            res.status(400).json({ mssg: 'Task already assigned' });
        }
    });
}

module.exports = {
    getUserAssignedTask,
    postUserAssignedTask,
}