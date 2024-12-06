require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const cookies = req.cookies;
    console.log(req.cookie)
    if (!cookies?.token) 
        return res.sendStatus(401);

    const userToken = cookies.token;

    jwt.verify(userToken, process.env.TOKEN_SECRET, (err, data) => {
        if (err) {
            console.error("JWT verification failed:", err);
            return res.sendStatus(403);
        }

        req.userId = data.userInfo.userId;
        req.username = data.userInfo.username;
        req.role = data.userInfo.role;

        next();
    });
};
