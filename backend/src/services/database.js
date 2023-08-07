require ('dotenv').config();

const mysql = require("mysql2/promise");

const database = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// const getAllUsersPromise = database.query(`SELECT * FROM user`);
// console.log(getAllUsers[0])

database
  .getConnection()
  .then(() => {
    console.log('Can reach database');
    // return getAllUsersPromise;
  })
  // .then((getAllUsersResult) => {
  //   console.log('Result of getAllUsers:', getAllUsersResult[0]);
  // })
  .catch((err) => {
    console.error(err);
  });


module.exports = database;