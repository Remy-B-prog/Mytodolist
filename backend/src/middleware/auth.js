const {getUserByEmail} = require('../models/userModel');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');


const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
    const { email } = req.body;
    getUserByEmail(email)
    .then(([users]) => {
        if (users[0] != null) {
          req.user = users[0];
          next();
        } else {
          res.status(401).send("La combinaison Email/Mot de passe est incorrect");
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
    });
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashed_password.toString(), req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const token = jwt.sign(
          { sub: req.user.id.toString() },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );
        delete req.user.hashedPassword;
        res.status(200).json({
          token,
          user: req.user,
        });
      } else {
        res.status(401).send("La combinaison Email/Mot de passe est incorrect");
      }
    })
    .catch((err) => {
      // do something with err
      console.error(err);
      res.sendStatus(500);
    });
};

  const hashPassword = (req, res, next) => {
    // hash the password using argon2 then call next()
    argon2
      .hash(req.body.password, {
        type: argon2.argon2id,
        memory: 15360,
        iterations: 2,
        parallelism: 1,
      })
      .then((hashedPassword) => {
        // do something with hashedPassword
        req.body.hashedPassword = hashedPassword;
        delete req.body.password;
        next();
      })
      .catch((err) => {
        // do something with err
        console.error(err);
        res.sendStatus(500);
      });
  };
  
  const verifyToken = (req, res, next) => {
    try {
      const authorizationHeader = req.get("Authorization");
      if (authorizationHeader == null) {
        throw new Error("Authorization header is missing!");
      } else {
        const auth = req.get("authorization").split(" ");
        const type = auth[0];
        const token = auth[1];
  
        if (type !== "Bearer") {
          throw new Error("Authorization header has not the 'Bearer' type");
        } else {
          req.payload = jwt.verify(token, process.env.JWT_SECRET);
          next();
        }
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(401);
    }
  };
  module.exports = {
    verifyToken,
    getUserByEmailWithPasswordAndPassToNext,
    verifyPassword,
    hashPassword,
};