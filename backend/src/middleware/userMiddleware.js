const jwt = require('jsonwebtoken');

const getUserIdOnToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
}

module.exports = {
    getUserIdOnToken,
}


