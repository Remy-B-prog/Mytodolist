const model = require('express');
const {insert} = require('../models/userModel');
const database = require('../services/database');

const addUser = (req, res) => {
  const user = req.body;
  console.log(req.body);
  // TODO validations (length, format...)

    insert(user)
    .then(([result]) => {
      res.location(`/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("L'adresse email est déjà utilisé");
    });
};

module.exports = addUser;