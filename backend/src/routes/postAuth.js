const express = require('express')
const postController = require('./postController');
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});
const { identifyUser } = require('../middelwares/identify.middleware');

const postAuth = express.Router();
postAuth.post('/post', upload.single('imgUrl'), identifyUser, postController.postCreateController);
postAuth.get('/posts', identifyUser, postController.postGetController);
postAuth.get('/post/:id', identifyUser, postController.postDetailsController);
module.exports = postAuth;