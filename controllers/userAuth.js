const User = require("../Models/User");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async(req, res) => {
    const { email, password ,username} = req.body;
    if(!username)
        return res.status(400).json({ msg: "username is required" });
    try{
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) 
            return res.status(400).json({ msg: "User with this email already exists" });
        const newUser = await User.create({
            email,
            username,
            password, 
            role:'customer'
        });
        const userToken = jwt.sign(
            {
                userInfo: {
                    userId: newUser.id,
                    username: newUser.username,
                    role: newUser.role,
                },
            },
            process.env.TOKEN_SECRET,
            { expiresIn: "1h" }
        );
        res.cookie("userToken", userToken, {
            httpOnly: true,
            maxAge: 3600000,  // 1 hour
        });
        res.status(201).json({
            msg: "User registered successfully",
        }).send();
    }catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error' });
        }
    };

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userInfo = await User.findOne({ where: { email: email } });
        if (!userInfo) return res.status(404).json({ msg: "user not found" });
        if (userInfo.password !== password)
            return res.status(401).json({ msg: "Wrong Password" });
        const userToken = jwt.sign({
            userInfo: {
                userId: userInfo.id,
                username: userInfo.username,
                role: userInfo.role,
            },
        }, 
        process.env.TOKEN_SECRET,
        { expiresIn: "1h" }
    );
    
    res.cookie("token", userToken, {
        httpOnly: true,   
        maxAge: 3600000 
    });

    res.status(200).json({
        message: "Login successful",
        user: {
            id: userInfo.id,
            username: userInfo.username,
            role: userInfo.role
        }
    });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "server error!!!" });
    }
};

module.exports = { register, login };
