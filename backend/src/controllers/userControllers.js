
const {insert, updateFisrtName, getUserById } = require('../models/userModel');
const { getUserIdOnToken } = require('../middleware/userMiddleware');
const {initScore} = require('../models/scoreModel');

const addUser = (req, res) => {
  const user = req.body;
  console.log(req.body);
  // TODO validations (length, format...)
    insert(user)
    .then(([result]) => {
      const userId = result.insertId;
      initScore(userId);
      res.location(`/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("L'adresse email est déjà utilisé");
    });
};

const getUserByToken = (req, res) => {
  const token = req.header('Authorization');
  const userId = getUserIdOnToken(token);
  getUserById(userId)
  .then(([result]) => {
    res.status(200).json(result[0]);
  });
}

const userUpdateHisFirstName = (req, res) => {
  const newFirstname = req.body.newFirstName;
  const token = req.header('Authorization');
  const userId = getUserIdOnToken(token);
  // TODO validations (length, format...)
    updateFisrtName(newFirstname, userId)
    .then(([result]) => {
      res.location(`/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erreur lors de la mise à jour du prénom");
    });
}



module.exports = {
  addUser,
  userUpdateHisFirstName,
  getUserByToken,
}