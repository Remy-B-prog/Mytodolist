const database = require('../services/database');
const getAllUserAssignedTask = require('../models/taskModel');
const { getUserIdOnToken } = require('../middleware/userMiddleware');

// Get all user assigned task
const getUserAssignedTask = (req, res) => {
    const token = req.header('Authorization');
    const userId = getUserIdOnToken(token);
    getAllUserAssignedTask(userId)
        .then(([result]) => {
            if (result.length > 1) {
                res.status(200).json(result);
            }else{
                res.status(404).json({mssg: 'No task found'});
            }
        })
        .catch((error) => {
            res.status(500).json({mssg: 'Internal server error'});
        })
}

module.exports = getUserAssignedTask;