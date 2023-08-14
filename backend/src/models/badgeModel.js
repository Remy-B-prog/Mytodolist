const database = require('../services/database');

const getAllBadgeUser = (userId) => {
    return database.query(
        `SELECT b.title, b.critical_score, tc.category
        FROM user_badge
        INNER JOIN badge as b ON badge_id = badge_id
        INNER JOIN task_category as tc ON b.task_category_id = b.task_category_id
        WHERE user_id = ?`,
        [userId]
    )
}


module.exports = {
    getAllBadgeUser,
};