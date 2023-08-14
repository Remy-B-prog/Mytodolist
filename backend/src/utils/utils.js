
const { getOneTaskById } = require('../models/taskModel');
const { addUserScoreToCategory } = require('../models/scoreModel');

const addUserScoreToCategoryUtils = (taskId, userId) => {
    getOneTaskById(taskId)
        .then(([result]) => {
            console.log(scoreEarned);
            const scoreEarned = result[0].score;
            addUserScoreToCategory(scoreEarned, taskId, userId)
                .then(([result]) => {
                    if (result.affectedRows) {
                        res.status(200).json({ mssg: ' scoreEarned was added to user Score' });
                    }
                })
        })
}



module.exports = {
    addUserScoreToCategoryUtils,
}
