const database = require('../services/database');


const addUserScoreToCategory = (scoreToAdd, categoryId, userId) => {
   return database.query(
       ` UPDATE score 
        set score = score + ?
        WHERE task_category_id = ?
        AND user_id = ?`,
        [scoreToAdd, categoryId, userId]);
   
}

module.exports = {
addUserScoreToCategory,
}
