const mongoose = require("mongoose");

const isLikedSchema = mongoose.Schema({
    post: {
        ref: 'post',
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'post id is required to like']
    },
    user: {
        ref: 'user',
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'user id is required to like']
    }
}, {timestamps: true})
isLikedSchema.index({ post: 1, user: 1 }, { unique: true });

const isLikedModel = mongoose.model('isLiked', isLikedSchema);
module.exports = isLikedModel;