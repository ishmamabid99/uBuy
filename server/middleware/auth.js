require('dotenv').config();
const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers.authorization;
    console.log(token)
    if (!token) {
        res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded
    }
    catch (err) {
        console.log(err)
        return res.status(401).send("Invalid Token");
    }
    return next();
}
module.exports = verifyToken;