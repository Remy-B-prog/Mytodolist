const { getUserScoreInCategory,getUserScore } = require('../models/scoreModel');
const { getUserIdOnToken } = require('../middleware/userMiddleware');

const getUserScoreController = (req, res) => {
    const token = req.header('Authorization');
    const userId = getUserIdOnToken(token);

    getUserScore(userId)
        .then(([result]) => {
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(404).send("no score found");
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).send("An error occurred");
        });
}

module.exports = {
    getUserScoreController,
};