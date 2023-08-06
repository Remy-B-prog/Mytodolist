
const express = require('express');
const app = express();
const database = require('./services/database');
require('dotenv').config()
const cors = require('cors');
const router = require('./router');

app.use(
    cors({
        origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
        optionsSuccessStatus: 200,
    }))

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

app.use(router);

// test database connection
database

//listen for requests
app.listen(process.env.PORT, () => {
console.log(`Server is running on port: ${process.env.PORT} !!! & ${database}`);
})

module.exports = app;
