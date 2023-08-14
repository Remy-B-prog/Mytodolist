
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

const checkIfUserEarnedBadge = (taskId, userId) => {

    getOneTaskById(taskId)
        .then(([result]) => {
            const categoryId = result[0].task_category_id;
            getAllCategoryBadge(categoryId)
                .then(([result]) => {
                    const allBadge = result;
                    getAllBadgeUserInCategory(userId, categoryId)
                        .then(([result]) => {
                            userBadge = result;
                            const BadgesNotEarned = allBadge.filter(badge => !userBadge.some(userBadge => userBadge.id === badge.id));
                            getUserScoreInCategory(categoryId, userId)
                                .then(([result]) => {
                                    const userScore = result[0].score;
                                    const badgeEarned = BadgesNotEarned.filter(badge => userScore >= badge.critical_score);
                                    if(badgeEarned){
                                        insertEarnedBadge(badgeEarned[0].id, userId);
                                    }
                                })
                        });
                });
        });
}

checkIfUserEarnedBadge(1, 1)

//récupère tout les badges de la category //
//récupère tout les badges que l'user possède dans cette category//
//soustrait les badges de la category - les badges de user//
//regarde dans les badges de la category restant si le score de l'user est supérieur au score d'un badge
//si un score est superieur alors on ajoute le badge à l'user



module.exports = {
    addUserScoreToCategoryUtils,
}
