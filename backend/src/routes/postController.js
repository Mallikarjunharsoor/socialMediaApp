const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');
const postModel = require('..//models/model.posts');
const { identifyUser } = require('../middelwares/identify.middleware');
const isLikedModel = require('../models/model.isLiked');

const imagekit = new ImageKit({
    privateKey: process.env.IMAGE_KIT_SECRETKEY
});

async function postCreateController(req, res) {




    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "instPosts"
        });

        const post = await postModel.create({
            caption: req.body.caption,
            imgUrl: file.url,
            user: req.user.id
        })
    

    res.send(file);
    res.status(200).json({message: 'post created'});
}

async function postGetController(req, res){
    
    const userId = req.user.id;

    const posts = await postModel.find({
        user: userId
    });
    if(!posts) {
        res.status(404).json({message: 'no posts found'});
    }
    res.status(200).json({message: 'posts found', posts});
}

async function postDetailsController(req, res) {
    
    const userId = req.user.id;
    const postId = req.params.id;
    
    const post = await postModel.findOne({
        user: userId,
        _id: postId
    });
    if(!post) {
        res.status(404).json({message: 'post not found'});
    }
    if(!post) {
        res.status(404).json({message: 'post not found'});
    }
    res.status(200).json({message: 'post found', post});
}

async function likedPostController(req, res) {
    const userId = req.user.id;
    const postId = req.params.id;
    const isLiked = await isLikedModel.findOne({
        user: userId,
        post: postId
    })

if(isLiked){
    await isLikedModel.deleteOne({_id: isLiked._id})
    return res.status(200).json({message: 'post unliked'});
}else{ 
    await isLikedModel.create({
        post: postId,
        user: userId
    })
    return res.status(200).json({message: 'post liked'}, isLiked);
}
}



async function getposts(req, res){
    const user = req.user.id;
    const posts = await Promise.all((await postModel.find().populate('user').lean())
.map(async post => {
    const isLiked = await isLikedModel.findOne({
        post: post._id,
        user: user
    })
    post.isLiked = Boolean(isLiked);
    return post
}));
    
    if(!posts) {
        res.status(404).json({message: 'no posts found'});
    }
    res.status(200).json({message: 'posts found', posts});
    return posts;
}
module.exports = { postCreateController, postGetController, postDetailsController, getposts, likedPostController };