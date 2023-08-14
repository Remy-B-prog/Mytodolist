const database = require('../services/database');

const getAllBadgeUser = (userId) => {
    return database.query(
        `SELECT b.title, b.critical_score, tc.category
        FROM badge AS b 
        INNER JOIN user_badge AS ub ON b.id = ub.badge_id
        INNER JOIN task_category AS tc ON b.task_category_id = tc.id
        WHERE ub.user_id = 1`,
        [userId]
    )
}


module.exports = {
    getAllBadgeUser,
};