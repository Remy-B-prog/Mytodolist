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

const getAllBadgeUserInCategory = (userId, categoryId) => {
    return database.query(`
    SELECT b.id, b.title, b.critical_score, tc.category 
    FROM badge AS b
    INNER JOIN user_badge AS ub ON b.id = ub.badge_id
    INNER JOIN task_category AS tc ON b.task_category_id = tc.id
    WHERE ub.user_id = ?
    AND tc.id = ?`,
    [userId, categoryId])
}

const getAllCategoryBadge = (categoryId) => {
    return database.query(
        `SELECT b.id, b.title, b.critical_score, tc.category
         FROM badge AS b 
         INNER JOIN task_category AS tc ON b.task_category_id = tc.id
         WHERE tc.id = ?`,
         [categoryId],
    )
}

const insertEarnedBadge = (badgeId, userId) => {
    return database.query(`
    INSERT INTO user_badge (badge_id, user_id)`
    [badgeId, userId]);
    
}


module.exports = {
    getAllBadgeUser,
    getAllCategoryBadge,
    getAllBadgeUserInCategory,
    insertEarnedBadge,
};