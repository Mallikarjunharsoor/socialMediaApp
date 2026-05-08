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
    },
    bio: {
        type: String
    },
    post: {
        type: String,
        default: 'https://www.bing.com/ck/a?!&&p=be03c0d8178c26c21b1c9cf3e3dd96ab360c12a0ca3848d28624e403240abfc5JmltdHM9MTc3ODExMjAwMA&ptn=3&ver=2&hsh=4&fclid=068b4a84-4dab-61fd-2999-5fcd4c0660fe&u=a1L2ltYWdlcy9zZWFyY2g_cT1pbnN0YStkZWZhdWx0K3Byb2ZpbGUraW1hZ2UmaWQ9ODhGMzgyQzAzRUY0REVFQzAwMEVCRTRERTdGMkY1NkNCQkQxRjMxQSZGT1JNPUlRRlJCQQ'
    }
})

const model = mongoose.model('user', userSchema);
module.exports = model;