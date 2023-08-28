const { getUserScoreInCategory } = require('../models/scoreModel');

const getUserScoreInCategoryController = (req, res) => {
    const token = req.header('Authorization');
    const userId = getUserIdOnToken(token);
    const categoryId = req.params.categoryId;

    getUserScoreInCategory(categoryId, userId)
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

};