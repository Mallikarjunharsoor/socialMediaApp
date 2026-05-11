const { timeStamp } = require('console');
const { timingSafeEqual } = require('crypto');
const mongoose = require('mongoose');
const { StringDecoder } = require('string_decoder');

const followSchema = new mongoose.Schema({
    follower: {
        type: String,
        required: [true, 'follower username is required to follow']
    },
    followee:{
        type: String,
        required: [true, 'followee username is required to follow']
    }
}, {
    timestamps: true
});

const followModel = mongoose.model('follow', followSchema);

module.exports = followModel;