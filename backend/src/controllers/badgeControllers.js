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
        .then((result) => {
            if (result[0]) {
                const allBadge = result[0];
                getAllBadgeUser(userId)
                    .then((result) => {
                        if (result[0]) {
                            const userBadge = result[0];
                            const userBadgeId = userBadge.map((badge) => badge.id);
                            const notValidatedBadge = allBadge.filter((badge) => !userBadgeId.includes(badge.id));
                            res.status(200).send(notValidatedBadge);
                        } else {
                            res.status(404).send("no badge found");
                        }
                    });
            } else {
                res.status(404).send("no badge found");
            }
        })
}

module.exports = {
    getAllUserBadge
};