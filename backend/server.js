const express = require('express');

// express app
const app = express();

const port = 4000;

//routes
app.get('/', (req, res) => {
    res.json({message: 'Hello World!'});
})

//listen for requests
app.listen(port, () => {
console.log(`Server is running on port: ${port} !!!`);
})
