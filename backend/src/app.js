const express = require ('express');
const cookie = require('cookie-parser');
const router = require('./routes/auth');
const postAuth = require('./routes/postAuth');
const app = express();
app.use(express.json());
app.use(cookie());
app.use('/auth', router);
app.use('/auth', postAuth);



module.exports = app;