const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    caption: {
        type: String,
        default: ' '
    },
    imgUrl: {
        type: String,
        required: [true, 'image url is required to post']
    },
    user: {
        ref: 'user',
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'user id is required to post']
    }
})
const postModel = mongoose.model('post', postSchema);
module.exports = postModel;