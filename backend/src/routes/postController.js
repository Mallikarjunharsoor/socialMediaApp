const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');
const postModel = require('..//models/model.posts');

const imagekit = new ImageKit({
    privateKey: process.env.IMAGE_KIT_SECRETKEY
});

async function postCreateController(req, res) {

const token = req.cookies['jwt-token'];
let decoded = null;
try {
 decoded = jwt.verify(token, process.env.JWT_URI);
} catch (err) {
    res.status(401).json({message: 'unauthoriezed access'});
}


    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "instPosts"
        });

        const post = await postModel.create({
            caption: req.body.caption,
            imgUrl: file.url,
            user: decoded.id
        })
    

    res.send(file);
    res.status(200).json({message: 'post created'});
}

async function postGetController(req, res){
    const token = req.cookies['jwt-token'];
    let decoded = null;
    try {
        decoded = jwt.verify(token, process.env.JWT_URI);
    } catch(err) {
        res.status(401).json({message: 'unauthorized access'});
    }
    const userId = decoded.id;

    const posts = await postModel.find({
        user: userId
    });
    if(!posts) {
        res.status(404).json({message: 'no posts found'});
    }
    res.status(200).json({message: 'posts found', posts});
}

async function postDetailsController(req, res) {
    const token = req.cookies['jwt-token'];
    const postId = req.params.id;
    let decoded = null;
    try {
        decoded = jwt.verify(token, process.env.JWT_URI);
    } catch(err) {
        res.status(401).json({message: 'unauthorized access'});
    }
    const userId = decoded.id;
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
module.exports = { postCreateController, postGetController, postDetailsController };