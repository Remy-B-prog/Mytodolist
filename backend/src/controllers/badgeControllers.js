const { getAllBadgeUser } = require('../models/badgeModel');

const getAllUserBadge = (req, res) => {
    const token = req.header('Authorization');
    const userId = getUserIdOnToken(token);
    getAllBadgeUser(userId)
        .then((result)=>{
            if(result[0]){
                res.status(200).send(result);
            }else{
                res.status(404).send("no badge found");
            }
        })
};

module.exports = {
    getAllUserBadge
};