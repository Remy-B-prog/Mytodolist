const database = require('../services/database');

const getAllBadgeUser = (userId) => {
    return database.query(
        `SELECT * FROM user_badge 
        WHERE user_id = ?`,
        [user_id]
    )
}


module.exports = {
    getAllBadgeUser,
};