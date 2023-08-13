const jwt = require('jsonwebtoken');

// Function to convert a full baerer token to a user id
const getUserIdOnToken = (baererToken) => {
    const token = baererToken.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.sub;
}

module.exports = {
    getUserIdOnToken,
}


