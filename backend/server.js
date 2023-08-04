
const express = require('express');
require('dotenv').config()
const taskRoutes = require('./src/routes/task');
const userRoutes = require('./src/routes/user');
const badgeRoutes = require('./src/routes/badge');

// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})


//routes
app.use( '/api/task', taskRoutes);
app.use( '/api/user', userRoutes);
app.use( '/api/badge', badgeRoutes);

//listen for requests
app.listen(process.env.PORT, () => {
console.log(`Server is running on port: ${process.env.PORT} !!!`);
})
