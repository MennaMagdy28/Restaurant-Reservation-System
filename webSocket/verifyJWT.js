require('dotenv').config();
const jwt =require('jsonwebtoken')
module.exports = (socket,next)=>{
    const token = socket.handshake.headers.authorization;
    if (!token) 
      return next(new Error('Authentication error: No token provided'));
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err)
        return next(new Error('Authentication error: Invalid token'));
      socket.user = decoded;
      next(); 
    });
  };