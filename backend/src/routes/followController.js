const followModel = require('../models/model.follow');
const model = require('../models/model.database');
const { identifyUser } = require('../middelwares/identify.middleware');

async function followController(req, res) {
    const followeename = req.params.username;
    const followername = req.user.username;

    const alreadyFollowed = await followModel.findOne({
        follower: followername,
        followee: followeename
    })
    if(alreadyFollowed){
        return res.status(400).json({
            message: `You already follow ${followeename}`
        })
    }
    if(followeename === followername){
        return res.status(400).json({
            message: "you cannot follow yourself"
        })
    }

    const follow = followModel.create({
        follower: followername,
        followee: followeename
    })
    return res.status(200).json({message: `you are now following ${followeename}`, follow: follow});

}

async function unfollowController(req, res) {
    const followeename = req.params.username;
    const followername = req.user.username;

    const alreadyFollowed = await followModel.findOne({
        follower: followername,
        followee: followeename
    })
    if(!alreadyFollowed){
        return res.status(400).json({message: `you do not follow ${followeename}`});
    }
    const findUser = await model.findOne({
        username: followeename
    })
    if(!findUser){
       return res.status(404).json({message: 'user not found'})
    }

    const unfollow = await followModel.findOneAndDelete({
        follower: followername,
        followee: followeename
    })
    res.status(200).json({message: `you have unfollowed ${followeename}`});
}

module.exports = { followController, unfollowController };