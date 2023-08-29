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

const initScore = async (userId) => {
    try {
        await database.query(
            `INSERT INTO score (user_id, task_category_id, score) VALUES (?, 1, 0);`,
            [userId]
        );

        await database.query(
            `INSERT INTO score (user_id, task_category_id, score) VALUES (?, 2, 0);`,
            [userId]
        );

        return "Scores initialisés avec succès.";
    } catch (error) {
        throw error;
    }
}

module.exports = {
addUserScoreToCategory,
getUserScoreInCategory,
getUserScore,
initScore,
}
