const express = require('express');
const {registerController, loginController} = require('./registerrController');

const auth = express.Router();
auth.post('/register', registerController );

    auth.post('/login', loginController);
module.exports = auth;