const {body , validationResult} = require('express-validator');

/*
    insted of writting a middleware for validate email 
    and another for passwords 
    we can make one middleware using middleware chain[ , , ]
*/

module.exports= [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('password is required'),
    (req,res,next)=>{
        let err = validationResult(req);
        if(!err.isEmpty())
            return res.status(400).json({errors:err.array()});
        next();
    }
]