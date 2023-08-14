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

const updateFisrtName = (newFirstname, userId) => {
  return database.query(
    `UPDATE user SET firstname = ? WHERE id = ?`,
    [newFirstname, userId]
    );
}

module.exports = {
  getUserByEmail,
  insert,
  updateFisrtName,
};