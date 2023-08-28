const database = require('../services/database');

const getUserScore = (userId) => {
    return database.query(`
    SELECT s.id, t.category, s.score
    FROM score AS s
    INNER JOIN task_category AS t ON s.task_category_id = t.id
    WHERE s.user_id = ?`, 
    [userId]);
}


const addUserScoreToCategory = (scoreToAdd, categoryId, userId) => {
   return database.query(
       ` UPDATE score 
        set score = score + ?
        WHERE task_category_id = ?
        AND user_id = ?`,
        [scoreToAdd, categoryId, userId]);
}

const getUserScoreInCategory = (categoryId, userId) => {
    return database.query(
        `SELECT score FROM score
        WHERE task_category_id = ?
        AND user_id = ?`,
        [categoryId, userId]);
}

module.exports = {
addUserScoreToCategory,
getUserScoreInCategory,
getUserScore,
}
