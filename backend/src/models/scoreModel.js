const database = require('../services/database');


const addUserScoreToCategory = (scoreToAdd, category, user) => {
   ` UPDATE score 
    set score = score + ?
    WHERE task_category_id = ?
    AND user_id = ?`,
    [scoreToAdd, category, user]
}

module.exports = {
addUserScoreToCategory,
}
