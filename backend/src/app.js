const express = require ('express');
const cookie = require('cookie-parser');
const router = require('./routes/auth');
const postAuth = require('./routes/postAuth');
const userRout = require('./routes/user.auth');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookie());
app.use('/auth', router);
app.use('/auth', postAuth);
app.use('/auth', userRout);



module.exports = app;