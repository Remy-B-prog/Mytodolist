
const { getOneTaskById } = require('../models/taskModel');
const { addUserScoreToCategory } = require('../models/scoreModel');
const { getAllCategoryBadge, getAllBadgeUserInCategory,insertEarnedBadge } = require('../models/badgeModel');
const { getUserScoreInCategory } = require('../models/scoreModel');

const addUserScoreToCategoryUtils = (taskId, userId) => {
    getOneTaskById(taskId)
        .then(([result]) => {
            const scoreEarned = result[0].earned_point;
            const taskCategory = result[0].task_category_id;
            addUserScoreToCategory(scoreEarned, taskCategory, userId)
        })
}

const checkIfUserEarnedBadge = (taskAcomplishByUser, userId) => {
    getOneTaskById(taskAcomplishByUser)
        .then(([result]) => {
            const categoryId = result[0].task_category_id;
            getAllCategoryBadge(categoryId)
                .then(([result]) => {
                    const allBadge = result;
                    getAllBadgeUserInCategory(userId, categoryId)
                        .then(([result]) => {
                           const userBadge = result;
                            const BadgesNotEarned = allBadge.filter(badge => !userBadge.some(userBadge => userBadge.id === badge.id));
                            getUserScoreInCategory(categoryId, userId)
                                .then(([result]) => {
                                    const userScore = result[0].score;
                                    const badgeEarned = BadgesNotEarned.filter(badge => userScore >= badge.critical_score);
                                    console.log(badgeEarned);
                                    if(badgeEarned[0]){
                                        console.log(badgeEarned.length);
                                        if(badgeEarned.length > 1){
                                            badgeEarned.map((e)=>insertEarnedBadge(e.id, userId))
                                        } else {
                                            const badgeId = badgeEarned[0].id;
                                            insertEarnedBadge(badgeId, userId);
                                        }
                                    }
                                })
                        });
                });
        });
}

module.exports = {
    addUserScoreToCategoryUtils,
    checkIfUserEarnedBadge,
}
