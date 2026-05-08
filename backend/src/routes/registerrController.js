const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const model = require('../models/model.database');

async function registerController(req, res) {
    const{username, email, password, bio, post} = req.body;
    const user = await model.findOne({
        $or: [
            {email},
            {username}
            ]
});
        if(user){
            res.status(400).json({message: 'email or username already exists'});
        }
    
    
        const cryptedPassword = crypto.createHash('sha256').update(password).digest('hex');
        const newUser = await model.create({
            username,
            email,
            password: cryptedPassword,
            bio,
            post
        })
        const token = jwt.sign({id: newUser._id}, process.env.JWT_URI, {expiresIn: '1d'});
        res.cookie('jwt-token', token);
        res.status(201).json({message: 'user created', newUser});
    }

    async function loginController (req, res) {
            const{username, email, password} = req.body;
            const user = await model.findOne({
                $or: [
                    {email},
                    {username}
                ]
            });
            if(!user){
                res.status(400).json({message: 'user does not exist'});
            }
    
            const cryptedPassword = crypto.createHash('sha256').update(password).digest('hex');
            if(cryptedPassword !== user.password){
                res.status(400).json({message: 'invalid password'});
            }
    
            const token = jwt.sign({id:user._id}, process.env.JWT_URI, {expiresIn: '1d'});
            res.cookie('jwt-token', token);
            res.status(200).json({message: 'user logged in', user:({
                username: user.username,
                email: user.email,
                bio: user.bio,
                post: user.post
            })});
    }
    module.exports = {registerController, loginController};
