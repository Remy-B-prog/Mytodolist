const { getUserIdOnToken } = require('../middleware/userMiddleware');
const { getAccomplishTask,
    deleteAssignedTask,
    getAssignedTask,
    postAssigneTask,
    getAllUserAssignedTask,
    postAccomplishedTask,
    getOneAccomplishTask, 
    getAllTask,} = require('../models/taskModel');
const { addUserScoreToCategoryUtils, checkIfUserEarnedBadge } = require('../utils/utils');

// Get all user assigned task
const getUserAssignedTask = (req, res) => {
    const token = req.header('Authorization');
    const userId = getUserIdOnToken(token);
    getAllUserAssignedTask(userId)
        .then(([result]) => {
            if (result.length >= 1) {
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
                deleteAssignedTask(taskId, userId)
                    .then(([result]) => {
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
        .catch((error) => {
            res.status(500).json({ mssg: 'Internal server error' });
        })
}

const getAllUserAccomplishTask = (req, res) => {
    const token = req.header('Authorization');
    const userId = getUserIdOnToken(token);
    getAccomplishTask(userId)
        .then(([result]) => {
            console.log(result)
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
    postAccomplishedTask(taskId, userId)
        .then(([result]) => {
            if (result.affectedRows) {
                deleteAssignedTask(taskId, userId);
                addUserScoreToCategoryUtils(taskId, userId);
                checkIfUserEarnedBadge(taskId, userId);
                res.status(200).json({ mssg: 'Task validated successfully' });
            } else {
                res.status(500).json({ mssg: 'Internal server error' });
            }})
        .catch((error) => {
            res.status(500).json({ mssg: 'Internal server error' });
        });
    //Add score
    //Check badge by category
}

const allTaskDiffAssignedTask = (req, res) => {
    const token = req.header('Authorization');
    const userId = getUserIdOnToken(token);
    getAllTask()
        .then(([result]) => {
            if (result[0]) {
                const allTask = result;
                getAllUserAssignedTask(userId)
                .then(([result]) => {
                    const userAssignedTask = result;
                    console.log(userAssignedTask);
                    console.log(userAssignedTask.id);
                    const userTaskDiffAssignedTask = allTask.filter(task => !userAssignedTask.some(userAssignedTask => userAssignedTask.id === task.id));
                    res.status(200).json(userTaskDiffAssignedTask);
                });
            } else {
                res.status(400).json({ mssg: 'error' });
            }
        })
        .catch((error) => {
            res.status(500).json({ mssg: 'Internal server error' });
        });
    //Add score
    //Check badge by category
}



module.exports = {
    getAllUserAccomplishTask,
    getUserAssignedTask,
    postUserAssignedTask,
    deletUserAssignedTask,
    postUserValidateTask,
    allTaskDiffAssignedTask,
}