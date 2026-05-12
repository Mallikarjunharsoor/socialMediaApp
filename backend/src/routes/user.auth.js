const express = require('express');
const followController = require('./followController');
const { identifyUser } = require('../middelwares/identify.middleware');

const userRout = express.Router(); 

userRout.post('/follow/:username', identifyUser,followController.followController);
userRout.post('/unfollow/:username', identifyUser,followController.unfollowController);
userRout.patch('/follow-request/:username', identifyUser, followController.followRequestController);

module.exports = userRout;