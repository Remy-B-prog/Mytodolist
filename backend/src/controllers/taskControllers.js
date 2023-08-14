const { getUserIdOnToken } = require('../middleware/userMiddleware');;
const { getAccomplishTask,
    deleteAssignedTask,
    getAssignedTask,
    postAssigneTask,
    getAllUserAssignedTask,
    postAccomplishedTask,
    getOneAccomplishTask,} = require('../models/taskModel');
const {addUserScoreToCategoryUtils} = require('../utils/utils');

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
    const taskId = req.params.id;
    getAssignedTask(taskId, userId)
        .then(([result]) => {
            if (!result[0]) {
                postAssigneTask(taskId, userId)
                    .then(([result]) => {
                        if (result['affectedRows'] == 1) {
                            res.status(200).json({ mssg: 'Task assigned successfully' });
                        } else {
                            res.status(500).json({ mssg: 'Internal server error' });
                        }
                    });
            } else {
                res.status(400).json({ mssg: 'Task already assigned' });
            }
        });
}
// Delete an assigned task

const deletUserAssignedTask = (req, res) => {
    const token = req.header('Authorization');
    const userId = getUserIdOnToken(token);
    const taskId = req.params.id;
    getAssignedTask(taskId, userId)
        .then(([result]) => {

            if (result[0]) {
                deleteAssignedTask(taskId, userId).then(([result]) => {
                    if (result['affectedRows'] == 1) {
                        res.status(200).json({ mssg: 'Task deleted successfully' });
                    } else {
                        res.status(500).json({ mssg: 'Internal server error' });
                    }
                });
            } else {
                res.status(404).json({ mssg: 'Task not found' })
            }
        })
}

const getAllUserAccomplishTask = (req, res) => {
    const token = req.header('Authorization');
    const userId = getUserIdOnToken(token);
    getAccomplishTask(userId)
        .then(([result]) => {
            if (result[0]) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ mssg: 'No task found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ mssg: 'Internal server error' });
        })
}

const postUserValidateTask = (req, res) => {
    const token = req.header('Authorization');
    const userId = getUserIdOnToken(token);
    const taskId = req.params.id;
    getOneAccomplishTask(taskId, userId)
        .then(([result]) => {
            if (!result[0]) {
                postAccomplishedTask(taskId, userId)
                    .then(([result]) => {
                        if (result.affectedRows) {
                            addUserScoreToCategoryUtils(taskId, userId);
                            res.status(200).json({ mssg: 'Task validated successfully' });
                        } else {
                            res.status(500).json({ mssg: 'Internal server error' });
                        }
                    })
            } else {
                res.status(400).json({ mssg: 'Task already validated' });
            }
        })
    //Add score
    //Check badge by category
}



module.exports = {
    getAllUserAccomplishTask,
    getUserAssignedTask,
    postUserAssignedTask,
    deletUserAssignedTask,
    postUserValidateTask,
}