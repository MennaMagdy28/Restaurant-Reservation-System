require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
    const cookies = req.cookies;
    
    if(!cookies?.userToken)
        return res.sendStatus(401);

    const userToken = cookies.userToken;
    
    jwt.verify(userToken , process.env.TOKEN_SECRET,(err , data)=>{
        if(err) res.sendStatus(403); //inva;id token code
        req.userId = data.userInfo.userId;
        req.username = data.userInfo.username;
        req.role = data.userInfo.role;
        next();
    });
}