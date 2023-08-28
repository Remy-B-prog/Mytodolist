const { getAllBadgeUser, getAllBadge } = require('../models/badgeModel');
const { getUserIdOnToken } = require('../middleware/userMiddleware');

const getAllUserBadge = (req, res) => {
    const token = req.header('Authorization');
    const userId = getUserIdOnToken(token);
    getAllBadgeUser(userId)
        .then((result) => {
            if (result[0]) {
                res.status(200).send(result[0]);
            } else {
                res.status(404).send("no badge found");
            }
        })
};

const getUserNotValidatedBadge = (req, res) => {
    const token = req.header('Authorization');
    const userId = getUserIdOnToken(token);
    
    getAllBadge()
        .then(([allBadgeResult]) => {
            if (allBadgeResult) {
                const allBadge = allBadgeResult;

                getAllBadgeUser(userId)
                    .then(([userBadgeResult]) => {
                        if (userBadgeResult) {
                            const userBadge = userBadgeResult;
                            console.log(userBadge);

                            const notValidatedBadge = allBadge.filter(badge => {
                                const isBadgeValidated = userBadge.some(userBadgeItem => userBadgeItem.id === badge.id);
                                return !isBadgeValidated;
                            });
                            res.status(200).send(notValidatedBadge);
                        } else {
                            res.status(404).send("no badge found");
                        }
                    });
            } else {
                res.status(404).send("no badge found");
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).send("An error occurred");
        });
}


module.exports = {
    getAllUserBadge,
    getUserNotValidatedBadge,
};