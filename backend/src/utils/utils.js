
const { getOneTaskById } = require('../models/taskModel');
const { addUserScoreToCategory } = require('../models/scoreModel');

const addUserScoreToCategoryUtils = (taskId, userId) => {
    console.log("utils task id",taskId);
    getOneTaskById(taskId)
        .then(([result]) => {
            const scoreEarned = result[0].earned_point;
            const taskCategory = result[0].task_category_id;
            addUserScoreToCategory(scoreEarned, taskCategory, userId)
        })
}



module.exports = {
    addUserScoreToCategoryUtils,
}
