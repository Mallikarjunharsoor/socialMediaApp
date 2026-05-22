const express = require('express');
const {registerController, loginController, getMeController} = require('./registerrController');
const { identifyUser } = require('../middelwares/identify.middleware');

const auth = express.Router();
auth.post('/register', registerController );

    auth.post('/login', loginController);
    auth.get('/me', identifyUser, getMeController);
module.exports = auth;