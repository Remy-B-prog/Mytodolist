const database = require('../services/database');

const getUserByEmail = (email) => {
  return database.query(`SELECT * FROM user WHERE email = ?`, [email]);
};

const insert = (user) => {
  return database.query(
    `INSERT INTO user (firstname, email, hashed_password) VALUES (?, ?, ?)`,
    [user.firstname, user.email, user.hashedPassword]
    );
}

module.exports = {
  getUserByEmail,
  insert,
};