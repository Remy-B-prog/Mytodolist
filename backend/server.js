
const express = require('express');
require('dotenv').config()
const mysql = require('mysql2');

// routes import
const taskRoutes = require('./src/routes/task');
const userRoutes = require('./src/routes/user');
const badgeRoutes = require('./src/routes/badge');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution, 'DB connection success')
})

connection.end()


// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

app.use( '/api/task', taskRoutes);
app.use( '/api/user', userRoutes);
app.use( '/api/badge', badgeRoutes);


//listen for requests
app.listen(process.env.PORT, () => {
console.log(`Server is running on port: ${process.env.PORT} !!!`);
})
