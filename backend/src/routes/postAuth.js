const express = require('express')
const postController = require('./postController');
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});

const postAuth = express.Router();
postAuth.post('/post', upload.single('imgUrl'), postController);
module.exports = postAuth;