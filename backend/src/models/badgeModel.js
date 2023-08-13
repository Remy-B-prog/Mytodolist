const database = require('../services/database');

const getAllUserBadge = (userId) => {
    return database.query(
        `SELECT * FROM user_badge 
        WHERE user_id = ?`,
        [user_id]
    )
}


module.exports = {
 getAllUserBadge,
};