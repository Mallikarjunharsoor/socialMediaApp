const jwt = require('jsonwebtoken')
const model = require('../models/model.database');
const { identifyUser } = require('../middelwares/identify.middleware');
const bcrypt = require('bcrypt');

async function registerController(req, res) {
    const{username, email, password, bio, post} = req.body;
    const user = await model.findOne({
        $or: [
            {email},
            {username}
            ]
}).select('+password');
        if(user){
           return res.status(400).json({message: 'email or username already exists'});
        }
    
    
        const cryptedPassword = bcrypt.hashSync(password, 10);
        const newUser = await model.create({
            username,
            email,
            password: cryptedPassword,
            bio,
            post
        })
        const token = jwt.sign({id: newUser._id, username: newUser.username}, process.env.JWT_URI, {expiresIn: '1d'});
        res.cookie('jwt-token', token);
       return res.status(201).json({message: 'user created', newUser});
        
    }

    async function loginController (req, res) {
            const{username, email, password} = req.body;
            const user = await model.findOne({
                $or: [
                    {email},
                    {username}
                ]
            }).select('+password');
            if(!user){
                return res.status(400).json({message: 'user does not exist'});
            }
    
            const cryptedPassword = bcrypt.compareSync(password, user.password);
            if(!cryptedPassword){
                return res.status(400).json({message: 'invalid password'});
            }
    
            const token = jwt.sign({id:user._id, username: user.username}, process.env.JWT_URI, {expiresIn: '1d'});
            res.cookie('jwt-token', token);
            res.status(200).json({message: 'user logged in', user:({
                username: user.username,
                email: user.email,
                bio: user.bio,
                post: user.post
            })});
            
    }

    async function getMeController(req, res) {
        const userId = req.user.id;

        const user = await model.findById(userId);
        res.status(200).json({message: 'user found', user});
        return user;
    }
    module.exports = {registerController, loginController, getMeController};
