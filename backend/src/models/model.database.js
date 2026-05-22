const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: [true, 'username already exits'],
    },
    email: {
        type: String,
        required: [true, 'email already exists'],
        unique: [true, 'email already exists'],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        select: false
    },
    bio: {
        type: String
    },
    post: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNubLmqdOK9pZWU-2IiD20cuSIdUUDi9-NvQ&s'
    }
})

const model = mongoose.model('user', userSchema);
module.exports = model;